import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteContent } from "@/lib/content";

export default async function TermsOfUsePage() {
  const header = siteContent.header;
  const footer = siteContent.footer;

  return (
    <>
      <Header data={header} />
      <main className="max-w-4xl mx-auto px-6 py-[10rem] pb-[13rem]">
        <h1 className="text-4xl font-bold mb-6">Termini d'Uso</h1>
        <p className="mb-4">
          L’uso di questo sito implica l’accettazione dei seguenti termini:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            L’utente è responsabile dei dati forniti (email, telefono, immagine
            caricata, lingua scelta).
          </li>
          <li>
            I dati sono utilizzati esclusivamente per elaborare preventivi e
            fornire i servizi richiesti.
          </li>
          <li>
            È vietato utilizzare il sito per attività illegali o non
            autorizzate.
          </li>
        </ul>
        <p>
          Ci riserviamo il diritto di modificare questi termini in qualsiasi
          momento. Gli utenti saranno informati delle modifiche tramite
          aggiornamento della pagina.
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
    </>
  );
}
