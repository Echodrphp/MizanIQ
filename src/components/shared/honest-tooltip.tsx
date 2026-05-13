"use client";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfidenceBadge } from "./confidence-badge";
import { SourceBadge } from "./source-badge";
import { getRelativeTime } from "@/lib/utils";
import type { HonestMeta } from "@/types";

export function HonestTooltip({ meta, className }: { meta: HonestMeta; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5 text-xs text-neutral-500", className)}>
      <SourceBadge source={meta.source} />
      <ConfidenceBadge level={meta.confidence} />
      <span className="text-neutral-400">•</span>
      <span>{getRelativeTime(meta.lastUpdated)}</span>
      {meta.limitation && <span className="inline-flex items-center gap-0.5 text-neutral-400" title={meta.limitation}><Info className="h-3 w-3" /></span>}
    </div>
  );
}
