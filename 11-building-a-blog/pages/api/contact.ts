import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface Message {
  id?: ObjectId;
  email: string;
  name: string;
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (!email || !email.includes("@") || !name || !message) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage: Message = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://choi:r3D2BstWeiuvriSR@cluster0.2gnqkvs.mongodb.net/?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }
    const db = client.db("my-site");
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }
    client.close();

    res
      .status(201)
      .json({ message: `Successfully stored message! ${newMessage}` });
  }
};

export default handler;
