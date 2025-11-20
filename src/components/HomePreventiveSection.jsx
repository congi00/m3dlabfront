"use client";

import Image from "next/image";
import OBJViewer from "./OBJViewer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Loader3D from "./Loader3D";
import { LanguageContext } from "./LanguageContext";

const HomePreventiveSection = ({
  renderImage,
  title,
  subtitle,
  buttonText,
  secondTitle,
  secondSubtitle,
  en_title,
  en_subtitle,
  en_buttonText,
  en_secondTitle,
  en_secondSubtitle,
  logo,
}) => {
  const { language } = useContext(LanguageContext);

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const items = language === 'it' ? secondSubtitle
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "") : en_secondSubtitle
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  const modelUrl = `https://m3dlab-production.up.railway.app${renderImage.url}`;

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="mt-16 md:mt-32 relative overflow-visible pb-8 md:pb-16">
      <div className="absolute inset-0 -z-10 md:hidden overflow-visible">
        <OBJViewer modelUrl={modelUrl} logo={logo} setLoaded={setLoaded} loaded={loaded} progress={progress} setProgress={setProgress}/>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      </div>

      <div className="mt-8 md:mt-0 container mx-auto flex flex-col md:flex-row gap-8 relative z-10 pb-16 md:pb-0">
        <div className="md:w-1/2 space-y-4 pt-24 text-center md:text-left">
          <motion.h2
            className="text-4xl md:text-5xl font-bold px-3 md:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {String(language === 'it' ? title : en_title).toUpperCase()}
          </motion.h2>

          <motion.p
            className="mt-8 md:mt-0 text-white font-light text-lg md:text-xl pb-4 px-3 md:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            {language === 'it' ? subtitle : en_subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <Link href="/quote">
              <button className="px-6 py-3 text-white rounded-lg transition">
                {language === 'it' ? buttonText : en_buttonText}
              </button>
            </Link>
          </motion.div>

          <motion.h3
            className="text-2xl font-light mt-4 md:mt-6 pb-5 pt-8 md:pt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          >
            {String(language === 'it' ? secondTitle : en_secondTitle).toUpperCase()}
          </motion.h3>

          <div className="flex flex-col gap-2 md:gap-4">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 justify-center md:justify-start"
              >
                {row.map((item, colIndex) => (
                  <motion.div
                    key={colIndex}
                    className="flex text-white justify-center md:justify-start"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    transition={{
                      duration: 0.4,
                      delay: 0.35 + colIndex * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <span className="mr-2"></span> {item}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden overflow-visible md:block md:w-1/2 rounded-lg shadow-lg">
          <OBJViewer modelUrl={modelUrl} logo={logo} setLoaded={setLoaded} loaded={loaded} progress={progress} setProgress={setProgress} set/>
        </div>
      </div>
      {!loaded && <Loader3D logoUrl={`https://m3dlab-production.up.railway.app${logo.url}`} progress={progress} />}
    </section>
  );
};

export default HomePreventiveSection;
