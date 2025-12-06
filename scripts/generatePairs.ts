// npx ts-node --esm scripts/generatePairs.ts

import { persons } from "../data/persons.ts";
import type { Person } from "../data/persons.ts";

// Forbidden pair: Gavin <-> Abuela
function isForbiddenPair(giver: string, receiver: string): boolean {
  const a = giver.toLowerCase();
  const b = receiver.toLowerCase();
  return (
    (a === "gavin" && b === "abuela") ||
    (a === "abuela" && b === "gavin")
  );
}

// Assign everyone a random valid receiver with constraints
function generateAssignments(people: Person[]): Map<string, string> {
  const names = people.map((p) => p.name);
  const receivers = new Set(names);
  const assignment = new Map<string, string>();

  function dfs(i: number): boolean {
    if (i === names.length) return true;

    const giver = names[i];

    // Try receivers in random order to avoid deterministic results
    const shuffled = [...receivers].sort(() => Math.random() - 0.5);

    for (const candidate of shuffled) {
      if (candidate === giver) continue; // no self
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
  if (!ok) throw new Error("❌ Nessuna combinazione valida trovata!");

  return assignment;
}

// RUN SCRIPT
const assignments = generateAssignments(persons);

console.log("\n🎄 Secret Santa — Assegnazioni 🎄\n");

for (const [giver, receiver] of assignments.entries()) {
  console.log(`${giver} → ${receiver}`);
}

console.log("\n✨ Fine generazione!");