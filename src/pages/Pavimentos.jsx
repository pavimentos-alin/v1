import { Helmet } from "react-helmet-async";
import ImageSlider from "../components/ui/ImageSlider";
import Hero from "../components/Hero.jsx";

export default function Pavimentos() {
  return (
    <>
      <Helmet>
        <title>Pavimentos Hormigón y Cemento | Hormigón Fratasado, Impreso y Pulido | Hormigonarte</title>
        <meta
          name="description"
          content="Especialistas en pavimentos de hormigón impreso y pulido. Diseños decorativos, resistentes y personalizados para patios, jardines, aceras y más."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="pavimentos de hormigón y cemento, hormigón impreso, hormigón pulido, pavimento exterior, patios, caminos, aceras" />
        <link rel="canonical" href="https://www.hormigonarte.com/pavimentos" />
      </Helmet>
      <section className="pt-24">
        <ImageSlider jsonFile="pavimentos.json" />
        <Hero/>
      </section>
    </>
  );
}
