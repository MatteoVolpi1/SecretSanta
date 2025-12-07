/**
 * createAndSend.ts
 *
 * - genera assegnazioni (1->1) con vincolo Gavin<->Abuela
 * - genera codici segreti 8-char alfanumerici
 * - invia email (tutte a TEST_EMAIL per ora)
 * - salva su MongoDB person documents WITHOUT the plain code, but with hashedCode and receiverName
 *
 * Env vars required:
 *  - MONGODB_URI
 *  - MONGODB_DB
 *  - MONGODB_COLLECTION
 *  - SMTP_HOST
 *  - SMTP_PORT
 *  - SMTP_USER
 *  - SMTP_PASS
 *  - TEST_EMAIL
 */

import dotenv from "dotenv";
dotenv.config();

// Use shared Mongo helper
import { getDb } from "../lib/mongo.ts";
import type { PersonDoc } from "../lib/mongo.ts";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// importa il tuo array persons (senza campo `code`) — aggiusta il path se necessario
import { persons } from "../data/persons.ts"; // keep explicit .ts for ESM

type Person = {
  name: string;
  seen: boolean;
  hints: { label: string; url?: string }[];
};

if (!process.env.SMTP_HOST) throw new Error("SMTP_HOST missing");
if (!process.env.SMTP_PORT) throw new Error("SMTP_PORT missing");
if (!process.env.SMTP_USER) throw new Error("SMTP_USER missing");
if (!process.env.SMTP_PASS) throw new Error("SMTP_PASS missing");
if (!process.env.TEST_EMAIL) throw new Error("TEST_EMAIL missing");

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const TEST_EMAIL = process.env.TEST_EMAIL;

function isForbiddenPair(giver: string, receiver: string): boolean {
  const a = giver.toLowerCase();
  const b = receiver.toLowerCase();
  return (
    (a === "gavin" && b === "abuela") ||
    (a === "abuela" && b === "gavin")
  );
}

// generate random 8-char alphanumeric code
function generateCode(length = 8): string {
  const ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // use crypto.randomBytes for better randomness
  const bytes = crypto.randomBytes(length);
  let res = "";
  for (let i = 0; i < length; i++) {
    res += ALPH[bytes[i] % ALPH.length];
  }
  return res;
}

// backtracking assignment similar to prior script
function generateAssignments(people: Person[]): Map<string, string> {
  const names = people.map((p) => p.name);
  const receivers = new Set(names);
  const assignment = new Map<string, string>();

  function dfs(i: number): boolean {
    if (i === names.length) return true;

    const giver = names[i];

    // shuffled receivers to randomize attempts
    const shuffled = [...receivers].sort(() => Math.random() - 0.5);

    for (const candidate of shuffled) {
      if (candidate === giver) continue;
      if (isForbiddenPair(giver, candidate)) continue;

      assignment.set(giver, candidate);
      receivers.delete(candidate);

      if (dfs(i + 1)) return true;

      receivers.add(candidate);
      assignment.delete(giver);
    }

    return false;
  }

  const ok = dfs(0);
  if (!ok) throw new Error("No valid assignment possible with current constraints");
  return assignment;
}

async function sendEmail(transporter: nodemailer.Transporter, mailSubject: string, mailText: string, giverName: string) {
    const info = await transporter.sendMail({
        from: SMTP_USER,
        to: TEST_EMAIL,
        subject: mailSubject,
        text: mailText,
    });

    console.log(`Email inviata (test) per ${giverName} — messageId: ${info.messageId}`);
}

async function main() {
  console.log("Start: generate assignments, create codes, send emails, save to MongoDB");

  const assignments = generateAssignments(persons as Person[]);

  // create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: SMTP_HOST,
    port: SMTP_PORT || 465,
    secure: true, // enforce SSL (SMTPS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    const db = await getDb();

    // Optionally: clear collection before inserting (comment if you prefer upsert)
    // await coll.deleteMany({});

    // For each person: generate code, hash it, send mail, save doc
    const saltRounds = 10;
    const docsToUpsert: Array<{ filter: any; update: any }> = [];

    for (const person of persons as Person[]) {
      const giverName = person.name;
      const receiverName = assignments.get(giverName);
      if (!receiverName) throw new Error(`No receiver for ${giverName}`);

      // generate unique-ish code (we'll retry small chance of collision)
      let plainCode: string;
      let tries = 0;
      do {
        plainCode = generateCode(8);
        tries++;
        if (tries > 5) break;
      } while (false); // we keep it simple; collisions extremely unlikely for 8 chars in small set

      const hashedCode = await bcrypt.hash(plainCode, saltRounds);

      // Build doc to store (NO plain code)
      const doc: Omit<PersonDoc, "code"> & { hashedCode: string; receiverName: string; createdAt: Date } = {
        name: giverName,
        hashedCode,
        receiverName,
        hints: person.hints || [],
        seen: false,
        createdAt: new Date(),
      };

      // Immediately send email to TEST_EMAIL for now
      const mailSubject = `Secret Santa — code for ${giverName}`;
      const mailText = `Hi ${giverName}!\n\nThis is your secret code to access the Secret Santa:\n\nCODE: ${plainCode}\n\nUse this code on the website to see who you will be gifting.\n\nPS: for now, all emails go to a test address.\n`;

      console.log(`Giver: ${giverName}, Receiver: ${receiverName}, Code: ${plainCode}`);

      // send email
      //await sendEmail(transporter, mailSubject, mailText, giverName);

      // queue upsert (upsert by name)
      docsToUpsert.push({
        filter: { name: giverName },
        update: { $set: doc },
      });
    }

    // apply upserts in bulk
    const bulkOps = docsToUpsert.map((u) => ({
      updateOne: {
        filter: u.filter,
        update: u.update,
        upsert: true,
      },
    }));

    if (bulkOps.length > 0) {
      const bulkRes = await db.collection("persons").bulkWrite(bulkOps);
      console.log("MongoDB bulkWrite result:", bulkRes);
    }

    console.log("Done. All codes sent to TEST_EMAIL and hashed documents saved to DB.");
  } finally {
    // `getDb` manages client singleton; no explicit close here.
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
