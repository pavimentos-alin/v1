import './App.css'
import { HelmetProvider, Helmet } from "@dr.pogodin/react-helmet";
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
      <Helmet>
        <title>HormigonArte | Hormigón Impreso, Pulido y Fratasado. Cemento. Decorativo para Pavimentos, Muros y Drenajes. | Calidad, Rapidez y Precios Competitivos.</title>
        <meta
          name="description"
          content="Empresa especializada en hormigón, impreso, decorativo, pulido y fratasado. Realizamos pavimentos, muros y drenajes personalizados con máxima calidad, rapidez, precio competitivo y diseño."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="hormigón decorativo, pavimentos, muros, drenajes, hormigón impreso, construcción, exteriores, empresa construcción, hormigón pulido, hormigón fratasado, cemento armado, camento pulido, cemento impreso" />
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
        <CookieConsent
          location="top"
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
    </HelmetProvider>
  );
}