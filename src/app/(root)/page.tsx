"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Cpu, Palette, Terminal, Zap } from "lucide-react";
import useMounted from "@/hooks/useMounted";

// Import your workspace dashboard view components
import Header from "./_components/Header";
import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  const { isSignedIn } = useAuth();
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <div className="w-full min-h-screen bg-[#07070c]">
      <AnimatePresence mode="wait" initial={false}>
        {isSignedIn ? (
          /* WORKSPACE DASHBOARD */
          <motion.div
            key="workspace-panel"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full min-h-screen bg-[#0a0a12] text-gray-100 p-4"
          >
            <div className="max-w-7xl mx-auto space-y-4">
              <Header />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <EditorPanel />
                <OutputPanel />
              </div>
            </div>
          </motion.div>
        ) : (
          /* LANDING PAGE LAYOUT */
          <motion.div
            key="landing-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full min-h-screen relative overflow-x-hidden selection:bg-blue-500/30"
          >
            {/* Background Glow Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-150 bg-radial from-blue-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

            <header className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center relative z-10">
              {/* Micro Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-medium mb-6"
              >
                <Zap className="size-3 animate-pulse" /> Production Grade
                Sandboxing
              </motion.div>

              {/* Main Title Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight bg-linear-to-b from-white via-gray-200 to-gray-500 text-transparent bg-clip-text max-w-3xl mx-auto leading-tight"
              >
                The Ultimate Multi-Language Code Playground
              </motion.h1>

              {/* Description Prose */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-medium"
              >
                Write, compile, and execute scripts instantly across multiple
                runtimes right from your browser. Completely zero setup
                required.
              </motion.p>

              {/* Interaction Buttons Stack */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                className="mt-10 flex flex-wrap justify-center gap-4"
              >
                <Link
                  href="/sign-in"
                  className="px-6 py-3 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 group"
                >
                  Start Coding Free
                  <Code2 className="size-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>

                <Link
                  href="#features"
                  className="px-6 py-3 rounded-xl font-medium text-sm text-gray-400 hover:text-white bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition-colors duration-200"
                >
                  Explore Features
                </Link>
              </motion.div>
            </header>

            {/* 2. IDE MOCKUP SECTION */}
            <section className="max-w-5xl mx-auto px-6 pb-24 relative z-10">
              <div className="rounded-xl border border-gray-800 bg-[#0a0a12]/90 backdrop-blur-md shadow-2xl p-4 ring-1 ring-white/5 overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-800/60 text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/40" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/40" />
                    <span className="w-3 h-3 rounded-full bg-green-500/40" />
                    <span className="ml-2 font-mono text-gray-400 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
                      main.js
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                      Node.js v18
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">
                      VS Dark
                    </span>
                  </div>
                </div>

                <div className="font-mono text-sm text-gray-300 space-y-1.5 leading-relaxed bg-[#020205] p-6 rounded-lg border border-gray-900 text-left">
                  <p>
                    <span className="text-purple-400">const</span> numbers = [1,
                    2, 3, 4, 5];
                  </p>
                  <p>
                    <span className="text-purple-400">const</span> squares =
                    numbers.<span className="text-blue-400">map</span>(n =&gt; n
                    * n);
                  </p>
                  <p className="text-gray-500">
                    Compute output payload streams
                  </p>
                  <p>
                    <span className="text-orange-400">console</span>.
                    <span className="text-blue-400">log</span>(
                    <span className="text-green-400">Squared Values:</span>,
                    squares);
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-900 text-xs text-gray-500">
                    <p className="text-blue-400 font-semibold mb-1">
                      $&gt; Execution Output:
                    </p>
                    <p className="text-green-400 font-medium">
                      Squared Values: [ 1, 4, 9, 16, 25 ]
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. CORE FEATURES GRID */}
            <section
              id="features"
              className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900 relative z-10"
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl md:text-4xl font-bold text-white">
                  Engineered for Modern Developers
                </h2>
                <p className="text-gray-400 mt-3 text-sm md:text-base">
                  Everything you need to write, evaluate, and inspect
                  computational structures instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl border border-gray-900 bg-gray-950/40 hover:bg-gray-950/80 hover:border-gray-800 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Cpu className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mt-4">
                    Isolated Sandbox Engine
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    Secure server-to-server cloud runtimes process computations
                    outside local dependencies cleanly.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-gray-900 bg-gray-950/40 hover:bg-gray-950/80 hover:border-gray-800 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                    <Terminal className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mt-4">
                    10+ Runtimes
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    Native support for Python, JavaScript, TypeScript, Go, Rust,
                    C++, Java, and more with boilerplate injection.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-gray-900 bg-gray-950/40 hover:bg-gray-950/80 hover:border-gray-800 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20 group-hover:scale-110 transition-transform">
                    <Palette className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mt-4">
                    Monaco Customization
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    Toggle between multiple IDE themes like Monokai, GitHub
                    Dark, or Solarized and calibrate fluid font variables.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
