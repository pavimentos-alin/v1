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

  const determineColumns = (startIndex) => {
    const container = document.querySelector("#carousel-container");
    if (!container) return;
    
    setContainerWidth(container.clientWidth);
    const testImages = images.slice(startIndex, startIndex + 3).map(src => {
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
    determineColumns(activeIndex * columns);
    window.addEventListener("resize", () => determineColumns(activeIndex * columns));
    return () => window.removeEventListener("resize", () => determineColumns(activeIndex * columns));
  }, [activeIndex]);

  const totalImages = images.length;
  const getTotalSlides = () => Math.ceil(totalImages / columns);
  const slides = Array.from({ length: getTotalSlides() }, (_, i) => 
    images.slice(i * columns, (i + 1) * columns)
  );

  const goNext = () => {
    const newIndex = (activeIndex + 1) % getTotalSlides();
    setActiveIndex(newIndex);
    determineColumns(newIndex * columns);
  };

  const goPrev = () => {
    const newIndex = (activeIndex - 1 + getTotalSlides()) % getTotalSlides();
    setActiveIndex(newIndex);
    determineColumns(newIndex * columns);
  };

  return (
    <section id="about" className="p-0 mt-6 bg-gray-100
">
      <h3 className="text-3xl font-bold text-center">Sobre Nosotros</h3>
      <p className="text-justify mt-4 text-lg ml-4 mr-4">
      Con más de dos décadas de experiencia en el sector de la construcción, nos hemos consolidado como una empresa líder en soluciones de hormigón y obras complementarias en toda España. Nuestra especialización abarca todas las variantes del hormigón: soleras perfectamente niveladas, hormigón impreso con diseños exclusivos y acabados pulidos de calidad superior que transforman cualquier espacio.
      <br/>
Nuestro equipo de profesionales altamente cualificados se distingue por su meticulosidad y conocimiento técnico en la instalación de sistemas de drenaje eficientes y la construcción de muros de separación robustos y duraderos. Cada proyecto que emprendemos es un testimonio de nuestro compromiso inquebrantable con la excelencia constructiva.
<br/>
Lo que nos diferencia en el mercado es nuestra capacidad para combinar tres elementos fundamentales que nuestros clientes valoran:
<br/>
<b>Calidad superior</b>: Utilizamos exclusivamente materiales de primera categoría y técnicas constructivas avanzadas que garantizan resultados excepcionales y longevidad en cada obra.
<br/>
<b>Precios competitivos</b>: Optimizamos recursos y procesos para ofrecer la mejor relación calidad-precio del mercado, sin comprometer nunca los estándares de excelencia.
<br/>
<b>Tiempos de entrega récord</b>: Entendemos la importancia de cumplir plazos. Nuestra eficiencia operativa nos permite entregar proyectos en tiempos reducidos sin sacrificar la precisión.
<br/>
Nuestro alcance nacional nos ha permitido materializar proyectos exitosos en todas las comunidades autónomas, adaptándonos a las particularidades de cada región y tipo de obra. La satisfacción de nuestros clientes, reflejada en su lealtad y recomendaciones, es nuestro mayor orgullo y motivación para seguir innovando y mejorando.
<br/>
Confíe en nosotros para hacer realidad su próximo proyecto constructivo con garantía de calidad, eficiencia y profesionalidad.


      </p>

      {/* Carrusel con múltiples imágenes por slide */}
      <div id="carousel-container" className="relative mt-6 mx-auto max-w-[1200px] overflow-hidden">
        <Carousel>
          <CarouselContent className="flex gap-4 justify-center">
            {slides.map((slide, slideIndex) => (
              <CarouselItem
                key={slideIndex}
                className={`w-full flex gap-4 justify-center ${activeIndex === slideIndex ? "block" : "hidden"}`}
              >
                {slide.map((src, imgIndex) => (
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

        {/* Botones de navegación flotantes con efectos */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-100 hover:shadow-lg hover:scale-110 text-white text-3xl"
        >
          &lsaquo;
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-100 hover:shadow-lg hover:scale-110 text-white text-3xl"
        >
          &rsaquo;
        </button>
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
