import { NextResponse } from "next/server";
import { getDb, PersonDoc } from "@/lib/mongo";

export async function POST() {
  try {
    const db = await getDb();
    const coll = db.collection<PersonDoc>("persons");

    const persons: PersonDoc[] = [
      {
        name: "Loyda",
        code: "LOYDA123",
        seen: false,
        hints: [
          { label: "DSW Gift Card $10-50 for winter shoes" },
          { label: "Ross Gift Card $10-50" },
          { label: "Shower curtains", url: "https://a.co/d/fQp7b2t" },
          { label: "Cast iron dutch oven", url: "https://a.co/d/gOIWBjy" },
          { label: "Wine red jumpsuit LARGE", url: "https://a.co/d/8rnHznD" },
        ],
      },
      {
        name: "Gavin",
        code: "GAVIN123",
        seen: false,
        hints: [
          { label: "Tattoo battery", url: "https://a.co/d/0bqmRnU" },
          { label: "Classic green library lamp, can be this", url: "https://a.co/d/48Jm9Fd" },
          { label: "Hair shampoo", url: "https://a.co/d/gmJdalZ" },
        ],
      },
      {
        name: "Stephanie",
        code: "STEPH123",
        seen: false,
        hints: [
          { label: "iPhone 15 Wildflower case", url: "https://a.co/d/6jWDCkm" },
          { label: "Sports bra", url: "https://a.co/d/0bqmRnU" },
          { label: "Dick's Gift Card $10-50 (saving up for New Balance 1080 for when I'm working)" },
          { label: "Glass tupperware set (can be this or anything related)", url: "https://a.co/d/73bwfGA" },
          { label: "Loop earbuds (Experience 2)", url: "https://a.co/d/fPzhsGh" },
          { label: "Loop earbuds (Switch 2)", url: "https://a.co/d/0fdqvLX" },
        ],
      },
    ];

    for (const p of persons) {
      await coll.updateOne({ code: p.code }, { $set: p }, { upsert: true });
    }

    return NextResponse.json({ inserted: persons.length });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Seed failed" }, { status: 500 });
  }
}
