import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Resend from 'next-auth/providers/resend';
import { prisma } from '@/lib/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Kakao,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'sunsuking@sunsuking.me',
    }),
  ],
});
