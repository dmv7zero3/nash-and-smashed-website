import { RefObject } from "react";

interface AnimationRefs {
  cardRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLDivElement>;
  contentRef: RefObject<HTMLDivElement>;
}

export const applyVisibleClasses = (
  refs: AnimationRefs,
  isVisible: boolean,
  isReversed: boolean
): void => {
  const { cardRef, imageRef, contentRef } = refs;

  // Only apply classes when element becomes visible
  // No need to handle the "else" case with triggerOnce: true
  if (isVisible) {
    if (cardRef.current) {
      cardRef.current.classList.add("opacity-100");
      cardRef.current.classList.add("translate-y-0");
      cardRef.current.classList.remove("opacity-0");
      cardRef.current.classList.remove("translate-y-20");
    }

    if (imageRef.current) {
      imageRef.current.classList.add("opacity-100");
      imageRef.current.classList.add("translate-x-0");
      imageRef.current.classList.remove("opacity-0");
      imageRef.current.classList.remove(
        isReversed ? "-translate-x-full" : "translate-x-full"
      );
    }

    if (contentRef.current) {
      contentRef.current.classList.add("opacity-100");
      contentRef.current.classList.add("translate-y-0");
      contentRef.current.classList.remove("opacity-0");
      contentRef.current.classList.remove("translate-y-10");
    }
  }
};
