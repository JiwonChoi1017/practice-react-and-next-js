import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDocument } from "@/helpers/db-util";

import { MongoClient } from "mongodb";

interface Data {
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const userEmail: string = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client: MongoClient | undefined = undefined;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", "emails", {
        email: userEmail,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting database failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
