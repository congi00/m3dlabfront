"use client";

import LanguageToggle from "./LanguageToggle";
import { usePathname } from "next/navigation";

export default function Header({ data }) {
  if (!data) return null;

  const { logo, language, HeaderItems } = data;
  const lang = language ? "IT" : "EN";
  const pathname = usePathname(); 

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
      className="fixed top-0 left-0 h-28 w-full z-50 flex items-center justify-between py-4 shadow-md"
      style={{backgroundColor: "#000000E0"}}
    >
      
      {/* LOGO */}
      <div className="flex items-center gap-2 pb-3">
        {logo?.url && (
          <img
            src={
              logo.url.startsWith("http")
                ? logo.url
                : `https://m3dlab-production.up.railway.app${logo.url}`
            }
            alt="Logo"
            onClick={(e) => handleClick(e, "/")}
            className="w-[180px] h-auto
              sm:w-[200px]
              md:w-[240px]
              lg:w-[300px]
              object-contain
              transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      <div className="flex mr-10">
        {/* NAV MENU */}
        <nav>
          <ul className="flex gap-8">
            {HeaderItems?.map((item, idx) => (
              <li key={idx}>
                <a href={item.Url} className="transition-colors text-xl" onClick={(e) => handleClick(e, item.Url)}>
                  {item.Label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageToggle initialLanguage={lang} />
      </div>
    </header>
  );
}
