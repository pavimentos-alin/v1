import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("../src/data/services.json")
      .then((response) => response.json())
      .then((data) => {
        const images = Object.values(
          import.meta.glob("/src/assets/images/services/*.{jpg,jpeg,png,webp}", { eager: true })
        ).map((img) => img.default);

        const servicesWithImages = data.map(service => ({
          ...service,
          images: filterImagesByPrefix(images, service.imageNameInit),
          currentImageIndex: 0
        }));
        setServices(servicesWithImages);
      })
      .catch(error => console.error("Error loading services:", error));
  }, []);

  const filterImagesByPrefix = (allImages, prefix) => {
    const filtered = allImages.filter(img => img.includes(`/services/${prefix}`));
    return filtered.length > 0 ? filtered : ["/src/assets/images/placeholder.png"];
  };

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
    <section id="services">
      <h3 className="text-3xl font-bold text-center mb-6">Nuestros Servicios</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className="shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-100"
          >
            <CardContent className="p-4 flex flex-col items-center">
              <h4 className="text-xl font-semibold text-center mt-4 mb-2">{service.title}</h4>
              <img 
                src={service.images[service.currentImageIndex]} 
                alt={service.title} 
                className="w-full max-h-90 object-fill rounded"
              />
              <p className="text-gray-700 mt-4 text-center">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
