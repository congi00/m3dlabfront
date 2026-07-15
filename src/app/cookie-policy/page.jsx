import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageContext";
import { siteContent } from "@/lib/content";

export default async function CookiePolicyPage() {
  const header = siteContent.header;
  const footer = siteContent.footer;

  return (
    <LanguageProvider>
      <Header data={header} />
      <main className="max-w-4xl mx-auto px-6 py-[10rem] pb-[17rem]">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="mb-4">
          Il sito utilizza esclusivamente cookie tecnici strettamente necessari al funzionamento della piattaforma. 
          Non raccogliamo dati per profilazione o pubblicità.
        </p>
        <p>
          Questi cookie servono per mantenere le preferenze dell’utente e garantire la corretta funzionalità del sito, 
          come la gestione delle sessioni o la lingua selezionata.
        </p>
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
    </LanguageProvider>
  );
}
