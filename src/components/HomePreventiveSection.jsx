"use client";

import Image from "next/image";
import OBJViewer from "./OBJViewer";
import Link from "next/link";
import { motion } from "framer-motion";

const HomePreventiveSection = ({
  renderImage,
  title,
  subtitle,
  buttonText,
  secondTitle,
  secondSubtitle,
  logo,
}) => {
  const items = secondSubtitle
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
    <section className="relative mt-32 overflow-hidden">
      {/* OBJViewer come sfondo (solo mobile/tablet) */}
      <div className="absolute inset-0 -z-10 md:static md:z-auto md:w-1/2 md:h-auto">
        <div className="w-full h-full">
          <OBJViewer modelUrl={modelUrl} logo={logo} />
        </div>

        {/* overlay leggera per migliorare leggibilità testo */}
        <div className="absolute inset-0 bg-black/40 md:hidden" />
      </div>

      <div className="container mx-auto flex flex-col md:flex-row gap-8 relative z-10">
        <div
          className="
            md:w-1/2 space-y-4 pt-24 
            text-center md:text-left
            flex flex-col justify-center
          "
        >
          <motion.h2
            className="text-5xl font-bold"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {String(title).toUpperCase()}
          </motion.h2>

          <motion.p
            className="text-white font-light text-xl pb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center md:justify-start"
          >
            <Link href="/quote">
              <button className="px-6 py-3 text-white rounded-lg transition bg-[#8AAEAE] hover:bg-[#769999]">
                {buttonText}
              </button>
            </Link>
          </motion.div>

          <motion.h3
            className="text-2xl font-light mt-6 pb-5 pt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
          >
            {String(secondTitle).toUpperCase()}
          </motion.h3>

          <div className="flex flex-col gap-4">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:text-left text-center"
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
                      ease: 'easeOut',
                    }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* OBJViewer — visibile a destra solo su desktop */}
        <div className="hidden md:block md:w-1/2 rounded-lg shadow-lg">
          <OBJViewer modelUrl={modelUrl} logo={logo} />
        </div>
      </div>
    </section>
  );
};

export default HomePreventiveSection;
