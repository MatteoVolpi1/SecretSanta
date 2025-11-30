"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t, lang } = useLanguage();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const router = useRouter();

  const getUsedCodes = (): string[] => {
    try {
      const raw = localStorage.getItem("used-codes");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const isCodeUsed = (c: string) => {
    const used = getUsedCodes();
    return used.includes(c.trim());
  };

  useEffect(() => {
    try {
      const shown = localStorage.getItem("rules-shown");
      if (!shown) {
        setShowRules(true);
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      if (isCodeUsed(code)) {
        setMessage(t.usedCodeWarning);
        setShowConfirm(false);
        return;
      }
      setShowConfirm(true);
    } else {
      setMessage(t.insertCodeWarning);
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
          {/* Santa image */}
          <div className="flex justify-center mb-3 sm:mb-6 -mt-2 sm:-mt-4">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <Image
                src={lang === "es" ? "/images/comics/mexican_santa3.png" : "/images/comics/secretsanta.png"}
                alt={lang === "es" ? "Santa Mexicano" : "Secret Santa"}
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black text-center mb-2 text-red-600 comic-text">{t.title}</h1>
          <p className="text-center text-gray-700 font-bold mb-6 text-lg">
            <span className="hidden sm:inline">{t.subtitleLong}</span>
            <span className="inline sm:hidden">{t.subtitleShort}</span>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder={t.codePlaceholder}
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-lg font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-md"
                style={{ color: "#666666" }}
              />
              <style jsx>{`
                input::placeholder {
                  color: #666666;
                  opacity: 1;
                }
              `}</style>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 px-6 rounded-xl border-2 border-black shadow-lg transform transition hover:scale-105 active:scale-95"
            >
              <span className="hidden sm:inline">{t.discoverCtaLong}</span>
              <span className="inline sm:hidden">{t.discoverCtaShort}</span>
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className="mt-4 p-4 bg-yellow-100 border-2 border-black rounded-xl">
              <p className="text-center font-bold text-gray-800">{message}</p>
            </div>
          )}

          {/* One-time Rules Modal */}
          {showRules && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowRules(false)} />
              <div className="relative bg-white border-2 border-black rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
                <h2 className="text-2xl font-black text-red-600 mb-3 text-center">{t.rulesTitle}</h2>
                <p className="text-center text-lg font-bold text-green-700 mb-4">{t.rulesHeader}</p>
                <ul className="list-disc list-inside text-gray-800 font-bold space-y-2">
                  {t.rulesList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <button
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl border-2 border-black shadow-md"
                  onClick={() => {
                    try { localStorage.setItem("rules-shown", "1"); } catch {}
                    setShowRules(false);
                  }}
                >
                  {t.rulesUnderstand}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Modal */}
          {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowConfirm(false)} />
              <div className="relative bg-white border-2 border-black rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
                <h2 className="text-2xl font-black text-red-600 mb-3 text-center">{t.confirmTitle}</h2>
                <p className="text-gray-800 font-bold text-center mb-4">{t.confirmBody}</p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-black py-3 px-4 rounded-xl border-2 border-black shadow-md"
                    onClick={() => setShowConfirm(false)}
                  >
                    {t.confirmCancel}
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl border-2 border-black shadow-md"
                    onClick={() => {
                      const run = async () => {
                        try {
                          const res = await fetch("/api/person", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ code: code.trim() }),
                          });
                          const data = await res.json();
                          if (!res.ok) {
                            setMessage(data.error || t.insertCodeWarning);
                            setShowConfirm(false);
                            return;
                          }
                          sessionStorage.setItem("person", JSON.stringify(data.person));
                          router.push(`/result`);
                        } catch {
                          setMessage(lang === "es" ? "Error de red. Por favor intenta de nuevo." : "Network error. Please try again.");
                          setShowConfirm(false);
                        }
                      };
                      run();
                    }}
                  >
                    {t.confirmProceed}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer text */}
        <p className="text-center mt-6 text-white font-bold text-shadow-lg drop-shadow-lg">{t.footer}</p>
      </main>
    </div>
  );
}