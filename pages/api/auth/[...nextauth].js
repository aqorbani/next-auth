import clientPromise from "@/lib/mongodb";
import User from "@/models/User";
import connectDB from "@/utils/ConnectDB";
import { verifyPassword } from "@/utils/auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in connecting to DB!");
        }

        if (email && password) {
          const existingUser = await User.findOne({ email: email });
          if (existingUser) {
            const isValid = await verifyPassword(
              password,
              existingUser.password
            );
            if (isValid) {
              return { email };
            } else {
              throw new Error("Username or Password is incorrect!");
            }
          } else {
            throw new Error("User doesn't exist!");
          }
        } else {
          throw new Error("Invalid data!");
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
