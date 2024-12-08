import { prisma } from "@/lib/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60
  },
  providers : [
    KakaoProvider({
          clientId: process.env.KAKAO_CLIENT_ID as string,
          clientSecret: process.env.KAKAO_CLIENT_SECRET as string
    }),
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      })
  ],
  callbacks: {
      async jwt({ token }) {
          return token
      },
  }
});

export { handler as GET, handler as POST };
