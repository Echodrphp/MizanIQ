"use client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HonestTooltip } from "./honest-tooltip";
import { cn } from "@/lib/utils";
import type { MetricData } from "@/types";

export function MetricCard({ metric, className }: { metric: MetricData; className?: string }) {
  const TrendIcon = metric.trend?.direction === "up" ? TrendingUp : metric.trend?.direction === "down" ? TrendingDown : Minus;
  const trendColor = metric.trend ? (metric.trend.isPositive ? "text-success" : "text-danger") : "text-neutral-400";

  return (
    <Card className={cn("p-4 hover:shadow-md transition-shadow", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{metric.label}</span>
      </div>
      <div className="flex items-end justify-between mb-3">
        <span className="text-2xl font-bold text-neutral-900 dark:text-white">{metric.formattedValue}</span>
        {metric.trend && (
          <div className={cn("flex items-center gap-1 text-sm font-medium", trendColor)}>
            <TrendIcon className="h-4 w-4" />
            <span>{Math.abs(metric.trend.percentage).toFixed(1)}%</span>
          </div>
        )}
      </div>
      {metric.target && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>vs target</span><span>{metric.target}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div className="h-1.5 rounded-full bg-teal" style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }} />
          </div>
        </div>
      )}
      <HonestTooltip meta={metric.meta} />
    </Card>
  );
}
