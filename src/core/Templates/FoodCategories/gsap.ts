import { RefObject, useEffect } from "react";

export interface AnimationRefs {
  imageRef: RefObject<HTMLDivElement>;
  textRef: RefObject<HTMLDivElement>;
}

export const useAnimateOnView = (
  inView: boolean,
  refs: AnimationRefs
): void => {
  const { imageRef, textRef } = refs;

  useEffect(() => {
    if (inView) {
      // Animate the image
      if (imageRef.current) {
        imageRef.current.classList.add("opacity-100", "translate-y-0");
        imageRef.current.classList.remove("opacity-0", "translate-y-10");
      }

      // Animate the text with a slight delay
      if (textRef.current) {
        setTimeout(() => {
          if (textRef.current) {
            textRef.current.classList.add("opacity-100", "translate-y-0");
            textRef.current.classList.remove("opacity-0", "translate-y-10");
          }
        }, 200);
      }
    }
  }, [inView, imageRef, textRef]);
};
