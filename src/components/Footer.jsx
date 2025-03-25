export default function Footer() {
    return (
      <footer className="bg-blue-900 text-white text-center p-6 flex flex-col items-center w-screen absolute left-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-8">
        <div className="flex flex-col items-center text-center justify-center">
          <h3 className="text-xl font-bold">Pavimentos Alin</h3>
          <p>
  Teléfono: <a href="tel:+34643039007" className="underline hover:text-gray-300">+34 643 03 90 07</a>
</p>
<p>
  Email: <a href="mailto:info@hormigonarte.com" className="underline hover:text-gray-300">info@hormigonarte.com</a>
</p>

        </div>
        <div className="w-full md:w-3/3 flex justify-center md:justify-end items-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049391.27368857!2d-7.802961579494787!3d41.72221994998439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42497b2e249b21%3A0xcfbe4d93e7e746e8!2sPavimentos%20Alin!5e0!3m2!1ses!2ses!4v1740723926866!5m2!1ses!2ses"
          className="w-full max-w-xs md:max-w-md h-40 md:h-52 rounded-lg shadow-lg"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        </div>
        </div>
        <p className="absolute bottom-2 right-14 text-xs md:text-sm italic text-gray-300">
          &copy; 2025 Pavimentos Alin. Todos los derechos reservados.
        </p>
      </footer>
    );
  }