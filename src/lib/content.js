/**
 * Contenuto statico del sito, in precedenza servito da Strapi
 * (single type "homepage", dynamic zone "section").
 *
 * Questi dati sono stati estratti 1:1 dal database SQLite di produzione
 * (database/data.db, riga pubblicata entity_id=33) del backend Strapi,
 * così da mantenere il contenuto identico dopo la dismissione del CMS.
 *
 * Per modificare un testo o un'immagine del sito, modifica direttamente
 * questo file: non è più necessario un backend/CMS separato.
 *
 * NOTA SULLE IMMAGINI:
 * Le url sono relative alla cartella /public del frontend (es. "/uploads/xxx.jpg").
 * I file fisici vanno posizionati in `public/uploads/`.
 */

// URL pubblica dove sono raggiungibili i file caricati (immagini, modelli 3D, ecc).
// In precedenza puntava al backend Strapi (es. https://m3dlab-production.up.railway.app).
// Ora i file sono serviti direttamente dal frontend Next.js da /public/uploads,
// quindi il prefisso è vuoto (path relativo).
export const MEDIA_BASE_URL = "";

/**
 * Risolve l'url pubblico di un media.
 * In precedenza ogni componente concatenava a mano il dominio Strapi
 * (es. `https://m3dlab-production.up.railway.app${url}`). Ora usa questa
 * funzione, che aggiunge MEDIA_BASE_URL solo se necessario (permette anche
 * di passare url assoluti già completi, es. per media esterni).
 */
export function resolveMediaUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${MEDIA_BASE_URL}${url}`;
}

export const siteContent = {
  header: {
    logo: {
      url: "/uploads/logo_a6452aedcd.svg",
      alternativeText: "Logo 3DMLAB",
    },
    language: false,
    HeaderItems: [
      { Label: "HOME", en_Label: "HOME", Url: "/" },
      { Label: "SERVIZI", en_Label: "SERVICES", Url: "/#services" },
      { Label: "CHI SIAMO", en_Label: "ABOUT US", Url: "/#chi-siamo" },
      { Label: "CONTATTI", en_Label: "CONTACTS", Url: "/contacts" },
    ],
  },

  homePreventiveSection: {
    renderImage: {
      url: "/uploads/obj_7e928f1aa4.obj",
    },
    title: "Prototipi e prodotti su misura, senza compromessi",
    en_title: "Custom prototypes and products, without compromise",
    subtitle:
      "Aiutiamo privati e aziende a dare forma ai propri progetti, offrendo prototipi e lavorazioni su misura con la massima qualità e affidabilità.",
    en_subtitle:
      "We help individuals and businesses give shape to their projects, offering custom prototypes and machining with the highest quality and reliability.",
    buttonText: "CALCOLA PREVENTIVO GRATUITO",
    en_buttonText: "GET A FREE QUOTE",
    secondTitle: "Servizi di prototipazione e produzione personalizzata",
    en_secondTitle: "Prototyping and custom production services",
    secondSubtitle:
      "- Tecnologie avanzate per ogni fase del progetto\n- Dal disegno e modellazione 3D alla realizzazione finale\n- Qualità garantita e attenzione ai dettagli\n- Tempi certi di consegna e supporto costante",
    en_secondSubtitle:
      "- Advanced technologies for every stage of the project\n- From 3D design and modeling to final production\n- Guaranteed quality and attention to detail\n- Reliable delivery times and constant support",
  },

  infoChoiceSection: {
    bg_image_section: {
      url: "/uploads/Andrea_Mancini_87_ed901ebbbe.jpg",
    },
    option1:
      "Precisione e cura in ogni fase, dal disegno 3D alla realizzazione.",
    en_option1:
      "Precision and care at every stage, from 3D design to final production.",
    option2:
      "Soluzioni personalizzate, pensate per le esigenze specifiche di ciascun cliente.",
    en_option2:
      "Customized solutions, designed for each client's specific needs.",
    option3:
      "Rapidità e flessibilità, per garantire tempi brevi senza rinunciare alla qualità.",
    en_option3:
      "Speed and flexibility, to guarantee short lead times without compromising quality.",
  },

  productsSection: {
    stampa_image: { url: "/uploads/Andrea_Mancini_16_816adaa835.jpg" },
    incisioni_image: { url: "/uploads/Andrea_Mancini_39_fad4965caf.jpg" },
    lavorazioni_image: { url: "/uploads/Andrea_Mancini_71_13825ddc12.jpg" },
    cad_image: null,
    stampa_text: "Stampa 3D",
    en_stampa_text: "3D Printing",
    lavorazioni_text: "Lavorazioni CNC",
    en_lavorazioni_text: "CNC Machining",
    incisioni_text: "Lavorazioni Laser",
    en_incisioni_text: "Laser Processing",
    cad_text: null,
    en_cad_text: null,
  },

  whoSection: {
    image: {
      url: "/uploads/Andrea_Mancini_9_07b0b09e30.jpg",
      alternativeText: "Laboratorio 3D",
    },
    title: "Chi siamo",
    en_title: "About us",
    content:
      "La nostra realtà nasce nel 2020 dall’esperienza di un ingegnere industriale specializzato in fabbricazione digitale. Ci occupiamo di stampa 3D, lavorazioni laser e CNC, con particolare attenzione alla prototipia e allo sviluppo di componenti personalizzati. La padronanza di diversi software di disegno 3D ci consente di offrire soluzioni precise, innovative e su misura per privati e aziende.",
    en_content:
      "Our company was founded in 2020 from the experience of an industrial engineer specialized in digital fabrication. We work with 3D printing, laser processing and CNC machining, with particular attention to prototyping and the development of custom components. Our command of various 3D design software allows us to offer precise, innovative and tailor-made solutions for individuals and businesses.",
  },

  footer: {
    logo: {
      url: "/uploads/logo_a6452aedcd.svg",
      alternativeText: "Logo 3DMLAB",
    },
    sedeOperativa: "Via Fratelli Rosselli 185, Porto San Giorgio (FM)",
    sedeLegale: "Via Egidi 8, Fermo (FM)",
    pIva: "02506160445",
    telefono: "3469427548",
    email: "Info3dmlab@gmail.com",
    instagram: "https://www.instagram.com/3dmlab_",
    linkUtili: [{ label: "Privacy", url: "/privacy" }],
    linkServizi: [{ label: "STAMPA 3D", url: "/stampa-3d" }],
  },

  // Il componente "shared.stampa-gallery" esiste nello schema Strapi ma
  // non è mai stato effettivamente popolato/salvato nel database (nessuna
  // tabella creata). Le gallerie qui sotto sono quindi vuote: la pagina
  // /servizi/[slug] già oggi non mostra immagini di galleria in produzione.
  // Se hai immagini da mostrare, aggiungile qui con lo stesso formato:
  // { url: "/uploads/nome-file.jpg", alternativeText: "..." }
  stampaGallery: {
    stampa: [],
    incisione: [],
    lavorazioni: [],
    disegno: [],
    scansioni: [],
    post: [],
  },
};

export default siteContent;
