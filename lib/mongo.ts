import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function getDb() {
  // Read env lazily so dotenv-loaded vars are visible
  const uri = process.env.MONGO_CONNECTION_URI || process.env.MONGODB_URI || "";
  if (!uri) throw new Error("MongoDB connection URI missing: set MONGO_CONNECTION_URI or MONGODB_URI");

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  const conn = await clientPromise;
  const dbName = process.env.MONGODB_DB || conn.options?.dbName || "secretsanta";
  return conn.db(dbName);
}

export type PersonDoc = {
  name: string;
  code: string;
  seen: boolean;
  hints: Array<{ label: string; url?: string }>;
};
