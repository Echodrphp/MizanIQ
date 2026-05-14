import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-lg border bg-white px-3.5 py-2 text-sm transition-all",
      "border-neutral-200 placeholder:text-neutral-400",
      "focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400",
      "hover:border-neutral-300",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:border-[#2A3544] dark:bg-[#1C2432] dark:text-neutral-100 dark:hover:border-[#38465A] dark:focus:border-sky-500 dark:focus:ring-sky-500/20",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
export { Input };
