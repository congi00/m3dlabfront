import HomePreventiveSection from "@/components/HomePreventiveSection";
import Header from "../components/Header";
import InfoChoiceSection from "@/components/InfoChoiceSection";
import ProductsSection from "@/components/ProductsSection";
import WhoSection from "@/components/WhoSection";
import Footer from "@/components/Footer";
import ClientScrollWrapper from "@/components/ClientScrollWrapper";
import { LanguageProvider } from "@/components/LanguageContext";
import { siteContent } from "@/lib/content";

export default async function HomePage() {
  const header = siteContent.header;
  const home_preventive_section = siteContent.homePreventiveSection;
  const info_choice_section = siteContent.infoChoiceSection;
  const products_section = siteContent.productsSection;
  const who_section = siteContent.whoSection;
  const footer = siteContent.footer;

  return (
    <LanguageProvider>
      <ClientScrollWrapper>
        <main>
          <Header data={header} />
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
            linkUtili={footer.linkUtili} 
            linkServizi={footer.linkServizi} 
          />
        </footer>
      </ClientScrollWrapper>
    </LanguageProvider>
  );
}
