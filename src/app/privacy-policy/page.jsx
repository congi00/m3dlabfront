import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function PrivacyPolicyPage() {
  // Fetch server-side
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

  const header = homepage.section?.find(
    (s) => s.__component === "shared.header"
  );
  const footer = homepage.section?.find(
    (s) => s.__component === "shared.footer"
  );

  return (
    <>
      <Header data={header} />
      <main className="max-w-4xl mx-auto px-6 py-[10rem] pb-[13rem]">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          La presente informativa descrive come raccogliamo e utilizziamo i dati
          personali dei nostri utenti. Il sito immagazzina solo dati relativi a:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Scelta della lingua</li>
          <li>Immagine caricata nel preventivo</li>
          <li>Email e numero di telefono forniti dall’utente</li>
        </ul>
        <p className="mb-4">
          I dati sono utilizzati esclusivamente per fornire i servizi richiesti
          dall’utente e non vengono condivisi con terze parti senza il consenso
          esplicito.
        </p>
        <p>
          L’utente può richiedere la cancellazione dei propri dati contattando
          il nostro supporto all’indirizzo email indicato sul sito.
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
