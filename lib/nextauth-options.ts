import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  // adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;

        const passwordCompare = await compare(
          credentials.password,
          user.password
        );
        if (!passwordCompare) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log({user, account, profile,})
      if (account?.type === "oauth") {
        const userInDb = await prisma.user.findFirst({
          where: {
            email: user.email || "",
          },
        });
        // TODO: jump to create user page
        // if (!userInDb) return false;

        return true;
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // console.log({token, user, account, profile})

      // get oauth user's role from db
      if(account?.type === "oauth") {
        const userInDb = await prisma.user.findFirst({
          where: {
            email: user.email || "",
          },
        });
        if (userInDb) token.role = userInDb.role;
      }
      
      // TODO: fix types
      // @ts-ignore
      if (user && user.role) token.role = user.role;
      return token;
    },
    async session({ session, user, token }) {
      // console.log({session, user, token})
      // TODO: fix types
      // @ts-ignore
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
};
