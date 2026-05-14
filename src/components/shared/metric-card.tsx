"use client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HonestTooltip } from "./honest-tooltip";
import { cn } from "@/lib/utils";
import type { MetricData } from "@/types";

export function MetricCard({ metric, className }: { metric: MetricData; className?: string }) {
  const TrendIcon = metric.trend?.direction === "up" ? TrendingUp : metric.trend?.direction === "down" ? TrendingDown : Minus;
  const isPositive = metric.trend?.isPositive;
  const trendColor = metric.trend
    ? (isPositive ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400")
    : "text-neutral-400";
  const trendBg = metric.trend
    ? (isPositive
        ? "bg-emerald-50 border-emerald-200/50 dark:bg-emerald-500/10 dark:border-emerald-500/20"
        : "bg-rose-50 border-rose-200/50 dark:bg-rose-500/10 dark:border-rose-500/20")
    : "bg-neutral-50 dark:bg-neutral-800";

  return (
    <Card className={cn("p-5 group relative overflow-hidden", className)}>
      {/* Subtle decorative gradient blob */}
      <div className="absolute -top-12 -end-12 h-32 w-32 rounded-full bg-gradient-to-br from-sky-100/40 to-cyan-100/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-sky-500/10 dark:to-cyan-500/10" />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{metric.label}</span>
          {metric.trend && (
            <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold border", trendColor, trendBg)}>
              <TrendIcon className="h-3 w-3" />
              <span>{Math.abs(metric.trend.percentage).toFixed(1)}%</span>
            </div>
          )}
        </div>

        <div className="mb-3">
          <span className="text-[28px] font-bold text-neutral-900 dark:text-white tracking-tight leading-none">{metric.formattedValue}</span>
        </div>

        {metric.target && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-neutral-500">vs target</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">{metric.target}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-[#2A3544] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-neutral-100 dark:border-[#2A3544]">
          <HonestTooltip meta={metric.meta} />
        </div>
      </div>
    </Card>
  );
}
