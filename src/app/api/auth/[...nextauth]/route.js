import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/models/User"; // Adjust the import path as necessary
import { connectToDb } from "@/utils/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("user")
      console.log(user)
      console.log("account")
      console.log(account)
      console.log("profile")
      console.log(profile)
      await connectToDb();
      const existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = new UserModel({
          name: user.name,
          email: user.email,
          imageUrl: user.image,
        });
        await newUser.save();
      }

      return true;
    },
    async session({ session, token }) {
      console.log("session")
      console.log(session)
      console.log("token")
      console.log(token)
      await connectToDb();
      const dbUser = await UserModel.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id.toString(); // Add user ID to session
      }

      return session;
    },
  },
  // secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
