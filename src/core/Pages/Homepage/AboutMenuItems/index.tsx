import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { MenuItemCardProps, menuItems } from "./types";
import { applyVisibleClasses } from "./animations";

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, index }) => {
  // Increased threshold for more reliable triggering
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
    rootMargin: "-50px 0px",
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Determine if this row should be reversed (image on right)
  const isReversed = index % 2 === 1;

  useEffect(() => {
    applyVisibleClasses({ cardRef, imageRef, contentRef }, inView, isReversed);
  }, [inView, isReversed, index]);

  return (
    <div ref={ref} className="mb-7 last:mb-0">
      <div
        ref={cardRef}
        className="overflow-hidden transition-all duration-700 ease-out translate-y-20 opacity-0"
      >
        <div
          className={`flex flex-col md:flex-row items-center ${
            isReversed ? "md:flex-row-reverse" : ""
          }`}
        >
          <div
            ref={imageRef}
            className={`transition-all duration-700 ease-out delay-200 transform md:w-1/2 opacity-0 ${
              isReversed ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-center w-full">
              <img
                src={item.imagePath}
                className="object-contain w-full h-auto mx-auto md:max-w-[98%] transition-transform duration-500 transform hover:scale-105"
                alt={item.title}
              />
            </div>
          </div>
          <div
            ref={contentRef}
            className={`md:w-1/2 p-6 md:p-8 text-[#4d3d0b] transition-all duration-700 ease-out delay-400 transform opacity-0 translate-y-10 ${
              isReversed ? "md:text-right" : "md:text-left"
            }`}
          >
            <h2 className="mb-2.5 american">{item.title}</h2>
            <div
              className={`w-16 h-1 mb-2.5 bg-lightning-yellow-400 ${
                isReversed ? "md:ml-auto" : ""
              }`}
            ></div>
            <p className="text-xl leading-relaxed proxima-nova">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// AboutMenuItems component remains the same
const AboutMenuItems: React.FC = () => {
  return (
    <section className="py-16 text-dark-olive-bark">
      <div className="w-11/12 px-4 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="american">Our Signature Menu</h1>
          <div className="w-24 h-1 mx-auto mt-4 mb-6 bg-dark-olive-bark"></div>
          <p className="max-w-2xl mx-auto text-xl proxima-nova">
            Taste the quality in every bite with our halal, locally-sourced
            ingredients
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <MenuItemCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMenuItems;
