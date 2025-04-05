import ImageSlider from "../components/ui/ImageSlider";
import Hero from "../components/Hero.jsx";

export default function Muros() {
  return (
    <section className="pt-24">
      <ImageSlider jsonFile="muros.json" />
      <Hero/>
    </section>

  );
}
