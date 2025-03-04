import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel.jsx";
import { Dialog, DialogContent } from "./ui/dialog.jsx";

// Importar imágenes automáticamente con Vite
const images = Object.values(import.meta.glob("../assets/images/about/*.(jpg|jpeg|png|webp)", { eager: true }))
  .map((img) => img.default);

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [columns, setColumns] = useState(() => Math.floor(Math.random() * 3) + 1);

  const totalImages = images.length;
  const itemsPerSlide = columns; // Cantidad de imágenes por slide
  const totalSlides = Math.ceil(totalImages / itemsPerSlide);
  const maxSelectors = Math.min(10, totalSlides);

  // Calcular qué selectores mostrar
  const startIndex = Math.max(0, Math.min(activeIndex - Math.floor(maxSelectors / 2), totalSlides - maxSelectors));
  const visibleSelectors = [...Array(totalSlides)].slice(startIndex, startIndex + maxSelectors);

  const handleSelectorClick = (index) => {
    setActiveIndex(index);
    setColumns(Math.floor(Math.random() * 3) + 1);
  };

  return (
    <section id="about" className="text-center p-0 mt-6">
      <h3 className="text-3xl font-bold">Sobre Nosotros</h3>
      <p className="mt-4 text-lg">Pavimentos Alin es una empresa con más de 20 años de experiencia en pavimentación y hormigón.</p>

      {/* Carrusel con múltiples imágenes por slide */}
      <div className="relative mt-6 mx-auto max-w-[1200px] overflow-hidden">
        <Carousel>
          <CarouselContent className="flex gap-4 justify-center">
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <CarouselItem
                key={slideIndex}
                className={`w-full flex gap-4 justify-center ${activeIndex === slideIndex ? "block" : "hidden"}`}
              >
                {images.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((src, imgIndex) => (
                  <div key={imgIndex} className={`w-${12 / itemsPerSlide}/12`}>
                    <img
                      src={src}
                      alt={`Obra ${slideIndex * itemsPerSlide + imgIndex + 1}`}
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

        {/* Selector de puntos con límite de 10 */}
        <div className="mt-6 flex justify-center space-x-4">
          {visibleSelectors.map((_, index) => {
            const realIndex = startIndex + index;
            return (
              <button
                key={realIndex}
                className={`w-2 h-2 aspect-square p-0 rounded-full transition-all ${activeIndex === realIndex ? "bg-gray-800 scale-110" : "bg-gray-400"}`}
                onClick={() => handleSelectorClick(realIndex)}
              />
            );
          })}
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
