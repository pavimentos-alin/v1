import './App.css'

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Reviews from "./components/Reviews.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}