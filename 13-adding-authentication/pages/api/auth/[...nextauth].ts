import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connectToDatabase } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export default NextAuth({
  session: {},
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");

        if (!credentials) {
          return;
        }

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
});
