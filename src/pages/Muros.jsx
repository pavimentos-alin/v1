import { Helmet } from "@dr.pogodin/react-helmet";
import ImageSlider from "../components/ui/ImageSlider";
import Hero from "../components/Hero.jsx";

export default function Muros() {
  return (
    <>
      <Helmet>
        <title>Muros de Ladrillo o Hormigón Decorativo | Hormigonarte</title>
        <meta
          name="description"
          content="Diseño y construcción de muros de hormigón decorativo y de ladrillo. Resistentes, estéticos y personalizados para jardines, parcelas, y exteriores."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="Muros de ladrillo, reforzados, muros de hormigón, muros decorativos, cerramientos de parcela, muros exteriores, hormigón impreso" />
        <link rel="canonical" href="https://www.hormigonarte.com/muros" />
      </Helmet>
      
      <section className="pt-24">
        <ImageSlider jsonFile="muros.json" />
        <Hero/>
      </section>
    </>
  );
}
