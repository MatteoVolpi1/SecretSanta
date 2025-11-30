import { MongoClient } from "mongodb";

// Use user-provided env var
const uri = process.env.MONGO_CONNECTION_URI || "";
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function getDb() {
  // If no URI, throw to let caller handle mock mode
  if (!uri) throw new Error("MONGODB_URI not configured");

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
