"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


const InfoChoiceSection = ({ bg_image_section, option1, option2, option3 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const placeholders = [
    { icon: "/placeholder1.png", text: option1 },
    { icon: "/placeholder2.png", text: option2 },
    { icon: "/placeholder3.png", text: option3 },
  ];

  // Cambia selezione ogni 3 secondi
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % placeholders.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative"
      style={{
        marginTop: "200px",
        backgroundImage: `url(https://m3dlab-production.up.railway.app${bg_image_section.url})`,
        height: "675px",
        zIndex: "-1"
      }}
    >
      <div className="container mx-auto h-full relative flex flex-col md:flex-row">
        <div className="md:w-1/2"></div>

        {/* DIV in alto a destra */}
        <div className="absolute top-8 right-8 flex flex-col items-end gap-4">
          {/* Icone allineate orizzontalmente */}
          <div className="flex gap-6 items-center">
            {placeholders.map((item, index) => (
              <motion.img
                key={index}
                src={item.icon}
                alt={`Icon ${index + 1}`}
                className="w-12 h-12 rounded-full border-2 border-gray-400 cursor-pointer"
                onClick={() => setActiveIndex(index)}
                animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            ))}
          </div>

          {/* Testo sotto tutte le icone */}
          <AnimatePresence mode="wait">
            <motion.div
              key={placeholders[activeIndex].text}
              initial={{ opacity: 0, y: 20, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95, rotate: 2 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-white text-right text-lg font-bold mt-4"
              style={{width: "400px"}}
            >
              {placeholders[activeIndex].text}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div id="services" style={{position: "relative", bottom:"200px"}}></div>
    </section>
  );
};

export default InfoChoiceSection;
