// src/core/components/ui/Button/index.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/core/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonProps } from "./types";

const buttonVariants = cva(
  "inline-flex items-center justify-center  leading-none whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-sossOrange",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        brand:
          "bg-black text-sossOrange border-white border-2 outline-sossOrange outline-1 hover:bg-white",
        action: "bg-red-500 text-white hover:bg-red-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        base: "rounded-md py-3 px-12",
        lg: "h-11 rounded-md pt-3.5 pb-2 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
