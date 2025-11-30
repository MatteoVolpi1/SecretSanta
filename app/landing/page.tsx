"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { useState } from "react";
import { getMessages } from "@/lib/i18n";

export default function Landing() {
  const router = useRouter();
  const { setLang } = useLanguage();
  const [pendingLang, setPendingLang] = useState<"en" | "es" | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const choose = (lang: "en" | "es") => {
    setPendingLang(lang);
    setShowConfirm(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/images/backgrounds/5.webp)',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px',
      }}
    >
      <main className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-black p-6">
          <h1 className="text-3xl font-black text-center mb-4 text-red-600">Choose your language</h1>
          <div className="space-y-6">
            <button
              type="button"
              className="relative w-full h-56 border-2 border-black rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => choose("es")}
            >
              <Image
                src="/images/comics/mexican_santa3.png"
                alt="Santa Mexicano"
                fill
                className="object-cover bg-white"
                style={{ transform: "scale(1.15)" }}
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg border-2 border-black font-black text-lg">
                Español
              </span>
            </button>

            <button
              type="button"
              className="relative w-full h-56 border-2 border-black rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => choose("en")}
            >
              <Image
                src="/images/comics/secretsanta.png"
                alt="Secret Santa"
                fill
                className="object-cover bg-white"
                style={{ transform: "scale(1.15)" }}
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg border-2 border-black font-black text-lg">
                English
              </span>
            </button>
          </div>
        </div>
        {showConfirm && pendingLang && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowConfirm(false)} />
            <div className="relative bg-white border-2 border-black rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
              <h2 className="text-2xl font-black text-red-600 mb-3 text-center">🌐</h2>
              <p className="text-gray-800 font-bold text-center mb-4">
                {getMessages(pendingLang).languageConfirmBody(pendingLang)}
              </p>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-black py-3 px-4 rounded-xl border-2 border-black shadow-md"
                  onClick={() => setShowConfirm(false)}
                >
                  {getMessages(pendingLang).confirmCancel}
                </button>
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl border-2 border-black shadow-md"
                  onClick={() => {
                    const lang = pendingLang;
                    setShowConfirm(false);
                    setPendingLang(null);
                    setLang(lang);
                    router.push("/");
                  }}
                >
                  {getMessages(pendingLang).confirmProceed}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
