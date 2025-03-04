import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel.jsx";
import { Dialog, DialogContent } from "./ui/dialog.jsx";
import { Button } from "./ui/button.jsx";

// Importar imágenes automáticamente con Vite
const images = Object.values(import.meta.glob("../assets/images/about/*.(jpg|jpeg|png|webp)", { eager: true }))
  .map((img) => img.default);

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [columns, setColumns] = useState(1);
  const [containerWidth, setContainerWidth] = useState(1200);

  const determineColumns = (index) => {
    const container = document.querySelector("#carousel-container");
    if (!container) return;
    
    setContainerWidth(container.clientWidth);
    const testImages = images.slice(index * 3, (index * 3) + 3).map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
    
    Promise.all(testImages.map(img => new Promise(resolve => {
      img.onload = () => resolve(img.width);
    }))).then(widths => {
      let newColumns = 3;
      if (widths.reduce((sum, w) => sum + w, 0) > container.clientWidth) newColumns = 2;
      if (widths.slice(0, 2).reduce((sum, w) => sum + w, 0) > container.clientWidth) newColumns = 1;
      setColumns(newColumns);
    });
  };

  useEffect(() => {
    determineColumns(activeIndex);
    window.addEventListener("resize", () => determineColumns(activeIndex));
    return () => window.removeEventListener("resize", () => determineColumns(activeIndex));
  }, [activeIndex]);

  const totalImages = images.length;
  const totalSlides = Math.ceil(totalImages / columns);

  const goNext = () => {
    const newIndex = (activeIndex + 1) % totalSlides;
    setActiveIndex(newIndex);
    determineColumns(newIndex);
  };

  const goPrev = () => {
    const newIndex = (activeIndex - 1 + totalSlides) % totalSlides;
    setActiveIndex(newIndex);
    determineColumns(newIndex);
  };

  return (
    <section id="about" className="text-center p-0 mt-6">
      <h3 className="text-3xl font-bold">Sobre Nosotros</h3>
      <p className="mt-4 text-lg">Pavimentos Alin es una empresa con más de 20 años de experiencia en pavimentación y hormigón.</p>

      {/* Carrusel con múltiples imágenes por slide */}
      <div id="carousel-container" className="relative mt-6 mx-auto max-w-[1200px] overflow-hidden">
        <Carousel>
          <CarouselContent className="flex gap-4 justify-center">
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <CarouselItem
                key={slideIndex}
                className={`w-full flex gap-4 justify-center ${activeIndex === slideIndex ? "block" : "hidden"}`}
              >
                {images.slice(slideIndex * columns, (slideIndex + 1) * columns).map((src, imgIndex) => (
                  <div key={imgIndex} style={{ width: `${100 / columns}%` }}>
                    <img
                      src={src}
                      alt={`Obra ${slideIndex * columns + imgIndex + 1}`}
                      className="w-full h-[32rem] object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-95 cursor-pointer"
                      onClick={() => {
                        setSelectedImage(src);
                        setIsDialogOpen(true);
                      }}
                    />
                  </div>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Botones de navegación */}
        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={goPrev} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600">← Anterior</Button>
          <Button onClick={goNext} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Siguiente →</Button>
        </div>
      </div>

      {/* Popup con imagen ampliada */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl p-4 bg-white rounded-lg shadow-xl">
          {selectedImage && <img src={selectedImage} alt="Imagen ampliada" className="w-full h-auto rounded-lg" />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
