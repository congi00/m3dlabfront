import Header from "@/components/Header";
import ServicePage from "@/components/ServicePage";

export default async function ServiceSlugPage({ params }) {
  const { slug } = params;
  

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
  const gallery = homepage.section?.find(
    (s) => s.__component === "shared.stampa-gallery"
  );

  const serviziData = {
    "stampa-3d": [
      {
        title: "Stampa 3D",
        text: `La stampa 3D è la tecnologia ideale per trasformare un modello digitale in un oggetto reale in tempi rapidi. Permette di creare prototipi funzionali, parti meccaniche, design complessi e pezzi unici, con una grande libertà di personalizzazione.\n\nTecnologie disponibili:\n - FDM (Fused Deposition Modeling) – ideale per prototipi rapidi e funzionali, realizzati con una vasta gamma di materiali plastici.\n- SLA (Stereolitografia) – perfetta per modelli ad alta precisione, dettagliati e con finiture superficiali di qualità.\n\n`,
        images: gallery.stampa,
      },
      {
        title: "Post Produzione",
        text: `Offriamo trattamenti di levigatura, verniciatura e rifinitura per ottenere un risultato estetico e funzionale di livello professionale.`,
        images: gallery.post,
      },
    ],
    "lavorazioni-cnc": [
      {
        title: "Lavorazioni CNC",
        text: `La fresatura CNC consente la realizzazione di pezzi precisi e ripetitivi, partendo da blocchi di materiale grezzo.\n È la soluzione ideale per prototipi meccanici, componenti funzionali e produzioni personalizzate.\n
      Tecnologia disponibile:
      - Lavorazioni su 3 assi – permettono di ottenere componenti accurati in diversi materiali (alluminio, plastica, legno, ecc.), garantendo solidità e affidabilità anche nei dettagli più complessi.`,
        images: gallery.lavorazioni,
      },
    ],
    "lavorazioni-laser": [
      {
        title: "Lavorazioni Laser",
        text: `Le lavorazioni laser permettono di incidere, tagliare o marcare con estrema precisione una grande varietà di materiali, offrendo risultati rapidi e versatili.\n\nTecnologie disponibili:\n
      - Laser a diodo – adatto per incisioni su legno, plastiche e materiali morbidi.
      - Laser CO₂ – ideale per taglio e incisione su legno, plexiglass, tessuti e molti altri materiali organici.
      - Laser a fibra – perfetto per marcature e incisioni su metalli con elevata precisione e durata.`,
        images: gallery.incisione,
      },
    ],
    "cad": [
      {
        title: "Disegno CAD",
        text: `Il disegno CAD è il punto di partenza di ogni progetto. \nGrazie alla competenza su diversi software di modellazione 3D, realizziamo file precisi e pronti per la produzione, garantendo compatibilità con le tecnologie di fabbricazione digitale.\n
        Servizi offerti:
        - Modellazione 3D di prototipi, parti meccaniche e oggetti di design.
        - Conversione di idee, schizzi o progetti in file digitali pronti alla lavorazione.
        - Ottimizzazione di modelli per stampa 3D, CNC e laser.`,
        images: gallery.disegno,
      },{
        title: "Scansione 3D",
        text: `La scansione 3D consente di acquisire con precisione la geometria di un oggetto reale e trasformarla in un modello digitale.\n È uno strumento indispensabile per reverse engineering, controllo dimensionale e riproduzione fedele di componenti esistenti.\n
      Servizi offerti:
      - Digitalizzazione di oggetti e componenti con elevata accuratezza.
      - Creazione di modelli 3D pronti per stampa, modifica o analisi.
      - Supporto a restauri, repliche e adattamenti di parti difficilmente reperibili.`,
        images: gallery.scansioni,
      },
    ],
  };

  const servizio = serviziData[slug];


  if (!servizio) {
    return (
      <div className="py-24 text-center text-gray-500">
        Servizio non trovato.
      </div>
    );
  }

  return (
    <>
      <Header data={header} />
      <ServicePage
        titles={servizio.map((s) => s.title)}
        texts={servizio.map((s) => s.text)}
        images={servizio.map((s) => s.images)} // array di array, come richiesto dal componente
      />
    </>
  );
}
