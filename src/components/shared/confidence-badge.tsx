"use client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { ConfidenceLevel } from "@/types";

const config: Record<ConfidenceLevel, { label: string; variant: "success" | "warning" | "danger" | "secondary"; dot: string }> = {
  high: { label: "High", variant: "success", dot: "bg-success" },
  medium: { label: "Medium", variant: "warning", dot: "bg-warning" },
  low: { label: "Low", variant: "danger", dot: "bg-danger" },
  unknown: { label: "Unknown", variant: "secondary", dot: "bg-neutral-400" },
};

export function ConfidenceBadge({ level, className }: { level: ConfidenceLevel; className?: string }) {
  const c = config[level];
  return <Badge variant={c.variant} className={cn("gap-1", className)}><span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />{c.label}</Badge>;
}
