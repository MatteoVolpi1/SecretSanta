"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function ResultPage() {
  const { t } = useLanguage();
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [person, setPerson] = useState<{ name: string; hints: Array<{ label: string; url?: string }> } | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("secret-code");
      if (stored) setCode(stored);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("person");
      if (stored) {
        const p = JSON.parse(stored);
        setPerson({ name: p.name, hints: Array.isArray(p.hints) ? p.hints : [] });
      }
    } catch {}
  }, []);

  const copyIdeas = async () => {
    const text = [
      "Gift Ideas:",
      ...((person?.hints || []).map((h) => (h.url ? `${h.label} - ${h.url}` : h.label))),
    ].join("\n");

    const tryClipboardAPI = async () => {
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch {}
      return false;
    };

    try {
      let ok = await tryClipboardAPI();
      if (!ok) {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";
        textarea.setAttribute("readonly", "");
        textarea.style.fontSize = "16px"; // avoid iOS zoom
        document.body.appendChild(textarea);
        textarea.select();
        ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        window.scrollTo(scrollX, scrollY);
        if (!ok) throw new Error("Copy failed");
      }
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
        backgroundSize: '400px'
      }}
    >
      <main className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-black p-8 relative">
          {/* Image */}
          <div className="flex justify-center mb-3 sm:mb-6 -mt-2 sm:-mt-4">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 overflow-hidden">
              <Image
                src="/images/comics/reindeer_border4.jpg"
                alt="Reindeer"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black text-center mb-2 text-red-600 comic-text">{t.resultTitle.toUpperCase()}</h1>
          <p className="text-center text-gray-700 font-black mb-6 text-xl">
            {person?.name || "Your Pair"} 🎁
          </p>

          {/* Hints list */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-red-600">{t.copyIdeas.replace("Copy ", "")}</h2>
              <button
                type="button"
                onClick={copyIdeas}
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-black text-sm py-2 px-3 rounded-xl border-2 border-black shadow-md"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <ul className="list-disc list-inside text-gray-800 font-bold">
              {(person?.hints || []).map((item, idx) => (
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
        <p className="text-center mt-6 text-white font-bold text-shadow-lg drop-shadow-lg">{t.footer}</p>
      </main>
    </div>
  );
}
