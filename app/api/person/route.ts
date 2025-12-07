import { NextResponse } from "next/server";
import { getMessages } from "@/lib/i18n";
import { getDb, PersonDoc } from "@/lib/mongo";
import bcrypt from "bcryptjs";

type RequestBody = { code?: string };

export async function POST(req: Request) {
  const getLangFromReq = (req: Request): "en" | "es" => {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(?:^|;\s*)lang=([^;]+)/);
    const val = match?.[1];
    return val === "es" ? "es" : "en";
  };
  const lang = getLangFromReq(req);
  const t = getMessages(lang);
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const rawCode = body.code;
  const code = typeof rawCode === "string" ? rawCode.trim().toUpperCase() : "";
  if (!code) return NextResponse.json({ error: t.insertCodeWarning }, { status: 400 });

  // Strict validation: only A-Z0-9, length 5-16. Prevents operator injection & weird unicode.
  const CODE_PATTERN = /^[A-Z0-9]{5,16}$/;
  if (!CODE_PATTERN.test(code)) {
    return NextResponse.json({ error: t.insertCodeWarning }, { status: 400 });
  }

  // Try DB, fall back to mock if env not set
  try {
    const db = await getDb();
    const coll = db.collection<PersonDoc>("persons");
    // We store bcrypt hashes in the DB; bcrypt uses random salts,
    // so re-hashing the input and matching won't work. Instead,
    // iterate candidates and use bcrypt.compare.
    const candidates = (await coll
      .find({}, { projection: { name: 1, hints: 1, hashedCode: 1, seen: 1 } })
      .toArray()) as Array<any>;

    let matched: any | null = null;
    for (const p of candidates) {
      if (!p.hashedCode) continue;
      const ok = await bcrypt.compare(code, p.hashedCode);
      if (ok) {
        matched = p;
        break;
      }
    }

    if (!matched) return NextResponse.json({ error: t.codeNotFound }, { status: 404 });
    if (matched.seen) {
      return NextResponse.json({ error: t.usedCodeWarning }, { status: 409 });
    }
    await coll.updateOne({ _id: matched._id }, { $set: { seen: true } });
    return NextResponse.json({ person: { name: matched.name, hints: matched.hints, hashedCode: matched.hashedCode, seen: true } });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
