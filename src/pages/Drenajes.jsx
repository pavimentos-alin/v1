import ImageSlider from "../components/ui/ImageSlider";
import Hero from "../components/Hero.jsx";

export default function Drenajes() {
  return (
    <section className="pt-24">
      <ImageSlider jsonFile="drenajes.json" />
      <Hero/>
    </section>

  );
}
