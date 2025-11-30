"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("secret-code");
      if (stored) setCode(stored);
    } catch {}
  }, []);

  // Static demo data: name + gift ideas
  const pairName = "Nome"; // replace with dynamic later
  const hints = [
    { label: "DSW Gift Card $10-50 for winter shoes" },
    { label: "Ross Gift Card $10-50" },
    { label: "Shower curtains", url: "https://a.co/d/fQp7b2t" },
    { label: "Cast iron dutch oven", url: "https://a.co/d/gOIWBjy" },
    { label: "Wine red jumpsuit LARGE", url: "https://a.co/d/8rnHznD" },
  ];

  const copyIdeas = async () => {
    const text = [
      "Gift Ideas:",
      ...hints.map((h) => (h.url ? `${h.label} - ${h.url}` : h.label)),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/images/backgrounds/5.webp)',
        backgroundRepeat: 'repeat',
        backgroundSize: '25%'
      }}
    >
      <main className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-black p-8 relative">
          {/* Santa image (same style) */}
          <div className="flex justify-center mb-6 -mt-4">
            <div className="relative w-96 h-96">
              <Image
                src="/images/comics/reindeer.png"
                alt="Reindeer"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black text-center mb-2 text-red-600 comic-text">
            YOUR PAIR IS
          </h1>
          <p className="text-center text-gray-700 font-black mb-6 text-xl">
            "{pairName}" 🎁
          </p>

          {/* Hints list */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-red-600">Gift Ideas</h2>
              <button
                onClick={copyIdeas}
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-black text-sm py-2 px-3 rounded-xl border-2 border-black shadow-md"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <ul className="list-disc list-inside text-gray-800 font-bold">
              {hints.map((item, idx) => (
                <li key={idx} className="break-words">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center mt-6 text-white font-bold text-shadow-lg drop-shadow-lg">
          ⭐ Ho! Ho! Ho! Merry Christmas! ⭐
        </p>
      </main>
    </div>
  );
}
