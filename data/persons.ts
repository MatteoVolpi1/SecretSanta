export type Hint = { label: string; url?: string };
export type Person = {
  name: string;
  code: string; // static code assigned to this person
  seen: boolean;
  hints: Hint[];
};

export const persons: Person[] = [
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
  // Fake persons with mocked data
  {
    name: "Abuela",
    code: "ABUELA123",
    seen: false,
    hints: [
      { label: "Warm shawl" },
      { label: "Ceramic mug", url: "https://example.com/mug" },
    ],
  },
  {
    name: "Abuelo",
    code: "ABUELO123",
    seen: false,
    hints: [
      { label: "Wool hat" },
      { label: "Reading light", url: "https://example.com/light" },
    ],
  },
  {
    name: "Matteo",
    code: "MATTEO123",
    seen: false,
    hints: [
      { label: "Mechanical keyboard", url: "https://example.com/keyboard" },
      { label: "Coffee beans" },
    ],
  },
];
