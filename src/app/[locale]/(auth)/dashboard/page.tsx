"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AlertTriangle, TrendingUp, CheckCircle2, Zap, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/shared/metric-card";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import type { MetricData } from "@/types";

const scoreColors = {
  critical: "stroke-rose-500 dark:stroke-rose-400",
  needs_attention: "stroke-amber-500 dark:stroke-amber-400",
  healthy: "stroke-emerald-500 dark:stroke-emerald-400"
};

const priorityStyles = {
  critical: { bg: "bg-rose-50 dark:bg-rose-500/10", text: "text-rose-700 dark:text-rose-400" },
  high: { bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-700 dark:text-amber-400" },
  medium: { bg: "bg-sky-50 dark:bg-sky-500/10", text: "text-sky-700 dark:text-sky-400" },
  low: { bg: "bg-neutral-50 dark:bg-neutral-800/50", text: "text-neutral-600 dark:text-neutral-400" },
};

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  // Lazy state init runs once on mount (avoids react-hooks/purity error)
  const [{ demoMetrics, healthMeta }] = useState(() => {
    const now = Date.now();
    return {
      demoMetrics: [
        { label: t("metrics.totalSpend"), value: 28450, formattedValue: "$28,450", trend: { direction: "up" as const, percentage: 12.5, isPositive: false }, meta: { source: "demo" as const, confidence: "high" as const, lastUpdated: new Date(now - 300000), limitation: "Demo data" } },
        { label: t("metrics.revenue"), value: 96800, formattedValue: "$96,800", trend: { direction: "up" as const, percentage: 8.3, isPositive: true }, meta: { source: "demo" as const, confidence: "high" as const, lastUpdated: new Date(now - 300000) } },
        { label: t("metrics.avgRoas"), value: 3.4, formattedValue: "3.40x", trend: { direction: "down" as const, percentage: 4.2, isPositive: false }, target: 4.0, meta: { source: "demo" as const, confidence: "medium" as const, lastUpdated: new Date(now - 600000) } },
        { label: t("metrics.activeClients"), value: 3, formattedValue: "3", trend: { direction: "stable" as const, percentage: 0, isPositive: true }, meta: { source: "demo" as const, confidence: "high" as const, lastUpdated: new Date(now - 60000) } },
      ] as MetricData[],
      healthMeta: { source: "demo" as const, confidence: "medium" as const, lastUpdated: new Date(now - 600000), limitation: "Scores from demo data" },
    };
  });

  const clients = [
    { name: "Level Egypt", score: 72, status: "needs_attention" as const, issue: t("issues.creativeFatigue") },
    { name: "Smart Home Damietta", score: 45, status: "critical" as const, issue: t("issues.trackingPixel") },
    { name: "Al Reda Steel", score: 88, status: "healthy" as const, issue: t("issues.scaling") },
  ];

  const actions = [
    { id: 1, title: t("actions.pauseAdSet"), client: "Level Egypt", priority: "critical" as const, reason: t("actions.reasons.cpaAboveTarget") },
    { id: 2, title: t("actions.fixPixel"), client: "Smart Home Damietta", priority: "critical" as const, reason: t("actions.reasons.purchaseMissing") },
    { id: 3, title: t("actions.scaleCampaign"), client: "Al Reda Steel", priority: "high" as const, reason: t("actions.reasons.cplBelowTarget") },
    { id: 4, title: t("actions.refreshCreatives"), client: "Level Egypt", priority: "medium" as const, reason: t("actions.reasons.frequencyHigh") },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={t("commandCenter")} description={`${t("welcome")}، ${t("demoUser")}`}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/30">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{t("demoMode")}</span>
        </div>
      </PageHeader>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-rose-400 to-rose-500" />
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-500/20 dark:to-rose-500/5">
              <AlertTriangle className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">1</p>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">{t("criticalClients")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-500/20 dark:to-amber-500/5">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">1</p>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">{t("attentionClients")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-500" />
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-500/20 dark:to-emerald-500/5">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">1</p>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">{t("healthyClients")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoMetrics.map((m) => <MetricCard key={m.label} metric={m} />)}
      </div>

      {/* Actions + Client Health */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 dark:border-[#2A3544]">
            <CardTitle className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-500/20 dark:to-cyan-500/20">
                <Zap className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              </div>
              {t("todayActions")}
            </CardTitle>
            <Badge variant="default" className="bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400">{actions.length}</Badge>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {actions.map((a) => {
              const style = priorityStyles[a.priority];
              return (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-[#0F1419] transition-colors group cursor-pointer">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                    <Zap className={`h-4 w-4 ${style.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{a.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{a.client} — {a.reason}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${style.bg} ${style.text} shrink-0`}>
                    {t(`priority.${a.priority}`)}
                  </span>
                </div>
              );
            })}
            <Button variant="ghost" className="w-full mt-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-500/10">
              {t("viewAllActions")} <ArrowRight className="h-4 w-4 ms-1 rtl:rotate-180" />
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-neutral-100 dark:border-[#2A3544]">
            <CardTitle className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/20">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              {t("clientHealth")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-[#0F1419] transition-colors cursor-pointer">
                <div className="relative h-14 w-14 shrink-0">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-neutral-100 dark:stroke-[#2A3544]" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.5" fill="none" className={scoreColors[c.status]} strokeWidth="3" strokeDasharray={`${(c.score / 100) * 97.4} 97.4`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-neutral-900 dark:text-white">{c.score}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{c.name}</p>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{c.issue}</p>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-neutral-100 dark:border-[#2A3544]">
              <HonestTooltip meta={healthMeta} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-neutral-400 dark:text-neutral-500">⚖️ {t("disclaimer")}</p>
      </div>
    </div>
  );
}
