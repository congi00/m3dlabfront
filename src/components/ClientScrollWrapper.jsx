"use client";

import { useEffect } from "react";

export default function ClientScrollWrapper({ children }) {
  useEffect(() => {
    // Scroll automatico se l'URL contiene un hash (#services)
    if (window.location.hash === "#services") {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 1000);
      }
    }

    // Scroll fluido su click dei link con "#"
    const handleClick = (e) => {
      const href = e.target.closest("a")?.getAttribute("href");
      if (href && href.startsWith("/#")) {
        e.preventDefault();
        const id = href.split("#")[1];
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <>{children}</>;
}
