"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";

  // Static demo data: name + gift ideas
  const pairName = "Nome"; // replace with dynamic later
  const hints = [
    { label: "DSW Gift Card $10-50 for winter shoes" },
    { label: "Ross Gift Card $10-50" },
    { label: "Shower curtains", url: "https://a.co/d/fQp7b2t" },
    { label: "Cast iron dutch oven", url: "https://a.co/d/gOIWBjy" },
    { label: "Wine red jumpsuit LARGE", url: "https://a.co/d/8rnHznD" },
  ];

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
                src="/images/comics/secretsanta.png"
                alt="Secret Santa"
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

          {/* Code reminder */}
          {code && (
            <div className="mb-4 p-3 bg-yellow-100 border-2 border-black rounded-xl">
              <p className="text-center font-bold text-gray-800">
                Code used: "{code}" — remember it!
              </p>
            </div>
          )}

          {/* Hints list */}
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-center text-red-600">Gift Ideas</h2>
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
