"use client";

import { useTranslations } from "next-intl";
import { Eye, AlertTriangle, TrendingUp, TrendingDown, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import { DEMO_META } from "@/data/demo-clients";

const creatives = [
  { id: 1, name: "Video — Pain Point Hook V2", client: "Level Egypt", format: "Video 15s", status: "fatigue" as const, ctr: 2.1, frequency: 4.2, daysActive: 21, spend: 3200, trend: "declining" as const },
  { id: 2, name: "Carousel — Product Showcase", client: "Level Egypt", format: "Carousel", status: "active" as const, ctr: 3.4, frequency: 2.1, daysActive: 8, spend: 1800, trend: "stable" as const },
  { id: 3, name: "Static — Offer 30% Off", client: "Level Egypt", format: "Image", status: "fatigue" as const, ctr: 1.8, frequency: 5.1, daysActive: 28, spend: 4500, trend: "declining" as const },
  { id: 4, name: "Video — Testimonial Ahmed", client: "Smart Home Damietta", format: "Video 30s", status: "active" as const, ctr: 2.9, frequency: 1.8, daysActive: 5, spend: 900, trend: "improving" as const },
  { id: 5, name: "Static — WhatsApp CTA", client: "Smart Home Damietta", format: "Image", status: "active" as const, ctr: 2.4, frequency: 2.5, daysActive: 12, spend: 1500, trend: "stable" as const },
  { id: 6, name: "Video — Before/After", client: "Al Reda Steel", format: "Video 15s", status: "winner" as const, ctr: 4.8, frequency: 1.5, daysActive: 10, spend: 2100, trend: "improving" as const },
  { id: 7, name: "Lead Form — Direct", client: "Al Reda Steel", format: "Lead Ad", status: "active" as const, ctr: 3.1, frequency: 2.0, daysActive: 14, spend: 1700, trend: "stable" as const },
];

const statusConfig = {
  winner: { badge: "success" as const },
  active: { badge: "info" as const },
  fatigue: { badge: "danger" as const },
};

const trendConfig = {
  improving: { icon: TrendingUp, color: "text-emerald-500" },
  stable: { icon: TrendingUp, color: "text-neutral-400" },
  declining: { icon: TrendingDown, color: "text-rose-500" },
};

export default function CreativeIntelligencePage() {
  const t = useTranslations("pages.creative");
  const tCommon = useTranslations("common");

  const fatigueCount = creatives.filter((c) => c.status === "fatigue").length;
  const winnerCount = creatives.filter((c) => c.status === "winner").length;

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Badge variant="demo" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />{tCommon("demoData")}</Badge>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/20"><TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /></div>
            <div><p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{winnerCount}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("summary.winners")}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-500/10"><ImageIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" /></div>
            <div><p className="text-2xl font-bold text-neutral-900 dark:text-white">{creatives.length}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("summary.active")}</p></div>
          </CardContent>
        </Card>
        <Card className="border-rose-200/60 bg-rose-50/40 dark:border-rose-500/20 dark:bg-rose-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/20"><AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" /></div>
            <div><p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{fatigueCount}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("summary.fatigue")}</p></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5 text-sky-500" />{t("tableTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-[#2A3544]">
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.creative")}</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.client")}</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.format")}</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.status")}</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.ctr")}</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.frequency")}</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.days")}</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.spend")}</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">{t("headers.trend")}</th>
                </tr>
              </thead>
              <tbody>
                {creatives.map((creative) => {
                  const sConfig = statusConfig[creative.status];
                  const tConfig = trendConfig[creative.trend];
                  const TrendIcon = tConfig.icon;
                  return (
                    <tr key={creative.id} className="border-b border-neutral-100 dark:border-[#2A3544] hover:bg-neutral-50 dark:hover:bg-[#0F1419]">
                      <td className="py-3 px-2 font-medium text-neutral-900 dark:text-white">{creative.name}</td>
                      <td className="py-3 px-2 text-neutral-600 dark:text-neutral-400">{creative.client}</td>
                      <td className="py-3 px-2"><Badge variant="secondary">{creative.format}</Badge></td>
                      <td className="py-3 px-2"><Badge variant={sConfig.badge}>{t(`status.${creative.status}`)}</Badge></td>
                      <td className="py-3 px-2 font-medium">{creative.ctr}%</td>
                      <td className="py-3 px-2">
                        <span className={creative.frequency > 3.5 ? "text-rose-500 font-medium" : ""}>{creative.frequency}</span>
                      </td>
                      <td className="py-3 px-2">{creative.daysActive}d</td>
                      <td className="py-3 px-2">${creative.spend.toLocaleString()}</td>
                      <td className="py-3 px-2"><TrendIcon className={`h-4 w-4 ${tConfig.color}`} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <HonestTooltip meta={DEMO_META} className="mt-4" />
        </CardContent>
      </Card>
    </div>
  );
}
