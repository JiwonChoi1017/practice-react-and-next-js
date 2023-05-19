import {
  Document,
  InsertOneResult,
  MongoClient,
  ObjectId,
  WithId,
} from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/db-util";

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

  let client: MongoClient | undefined = undefined;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || !text) {
      res.status(422).json({ message: "Invaild input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result: InsertOneResult<Document> | undefined = undefined;
    try {
      result = await insertDocument(client, "events", "comments", newComment);
      res.status(201).json({
        message: "Added comment.",
        comment: { id: result.insertedId, ...newComment },
      });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "events", "comments", {
        _id: -1,
      });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }

  client.close();
};

export default handler;
