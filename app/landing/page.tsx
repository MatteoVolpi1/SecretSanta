"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function Landing() {
  const router = useRouter();
  const { setLang } = useLanguage();

  const choose = (lang: "en" | "es") => {
    setLang(lang);
    router.push("/");
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xl py-3 px-6 rounded-xl border-2 border-black shadow-lg"
              onClick={() => choose("es")}
            >
              Español
            </button>
            <div className="relative w-full h-56 border-2 border-black rounded-xl overflow-hidden cursor-pointer" onClick={() => choose("es")}
            >
              <Image src="/images/comics/mexican_santa3.png" alt="Santa Mexicano" fill className="object-contain bg-white" />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xl py-3 px-6 rounded-xl border-2 border-black shadow-lg"
              onClick={() => choose("en")}
            >
              English
            </button>
            <div className="relative w-full h-56 border-2 border-black rounded-xl overflow-hidden cursor-pointer" onClick={() => choose("en")}
            >
              <Image src="/images/comics/secretsanta.png" alt="Secret Santa" fill className="object-contain bg-white" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
