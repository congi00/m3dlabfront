import HomePreventiveSection from "@/components/HomePreventiveSection";
import Header from "../components/Header";
import InfoChoiceSection from "@/components/InfoChoiceSection";
import ProductsSection from "@/components/ProductsSection";
import WhoSection from "@/components/WhoSection";
import Footer from "@/components/Footer";
import ClientScrollWrapper from "@/components/ClientScrollWrapper";
import { LanguageProvider } from "@/components/LanguageContext";

export default async function HomePage() {
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
  const home_preventive_section = homepage.section?.find(
    (s) => s.__component === "shared.home-preventive-section"
  );
  const info_choice_section = homepage.section?.find(
    (s) => s.__component === "shared.info-choice-section"
  );
  const products_section = homepage.section?.find(
    (s) => s.__component === "shared.products-section"
  );
  const who_section = homepage.section?.find(
    (s) => s.__component === "shared.who-section"
  );
  const footer = homepage.section?.find(
    (s) => s.__component === "shared.footer"
  );

  return (
    <LanguageProvider>
      <ClientScrollWrapper>
        <main>
          {/* HEADER */}
          <Header data={header} />
          {/* ALTRE SEZIONI */}
          <HomePreventiveSection
            {...home_preventive_section}
            logo={header.logo}
          />
          <InfoChoiceSection {...info_choice_section}/>
          <ProductsSection {...products_section}/>
          <WhoSection
            description={who_section.content}
            en_description={who_section.en_content}
            en_title={who_section.en_title}
            title={who_section.title}
            images={[
              {
                url: `${who_section.image.url}`,
                alternativeText: "Laboratorio 3D",
              },
            ]}
          />
        </main>
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
      </ClientScrollWrapper>
    </LanguageProvider>
  );
}
