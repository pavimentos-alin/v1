import './App.css';
import { HelmetProvider, Helmet } from "@dr.pogodin/react-helmet";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CookieConsent from "react-cookie-consent";

import ScrollToTop from "@/components/ScrollToTop";
import Header from "./components/Header.jsx";
import Space from "./components/ui/Space.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Reviews from "./components/Reviews.jsx";
import Footer from "./components/Footer.jsx";

// Nuevas páginas
import Pavimentos from './pages/Pavimentos.jsx';
import Muros from './pages/Muros.jsx';
import Drenajes from './pages/Drenajes.jsx';

function Home() {
  return (
    <>
      <Helmet>
        <title>hormigonarte | Pavimentos Alin | Construcción pavimentos y muros</title>
        <meta
          name="description"
          content="Empresa especializada en hormigón, impreso, decorativo, pulido y fratasado. Realizamos pavimentos, muros y drenajes personalizados con máxima calidad, rapidez, precio competitivo y diseño."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="pavimentos de hormigón, pavimentos de cemento, soleras, encofrado, garajes, empresa de construcción, precios competitivos, rampas, cemento impreso, cemento pulido, cemento m2, hormigón m2, hormigón impreso, hormigón pulido, pavimento exterior, patios, caminos, aceras, muro de ladrillo, muro de hormigón, muro de hormigon impreso, muro de cemento, muro de cemento impreso, muro de carga, muro m2, drenajes, canalizaciones de agua" />
        <link rel="canonical" href="https://www.hormigonarte.com/" />
      </Helmet>

      <Space />
      <Hero />
      <Services />
      <About />
      <Reviews />
    </>
  );
}

export default function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("userConsent");
    if (!consent) {
      setShowOverlay(true);
      document.body.classList.add("overflow-hidden");
    }
  }, []);

  const handleConsentResponse = () => {
    setShowOverlay(false);
    document.body.classList.remove("overflow-hidden");
  };

  const [showConsentBanner, setShowConsentBanner] = useState(() => {
    return !Cookies.get("userConsent"); // solo mostrar si no está ya definido
  });

  return (
    <HelmetProvider>
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

        {/* Overlay primero: más abajo en el DOM = detrás visualmente */}
        {showOverlay && (
          <div className="fixed inset-0 z-[999] bg-transparent backdrop-blur-[1px]" />
        )}

        {/* Banner después: más arriba en el DOM = por encima */}

        {showConsentBanner && (
          <CookieConsent
            disableStyles={true}
            enableDeclineButton={false}
            hideOnAccept={true}
            buttonText=""
            declineButtonText=""
            cookieName="userConsent"
            containerClasses="fixed bottom-0 left-0 right-0 z-[999] bg-blue-200 shadow-[0_-2px_12px_rgba(0,0,0,0.1)] [&_#rcc-confirm-button]:hidden"
            contentClasses=""
          >
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 gap-6">
              <p className="text-sm md:text-base text-center md:text-left m-0 leading-relaxed">
                <strong>Usamos cookies para mejorar tu experiencia.</strong> Por favor acepta o rechaza el uso de cookies para continuar navegando por el sitio.
              </p>
            
              <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4 w-full">
                <button
                  onClick={() => {
                    Cookies.set("userConsent", "accepted", { expires: 365 });
                    setShowConsentBanner(false);
                    handleConsentResponse();
                    window.gtag && window.gtag("consent", "update", {
                      ad_storage: "granted",
                      analytics_storage: "granted",
                    });
                  }}
                  className="min-w-[120px] bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-1.5 rounded-md transition"
                >
                  Aceptar
                </button>

                <button
                  onClick={() => {
                    Cookies.remove("userConsent");
                    setShowConsentBanner(false);
                    handleConsentResponse();
                    window.gtag && window.gtag("consent", "update", {
                      ad_storage: "denied",
                      analytics_storage: "denied",
                    });
                  }}
                  className="min-w-[120px] bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-1.5 rounded-md transition"
                >
                  Rechazar
                </button>
              </div>
            </div>
          </CookieConsent>
        )}
      </BrowserRouter>
    </HelmetProvider>
  );
}

