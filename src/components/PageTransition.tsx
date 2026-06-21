"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      // Sophisticated spring-like cinematic entrance parameters
      initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
      transition={{
        duration: 0.45,
        // Custom ease curve mimicking elite dashboard tools
        ease: [0.25, 1, 0.5, 1],
      }}
      className="w-full flex-1 flex flex-col origin-center"
    >
      {children}
    </motion.div>
  );
}
