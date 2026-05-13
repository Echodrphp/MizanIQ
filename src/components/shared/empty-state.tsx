"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction, className }: { icon: LucideIcon; title: string; description: string; actionLabel?: string; onAction?: () => void; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 mb-4">
        <Icon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
