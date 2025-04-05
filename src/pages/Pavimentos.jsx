import ImageSlider from "../components/ui/ImageSlider";
import Hero from "../components/Hero.jsx";

export default function Pavimentos() {
  return (
    <section className="pt-24">
      <ImageSlider jsonFile="pavimentos.json" />
      <Hero/>
    </section>

  );
}
