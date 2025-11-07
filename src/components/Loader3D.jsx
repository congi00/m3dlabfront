"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Loader3D({ logoUrl, progress }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      style={{height: "110%"}}
    >
      {/* 🔥 Effetto laser HD migliorato */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1 – glow diffuso centrale */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(138,174,174,0.25) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{
            opacity: [0.1, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Layer 2 – laser dinamico più sottile e preciso */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0%, rgba(138,174,174,0.25) 47%, rgba(138,174,174,0.9) 49%, rgba(138,174,174,0.25) 51%, transparent 100%)",
            backgroundSize: "300% 100%",
            filter: "blur(0.4px) brightness(1.5)",
            mixBlendMode: "screen",
          }}
        />

        {/* Layer 3 – riflesso morbido */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(138,174,174,0.15) 0%, transparent 70%)",
            filter: "blur(25px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* 🌬 Logo breathing */}
      {logoUrl && (
        <motion.img
          src={logoUrl}
          alt="Logo"
          className="w-40 h-40 object-contain mb-8 z-10"
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{
            scale: [0.9, 1.05, 0.9],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      )}

      {/* 🧱 Barra di stampa 3D */}
      <div className="relative w-64 h-3 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2a2a2a] z-10 shadow-[0_0_20px_rgba(138,174,174,0.2)]">
        {/* Strato stampato */}
        <motion.div
          className="absolute bottom-0 left-0 h-full rounded-full"
          style={{
            background:
              "linear-gradient(180deg, #A4C7C7 0%, #8AAEAE 40%, #4B6E6E 100%)",
            boxShadow:
              "0 0 20px rgba(138,174,174,0.6), inset 0 0 10px rgba(255,255,255,0.08)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Testina di stampa 3D */}
        <motion.div
          className="absolute top-0 h-[2px] bg-[#CFEAEA] shadow-[0_0_10px_#8AAEAE]"
          initial={{ left: "0%" }}
          animate={{
            left: ["0%", "90%", "0%"],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
