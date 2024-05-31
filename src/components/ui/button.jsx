import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "justify-center bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "justify-center bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        warning:
          "justify-center border border-input bg-background text-destructive hover:bg-accent hover:text-destructive/90",
        secondary:
          "justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "justify-center hover:bg-accent hover:text-accent-foreground",
        link: "justify-center text-primary underline-offset-4 hover:underline",
        nav: "rounded-sm bg-card text-lg hover:bg-accent hover:text-accent-foreground gap-2",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "py-0.5 px-2.5 gap-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
