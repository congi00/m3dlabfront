"use client";
import { useState, useEffect } from "react";

export default function LanguageToggle({ initialLanguage = false }) {
  const [isEnglish, setIsEnglish] = useState(initialLanguage);

  // opzionale: salvare in localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setIsEnglish(savedLang === "en");
  }, []);

  useEffect(() => {
    localStorage.setItem("language", isEnglish ? "en" : "it");
  }, [isEnglish]);

  return (
    <button
      onClick={() => setIsEnglish(!isEnglish)}
      className="
        relative flex items-center self-start -mt-1 w-20 h-9
        bg-[#90AFB2] rounded-full transition-all duration-300 focus:outline-none
        ml-0 md:ml-20
      "
    >
      <div
        className={`absolute top-0.5 left-0.5 w-[calc(50%-0.25rem)] h-[calc(100%-0.25rem)] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isEnglish ? "translate-x-[calc(100%+0.25rem)]" : "translate-x-0"
        }`}
      />
      <span
        className={`flex-1 text-center font-bold text-sm transition-colors duration-300 ${
          !isEnglish ? "text-[#ffffff]" : "text-[#ffffff]"
        }`}
      >
        IT
      </span>
      <span
        className={`flex-1 text-center font-bold text-sm transition-colors duration-300 ${
          isEnglish ? "text-[#90AFB2]" : "text-[#ffffff]"
        }`}
      >
        EN
      </span>
    </button>
  );
}
