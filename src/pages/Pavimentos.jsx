import { Helmet } from "@dr.pogodin/react-helmet";
import ImageSlider from "../components/ui/ImageSlider";
import Hero from "../components/Hero.jsx";

export default function Pavimentos() {
  return (
    <>
      <Helmet>
        <title>hormigonarte | Pavimentos Alin | construcción hormigón y cemento</title>
        <meta
          name="description"
          content="Especialistas en pavimentos de hormigón fratasado, impreso y pulido. Diseños decorativos, resistentes y personalizados para garajes, patios, jardines, aceras, calles, accesos, rampas y más. Rapidez, calidad y garantía. A precios muy competitivos."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="pavimentos de hormigón, pavimentos de cemento, soleras, encofrado, garajes, empresa de construcción, precios competitivos, rampas, cemento impreso, cemento pulido, cemento m2, hormigón m2, hormigón impreso, hormigón pulido, pavimento exterior, patios, caminos, aceras" />
        <link rel="canonical" href="https://www.hormigonarte.com/pavimentos" />
      </Helmet>
      <section className="pt-24">
        <ImageSlider jsonFile="pavimentos.json" />
        <Hero/>
      </section>
    </>
  );
}
