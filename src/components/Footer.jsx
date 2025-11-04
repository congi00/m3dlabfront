"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaInstagram } from "react-icons/fa";

const Footer = ({
  logo,
  sedeOperativa,
  sedeLegale,
  pIva,
  telefono,
  email,
  social = [],
  linkUtili = [],
  linkServizi = []
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{ marginTop: "20px", backgroundColor: "#ffffff10" }}
      ref={ref}
    >
      <motion.div
        className="container mx-auto grid md:grid-cols-4 gap-8"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="flex flex-col gap-4">
          {logo && (
            <img
              src={`https://m3dlab.onrender.com${logo.url}`}
              alt={logo.alternativeText || "Logo"}
              className="w-64 object-contain"
            />
          )}
          <p className="text-gray-400 text-sm">Designed by Alessandro Congiusti <br></br>&copy; {new Date().getFullYear()}</p>
        </div>

        {/* Contatti */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-lg">Contatti</h4>
          {sedeOperativa && <p>Sede Operativa: {sedeOperativa}</p>}
          {sedeLegale && <p>Sede Legale: {sedeLegale}</p>}
          {pIva && <p>P.IVA: {pIva}</p>}
          {telefono && <p>Tel: {telefono}</p>}
          {email && <p>Email: <a href={`mailto:${email}`} className="underline">{email}</a></p>}
          {social.instagram && (
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-2 hover:text-pink-500 transition">
              <FaInstagram /> Instagram
            </a>
          )}
        </div>

        {/* Link utili */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-lg">Link Utili</h4>
          {linkUtili.map((link, idx) => (
            <a key={idx} href={link.url} className="hover:text-gray-300 transition">{link.label}</a>
          ))}
        </div>

        {/* Servizi */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-lg">Servizi</h4>
          {linkServizi.map((link, idx) => (
            <a key={idx} href={link.url} className="hover:text-gray-300 transition">{link.label}</a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
