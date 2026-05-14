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
  winner: { label: "Winner", color: "text-success", bg: "bg-success/10", badge: "success" as const },
  active: { label: "Active", color: "text-info", bg: "bg-info/10", badge: "info" as const },
  fatigue: { label: "Fatigue", color: "text-danger", bg: "bg-danger/10", badge: "danger" as const },
};

const trendConfig = {
  improving: { icon: TrendingUp, color: "text-success" },
  stable: { icon: TrendingUp, color: "text-neutral-400" },
  declining: { icon: TrendingDown, color: "text-danger" },
};

export default function CreativeIntelligencePage() {
  const t = useTranslations("pages.creative");

  const fatigueCount = creatives.filter(c => c.status === "fatigue").length;
  const winnerCount = creatives.filter(c => c.status === "winner").length;

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Badge variant="demo" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-warning animate-pulse" />Demo Data</Badge>
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10"><TrendingUp className="h-5 w-5 text-success" /></div>
            <div><p className="text-2xl font-bold text-success">{winnerCount}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">Winners</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10"><ImageIcon className="h-5 w-5 text-info" /></div>
            <div><p className="text-2xl font-bold text-neutral-900 dark:text-white">{creatives.length}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">Active Creatives</p></div>
          </CardContent>
        </Card>
        <Card className="border-danger/20 bg-danger/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger/10"><AlertTriangle className="h-5 w-5 text-danger" /></div>
            <div><p className="text-2xl font-bold text-danger">{fatigueCount}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">Fatigue Detected</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Creatives Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5 text-teal" />Creative Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">Creative</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">Client</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">Format</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">Status</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">CTR</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">Frequency</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">Days</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">Spend</th>
                  <th className="text-start py-3 px-2 font-medium text-neutral-500">Trend</th>
                </tr>
              </thead>
              <tbody>
                {creatives.map((creative) => {
                  const sConfig = statusConfig[creative.status];
                  const tConfig = trendConfig[creative.trend];
                  const TrendIcon = tConfig.icon;
                  return (
                    <tr key={creative.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                      <td className="py-3 px-2 font-medium text-neutral-900 dark:text-white">{creative.name}</td>
                      <td className="py-3 px-2 text-neutral-600 dark:text-neutral-400">{creative.client}</td>
                      <td className="py-3 px-2"><Badge variant="secondary">{creative.format}</Badge></td>
                      <td className="py-3 px-2"><Badge variant={sConfig.badge}>{sConfig.label}</Badge></td>
                      <td className="py-3 px-2 font-medium">{creative.ctr}%</td>
                      <td className="py-3 px-2">
                        <span className={creative.frequency > 3.5 ? "text-danger font-medium" : ""}>{creative.frequency}</span>
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
