type Person = {
  name: string;
};

// Input list (expandable)
const people: Person[] = [
  { name: "Loyda" },
  { name: "Gavin" },
  { name: "Stephanie" },
  { name: "Abuela" },
  { name: "Abuelo" },
  { name: "Matteo" },
];

// Constraint: Abuela <-> Gavin are not allowed pairs in either direction
function isForbiddenPair(giver: string, receiver: string): boolean {
  const a = giver.toLowerCase();
  const b = receiver.toLowerCase();
  const forbidden =
    (a === "abuela" && b === "gavin") || (a === "gavin" && b === "abuela");
  return forbidden;
}

// Generate a random permutation for receivers avoiding self-pair and constraints
function generatePairs(names: string[]): Map<string, string> {
  const n = names.length;
  const givers = [...names];
  const receivers = [...names];

  // Fisher–Yates shuffle receivers
  for (let i = receivers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [receivers[i], receivers[j]] = [receivers[j], receivers[i]];
  }

  // Attempt to fix conflicts by simple swap-heuristic
  const maxAttempts = n * 10;
  let attempts = 0;
  while (attempts < maxAttempts) {
    let ok = true;
    for (let i = 0; i < n; i++) {
      const giver = givers[i];
      const receiver = receivers[i];
      if (giver === receiver || isForbiddenPair(giver, receiver)) {
        ok = false;
        // find index to swap with to resolve conflict
        for (let k = 0; k < n; k++) {
          if (k === i) continue;
          const candidate = receivers[k];
          if (candidate !== giver && !isForbiddenPair(giver, candidate)) {
            // also ensure the other giver doesn't get a forbidden/self pair after swap
            const otherGiver = givers[k];
            if (
              candidate !== otherGiver &&
              !isForbiddenPair(otherGiver, receiver)
            ) {
              [receivers[i], receivers[k]] = [receivers[k], receivers[i]];
              break;
            }
          }
        }
      }
    }
    if (ok) break;
    attempts++;
    // If too many attempts, reshuffle and retry
    if (attempts % n === 0) {
      for (let i = receivers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [receivers[i], receivers[j]] = [receivers[j], receivers[i]];
      }
    }
  }

  // Final validation
  for (let i = 0; i < n; i++) {
    const giver = givers[i];
    const receiver = receivers[i];
    if (giver === receiver || isForbiddenPair(giver, receiver)) {
      // As a fallback, perform backtracking assignment
      return backtrackingAssign(givers);
    }
  }

  const map = new Map<string, string>();
  for (let i = 0; i < n; i++) map.set(givers[i], receivers[i]);
  return map;
}

function backtrackingAssign(givers: string[]): Map<string, string> {
  const receivers = new Set(givers);
  const assignment = new Map<string, string>();

  function dfs(idx: number): boolean {
    if (idx === givers.length) return true;
    const giver = givers[idx];
    for (const candidate of Array.from(receivers)) {
      if (candidate === giver) continue;
      if (isForbiddenPair(giver, candidate)) continue;
      assignment.set(giver, candidate);
      receivers.delete(candidate);
      if (dfs(idx + 1)) return true;
      receivers.add(candidate);
      assignment.delete(giver);
    }
    return false;
  }

  const success = dfs(0);
  if (!success) throw new Error("No valid assignment for given constraints");
  return assignment;
}

// Test runner: run 1000 simulations and validate constraints
function runTests(iterations = 1000) {
  const names = people.map((p) => p.name);
  for (let t = 0; t < iterations; t++) {
    const pairs = generatePairs(names);
    // 1: each giver has exactly one unique receiver
    const receivers = new Set<string>();
    for (const giver of names) {
      const receiver = pairs.get(giver);
      if (!receiver) throw new Error(`Missing receiver for ${giver}`);
      if (receiver === giver)
        throw new Error(`Self-pair detected for ${giver}`);
      if (receivers.has(receiver))
        throw new Error(`Duplicate receiver ${receiver} detected`);
      if (isForbiddenPair(giver, receiver))
        throw new Error(`Forbidden pair ${giver} -> ${receiver}`);
      receivers.add(receiver);
    }
    if (receivers.size !== names.length)
      throw new Error("Not a perfect matching");
  }
  console.log(`All ${iterations} tests passed ✅`);
}

if (require.main === module) {
  try {
    runTests(1000);
  } catch (e: any) {
    console.error("Test failed:", e?.message || e);
    process.exit(1);
  }
}
