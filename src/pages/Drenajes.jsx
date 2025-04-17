import { Helmet } from "@dr.pogodin/react-helmet";
import ImageSlider from "../components/ui/ImageSlider";
import Hero from "../components/Hero.jsx";

export default function Drenajes() {
  return (
    <>
      <Helmet>
        <title>Sistemas de Drenaje, Interiores  y Exteriores | HormigonArte</title>
        <meta
          name="description"
          content="Instalación de drenajes eficientes para jardines, patios, garajes y zonas pavimentadas. Soluciones duraderas para evitar acumulación de agua."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="denajes para garajes, drenajes exteriores, drenaje de jardines, canaletas de drenaje, sistemas de drenaje, evacuación de agua" />
        <link rel="canonical" href="https://www.hormigonarte.com/drenajes" />
      </Helmet>

      <section className="pt-24">
        <ImageSlider jsonFile="drenajes.json" />
        <Hero/>
      </section>
    </>
  );
}
