"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, ArrowDownRight, Pause, DollarSign, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";

const typeConfig = {
  scale: { icon: ArrowUpRight, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  reduce: { icon: ArrowDownRight, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
  pause: { icon: Pause, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
} as const;

const confidenceColors = { high: "success" as const, medium: "warning" as const, low: "danger" as const };

type RecType = keyof typeof typeConfig;
type Confidence = "high" | "medium" | "low";

interface Recommendation {
  type: RecType;
  client: string;
  campaign: string;
  action: string;
  reason: string;
  impact: string;
  confidence: string;
  priority: string;
}

export default function BudgetRecommendationsPage() {
  const t = useTranslations("pages.budgetRec");
  const tCommon = useTranslations("common");
  const items = t.raw("items") as Recommendation[];

  const scaleCount = items.filter((r) => r.type === "scale").length;
  const reduceCount = items.filter((r) => r.type === "reduce").length;
  const pauseCount = items.filter((r) => r.type === "pause").length;

  const recItem = (item: Recommendation, index: number) => {
    const config = typeConfig[item.type];
    const TypeIcon = config.icon;
    // Look up confidence variant from English source data when present
    const confKey: Confidence = item.confidence.toLowerCase().includes("high") || item.confidence.includes("عال")
      ? "high"
      : item.confidence.toLowerCase().includes("medium") || item.confidence.includes("متوسط")
      ? "medium"
      : "low";

    return (
      <Card key={index} className="hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
              <TypeIcon className={`h-5 w-5 ${config.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{item.action}</h3>
                  <p className="text-sm text-neutral-500 mt-0.5">{item.client} — {item.campaign}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={confidenceColors[confKey]}>{item.confidence} {t("labels.confidence")}</Badge>
                  <Badge variant={item.priority.toLowerCase().includes("high") || item.priority.includes("عال") ? "danger" : "warning"}>{item.priority}</Badge>
                </div>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-neutral-50 dark:bg-[#0F1419]">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{item.reason}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-neutral-400" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">{item.impact}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button size="sm">{t("buttons.approve")}</Button>
                <Button size="sm" variant="ghost">{t("buttons.dismiss")}</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Badge variant="demo" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />{tCommon("demoData")}</Badge>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/20"><ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /></div>
            <div><p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{scaleCount}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("summary.scale")}</p></div>
          </CardContent>
        </Card>
        <Card className="border-amber-200/60 bg-amber-50/40 dark:border-amber-500/20 dark:bg-amber-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/20"><ArrowDownRight className="h-5 w-5 text-amber-600 dark:text-amber-400" /></div>
            <div><p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{reduceCount}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("summary.reduce")}</p></div>
          </CardContent>
        </Card>
        <Card className="border-rose-200/60 bg-rose-50/40 dark:border-rose-500/20 dark:bg-rose-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/20"><Pause className="h-5 w-5 text-rose-600 dark:text-rose-400" /></div>
            <div><p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{pauseCount}</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("summary.pause")}</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {items.map(recItem)}
      </div>

      <HonestTooltip meta={{ source: "demo", confidence: "medium", lastUpdated: new Date(0), limitation: "Recommendations based on demo data patterns" }} />
    </div>
  );
}
