import { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

interface Data {
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://choi:r3D2BstWeiuvriSR@cluster0.2gnqkvs.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db("newsletter");
    await db.collection("emails").insertOne({ email: userEmail });
    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
