import { NextResponse } from "next/server";
import { getDb, PersonDoc } from "@/lib/mongo";
import { persons as seedPersons } from "@/data/persons";

export async function POST() {
  try {
    const db = await getDb();
    const coll = db.collection<PersonDoc>("persons");

    const persons: PersonDoc[] = seedPersons.map((p) => ({
      name: p.name,
      code: p.code,
      seen: p.seen,
      hints: p.hints,
    }));

    for (const p of persons) {
      await coll.updateOne({ code: p.code }, { $set: p }, { upsert: true });
    }

    return NextResponse.json({ inserted: persons.length });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Seed failed" }, { status: 500 });
  }
}
