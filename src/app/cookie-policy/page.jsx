"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";

export default function CookiePolicyPage() {
  const [homepage, setHomepage] = useState(null);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Fetch dati homepage
  useEffect(() => {
    const fetchHomepage = async () => {
      const base = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      const res = await fetch(
        `${base}/api/homepage?populate[section][populate]=*`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          cache: "no-store",
        }
      );
      const json = await res.json();
      setHomepage(json.data);
    };
    fetchHomepage();
  }, []);

  // Controllo cookie
  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (accepted === "true") setCookiesAccepted(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setCookiesAccepted(true);
  };

  if (!homepage) return <div className="text-center py-24">Loading...</div>;

  const header = homepage.section?.find((s) => s.__component === "shared.header");
  const footer = homepage.section?.find((s) => s.__component === "shared.footer");

  return (
    <>
      <Header data={header} />
      <main className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="mb-4">
          Il sito utilizza cookie tecnici strettamente necessari al
          funzionamento della piattaforma. Non raccogliamo cookie di
          profilazione o pubblicitari.
        </p>

        {!cookiesAccepted && (
          <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <span>Accetti l’utilizzo dei cookie tecnici necessari?</span>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 bg-teal-600 rounded hover:bg-teal-700 transition"
            >
              Accetta
            </button>
          </div>
        )}
      </main>
      <Footer
        logo={footer.logo}
        sedeOperativa={footer.sedeOperativa}
        sedeLegale={footer.sedeLegale}
        pIva={footer.pIva}
        telefono={footer.telefono}
        email={footer.email}
        social={{ instagram: footer.instagram }}
        linkUtili={footer.linkUtili}
        linkServizi={footer.linkServizi}
      />
    </>
  );
}
