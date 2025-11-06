"use client";

import React from "react";
import { motion } from "framer-motion";

const InfoChoiceSection = ({ bg_image_section, option1, option2, option3 }) => {
  const placeholders = [
    { icon: "/placeholder1.png", text: option1 },
    { icon: "/placeholder2.png", text: option2 },
    { icon: "/placeholder3.png", text: option3 },
  ];

  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative mb-8"
      style={{
        marginTop: "50px",
        backgroundImage: `url(https://m3dlab-production.up.railway.app${bg_image_section.url})`,
        height: "675px",
        zIndex: "-1",
        backgroundPositionY: "-50px"
      }}
    >
      <div className="container mx-auto h-full relative flex flex-col md:flex-row justify-end">
        {/* CONTENITORE ICONE + TESTI */}
        <motion.div
          className="absolute top-8 right-8 flex flex-col md:flex-row gap-10 md:gap-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {placeholders.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center md:items-center md:text-center gap-4"
            >
              {/* Icona animata */}
              <motion.img
                src={item.icon}
                alt={`Icon ${index + 1}`}
                className="rounded-full"
                whileHover={{
                  scale: 1.2,
                  rotateY: 15,
                  boxShadow:
                    "0px 0px 20px rgba(138, 174, 174, 0.8), 0px 0px 30px rgba(138, 174, 174, 0.4)",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  width: "80px",
                  height: "80px",
                  border: "none",
                  objectFit: "cover",
                  transformStyle: "preserve-3d",
                  cursor: "pointer",
                }}
              />

              {/* Testo sotto icona */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="text-white text-base md:text-lg font-bold leading-snug"
                style={{ maxWidth: "300px" }}
              >
                {item.text}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Anchor per sezione successiva */}
      <div id="services" style={{ position: "relative", bottom: "200px" }}></div>
    </section>
  );
};

export default InfoChoiceSection;
