"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaInstagram } from "react-icons/fa";
import { LanguageContext } from "./LanguageContext";

const Footer = ({
  logo,
  sedeOperativa,
  sedeLegale,
  pIva,
  telefono,
  email,
  social = {},
  linkUtili = [],
  linkServizi = [],
}) => {
  const { language } = useContext(LanguageContext);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const texts = {
    en: {
      services: "Services",
      usefulLinks: "Useful Links",
      contacts: "Contacts",
      operationalHQ: "Operational HQ",
      legalHQ: "Legal HQ",
      vat: "VAT",
      tel: "Tel",
      email: "Email",
      social: "Social",
    },
    it: {
      services: "Servizi",
      usefulLinks: "Link Utili",
      contacts: "Contatti",
      operationalHQ: "Sede Operativa",
      legalHQ: "Sede Legale",
      vat: "P.IVA",
      tel: "Tel",
      email: "Email",
      social: "Social",
    },
  };

  const lang = language === "en" ? texts.en : texts.it;

  return (
    <footer
      className="relative py-12 px-6 pb-2 md:px-16 bg-[#111111] text-white overflow-hidden"
      ref={ref}
      id="contacts"
    >
      <motion.div
        className="container mx-auto flex flex-col md:flex-row md:justify-between gap-12 md:gap-8"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center md:items-end gap-4">
          {logo && (
            <img
              src={`https://m3dlab-production.up.railway.app${logo.url}`}
              alt={logo.alternativeText || "Logo"}
              className="w-40 md:w-56 object-contain"
            />
          )}
        </div>

        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h4 className="font-bold text-lg mb-2" style={{ color: "#8AAEAE" }}>
            {lang.services}
          </h4>
          {linkServizi.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              className="hover:text-gray-300 transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h4 className="font-bold text-lg mb-2" style={{ color: "#8AAEAE" }}>
            {lang.usefulLinks}
          </h4>
          {linkUtili.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              className="hover:text-gray-300 transition"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h4 className="font-bold text-lg mb-2" style={{ color: "#8AAEAE" }}>
            {lang.contacts}
          </h4>

          {sedeOperativa && (
            <p>
              {lang.operationalHQ}:{" "}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  sedeOperativa
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300 transition"
              >
                {sedeOperativa}
              </a>
            </p>
          )}

          {sedeLegale && (
            <p>
              {lang.legalHQ}:{" "}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  sedeLegale
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300 transition"
              >
                {sedeLegale}
              </a>
            </p>
          )}

          {pIva && <p>{lang.vat}: {pIva}</p>}

          {telefono && (
            <p>
              {lang.tel}:{" "}
              <a
                href={`tel:${telefono}`}
                className="underline hover:text-gray-300 transition"
              >
                {telefono}
              </a>
            </p>
          )}

          {email && (
            <p>
              {lang.email}:{" "}
              <a
                href={`mailto:${email}`}
                className="underline hover:text-gray-300 transition"
              >
                {email}
              </a>
            </p>
          )}
        </div>

        {social.instagram && (
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <h4 className="font-bold text-lg mb-2" style={{ color: "#8AAEAE" }}>
              {lang.social}
            </h4>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-500 transition"
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        )}
      </motion.div>

      <div className="border-t border-gray-700 pt-2 text-center mt-8 text-sm">
        Designed by Alessandro Congiusti &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
