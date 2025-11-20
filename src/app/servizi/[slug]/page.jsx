import Header from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageContext";
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
        en_title: "3D Printing",
        text: `La stampa 3D è la tecnologia ideale per trasformare un modello digitale in un oggetto reale in tempi rapidi. Permette di creare prototipi funzionali, parti meccaniche, design complessi e pezzi unici, con una grande libertà di personalizzazione.\n\nTecnologie disponibili:\n - FDM (Fused Deposition Modeling) – ideale per prototipi rapidi e funzionali, realizzati con una vasta gamma di materiali plastici.\n- SLA (Stereolitografia) – perfetta per modelli ad alta precisione, dettagliati e con finiture superficiali di qualità.\n\n`,
        en_text: `3D printing is the ideal technology to transform a digital model into a real object quickly. It allows the creation of functional prototypes, mechanical parts, complex designs, and unique pieces with a high level of customization.\n\nAvailable technologies:\n - FDM (Fused Deposition Modeling) – ideal for fast and functional prototypes made with a wide range of plastic materials.\n- SLA (Stereolithography) – perfect for high-precision models with detailed surfaces and quality finishes.\n\n`,
        images: gallery.stampa,
      },
      {
        title: "Post Produzione",
        en_title: "Post Production",
        text: `Offriamo trattamenti di levigatura, verniciatura e rifinitura per ottenere un risultato estetico e funzionale di livello professionale.`,
        en_text: `We offer polishing, painting, and finishing treatments to achieve professional-level aesthetic and functional results.`,
        images: gallery.post,
      },
    ],
    "lavorazioni-cnc": [
      {
        title: "Lavorazioni CNC",
        en_title: "CNC Machining",
        text: `La fresatura CNC consente la realizzazione di pezzi precisi e ripetitivi, partendo da blocchi di materiale grezzo.\n È la soluzione ideale per prototipi meccanici, componenti funzionali e produzioni personalizzate.\n
  Tecnologia disponibile:
  - Lavorazioni su 3 assi – permettono di ottenere componenti accurati in diversi materiali (alluminio, plastica, legno, ecc.), garantendo solidità e affidabilità anche nei dettagli più complessi.`,
        en_text: `CNC milling allows the production of precise and repeatable parts starting from raw material blocks.\n It is the ideal solution for mechanical prototypes, functional components, and custom production.\n
  Available technology:
  - 3-axis machining – allows obtaining accurate components in various materials (aluminum, plastic, wood, etc.), ensuring strength and reliability even in the most complex details.`,
        images: gallery.lavorazioni,
      },
    ],
    "lavorazioni-laser": [
      {
        title: "Lavorazioni Laser",
        en_title: "Laser Processing",
        text: `Le lavorazioni laser permettono di incidere, tagliare o marcare con estrema precisione una grande varietà di materiali, offrendo risultati rapidi e versatili.\n\nTecnologie disponibili:\n
  - Laser a diodo – adatto per incisioni su legno, plastiche e materiali morbidi.
  - Laser CO₂ – ideale per taglio e incisione su legno, plexiglass, tessuti e molti altri materiali organici.
  - Laser a fibra – perfetto per marcature e incisioni su metalli con elevata precisione e durata.`,
        en_text: `Laser processing allows engraving, cutting, or marking a wide variety of materials with extreme precision, providing fast and versatile results.\n\nAvailable technologies:\n
  - Diode laser – suitable for engraving on wood, plastics, and soft materials.
  - CO₂ laser – ideal for cutting and engraving wood, plexiglass, fabrics, and many other organic materials.
  - Fiber laser – perfect for marking and engraving metals with high precision and durability.`,
        images: gallery.incisione,
      },
    ],
    "cad": [
      {
        title: "Modellazione CAD",
        en_title: "CAD Modeling",
        text: `Il disegno CAD è il punto di partenza di ogni progetto. \nGrazie alla competenza su diversi software di modellazione 3D, realizziamo file precisi e pronti per la produzione, garantendo compatibilità con le tecnologie di fabbricazione digitale.\n
  Servizi offerti:
  - Modellazione 3D di prototipi, parti meccaniche e oggetti di design.
  - Conversione di idee, schizzi o progetti in file digitali pronti alla lavorazione.
  - Ottimizzazione di modelli per stampa 3D, CNC e laser.`,
        en_text: `CAD design is the starting point of every project.\nThanks to expertise in various 3D modeling software, we create precise files ready for production, ensuring compatibility with digital fabrication technologies.\n
  Offered services:
  - 3D modeling of prototypes, mechanical parts, and design objects.
  - Conversion of ideas, sketches, or projects into digital files ready for processing.
  - Optimization of models for 3D printing, CNC, and laser.`,
        images: gallery.disegno,
      },
      {
        title: "Scansione 3D",
        en_title: "3D Scanning",
        text: `La scansione 3D consente di acquisire con precisione la geometria di un oggetto reale e trasformarla in un modello digitale.\n È uno strumento indispensabile per reverse engineering, controllo dimensionale e riproduzione fedele di componenti esistenti.\n
  Servizi offerti:
  - Digitalizzazione di oggetti e componenti con elevata accuratezza.
  - Creazione di modelli 3D pronti per stampa, modifica o analisi.
  - Supporto a restauri, repliche e adattamenti di parti difficilmente reperibili.`,
        en_text: `3D scanning allows you to precisely capture the geometry of a real object and transform it into a digital model.\n It is an essential tool for reverse engineering, dimensional control, and faithful reproduction of existing components.\n
  Offered services:
  - Digitalization of objects and components with high accuracy.
  - Creation of 3D models ready for printing, modification, or analysis.
  - Support for restorations, replicas, and adaptation of hard-to-find parts.`,
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
    <LanguageProvider>
      <Header data={header} />
      <ServicePage
        titles={servizio.map((s) => s.title)}
        en_titles={servizio.map((s) => s.en_title)}
        texts={servizio.map((s) => s.text)}
        en_texts={servizio.map((s) => s.en_text)}
        images={servizio.map((s) => s.images)}
      />
    </LanguageProvider>
  );
}
