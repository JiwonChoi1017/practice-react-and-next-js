import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://choi:r3D2BstWeiuvriSR@cluster0.2gnqkvs.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
};
