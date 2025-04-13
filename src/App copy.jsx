import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
  const [cookieChoiceMade, setCookieChoiceMade] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("CookieConsent");
    if (consent === "true" || consent === "false") {
      setCookieChoiceMade(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("CookieConsent", "true");
    setCookieChoiceMade(true);
    window.gtag && window.gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted"
    });
  };

  const handleDecline = () => {
    localStorage.setItem("CookieConsent", "false");
    setCookieChoiceMade(true);
    window.gtag && window.gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied"
    });
  };

  return (
    <BrowserRouter>
      {/* Fondo borroso y sin interacción si no hay consentimiento */}
      <div className={`${!cookieChoiceMade ? 'backdrop-blur-sm pointer-events-none' : ''}`}>
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
      </div>

      {/* Mensaje de cookies sin location, usando top-12 con Tailwind */}
      <CookieConsent
        location=""
        disableStyles={true}
        enableDeclineButton
        buttonText="Aceptar"
        declineButtonText="Rechazar"
        containerClasses="fixed top-20 left-0 w-full z-50 bg-slate-800 text-white px-4 py-3 text-sm flex flex-col md:flex-row items-center justify-between gap-2"
        buttonWrapperClasses="flex space-x-2"
        buttonClasses="bg-green-600 text-white text-sm px-4 py-2 rounded"
        declineButtonClasses="bg-gray-600 text-white text-sm px-4 py-2 rounded"
        onAccept={handleAccept}
        onDecline={handleDecline}
      >
        Usamos cookies para mejorar tu experiencia. Acepta o rechaza según prefieras.
      </CookieConsent>
    </BrowserRouter>
  );
}
