import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Interfaces for animation targets
interface PageAnimationElements {
  heroRef: RefObject<HTMLDivElement>;
  formRef: RefObject<HTMLFormElement>;
}

interface StepsAnimationElements {
  sectionRef: RefObject<HTMLDivElement>;
  contentRef: RefObject<HTMLDivElement>;
}

interface EligibilityAnimationElements {
  sectionRef: RefObject<HTMLDivElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  contentRef: RefObject<HTMLDivElement>;
}

interface FAQAnimationElements {
  sectionRef: RefObject<HTMLDivElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  questionsRef: RefObject<HTMLDivElement>;
}

interface CategoriesAnimationElements {
  sectionRef: RefObject<HTMLDivElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  contentRef: RefObject<HTMLDivElement>;
}

/**
 * Animates the main page hero and form elements
 */
export const animatePageElements = ({
  heroRef,
  formRef,
}: PageAnimationElements): void => {
  // Hero animation
  if (heroRef.current) {
    const heroContent = heroRef.current.querySelectorAll("h1, h2, p, a, span");

    gsap.fromTo(
      heroContent,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }

  // Form animation
  if (formRef.current) {
    gsap.fromTo(
      formRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      }
    );
  }
};

/**
 * Animates the fundraising steps section
 */
export const animateFundraisingSteps = ({
  sectionRef,
  contentRef,
}: StepsAnimationElements): void => {
  if (!sectionRef.current || !contentRef.current) return;

  const stepItems = contentRef.current.children;

  gsap.fromTo(
    stepItems,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    }
  );
};

/**
 * Animates the fundraising categories section
 */
export const animateFundraisingCategories = ({
  sectionRef,
  titleRef,
  contentRef,
}: CategoriesAnimationElements): void => {
  if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

  // Title animation
  gsap.fromTo(
    titleRef.current,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    }
  );

  // Category items animation
  const categoryItems = contentRef.current.children;

  gsap.fromTo(
    categoryItems,
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
      },
    }
  );
};

/**
 * Animates the eligibility criteria section
 */
export const animateEligibilityCriteria = ({
  sectionRef,
  titleRef,
  contentRef,
}: EligibilityAnimationElements): void => {
  if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

  // Title animation
  gsap.fromTo(
    titleRef.current,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    }
  );

  // Content animation
  const contentChildren = contentRef.current.children;

  gsap.fromTo(
    contentChildren,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
      },
    }
  );
};

/**
 * Animates the FAQ section
 */
export const animateFundraisingFAQ = ({
  sectionRef,
  titleRef,
  questionsRef,
}: FAQAnimationElements): void => {
  if (!sectionRef.current || !titleRef.current || !questionsRef.current) return;

  // Title animation
  gsap.fromTo(
    titleRef.current,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    }
  );

  // FAQ items animation
  const faqItems = questionsRef.current.children;

  gsap.fromTo(
    faqItems,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: questionsRef.current,
        start: "top 85%",
      },
    }
  );
};

/**
 * Toggles accordion animation for FAQ items
 */
export const animateAccordionToggle = (
  content: HTMLElement,
  icon: HTMLElement
): void => {
  if (!content || !icon) return;

  // Toggle content visibility
  if (content.classList.contains("hidden")) {
    // Open accordion
    gsap.set(content, { height: "auto" });
    gsap.from(content, { height: 0, duration: 0.3, ease: "power2.out" });
  } else {
    // Close accordion
    gsap.to(content, { height: 0, duration: 0.3, ease: "power2.in" });
  }

  // Rotate icon
  gsap.to(icon, {
    rotation: content.classList.contains("hidden") ? 0 : 45,
    duration: 0.3,
    ease: "power2.inOut",
  });
};
