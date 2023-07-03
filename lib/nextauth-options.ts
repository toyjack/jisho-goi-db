import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma";
import {compare} from 'bcrypt'
import { NextAuthOptions } from "next-auth";

export const nextAuthOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      // @ts-ignore
      async authorize(credentials) {
        console.log(credentials)
        if(!credentials || !credentials.email || !credentials.password) return null
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if(!user) return null

        const passwordCompare = await compare(credentials.password, user.password)
        if(!passwordCompare) return null
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID||"",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  }
}