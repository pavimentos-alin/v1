import './App.css'

import CookieConsent from "react-cookie-consent";

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
      {/* ✅ Banner de cookies con lógica para Consent Mode */}
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
    </div>
  );
}