"use client";
import { Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ComingSoon({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 px-6 text-center", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/10 mb-4"><Rocket className="h-8 w-8 text-teal" /></div>
      <Badge variant="default" className="mb-3">Coming Soon</Badge>
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{title}</h3>
      {description && <p className="text-sm text-neutral-500 max-w-md">{description}</p>}
    </div>
  );
}
