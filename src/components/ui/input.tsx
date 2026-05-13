import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400",
      "focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-teal",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
export { Input };
