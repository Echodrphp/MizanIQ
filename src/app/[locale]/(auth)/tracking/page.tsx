"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import type { HonestMeta } from "@/types";

const platformColors: Record<string, string> = {
  Meta: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Google: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};

const statusConfig = {
  active: {
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200/50 dark:border-emerald-500/20",
  },
  degraded: {
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200/50 dark:border-amber-500/20",
  },
  broken: {
    icon: XCircle,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200/50 dark:border-rose-500/20",
  },
} as const;

type TrackingStatus = keyof typeof statusConfig;

export default function TrackingPage() {
  const t = useTranslations("pages.tracking");

  const [trackingEvents] = useState(() => {
    const minutesAgo = (m: number) => `${m} min ago`;
    return [
      { client: "Level Egypt", platform: "Meta", event: "PageView", status: "active" as TrackingStatus, lastFired: minutesAgo(2), dailyCount: 4520 },
      { client: "Level Egypt", platform: "Meta", event: "AddToCart", status: "active" as TrackingStatus, lastFired: minutesAgo(5), dailyCount: 312 },
      { client: "Level Egypt", platform: "Meta", event: "Purchase", status: "active" as TrackingStatus, lastFired: minutesAgo(18), dailyCount: 47 },
      { client: "Level Egypt", platform: "Google", event: "Conversion", status: "active" as TrackingStatus, lastFired: minutesAgo(12), dailyCount: 38 },
      { client: "Smart Home Damietta", platform: "Meta", event: "PageView", status: "active" as TrackingStatus, lastFired: minutesAgo(1), dailyCount: 2890 },
      { client: "Smart Home Damietta", platform: "Meta", event: "Lead", status: "degraded" as TrackingStatus, lastFired: minutesAgo(45), dailyCount: 23 },
      { client: "Smart Home Damietta", platform: "Meta", event: "Purchase", status: "broken" as TrackingStatus, lastFired: "4 days ago", dailyCount: 0 },
      { client: "Al Reda Steel", platform: "Meta", event: "PageView", status: "active" as TrackingStatus, lastFired: minutesAgo(0), dailyCount: 1560 },
      { client: "Al Reda Steel", platform: "Meta", event: "Lead", status: "active" as TrackingStatus, lastFired: minutesAgo(8), dailyCount: 67 },
      { client: "Al Reda Steel", platform: "Google", event: "Conversion", status: "active" as TrackingStatus, lastFired: minutesAgo(15), dailyCount: 52 },
    ];
  });

  const [demoMeta] = useState<HonestMeta>(() => ({
    source: "demo",
    confidence: "high",
    lastUpdated: new Date(),
    limitation: "Demo data for illustration",
  }));

  const activeCount = trackingEvents.filter((e) => e.status === "active").length;
  const degradedCount = trackingEvents.filter((e) => e.status === "degraded").length;
  const brokenCount = trackingEvents.filter((e) => e.status === "broken").length;

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Button size="sm" variant="outline"><RefreshCw className="h-4 w-4 me-1" /> {t("rescan")}</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-500" />
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-500/20 dark:to-emerald-500/5">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{activeCount}</p>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{t("summary.active")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-500/20 dark:to-amber-500/5">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{degradedCount}</p>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{t("summary.degraded")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-rose-400 to-rose-500" />
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-500/20 dark:to-rose-500/5">
              <XCircle className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">{brokenCount}</p>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{t("summary.broken")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-400" />
        <CardHeader className="border-b border-neutral-100 dark:border-[#2A3544]">
          <CardTitle className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-500/20 dark:to-cyan-500/20">
              <ShieldCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            {t("tableTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-[#2A3544] bg-neutral-50/50 dark:bg-[#0F1419]/50">
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.client")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.platform")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.event")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.status")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.lastFired")}</th>
                  <th className="text-start py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t("headers.dailyCount")}</th>
                </tr>
              </thead>
              <tbody>
                {trackingEvents.map((event, i) => {
                  const config = statusConfig[event.status];
                  const StatusIcon = config.icon;
                  return (
                    <tr key={i} className="border-b border-neutral-100 dark:border-[#2A3544] hover:bg-sky-50/30 dark:hover:bg-[#0F1419] transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-neutral-900 dark:text-white">{event.client}</td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${platformColors[event.platform] ?? ""}`}>
                          {event.platform}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-neutral-700 dark:text-neutral-300 font-medium">{event.event}</td>
                      <td className="py-3.5 px-5">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-bold ${config.bg} ${config.border} ${config.color}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {t(`status.${event.status}`)}
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-neutral-500 text-xs flex items-center gap-1.5"><Clock className="h-3 w-3" />{event.lastFired}</td>
                      <td className="py-3.5 px-5 font-bold text-neutral-900 dark:text-white">{event.dailyCount.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-neutral-100 dark:border-[#2A3544] bg-neutral-50/30 dark:bg-[#0F1419]/30">
            <HonestTooltip meta={demoMeta} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
