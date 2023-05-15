import { Document, MongoClient, ObjectId, WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  message?: string;
  comment?: {
    id?: ObjectId;
    email: string;
    name: string;
    text: string;
    eventId?: string | string[];
  };
  comments?: WithId<Document>[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { eventId } = req.query;

  const client = await MongoClient.connect(
    "mongodb+srv://choi:r3D2BstWeiuvriSR@cluster0.2gnqkvs.mongodb.net/?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || !text) {
      res.status(422).json({ message: "Invaild input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db("events");
    const result = await db.collection("comments").insertOne(newComment);

    res.status(201).json({
      message: "Added comment.",
      comment: { id: result.insertedId, ...newComment },
    });
  }

  if (req.method === "GET") {
    const db = client.db("events");
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
};

export default handler;
