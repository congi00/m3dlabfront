"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LanguageContext } from "./LanguageContext";
import Link from "next/link";

const ProductsSection = ({
  stampa_image,
  incisioni_image,
  lavorazioni_image,
  cad_text,
  cad_image,
  stampa_text,
  lavorazioni_text,
  incisioni_text,
  en_cad_text,
  en_stampa_text,
  en_lavorazioni_text,
  en_incisioni_text,
}) => {
  const products = [
    {
      id: 1,
      title: stampa_text,
      en_title: en_stampa_text,
      image: stampa_image.url,
      url: "/servizi/stampa-3d",
    },
    {
      id: 2,
      title: lavorazioni_text,
      en_title: en_lavorazioni_text,
      image: incisioni_image?.url,
      url: "/servizi/lavorazioni-cnc",
    },
    {
      id: 3,
      title: incisioni_text,
      en_title: en_incisioni_text,
      image: lavorazioni_image?.url,
      url: "/servizi/lavorazioni-laser",
    },
    {
      id: 4,
      title: cad_text,
      en_title: en_cad_text,
      image: cad_image?.url,
      url: "/servizi/cad",
    },
  ];

  console.log("ProductsSection props:", {
    cad_text,
    cad_image,
    stampa_image,
    incisioni_image,
    lavorazioni_image,
  });

  return (
    <section
      className="bg-cover bg-center bg-no-repeat relative pt-8 pb-8 pl-1 pr-1"
      style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
    >
      <div className="container mx-auto md:ml-5 md:mr-5 flex flex-col md:flex-row gap-[1rem] justify-center">
        {products.map((product, index) => (
          <AnimatedBox key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

const AnimatedBox = ({ product }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768); // 768px = breakpoint "md"
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const { language } = useContext(LanguageContext);

  return (
    <motion.div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      style={{
        height: "600px",
        ...(isDesktop && { width: "48%", minWidth: "25%" }), // ✅ solo desktop/tablet
      }}
    >
      <Link href={product.url}>
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://m3dlab-production.up.railway.app${product.image})`,
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.1 }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end justify-center p-6 hover:from-black/50 hover:to-black/10 transition-all duration-300">
          <h3 className="text-white text-3xl font-bold text-center drop-shadow-2xl">
            {language === "it"
              ? product.title?.toUpperCase()
              : product.en_title?.toUpperCase()}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductsSection;
