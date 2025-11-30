"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      if (isCodeUsed(code)) {
        setMessage("⚠️ This code has already been used. If this is a mistake, please contact Banesita.");
        setShowConfirm(false);
        return;
      }
      setMessage(`🎅 Code "${code}" received! Preparing your present...`);
      setShowConfirm(true);
    } else {
      setMessage("⚠️ Insert your secret code!");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
      backgroundImage: 'url(/images/backgrounds/5.webp)',
      backgroundRepeat: 'repeat',
      backgroundSize: '400px' // Fixed size for all devices
      }}
    >
      <main className="max-w-md w-full">
      {/* Comic-style card */}
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-black p-8 relative">
        {/* Comic burst decoration */}
        {/*<div className="absolute -top-6 -right-6 bg-yellow-400 border-4 border-black rounded-full w-16 h-16 flex items-center justify-center rotate-12 shadow-lg">
        <span className="text-3xl animate-pulse">🎁</span>
        </div>*/}

        {/* Santa image */}
          <div className="flex justify-center mb-3 sm:mb-6 -mt-2 sm:-mt-4">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
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
        SECRET SANTA
        </h1>
        <p className="text-center text-gray-700 font-bold mb-6 text-lg">
        <span className="hidden sm:inline">🎄 Insert here your secret code 🎄</span>
        <span className="inline sm:hidden">🎄 Insert here your code 🎄</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Your code..."
          className="w-full px-4 py-3 border-2 border-black rounded-xl text-lg font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-md"
          style={{ color: "#666666"}}
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
          🎅 Discover your pair! 🎅
        </button>
        </form>

        {/* Message */}
        {message && (
        <div className="mt-4 p-4 bg-yellow-100 border-2 border-black rounded-xl">
          <p className="text-center font-bold text-gray-800">{message}</p>
        </div>
        )}

        {/* Confirm Modal */}
        {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white border-2 border-black rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
          <h2 className="text-2xl font-black text-red-600 mb-3 text-center">Attention!</h2>
          <p className="text-gray-800 font-bold text-center mb-4">
            The code can be used only 1 time. Remember your pair! If you write it down, keep it somewhere safe from others!
          </p>
          <div className="flex gap-3">
            <button
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-black py-3 px-4 rounded-xl border-2 border-black shadow-md"
            onClick={() => setShowConfirm(false)}
            >
            Cancel
            </button>
            <button
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl border-2 border-black shadow-md"
            onClick={() => {
              try {
              sessionStorage.setItem("secret-code", code);
              const used = getUsedCodes();
              const next = Array.from(new Set([...used, code.trim()]));
              localStorage.setItem("used-codes", JSON.stringify(next));
              } catch {}
              router.push(`/result`);
            }}
            >
            Proceed
            </button>
          </div>
          </div>
        </div>
        )}

        {/* Decorative snowflakes */}
        {/*<div className="absolute -bottom-3 left-4 text-2xl">❄️</div>
        <div className="absolute -bottom-3 right-4 text-2xl">❄️</div>*/}
      </div>

      {/* Footer text */}
      <p className="text-center mt-6 text-white font-bold text-shadow-lg drop-shadow-lg">
        ⭐ Ho! Ho! Ho! Merry Christmas! ⭐
      </p>
      </main>
    </div>
  );
}
