import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { createAccessToken, createRefreshToken, verifyToken } from '@/lib/server';
import { prisma } from '@/lib/server/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

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
        sub: token.sub!,
        email: token.email!,
      };

      const accessToken = createAccessToken(payload, secret as string);
      const refreshToken = createRefreshToken(payload, secret as string);
      // const cookieStore = cookies();

      // cookieStore.set('accessToken', accessToken, {
      //   httpOnly: false,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'lax',
      //   maxAge: 24 * 60 * 60,
      // });

      // cookieStore.set('refreshToken', refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'lax',
      //   maxAge: 30 * 24 * 60 * 60,
      // });

      return accessToken;
    },

    async decode({ secret, token }): Promise<JWT | null> {
      if (!token) {
        throw new Error('token이 없습니다');
      }

      return verifyToken(token, secret as string);
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
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
