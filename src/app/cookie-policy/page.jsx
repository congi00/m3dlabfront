import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Server Component
export default async function CookiePolicyPage() {
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const res = await fetch(
    `${base}/api/homepage?populate[section][populate]=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // sicuro lato server
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Errore fetch homepage: ${res.status}`);
  }

  const { data: homepage } = await res.json();
  const header = homepage.section?.find((s) => s.__component === "shared.header");
  const footer = homepage.section?.find((s) => s.__component === "shared.footer");

  return (
    <>
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
    </>
  );
}
