import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-sky-50 text-sky-700 border border-sky-200/50 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20",
      secondary: "bg-neutral-100 text-neutral-700 dark:bg-[#2A3544] dark:text-neutral-300",
      success: "bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
      warning: "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
      danger: "bg-rose-50 text-rose-700 border border-rose-200/50 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
      info: "bg-blue-50 text-blue-700 border border-blue-200/50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
      demo: "border border-dashed border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400",
      official: "bg-indigo-50 text-indigo-700 border border-indigo-200/50 dark:bg-indigo-500/10 dark:text-indigo-400",
      platform: "bg-cyan-50 text-cyan-700 border border-cyan-200/50 dark:bg-cyan-500/10 dark:text-cyan-400",
      store: "bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400",
      manual: "bg-blue-50 text-blue-700 border border-blue-200/50 dark:bg-blue-500/10 dark:text-blue-400",
      estimated: "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400",
      inferred: "bg-purple-50 text-purple-700 border border-purple-200/50 dark:bg-purple-500/10 dark:text-purple-400",
      thirdParty: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800/50 dark:text-neutral-400",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
