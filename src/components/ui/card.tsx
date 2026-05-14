import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-white transition-all duration-200 relative overflow-hidden",
      "border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.03)]",
      "hover:shadow-[0_4px_8px_rgba(56,189,248,0.06),0_8px_30px_rgba(56,189,248,0.08)] hover:border-sky-200",
      "dark:border-[#2A3544] dark:bg-[#1C2432] dark:shadow-none dark:hover:border-[#38BDF8]/30 dark:hover:shadow-[0_0_0_1px_rgba(56,189,248,0.1)]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-5", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-base font-semibold text-neutral-900 dark:text-neutral-100", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
