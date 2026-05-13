import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-teal text-white hover:bg-teal-dark shadow-sm",
        secondary: "bg-navy text-white hover:bg-navy-light shadow-sm",
        destructive: "bg-danger text-white hover:bg-danger-light",
        success: "bg-success text-white hover:bg-success-light",
        outline: "border-2 border-teal text-teal hover:bg-teal/10",
        ghost: "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
        link: "text-teal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
));
Button.displayName = "Button";

export { Button, buttonVariants };
