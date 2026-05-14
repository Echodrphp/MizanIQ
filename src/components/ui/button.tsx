import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 shadow-md shadow-sky-200/50 hover:shadow-lg hover:shadow-sky-300/50 dark:shadow-sky-500/20",
        secondary: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 shadow-sm",
        destructive: "bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-200/50",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200/50",
        outline: "border border-neutral-200 bg-white text-neutral-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 dark:border-[#2A3544] dark:bg-transparent dark:text-neutral-300 dark:hover:bg-[#1C2432] dark:hover:text-white",
        ghost: "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-[#1C2432] dark:hover:text-white",
        link: "text-sky-600 underline-offset-4 hover:underline dark:text-sky-400",
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
