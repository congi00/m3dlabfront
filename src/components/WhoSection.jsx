"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LanguageContext } from "./LanguageContext";

const WhoSection = ({ title, en_title, en_description, description, images = [] }) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const { language } = useContext(LanguageContext);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ marginTop: "20px" }}
    >
      <div id="chi-siamo" style={{ position: "relative", bottom: "200px" }}></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 pt-0">
        <motion.div
          ref={ref}
          className="md:w-1/2 pr-3 pl-3 md:pr-20 md:pl-0"
          style={
            isMobileOrTablet
              ? { textAlign: "center", margin: "0 auto" }
              : {}
          }
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-bold mb-6">{(language==='it' ? title : en_title).toUpperCase()}</h2>
          <p className="text-lg leading-relaxed">{language==='it' ? description : en_description}</p>
        </motion.div>

        <motion.div
          className="md:w-1/2 grid grid-cols-1 gap-4"
          variants={imageVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {images.length > 0 ? (
            images.map((img, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-2xl shadow-lg aspect-square"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={`https://m3dlab-production.up.railway.app${img.url}`}
                  alt={img.alternativeText || "Chi siamo"}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            ))
          ) : (
            <div className="text-gray-400 text-center col-span-2">
              Nessuna immagine disponibile
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoSection;
