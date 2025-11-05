"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WhoSection = ({ title, description, images = [] }) => {
  // Hook per animazioni on scroll
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Varianti d’animazione
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
      <div id="chi-siamo" style={{position:"relative", bottom:"200px"}}></div>
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 pt-0">
        {/* Testo */}
        <motion.div
          ref={ref}
          className="md:w-1/2 pr-20"
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-bold mb-6">{title.toUpperCase()}</h2>
          <p className="text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Galleria immagini */}
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
                  src={`https://m3dlab-production.up.railway.app/${img.url}`}
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
