/**
 * resetSeen.ts
 *
 * Sets `seen: false` for all documents in the `persons` collection.
 * Uses shared Mongo helper `getDb`.
 *
 * Env vars required:
 *  - MONGODB_URI
 *  - MONGODB_DB
 */

import dotenv from "dotenv";
dotenv.config();

import { getDb } from "../lib/mongo.ts";

async function main() {
  try {
    const db = await getDb();
    const coll = db.collection("persons");

    const res = await coll.updateMany({}, { $set: { seen: false } });
    console.log("Reset seen result:", {
      matchedCount: res.matchedCount,
      modifiedCount: res.modifiedCount,
      acknowledged: res.acknowledged,
    });
  } catch (err) {
    console.error("Error resetting seen:", err);
    process.exitCode = 1;
  }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("Error:", err);
        process.exit(1);
    });
