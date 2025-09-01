import React, { useRef, useState, useEffect } from "react";
import { galleryItems } from "./gallery.data";

interface BlogGalleryProps {
  items?: typeof galleryItems;
}

const BlogGallery: React.FC<BlogGalleryProps> = ({ items = galleryItems }) => {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const setVideoRef = (id: string, el: HTMLVideoElement | null) => {
    if (el) videoRefs.current[id] = el;
  };

  useEffect(() => {
    if (!isVisible) return;

    Object.values(videoRefs.current).forEach((videoElement) => {
      if (!videoElement) return;
      videoElement.muted = true;
      videoElement.playbackRate = 1;
      videoElement.setAttribute("playsinline", "");
      videoElement.setAttribute("preload", "auto");
      videoElement.play().catch(() => {});
    });
  }, [isVisible]);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderGalleryItem = (item: any, index: number) => {
    const isActive = activeIndex === index;

    if (item.type === "image") {
      return (
        <div
          key={item.id}
          className={`relative overflow-hidden transition-transform duration-300 rounded-lg cursor-pointer aspect-square ${
            isActive ? "ring-2 ring-lightning-yellow scale-[1.02]" : ""
          }`}
          onClick={() => handleItemClick(index)}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="absolute inset-0 object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 to-transparent hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-2 text-sm text-white">
              {item.alt}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={item.id}
          className={`relative overflow-hidden transition-transform duration-300 rounded-lg cursor-pointer aspect-square ${
            isActive ? "ring-2 ring-lightning-yellow scale-[1.02]" : ""
          }`}
          onClick={() => handleItemClick(index)}
        >
          {isVisible && (
            <video
              ref={(el) => setVideoRef(item.id, el)}
              playsInline
              loop
              muted
              className="absolute inset-0 object-cover w-full h-full"
              poster={item.poster || ""}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 to-transparent hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-2 text-sm text-white">
              {item.alt}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="my-10">
      <h2 className="mb-4 text-2xl font-bold text-lightning-yellow cosmic-lager">
        Our Menu Gallery
      </h2>
      <div
        ref={containerRef}
        className="grid w-full h-auto grid-cols-2 gap-4 md:grid-cols-4"
      >
        {items.map(renderGalleryItem)}
      </div>
    </div>
  );
};

export default BlogGallery;
