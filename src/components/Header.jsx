import { useState } from "react";
import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp, FaTelegram, FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/logo_transparente_pavimentos_alin.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg p-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Pavimentos Alin" className="h-16 w-auto drop-shadow-2xl transform scale-100" />
      </div>
      <span className="absolute left-1/2 transform -translate-x-1/2 scale-y-125 text-xl sm:text-2xl font-light tracking-wide text-gray-800 scale-x-125">
  Pavimentos Alin
</span>

      <nav className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-4">
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
        </div>
        <button className="sm:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="absolute top-16 right-1 w-auto bg-white shadow-lg flex flex-col items-center space-y-4 py-4 sm:hidden pt-2 pb-2">
          <a href="https://www.facebook.com/100083556156993" target="_blank" rel="noopener noreferrer" className="w-full flex items-center space-x-2 pl-4 pr-4 hover:bg-gray-200 rounded" >
            <FaFacebook size={30} className="cursor-pointer text-blue-600" />
            <span className="text-blue-600">Facebook</span>
          </a>
          <a href="https://www.instagram.com/pavimentosalin/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center space-x-2 hover:bg-gray-200 pl-4 pr-4 rounded">
            <FaInstagram size={30} className="cursor-pointer text-pink-500" />
            <span className="text-pink-500">Instagram</span>
          </a>
          <a href="tel:+34643039007"                                                                    className="w-full flex items-center space-x-2 hover:bg-gray-200 pl-4 pr-4 rounded">
            <FaPhone size={30} className="cursor-pointer text-green-600" />
            <span className="text-green-600">Llamar</span>
          </a>
          <a href="https://wa.me/+34643039007" target="_blank" rel="noopener noreferrer" className="w-full flex items-center space-x-2 pl-4 pr-4 hover:bg-gray-200 rounded">
            <FaWhatsapp size={30} className="cursor-pointer text-green-500" />
            <span className="text-green-500">WhatsApp</span>
          </a>
          <a href="https://t.me/share/url?url=tel:+34643039007" target="_blank" rel="noopener noreferrer" className="w-full flex items-center space-x-2 pl-4 pr-4 hover:bg-gray-200 rounded">
            <FaTelegram size={30} className="cursor-pointer text-blue-400" />
            <span className="text-blue-400">Telegram</span>
          </a>
          <a href="https://maps.app.goo.gl/iJNrNaJu5nNeTr7Y8" target="_blank" rel="noopener noreferrer" className="w-full flex items-center space-x-2 pl-4 pr-4 hover:bg-gray-200 rounded">
            <FaMapMarkerAlt size={30} className="cursor-pointer text-red-500" />
            <span className="text-red-500">Ubicación</span>
          </a>
        </div>
      )}
    </header>
  );
}