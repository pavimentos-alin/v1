import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function ImageSlider({ jsonFile }) {
  const [images, setImages] = useState([]);
  const [captions, setCaptions] = useState({});
  const [title, setTitle] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        
        const jsonModules = import.meta.glob("../../data/page_*.json", { eager: true });
        const matched = jsonModules[`../../data/page_${jsonFile}`];

        if (!matched) {
          throw new Error(`No se encontró el archivo: page_${jsonFile}`);
        }

        const { title, ...textos } = matched;

        setCaptions(textos);
        setTitle(title || "");

        const allImages = import.meta.glob(
          "/src/assets/images/pages/*.{jpg,jpeg,png,webp}",
          { eager: true }
        );

        const loaded = Object.entries(allImages)
          .map(([path, mod]) => {
            const name = path.split("/").pop();
            return { name, src: mod.default };
          })
          .filter(({ name }) => {
            const prefix = name.split("_")[0];
            return Object.keys(textos).includes(prefix);
          });

        setImages(loaded);
      } catch (error) {
        console.error("Error cargando imágenes o JSON:", error);
        setCaptions({});
        setImages([]);
      }
      
      ImageSlider.propTypes = {
        jsonFile: PropTypes.string.isRequired,
      };
    };

    loadData();
  }, [jsonFile]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToIndex = (i) => setIndex(i);

  const current = images[index];
  const prefix = current?.name.split("_")[0];
  const caption = captions[prefix] || "";

  return (
    <div className="w-full max-w-screen overflow-hidden px-4 relative">
      {title && (
        <h2 className="text-3xl font-semibold mb-6 text-center">{title}</h2>
      )}

      {current && (
        <div className="flex flex-col items-center relative">
          {/* Imagen actual */}
          <img
            src={current.src}
            alt={current.name}
            className="w-full object-cover max-h-[70vh] rounded-lg shadow-md"
          />

          {/* Botón anterior */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-100 hover:shadow-lg hover:scale-110 text-white text-lg"
          >
            ⟨
          </button>

          {/* Botón siguiente */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-100 hover:shadow-lg hover:scale-110 text-white text-lg"
          >
            ⟩
          </button>

          {/* Puntos indicadores */}
          <div className="flex space-x-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === index
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
              ></button>
            ))}
          </div>

          {/* Texto de la imagen */}
          {caption && (
            <div className="mt-4 px-6 text-justify text-gray-700 text-lg">
            {caption.split('<br/>').map((paragraph, idx) => (
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
          )}
        </div>
      )}
    </div>
  );
}
