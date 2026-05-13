"use client";
import { cn } from "@/lib/utils";

export function PageHeader({ title, description, children, className }: { title: string; description?: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6", className)}>
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{title}</h1>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 mt-3 sm:mt-0">{children}</div>}
    </div>
  );
}
