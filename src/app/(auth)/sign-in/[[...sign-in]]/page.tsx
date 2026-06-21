"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Blocks } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// Your exact custom sticker positions
const ALL_STICKERS = [
  {
    src: "/typescript.png",
    alt: "TypeScript",
    className: "top-[8%] left-[4%] size-20 md:size-24",
    rotate: "-15deg",
  },
  {
    src: "/javascript.png",
    alt: "JavaScript",
    className: "top-[32%] left-[18%] size-18 md:size-22",
    rotate: "12deg",
  },
  {
    src: "/python.png",
    alt: "Python",
    className: "top-[16%] right-[8%] size-22 md:size-26",
    rotate: "18deg",
  },
  {
    src: "/go.png",
    alt: "Go",
    className: "bottom-[10%] left-[17%] size-24 md:size-28",
    rotate: "-8deg",
  },
  {
    src: "/rust.png",
    alt: "Rust",
    className: "bottom-[16%] right-[8%] size-22 md:size-26",
    rotate: "-12deg",
  },
  {
    src: "/cpp.png",
    alt: "C++",
    className: "bottom-[42%] right-[22%] size-18 md:size-22",
    rotate: "14deg",
  },
  {
    src: "/java.png",
    alt: "Java",
    className: "top-[6%] left-[25%] size-18 md:size-22",
    rotate: "-10deg",
  },
  {
    src: "/csharp.png",
    alt: "C#",
    className: "top-[6%] right-[26%] size-18 md:size-22",
    rotate: "6deg",
  },
  {
    src: "/swift.png",
    alt: "Swift",
    className: "bottom-[6%] right-[28%] size-18 md:size-22",
    rotate: "11deg",
  },
  {
    src: "/ruby.png",
    alt: "Ruby Accent",
    className: "top-[58%] left-[9%] size-16 md:size-18",
    rotate: "25deg",
  },
];

export default function SignInPage() {
  const constraintsRef = useRef(null);

  return (
    <div
      ref={constraintsRef}
      className="min-h-screen bg-[#050508] text-gray-300 flex flex-col justify-center items-center p-6 relative overflow-hidden antialiased select-none"
    >
      {/* 1. BACKGROUND ENVIRONMENT MATRIX */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293702_1px,transparent_1px),linear-gradient(to_bottom,#1f293702_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 2. DYNAMIC MOVABLE DIE-CUT STICKERS */}
      {ALL_STICKERS.map((sticker, idx) => (
        <motion.div
          key={idx}
          className={`absolute hidden sm:block ${sticker.className} z-20 cursor-grab active:cursor-grabbing`}
          style={{ rotate: sticker.rotate }}
          // Drag configurations
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, zIndex: 50 }}
          whileDrag={{ scale: 1.05, rotate: "0deg" }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Die-Cut Vinyl Peel Design Backing */}
          <div className="relative w-full h-full p-3.5 bg-white rounded-2xl shadow-[2px_8px_16px_rgba(0,0,0,0.55)] border border-gray-200/40 group">
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-linear-to-br from-transparent via-gray-300/30 to-gray-400/40 rounded-br-2xl pointer-events-none" />
            <Image
              src={sticker.src}
              alt={sticker.alt}
              width={96}
              height={96}
              className="object-contain pointer-events-none select-none"
              priority
            />
          </div>
        </motion.div>
      ))}

      {/* 3. CENTERED INTERACTIVE AUTH BOX (Protected on top-level layer) */}
      <div className="w-full max-w-107.5 flex flex-col items-center relative z-40 bg-[#050508]/40 backdrop-blur-xs p-4 rounded-3xl">
        {/* Brand App Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-gray-900 border border-gray-800 p-2 rounded-xl shadow-xl transition-all duration-300 group-hover:border-blue-500/30">
              <Blocks className="size-5 text-blue-400 group-hover:rotate-6 transition-transform" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">
              PixelJar
            </span>
          </Link>
        </motion.div>

        {/* Customized Clerk Canvas Box */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <SignIn
            appearance={{
              elements: {
                rootBox:
                  "w-full mx-auto shadow-2xl border border-gray-900/60 rounded-2xl overflow-hidden",
                card: "bg-[#08080d]/95 border border-gray-800/40 backdrop-blur-md p-6 sm:p-8",

                // Typography tweaks
                headerTitle:
                  "text-lg font-black tracking-tight text-white text-center",
                headerSubtitle: "text-xs text-gray-400 text-center mt-1",

                // Auth Provider Blocks (Google & GitHub Buttons)
                socialButtonsBlockButton:
                  "bg-gray-950/60 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white text-xs font-semibold h-10 transition-all rounded-lg cursor-pointer",
                socialButtonsBlockButtonText: "font-semibold",

                // Separators
                dividerLine: "bg-gray-900",
                dividerText:
                  "text-gray-600 font-mono text-[9px] uppercase tracking-wider",

                // Input Fields matching workspace dark specs
                formLabel:
                  "text-gray-400 text-xs font-medium tracking-wide mb-1",
                formInput:
                  "bg-gray-950 border-gray-900 focus:border-blue-500/40 focus:ring-0 text-gray-200 text-sm h-10 rounded-lg transition-all px-3",

                // Premium primary action button
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-10 rounded-lg shadow-lg shadow-blue-600/10 active:scale-[0.98] transition-all cursor-pointer",

                // Footer
                footerActionText: "text-gray-500 text-xs",
                footerActionLink:
                  "text-blue-400 hover:text-blue-300 font-semibold transition-colors",
              },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
