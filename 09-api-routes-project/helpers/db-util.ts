import { Document, InsertOneResult, MongoClient, Sort, WithId } from "mongodb";

interface Data {
  email: string;
  name?: string;
  text?: string;
  eventId?: string | string[];
}

export const connectDatabase = async (): Promise<MongoClient> => {
  const client = await MongoClient.connect(
    "mongodb+srv://choi:r3D2BstWeiuvriSR@cluster0.2gnqkvs.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};

export const insertDocument = async (
  client: MongoClient,
  dbName: string,
  collection: string,
  document: Data
): Promise<InsertOneResult<Document>> => {
  const db = client.db(dbName);
  return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (
  client: MongoClient,
  dbName: string,
  collection: string,
  sort: Sort
): Promise<WithId<Document>[]> => {
  const db = client.db("events");
  return await db.collection("comments").find().sort(sort).toArray();
};
