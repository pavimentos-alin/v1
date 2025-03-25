import { useState } from "react";
import { Button } from "./ui/button.jsx";

export default function Hero() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, mensaje }),
    });

    if (response.ok) {
      setEnviado(true);
    } else {
      alert("Hubo un error al enviar el mensaje. Inténtelo de nuevo.");
    }
  };

  const reiniciarFormulario = (e) => {
    e.preventDefault(); // Previene cualquier intento de submit accidental
    setNombre("");
    setEmail("");
    setMensaje("");
    setEnviado(false);
  };

  return (
    <section id="hero" className="w-full">
      <div className="bg-gray-100 p-4 border rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold">
          Especialistas en pavimentos, muros y drenajes
        </h2>
        <p className="mt-4 text-lg">
          Ofrecemos soluciones duraderas y estéticas. Háganos su consulta sin
          compromiso:
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-left">
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre"
            className="p-2 border rounded mb-2 w-80"
            required
            disabled={enviado}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Mail"
            className="p-2 border rounded mb-2 w-192"
            required
            disabled={enviado}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Consulta"
            className="p-2 border rounded mb-2 w-192"
            required
            disabled={enviado}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center">
            {enviado ? (
              <>
                <Button
                  type="button"
                  onClick={reiniciarFormulario}
                  className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-500 hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Limpiar formulario
                </Button>
                <p className="text-green-500 font-bold ml-auto">
                  ¡consulta enviada! Te contestamos muy pronto.
                </p>
              </>
            ) : (
              <Button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out w-80 ml-auto"
              >
                Enviar consulta
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
