import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel.jsx";
import { Dialog, DialogContent } from "./ui/dialog.jsx";
import aboutText from "@/data/about.json"; 

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
    // console.log('numero de imagenes ->' + imageObjects.length);
    const pages = [];
    let colPage = 0;
    let page = [];
    for (let i = 0; i < imageObjects.length; i++) {
      //console.log('imagen ->' + i);
      // Si agregar la imagen supera el límite, se guarda la página y se inicia otra
      if (colPage + imageObjects[i].type > 3) {
        pages.push([...page]);  // Clonar la página antes de reiniciar
        //console.log('Página añadida ->', pages.length);
        page = []; // Reiniciar la página
        colPage = 0; // Reiniciar el contador
      }
      page.push(imageObjects[i]); // Agregar imagen actual
      colPage += imageObjects[i].type; // Actualizar contador de tipo
    }
    // Agregar la última página si tiene contenido
    if (page.length > 0) {
      pages.push([...page]);
    }
    //console.log('Total de páginas creadas ->', pages.length);
    return pages;
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
  };

  return (
    <section id="about" className="bg-gray-100 text-center p-0 mt-6 border-t border-r border-l pt-4 shadow-md rounded-t-lg">
    <h3 className="text-3xl font-bold">{aboutText.title}</h3>
    <div className="text-justify mt-4 text-lg ml-4 mr-4">
      {aboutText.content.split('<br/>').map((paragraph, idx) => (
        <p
          key={idx}
          className="mb-4"
          dangerouslySetInnerHTML={{
            __html: paragraph
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/__(.*?)__/g, "<u>$1</u>")
          }}
        />
      ))}
    </div>

    {/* Carrusel con ancho fijo */}
    <div className="relative mt-6 mx-auto max-w-[1200px] overflow-hidden">
    <Carousel>
  <CarouselContent className="flex flex-nowrap justify-center overflow-hidden">
    {pages[activeIndex]?.map((image, index, array) => {
      let basisClass = "!basis-full"; // Por defecto, si solo hay una imagen

      if (array.length === 2) {
        if (array[0].type === 1 && array[1].type === 1) {
          basisClass = "!basis-1/2"; // Caso especial: 2 imágenes tipo 1 → 50%-50%
        } else {
          basisClass = image.type === 2 ? "!basis-2/3" : "!basis-1/3"; // Distribución estándar
        }
      } else if (array.length === 3) {
        basisClass = "!basis-1/3"; // Para 3 imágenes iguales
      }

      return (
        <CarouselItem
          key={index}
          className={`flex-shrink-0 flex-grow-0 ${basisClass}`} // Forzamos el ancho dinámico
        >
          <img
            src={image.src}
            alt={`Obra ${index + 1}`}
            className="h-[32rem] w-full object-cover rounded-lg shadow-lg transition-transform duration-500 hover:scale-95 cursor-pointer"
            onClick={() => {
              setSelectedImage(image.src);
              setIsDialogOpen(true);
            }}
          />
        </CarouselItem>
      );
    })}
  </CarouselContent>
</Carousel>

      {/* Botones de navegación */}
      <button 
  onClick={handlePrev} 
  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-100 hover:shadow-lg hover:scale-110 text-white text-lg leading-none text-center"
>
⟨
</button>

<button 
  onClick={handleNext} 
  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-100 hover:shadow-lg hover:scale-110 text-white text-lg leading-none text-center"
>
⟩
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