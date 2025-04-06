import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import servicesData from "@/data/services.json"; // Importamos el JSON directamente

export default function Services() {
  const [services, setServices] = useState([]);

  // Cargar imágenes desde la carpeta de assets
  const images = Object.values(
    import.meta.glob("../assets/images/services/*.{jpg,jpeg,png,webp}", { eager: true })
  ).map((img) => img.default);

  const filterImagesByPrefix = (allImages, prefix) => {
    const filtered = allImages.filter(img => img.includes(`${prefix}`));
    return filtered.length > 0 ? filtered : ["/images/placeholder.png"];
  };

  useEffect(() => {
    // Como el JSON ya está importado, lo usamos directamente sin fetch
    const servicesWithImages = servicesData.map(service => ({
      ...service,
      images: filterImagesByPrefix(images, service.imageNameInit),
      currentImageIndex: 0
    }));

    setServices(servicesWithImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prevServices =>
        prevServices.map(service => ({
          ...service,
          currentImageIndex: (service.images.length > 0)
            ? (service.currentImageIndex + 1) % service.images.length
            : 0
        }))
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [services]);

  return (
    <section id="services" className="pt-6">
      <h3 className="text-3xl font-bold text-center mb-6">Nuestros Servicios</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {services.map((service, index) => (
          <Link to={`/${service.link}`} key={index}>
            <Card className="h-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-100 cursor-pointer">
              <CardContent className="h-full p-4 flex flex-col items-center">
                <h4 className="text-xl font-semibold text-center mt-4 mb-2">{service.title}</h4>
                <img 
                  src={service.images[service.currentImageIndex]} 
                  alt={service.title} 
                  className="w-full max-h-90 object-fill rounded"
                />
                <div className="text-gray-700 mt-4 text-center">
                  {service.description.split('<br/>').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
