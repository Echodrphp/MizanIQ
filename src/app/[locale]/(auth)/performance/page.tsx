"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import { DEMO_META } from "@/data/demo-clients";
import type { MetricData } from "@/types";

const platformBreakdown = [
  { platform: "Meta Ads", spend: 18200, revenue: 65000, roas: 3.57, trend: "up" as const, share: 64, color: "bg-blue-500" },
  { platform: "Google Ads", spend: 7500, revenue: 24300, roas: 3.24, trend: "down" as const, share: 26, color: "bg-amber-500" },
  { platform: "TikTok Ads", spend: 2750, revenue: 7500, roas: 2.73, trend: "up" as const, share: 10, color: "bg-purple-500" },
];

export default function PerformancePage() {
  const t = useTranslations("pages.performance");
  const tCommon = useTranslations("common");

  const [{ metrics, weekly }] = useState(() => {
    const now = Date.now();
    return {
      metrics: [
        { label: "totalSpend", value: 28450, formattedValue: "$28,450", trend: { direction: "up" as const, percentage: 12.5, isPositive: false }, meta: { ...DEMO_META, confidence: "high" as const, lastUpdated: new Date(now - 60000) } },
        { label: "revenue", value: 96800, formattedValue: "$96,800", trend: { direction: "up" as const, percentage: 8.3, isPositive: true }, meta: { ...DEMO_META, confidence: "high" as const, lastUpdated: new Date(now - 60000) } },
        { label: "roas", value: 3.4, formattedValue: "3.40x", trend: { direction: "down" as const, percentage: 4.2, isPositive: false }, target: 4.0, meta: { ...DEMO_META, confidence: "medium" as const, lastUpdated: new Date(now - 60000) } },
        { label: "purchases", value: 142, formattedValue: "142", trend: { direction: "up" as const, percentage: 6.1, isPositive: true }, meta: { ...DEMO_META, confidence: "high" as const, lastUpdated: new Date(now - 60000) } },
        { label: "leads", value: 387, formattedValue: "387", trend: { direction: "up" as const, percentage: 15.2, isPositive: true }, meta: { ...DEMO_META, confidence: "medium" as const, lastUpdated: new Date(now - 60000) } },
        { label: "cpa", value: 200, formattedValue: "$200", trend: { direction: "up" as const, percentage: 5.8, isPositive: false }, target: 180, meta: { ...DEMO_META, confidence: "high" as const, lastUpdated: new Date(now - 60000) } },
        { label: "ctr", value: 2.8, formattedValue: "2.8%", trend: { direction: "down" as const, percentage: 3.1, isPositive: false }, meta: { ...DEMO_META, confidence: "high" as const, lastUpdated: new Date(now - 60000) } },
        { label: "cpm", value: 12.5, formattedValue: "$12.50", trend: { direction: "up" as const, percentage: 8.0, isPositive: false }, meta: { ...DEMO_META, confidence: "high" as const, lastUpdated: new Date(now - 60000) } },
      ],
      weekly: [
        { week: 1, spend: 6200, revenue: 22000, roas: 3.55 },
        { week: 2, spend: 7100, revenue: 25500, roas: 3.59 },
        { week: 3, spend: 7800, revenue: 24800, roas: 3.18 },
        { week: 4, spend: 7350, revenue: 24500, roas: 3.33 },
      ],
    };
  });

  const localizedMetrics: MetricData[] = metrics.map((m) => ({
    ...m,
    label: t(`metrics.${m.label}`),
  }));

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Badge variant="demo" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />{tCommon("demoData")}</Badge>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {localizedMetrics.slice(0, 4).map((m) => <MetricCard key={m.label} metric={m} />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {localizedMetrics.slice(4).map((m) => <MetricCard key={m.label} metric={m} />)}
      </div>

      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500" />
        <CardHeader className="border-b border-neutral-100 dark:border-[#2A3544]">
          <CardTitle className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-500/20 dark:to-cyan-500/20">
              <BarChart3 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            {t("platformBreakdown")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-[#2A3544] bg-neutral-50/50 dark:bg-[#0F1419]/50">
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.platform")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.spend")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.revenue")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.roas")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.share")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.trend")}</th>
                </tr>
              </thead>
              <tbody>
                {platformBreakdown.map((p) => (
                  <tr key={p.platform} className="border-b border-neutral-100 dark:border-[#2A3544] hover:bg-sky-50/30 dark:hover:bg-[#0F1419] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-2 w-2 rounded-full ${p.color}`} />
                        <span className="font-semibold text-neutral-900 dark:text-white">{p.platform}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-neutral-700 dark:text-neutral-300 font-medium">${p.spend.toLocaleString()}</td>
                    <td className="py-3.5 px-5 text-neutral-700 dark:text-neutral-300 font-medium">${p.revenue.toLocaleString()}</td>
                    <td className="py-3.5 px-5"><span className="font-bold text-neutral-900 dark:text-white">{p.roas.toFixed(2)}x</span></td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-neutral-100 dark:bg-[#2A3544] overflow-hidden">
                          <div className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" style={{ width: `${p.share}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{p.share}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      {p.trend === "up" ? (
                        <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 dark:bg-emerald-500/10">
                          <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      ) : (
                        <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 dark:bg-rose-500/10">
                          <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-neutral-100 dark:border-[#2A3544] bg-neutral-50/30 dark:bg-[#0F1419]/30">
            <HonestTooltip meta={DEMO_META} />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-400 to-sky-400" />
        <CardHeader className="border-b border-neutral-100 dark:border-[#2A3544]">
          <CardTitle className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-emerald-500/20 dark:to-sky-500/20">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            {t("weeklyPerformance")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {weekly.map((w) => (
              <div key={w.week} className="rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-500/5 dark:to-cyan-500/5 border border-sky-100 dark:border-[#2A3544] p-4 hover:shadow-md hover:shadow-sky-100 dark:hover:shadow-none transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-sky-700 dark:text-sky-400">{t("weekly.week")} {w.week}</p>
                  <span className="text-[10px] font-bold text-neutral-400">#{w.week}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500">{t("weekly.spend")}</span>
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">${w.spend.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500">{t("weekly.revenue")}</span>
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">${w.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-sky-200/50 dark:border-[#2A3544]">
                    <span className="text-xs text-neutral-500">{t("weekly.roas")}</span>
                    <span className="text-base font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">{w.roas.toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-[#2A3544]">
            <HonestTooltip meta={DEMO_META} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
