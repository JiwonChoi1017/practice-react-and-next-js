import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, verifyPassword } from "@/lib/auth";

import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth/next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user?.email;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  res.status(200).json({ message: "Password updated!" });
  client.close();
};

export default handler;
