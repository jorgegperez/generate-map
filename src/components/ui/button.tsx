import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-text-primary shadow hover:bg-primary-hover",
        destructive:
          "bg-accent text-text-primary shadow-sm hover:bg-accent-hover",
        outline:
          "border border-secondary-light bg-secondary-dark text-text-primary shadow-sm hover:bg-secondary-light hover:text-text-primary",
        secondary:
          "bg-secondary-light text-text-primary shadow-sm hover:bg-secondary-dark",
        ghost: "hover:bg-secondary-light hover:text-text-primary",
        link: "text-primary-light underline-offset-4 hover:underline",
        iconRoundOutline:
          "!py-0 !px-[10px] rounded-full bg-secondary-dark text-text-primary hover:bg-secondary-light  flex items-center justify-center",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        iconRound: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
