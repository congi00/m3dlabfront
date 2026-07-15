import React from "react";
import QuoteCalculator from "@/components/QuoteCalculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { siteContent } from "@/lib/content";

export default async function QuotePage() {
  const header = siteContent.header;
  const footer = siteContent.footer;

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
          linkUtili={footer.linkUtili}
          linkServizi={footer.linkServizi} 
        />
      </footer>
    </LanguageProvider>
  );
}
