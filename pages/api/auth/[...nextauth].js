import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/mongoDB"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_PROVIDER_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.groups = user.groups
      return session
    },
  },
  secret: process.env.secret,
  adapter: MongoDBAdapter(clientPromise),
})
