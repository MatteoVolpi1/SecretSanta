"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      setMessage(`🎅 Code "${code}" received! Preparing your present...`);
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
        backgroundSize: '25%'
      }}
    >
      <main className="max-w-md w-full">
        {/* Comic-style card */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-black p-8 relative">
          {/* Comic burst decoration */}
          {/*<div className="absolute -top-6 -right-6 bg-yellow-400 border-4 border-black rounded-full w-16 h-16 flex items-center justify-center rotate-12 shadow-lg">
            <span className="text-3xl animate-pulse">🎁</span>
          </div>*/}

          {/* Santa image */}
          <div className="flex justify-center mb-6 -mt-4">
            <div className="relative w-64 h-64 border-4 border-black rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200 to-blue-100 shadow-lg">
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
            🎄 Insert here your secret code 🎄
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Your code..."
                className="w-full px-4 py-3 border-4 border-black rounded-xl text-lg font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 px-6 rounded-xl border-4 border-black shadow-lg transform transition hover:scale-105 active:scale-95"
            >
              🎅 Discover your pair! 🎅
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className="mt-6 p-4 bg-yellow-100 border-4 border-black rounded-xl">
              <p className="text-center font-bold text-gray-800">{message}</p>
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
