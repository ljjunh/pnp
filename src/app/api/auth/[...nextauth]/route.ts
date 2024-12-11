import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import jwt from 'jsonwebtoken';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error('token이 없습니다');
      }

      const payload = {
        sub: token.sub,
        email: token.email,
      };

      const accessToken = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: '1h',
      });

      const refreshToken = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: '30d',
      });

      const cookieStore = cookies();

      cookieStore.set('accessToken', accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60,
      });

      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
      });

      return accessToken;
    },

    async decode({ secret, token }): Promise<JWT | null> {
      if (!token) {
        throw new Error('token이 없습니다');
      }

      return jwt.verify(token, secret) as JWT;
    },
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user, isNewUser }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      if (isNewUser) {
        await prisma.host.create({
          data: {
            userId: user.id,
          },
        });
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
