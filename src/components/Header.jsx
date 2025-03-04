import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp, FaTelegram, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/images/logo_transparente_pavimentos_alin.png";

export default function Header() {
  return (
    <header className="bg-white shadow-lg p-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Pavimentos Alin" className="h-16 w-auto drop-shadow-2xl transform scale-100" />
        <h1 className="text-2xl font-bold sr-only">Pavimentos Alin</h1>
      </div>
      <nav className="flex items-center space-x-4">
        <a href="https://www.facebook.com/100083556156993" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} className="cursor-pointer text-blue-600" />
        </a>
        <a href="https://www.instagram.com/pavimentosalin/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} className="cursor-pointer text-pink-500" />
        </a>
        <a href="tel:+34643039007" className="cursor-pointer">
          <FaPhone size={30} className="text-green-600" />
        </a>
        <a href="https://wa.me/+34643039007" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={30} className="cursor-pointer text-green-500" />
        </a>
        <a href="https://t.me/share/url?url=tel:+34643039007" target="_blank" rel="noopener noreferrer">
          <FaTelegram size={30} className="cursor-pointer text-blue-400" />
        </a>
        <a href="https://maps.app.goo.gl/iJNrNaJu5nNeTr7Y8" target="_blank" rel="noopener noreferrer">
          <FaMapMarkerAlt size={30} className="cursor-pointer text-red-500" />
        </a>
      </nav>
    </header>
  );
}
