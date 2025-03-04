import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel.jsx";
import { Dialog, DialogContent } from "./ui/dialog.jsx";

// Importar imágenes automáticamente con Vite
let images = Object.values(import.meta.glob("../assets/images/about/*.(jpg|jpeg|png|webp)", { eager: true }))
  .map((img) => img.default);

if (images.length === 0) {
  images = ["/src/assets/images/placeholder.png"];
}

// Función para determinar la proporción de la imagen
function getImageType(img) {
  const imgElement = new Image();
  imgElement.src = img;
  return new Promise((resolve) => {
    imgElement.onload = () => {
      if (imgElement.width > imgElement.height) {
        resolve(2);
      } else if (imgElement.height > imgElement.width) {
        resolve(1);
      } else {
        resolve(1);
      }
    };
  });
}

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const imageTypes = await Promise.all(images.map(getImageType));
      const imageObjects = images.map((src, index) => ({ src, type: imageTypes[index] }));
      setPages(createPages(imageObjects));
    };
    loadImages();
  }, []);

  const createPages = (imageObjects) => {
    console.log('numero de imagenes ->' + imageObjects.length);
    const pages = [];
    let i = 0;
    let colPage = 0;
    let page = [];
    while (i < imageObjects.length) {
      console.log('imagen ->' + i);
      if (colPage === 0) {
        colPage= imageObjects[i].type;
        console.log('INICIO' + i);
      } else if (colPage + imageObjects[i].type > 3) {
        pages.push(page);
        console.log('PAGINAS->' + pages.length);
        page = [];
        colPage = imageObjects[i].type;
        console.log('NEW' + i);
      } else {
        colPage += imageObjects[i].type;
        console.log('SAME' + i);
      }
      page.push(imageObjects[i]);
      i++;
    }
    pages.push(page);

    return pages;
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
  };

  return (
    <section id="about" className="text-center p-0 mt-6">
      <h3 className="text-3xl font-bold">Sobre Nosotros</h3>
      <p className="mt-4 text-lg">Pavimentos Alin es una empresa con más de 20 años de experiencia en pavimentación y hormigón.</p>

      {/* Carrusel con ancho fijo */}
      <div className="relative mt-6 mx-auto max-w-[1200px] overflow-hidden">
        <Carousel>
          <CarouselContent className="flex gap-4 justify-center">
            {pages[activeIndex]?.map((image, index) => (
              <CarouselItem
                key={index}
                className="w-full"
              >
                <img
                  src={image.src}
                  alt={`Obra ${index + 1}`}
                  className="w-full h-[32rem] object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-95 cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image.src);
                    setIsDialogOpen(true);
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Botones de navegación */}
        <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">Anterior</button>
        <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">Siguiente</button>
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