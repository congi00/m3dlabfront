import React from "react";
import QuoteCalculator from "@/components/QuoteCalculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";

export default async function QuotePage() {
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

  const { data } = await res.json();
  const homepage = data;
  const header = homepage.section?.find(
    (s) => s.__component === "shared.header"
  );
  const footer = homepage.section?.find(
    (s) => s.__component === "shared.footer"
  );

  return (
    <LanguageProvider>
      <div className="min-h-screen p-8">
        <Header data={header} />
        <QuoteCalculator />
      </div>
      <footer>
        <Footer
          logo={footer.logo}
          sedeOperativa={footer.sedeOperativa}
          sedeLegale={footer.sedeLegale}
          pIva={footer.pIva}
          telefono={footer.telefono}
          email={footer.email}
          social={{ instagram: footer.instagram }}
          linkUtili={footer.linkUtili} // [{label: 'Privacy', url:'/privacy'}]
          linkServizi={footer.linkServizi} // [{label:'STAMPA 3D', url:'/stampa-3d'}]
        />
      </footer>
    </LanguageProvider>
  );
}
