"use client";
import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext({
  language: "it",
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("it");

  // Leggi la lingua da localStorage all'avvio
  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setLanguage(saved);
  }, []);

  // Aggiorna localStorage quando cambia la lingua
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
