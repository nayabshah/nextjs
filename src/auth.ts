import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/db";
import type { NextAuthOptions } from "next-auth";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { getServerSession } from "next-auth";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing github oauth credentials");
}

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session; // The return type will match the one returned in `useSession()`
    },
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as myNextAuth };
