"use client";

import { useState } from "react";
import LanguageToggle from "./LanguageToggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header({ data }) {
  if (!data) return null;

  const { logo, language, HeaderItems } = data;
  const lang = language ? "IT" : "EN";
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (e, url) => {
    if (url === "/" || url === "/#") {
      e.preventDefault();
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 h-28 w-full z-50 flex items-center justify-between py-4 shadow-md px-6 md:px-10"
      style={{ backgroundColor: "#000000E0" }}
    >
      {/* LOGO (desktop: sinistra / mobile: centrato) */}
      <div
        className="
          flex items-center gap-2 pb-3
          absolute left-1/2 -translate-x-1/2 md:static md:transform-none
        "
      >
        {logo?.url && (
          <img
            src={
              logo.url.startsWith("http")
                ? logo.url
                : `https://m3dlab-production.up.railway.app${logo.url}`
            }
            alt="Logo"
            onClick={(e) => handleClick(e, "/")}
            className="w-[180px] sm:w-[200px] md:w-[240px] lg:w-[300px] h-auto object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
          />
        )}
      </div>

      {/* MENU ICONA (solo mobile/tablet) */}
      <div className="flex md:hidden items-center z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-10 h-10 flex items-center justify-center focus:outline-none bg-transparent"
          style={{ borderRadius: "15px" }}
        >
          <motion.div
            initial={false}
            animate={menuOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            {menuOpen ? (
              <X size={28} className="text-[#8AAEAE]" />
            ) : (
              <Menu size={28} className="text-[#8AAEAE]" />
            )}
          </motion.div>
        </button>
      </div>

      {/* NAV + LANGUAGE (solo desktop) */}
      <div className="hidden md:flex items-center gap-10 ml-auto">
        <nav>
          <ul className="flex gap-8">
            {HeaderItems?.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.Url}
                  className="transition-colors text-xl"
                  onClick={(e) => handleClick(e, item.Url)}
                >
                  {item.Label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageToggle initialLanguage={lang} />
      </div>

      {/* MENU MOBILE ANIMATO */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-28 left-0 w-full bg-[#000000F2] backdrop-blur-xl border-t border-gray-700 md:hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-8 text-lg font-medium text-white">
              {HeaderItems?.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <a
                    href={item.Url}
                    onClick={(e) => {
                      handleClick(e, item.Url);
                      setMenuOpen(false);
                    }}
                    className="relative group"
                  >
                    {item.Label}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#8AAEAE] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
              ))}

              {/* LANGUAGE TOGGLE nel menu mobile — perfettamente centrato */}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (HeaderItems?.length || 1) }}
                className="flex justify-center w-full mt-4"
              >
                <div className="flex justify-center items-center">
                  <LanguageToggle initialLanguage={lang} />
                </div>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
