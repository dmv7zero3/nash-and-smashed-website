import { gsap } from "gsap";
import { useEffect, RefObject } from "react";

interface MenuAnimationElements {
  menuContainer: RefObject<HTMLDivElement>;
  navItems: RefObject<HTMLElement>;
  socialIcons: RefObject<HTMLDivElement>;
  orderButton: RefObject<HTMLAnchorElement>;
  closeButton: RefObject<HTMLButtonElement>;
}

export const animateMenuOpen = (
  elements: MenuAnimationElements,
  isOpen: boolean
): gsap.Context | null => {
  const { menuContainer, navItems, socialIcons, orderButton, closeButton } =
    elements;

  // Ensure elements exist
  if (
    !menuContainer.current ||
    !navItems.current ||
    !socialIcons.current ||
    !orderButton.current ||
    !closeButton.current
  )
    return null;

  // Create animation context
  return gsap.context(() => {
    // Reset all animations
    gsap.set(
      [
        menuContainer.current,
        navItems.current?.children || [],
        socialIcons.current,
        orderButton.current,
        closeButton.current,
      ],
      { clearProps: "all" }
    );

    if (isOpen) {
      // Animate the container background
      gsap.fromTo(
        menuContainer.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate close button
      gsap.fromTo(
        closeButton.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "back.out" }
      );

      // Animate nav items with stagger
      gsap.fromTo(
        navItems.current?.children || [],
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Animate social icons
      gsap.fromTo(
        socialIcons.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.6,
        }
      );

      // Animate order button
      gsap.fromTo(
        orderButton.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.8,
        }
      );
    } else {
      // Closing animations (optional)
      gsap.to(menuContainer.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.in",
      });
    }
  });
};
