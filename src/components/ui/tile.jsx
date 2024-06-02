import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from './button';
import { BsThreeDots } from "react-icons/bs";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const tileVariants = cva(
  "flex-1 inline-flex items-center justify-center relative whitespace-nowrap max-w-60 min-w-36 rounded-lg text-h4 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        collection: 
          "h-16 bg-secondary text-secondary-foreground hover:bg-secondary/20 bg-gradient-to-r from-sky-300 to-indigo-300",
        category:
          "h-20 bg-destructive text-destructive-foreground hover:bg-destructive/90"
      },
    },
    defaultVariants: {
      variant: "collection",
    },
  }
);

const Tile = React.forwardRef(
  ({ className, variant, content, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "tile";
    return (
      <Comp
        className={cn(tileVariants({ variant, className }))}
        ref={ref}
        
      >{children}
      <Button variant="ghost" size="sm" className="absolute top-0 right-0 m-1.5"><BsThreeDots /></Button>
      </Comp>
    );
  }
);
Tile.displayName = "Tile";

export { Tile, tileVariants };
