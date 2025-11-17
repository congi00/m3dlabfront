"use client";

import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "./LanguageContext";

const InfoChoiceSection = ({ bg_image_section, option1, option2, option3, en_option1, en_option2, en_option3 }) => {
  const [bgPosY, setBgPosY] = useState("-50px"); // default desktop
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 1024;
      setIsMobileOrTablet(isSmall);
      setBgPosY(isSmall ? "-340px" : "-50px");
    };

    handleResize(); // controllo iniziale
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const placeholders = [
    { icon: "/placeholder1.png", text: language === 'it' ? option1 : en_option1 },
    { icon: "/placeholder2.png", text: language === 'it' ? option2 : en_option2 },
    { icon: "/placeholder3.png", text: language === 'it' ? option3 : en_option3 },
  ];

  // Varianti animazioni
  const fadeVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.3, ease: "easeOut" },
    }),
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative mb-8 mt-0 md:mt-[50px] pt-[300px] md:pt-0"
      style={{
        backgroundImage: `url(https://m3dlab-production.up.railway.app${bg_image_section.url})`,
        height: "675px",
        zIndex: "-1",
        backgroundPositionY: bgPosY,
        transition: "background-position 0.5s ease-in-out",
      }}
    >
      <div
        className="container mx-auto h-full relative flex flex-col md:flex-row justify-end"
        style={{ height: "100%", minHeight: "675px" }}
      >
        {/* CONTENITORE ICONE + TESTI */}
        <motion.div
          className="absolute top-8 right-8 flex flex-col md:flex-row gap-10 md:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: isMobileOrTablet ? true : false, // 👈 su mobile/tablet: animazione solo una volta
            amount: 0.2,
          }}
          variants={fadeVariant}
        >
          {placeholders.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center md:items-center md:text-center gap-4"
              variants={fadeVariant}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: isMobileOrTablet ? true : false, // 👈 animazione unica solo su mobile/tablet
                amount: 0.3,
              }}
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
                variants={fadeVariant}
                custom={index + 0.3}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: isMobileOrTablet ? true : false, // 👈 una sola volta su mobile/tablet
                  amount: 0.3,
                }}
                className="text-white text-base md:text-lg font-bold leading-snug"
                style={{ maxWidth: "300px" }}
              >
                {item.text}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Anchor per sezione successiva */}
      <div id="services" style={{ position: "relative", bottom: "200px" }}></div>

      {/* Altezza responsive extra per mobile/tablet */}
      <style jsx>{`
        @media (max-width: 1024px) {
          section {
            height: 850px !important;
          }
        }
        @media (max-width: 640px) {
          section {
            height: 950px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default InfoChoiceSection;
