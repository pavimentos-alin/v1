import { Button } from "./ui/button.jsx";

export default function Hero() {
  return (
    <div style={{ marginTop: '20px' }}>
    <section id="hero" className="w-full hidden">
      <div  className="bg-gray-100 p-4 border rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold">Especialistas en pavimentos, muros y drenajes</h2>
      <p className="mt-4 text-lg">Ofrecemos soluciones duraderas y estéticas. Háganos su consulta sin compromiso:</p>
      <form className="mt-6 flex flex-col items-left">
        <input type="text" placeholder="Nombre" className="p-2 border rounded mb-2 w-80" required />
        <input type="email" placeholder="Mail" className="p-2 border rounded mb-2 w-192" required />
        <textarea placeholder="Consulta" className="p-2 border rounded mb-2 w-192" required></textarea>
        <Button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out w-80 ml-auto">Enviar consulta</Button>

      </form>
      </div>
    </section>
    </div>
  );
}