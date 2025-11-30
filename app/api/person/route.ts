import { NextResponse } from "next/server";
import { getMessages } from "@/lib/i18n";
import { getDb, PersonDoc } from "@/lib/mongo";

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
    // Ensure unique index on { code } in production for efficiency & integrity.
    const person = await coll.findOne({ code });
    if (!person) return NextResponse.json({ error: t.codeNotFound }, { status: 404 });
    if (person.seen) {
      return NextResponse.json({ error: t.usedCodeWarning }, { status: 409 });
    }
    await coll.updateOne({ code }, { $set: { seen: true } });
    return NextResponse.json({ person: { name: person.name, hints: person.hints, code, seen: true } });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
