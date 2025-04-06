import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ScrollToTop from "@/components/ScrollToTop";
import Header from "./components/Header.jsx";
import Space from "./components/ui/Space.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Reviews from "./components/Reviews.jsx";
import Footer from "./components/Footer.jsx";
import CookieConsent from "react-cookie-consent";

// Nuevas páginas
import Pavimentos from './pages/Pavimentos.jsx';
import Muros from './pages/Muros.jsx';
import Drenajes from './pages/Drenajes.jsx';

function Home() {
  return (
    <>
      <Space />
      <Hero />
      <Services />
      <About />
      <Reviews />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pavimentos" element={<Pavimentos />} />
          <Route path="/muros" element={<Muros />} />
          <Route path="/drenajes" element={<Drenajes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        declineButtonText="Rechazar"
        enableDeclineButton
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#fff", background: "#007bff", fontSize: "13px" }}
        declineButtonStyle={{ background: "#999", fontSize: "13px" }}
        onAccept={() => {
          window.gtag && window.gtag("consent", "update", {
            ad_storage: "granted",
            analytics_storage: "granted"
          });
        }}
        onDecline={() => {
          window.gtag && window.gtag("consent", "update", {
            ad_storage: "denied",
            analytics_storage: "denied"
          });
        }}
      >
        Usamos cookies para mejorar tu experiencia. Acepta o rechaza según prefieras.
      </CookieConsent>
    </BrowserRouter>
  );
}
