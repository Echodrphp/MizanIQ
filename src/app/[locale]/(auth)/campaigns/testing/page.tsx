"use client";

import { useTranslations } from "next-intl";
import { FlaskConical, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import { DEMO_META } from "@/data/demo-clients";

const tests = [
  {
    id: 1,
    name: "Hook Angle Test — Pain vs Aspiration",
    client: "Level Egypt",
    status: "running" as const,
    startDate: "May 8, 2026",
    daysRunning: 6,
    variants: [
      { name: "Pain Point Hook", spend: 450, ctr: 3.2, cpa: 280, conversions: 16, winner: true },
      { name: "Aspiration Hook", spend: 450, ctr: 2.1, cpa: 375, conversions: 12, winner: false },
    ],
    confidence: 72,
    recommendation: "Pain Point Hook leading with 25% lower CPA. Need 2 more days for statistical significance.",
  },
  {
    id: 2,
    name: "Video Length Test — 15s vs 30s",
    client: "Al Reda Steel",
    status: "completed" as const,
    startDate: "May 1, 2026",
    daysRunning: 10,
    variants: [
      { name: "15-second Video", spend: 800, ctr: 4.1, cpa: 65, conversions: 123, winner: true },
      { name: "30-second Video", spend: 800, ctr: 3.4, cpa: 78, conversions: 103, winner: false },
    ],
    confidence: 95,
    recommendation: "15-second video is the clear winner. 17% lower CPL with higher engagement.",
  },
  {
    id: 3,
    name: "CTA Button Test — WhatsApp vs Form",
    client: "Smart Home Damietta",
    status: "paused" as const,
    startDate: "May 5, 2026",
    daysRunning: 4,
    variants: [
      { name: "WhatsApp CTA", spend: 300, ctr: 2.8, cpa: 150, conversions: 20, winner: false },
      { name: "Form CTA", spend: 300, ctr: 2.2, cpa: 200, conversions: 15, winner: false },
    ],
    confidence: 45,
    recommendation: "Test paused due to tracking issues. Resume after pixel fix.",
  },
];

export default function CreativeTestingPage() {
  const t = useTranslations("pages.testing");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {t("newTest")}</Button>
      </PageHeader>

      <div className="space-y-4">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-sky-500" />{test.name}
                  </CardTitle>
                  <p className="text-sm text-neutral-500 mt-1">
                    {test.client} • {t("started")} {test.startDate} • {test.daysRunning} {t("days")}
                  </p>
                </div>
                <Badge variant={test.status === "completed" ? "success" : test.status === "running" ? "info" : "warning"}>
                  {t(`status.${test.status}`)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {test.variants.map((variant) => (
                  <div key={variant.name} className={`p-4 rounded-lg border ${variant.winner ? "border-emerald-300/60 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-500/10" : "border-neutral-200 dark:border-[#2A3544]"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">{variant.name}</span>
                      {variant.winner && <Badge variant="success">{t("leading")}</Badge>}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-neutral-500">{t("metrics.spend")}</span><p className="font-semibold">${variant.spend}</p></div>
                      <div><span className="text-neutral-500">{t("metrics.ctr")}</span><p className="font-semibold">{variant.ctr}%</p></div>
                      <div><span className="text-neutral-500">{t("metrics.cpa")}</span><p className="font-semibold">${variant.cpa}</p></div>
                      <div><span className="text-neutral-500">{t("metrics.conversions")}</span><p className="font-semibold">{variant.conversions}</p></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-[#0F1419]">
                <div className="shrink-0 text-center">
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{test.confidence}%</p>
                  <p className="text-[10px] text-neutral-500">{t("confidence")}</p>
                </div>
                <div className="h-8 w-px bg-neutral-200 dark:bg-[#2A3544]" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{test.recommendation}</p>
              </div>

              <HonestTooltip meta={{ ...DEMO_META, confidence: test.confidence >= 90 ? "high" : test.confidence >= 60 ? "medium" : "low" }} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
