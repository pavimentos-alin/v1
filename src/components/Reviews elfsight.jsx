import { useEffect, useState } from "react";

export default function Reviews() {
  const [iframeHeight, setIframeHeight] = useState("640px");

  useEffect(() => {
    const handleMessage = (event) => {
      // Verifica que el mensaje proviene de tu dominio en `elf.site`
      if (event.origin.includes("elf.site")) {
        const newHeight = event.data?.height;
        if (newHeight) {
          setIframeHeight(`${newHeight}px`);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section id="reviews" className="py-16 text-center w-full bg-gray-100 border-l border-r">
      <div className="mt-6">
        <iframe
          src="https://4827e2c83b8847cfba5661d41d525afd.elf.site"
          className="w-full"
          style={{ height: iframeHeight }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
