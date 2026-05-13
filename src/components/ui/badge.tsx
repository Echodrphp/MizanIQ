import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-teal/10 text-teal dark:bg-teal/20",
      secondary: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      danger: "bg-danger/10 text-danger",
      info: "bg-info/10 text-info",
      demo: "border border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900",
      official: "bg-navy/10 text-navy dark:bg-cyan/20 dark:text-cyan",
      platform: "bg-teal/10 text-teal-dark dark:bg-teal/20 dark:text-teal",
      store: "bg-success/10 text-success",
      manual: "bg-info/10 text-info",
      estimated: "bg-warning/10 text-warning",
      inferred: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      thirdParty: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
