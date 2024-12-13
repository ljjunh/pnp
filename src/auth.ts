import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Resend from 'next-auth/providers/resend';
import { prisma } from '@/lib/server';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/signIn',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google,
    Kakao,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_RESEND_FROM_EMAIL,
    }),
  ],
  callbacks: {
    async jwt({ token, user, isNewUser }) {
      if (user) {
        token.id = user.id;
      }

      // * 만약, 신규 유저인 경우에는 호스트 정보를 생성합니다.
      if (isNewUser) {
        try {
          await prisma.host.create({
            data: { userId: user.id as string },
          });
        } catch (error) {
          console.error(error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
