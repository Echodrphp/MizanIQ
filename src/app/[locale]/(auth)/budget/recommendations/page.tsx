"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, ArrowDownRight, Pause, DollarSign, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import { DEMO_META } from "@/data/demo-clients";

const recommendations = [
  {
    id: 1,
    type: "scale" as const,
    client: "Al Reda Steel",
    campaign: "Lead Gen — Broad Interest",
    action: "Increase budget by 20%",
    reason: "CPL 40% below target for 7 consecutive days. Stable performance with room to scale.",
    impact: "+$10,000 monthly budget → estimated +62 leads",
    confidence: "high" as const,
    priority: "high" as const,
  },
  {
    id: 2,
    type: "reduce" as const,
    client: "Level Egypt",
    campaign: "Retargeting — Cart Abandoners",
    action: "Reduce budget by 30%",
    reason: "Frequency > 4.2, diminishing returns. Audience saturation detected.",
    impact: "-$4,500 monthly → reallocate to prospecting",
    confidence: "medium" as const,
    priority: "medium" as const,
  },
  {
    id: 3,
    type: "pause" as const,
    client: "Smart Home Damietta",
    campaign: "Awareness — Video Views",
    action: "Pause campaign",
    reason: "No measurable impact on lead volume. Tracking issues make attribution unreliable.",
    impact: "Save $2,000/month until tracking is fixed",
    confidence: "medium" as const,
    priority: "high" as const,
  },
  {
    id: 4,
    type: "scale" as const,
    client: "Level Egypt",
    campaign: "Prospecting — Lookalike 1%",
    action: "Increase budget by 15%",
    reason: "ROAS 4.2x (above 4.0 target) for 5 days. Strong creative performance.",
    impact: "+$3,000 monthly → estimated +$12,600 revenue",
    confidence: "medium" as const,
    priority: "medium" as const,
  },
];

const typeConfig = {
  scale: { icon: ArrowUpRight, color: "text-success", bg: "bg-success/10", label: "Scale" },
  reduce: { icon: ArrowDownRight, color: "text-warning", bg: "bg-warning/10", label: "Reduce" },
  pause: { icon: Pause, color: "text-danger", bg: "bg-danger/10", label: "Pause" },
};

const confidenceColors = { high: "success" as const, medium: "warning" as const, low: "danger" as const };

export default function BudgetRecommendationsPage() {
  const t = useTranslations("pages.budgetRec");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Badge variant="demo" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-warning animate-pulse" />Demo Data</Badge>
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10"><ArrowUpRight className="h-5 w-5 text-success" /></div>
            <div><p className="text-2xl font-bold text-success">2</p><p className="text-xs text-neutral-600 dark:text-neutral-400">Scale Opportunities</p></div>
          </CardContent>
        </Card>
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10"><ArrowDownRight className="h-5 w-5 text-warning" /></div>
            <div><p className="text-2xl font-bold text-warning">1</p><p className="text-xs text-neutral-600 dark:text-neutral-400">Reduce Suggestions</p></div>
          </CardContent>
        </Card>
        <Card className="border-danger/20 bg-danger/5">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger/10"><Pause className="h-5 w-5 text-danger" /></div>
            <div><p className="text-2xl font-bold text-danger">1</p><p className="text-xs text-neutral-600 dark:text-neutral-400">Pause Recommendations</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const config = typeConfig[rec.type];
          const TypeIcon = config.icon;
          return (
            <Card key={rec.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                    <TypeIcon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">{rec.action}</h3>
                        <p className="text-sm text-neutral-500 mt-0.5">{rec.client} — {rec.campaign}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={confidenceColors[rec.confidence]}>{rec.confidence} confidence</Badge>
                        <Badge variant={rec.priority === "high" ? "danger" : "warning"}>{rec.priority}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">{rec.reason}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{rec.impact}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="ghost">Dismiss</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <HonestTooltip meta={{ ...DEMO_META, limitation: "Recommendations based on demo data patterns" }} />
    </div>
  );
}
