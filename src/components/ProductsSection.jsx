"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Divider from "./Divider";

const ProductsSection = ({
  stampa_image,
  incisioni_image,
  lavorazioni_image,
  stampa_text,
  lavorazioni_text,
  incisioni_text,
}) => {
  const products = [
    {
      id: 1,
      title: stampa_text,
      image: stampa_image.url,
      url: "/servizi/stampa-3d",
    },
    {
      id: 2,
      title: lavorazioni_text,
      image: incisioni_image?.url,
      url: "/servizi/lavorazioni-cnc",
    },
    {
      id: 3,
      title: incisioni_text,
      image: lavorazioni_image?.url,
      url: "/servizi/lavorazioni-laser",
    },
  ];

  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative pt-8 pb-16"
      style={{ marginTop: "20px" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row gap-6 justify-center">
        {products.map((product, index) => (
          <AnimatedBox key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

// Componente per il singolo box animato con hover effect
const AnimatedBox = ({ product, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg cursor-pointer"
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      style={{ height: "600px" }}
      onClick={() => window.open(product.url)}
    >
      {/* Sfondo immagine con zoom on hover */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://m3dlab-production.up.railway.app${product.image})`,
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.1 }}
      />

      {/* Overlay scuro leggermente sfumato verso il basso */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end justify-center p-6 hover:from-black/50 hover:to-black/10 transition-all duration-300">
        <h3 className="text-white text-3xl font-bold text-center drop-shadow-2xl">
          {product.title.toUpperCase()}
        </h3>
      </div>
    </motion.div>
  );
};

export default ProductsSection;
