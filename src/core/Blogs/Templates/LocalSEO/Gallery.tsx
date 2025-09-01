import React from "react";

interface GalleryProps {
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ className = "" }) => {
  const images = [
    {
      src: "/images/brands/boat-detailing-chemicals.jpg",
      alt: "Boat detailing chemicals",
    },
    {
      src: "/images/brands/detailing-chemicals.jpg",
      alt: "Professional detailing chemicals",
    },
    {
      src: "/images/brands/detailing-products.jpg",
      alt: "Car detailing products",
    },
    {
      src: "/images/brands/koch-chemie.jpg",
      alt: "Koch Chemie products",
    },
    {
      src: "/images/brands/pressure-washing.jpg",
      alt: "Pressure washing equipment",
    },
    {
      src: "/images/brands/rags-brushes-gritgaurd-etc.jpg",
      alt: "Detailing accessories including rags, brushes and grit guards",
    },
  ];

  return (
    <div className={`my-8 ${className}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg"
          >
            <div className="relative w-full h-64">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="px-4 py-2 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
