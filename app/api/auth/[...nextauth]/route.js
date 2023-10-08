import User from '@/models/User';
import connect from '@/utils/db';
import NextAuth from 'next-auth'
import  CredentialsProvider  from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server';

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const {email , password} = credentials
        try {
            await connect()
            const user = await User.findOne({email})
            if(!user) {
                return null
            }
            const matchPass = await bcrypt.compare(password , user.password)
            if(!matchPass) {
                return null
            }
            return user
        } catch (error) {
            return NextResponse.json({message : 'the details is wrong'})
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};


const handler = NextAuth(authOption)

export {handler as GET , handler as POST}