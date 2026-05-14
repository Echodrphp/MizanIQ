"use client";
import { cn } from "@/lib/utils";

export function PageHeader({ title, description, children, className }: { title: string; description?: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-6", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">{title}</h1>
        {description && <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 mt-3 sm:mt-0 shrink-0">{children}</div>}
    </div>
  );
}
