import gsap from "gsap";

interface AnimationElements {
  cardRef: React.RefObject<HTMLDivElement>;
  imageRef?: React.RefObject<HTMLDivElement>;
  contentRef?: React.RefObject<HTMLDivElement>;
  tableRef?: React.RefObject<HTMLDivElement>;
}

export const animateElements = (
  inView: boolean,
  elements: AnimationElements,
  isReversed: boolean = false
): void => {
  if (!inView) return;

  const { cardRef, imageRef, contentRef, tableRef } = elements;

  // Base animation for the card
  if (cardRef.current) {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }

  // Animate image if it exists
  if (imageRef?.current) {
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        x: isReversed ? 30 : -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      }
    );
  }

  // Animate content if it exists
  if (contentRef?.current) {
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        x: isReversed ? -30 : 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      }
    );
  }

  // Animate table if it exists
  if (tableRef?.current) {
    gsap.fromTo(
      tableRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );
  }
};
