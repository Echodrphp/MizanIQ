"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Zap, CheckCircle2, Clock, AlertTriangle, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import type { HonestMeta } from "@/types";

const priorityConfig = {
  critical: { color: "text-rose-700 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10", badge: "danger" as const },
  high: { color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", badge: "warning" as const },
  medium: { color: "text-sky-700 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", badge: "info" as const },
  low: { color: "text-neutral-600 dark:text-neutral-400", bg: "bg-neutral-50 dark:bg-neutral-800/50", badge: "secondary" as const },
};

const statusConfig = {
  new: { color: "text-sky-600 dark:text-sky-400", icon: Zap },
  in_progress: { color: "text-blue-600 dark:text-blue-400", icon: Clock },
  waiting_approval: { color: "text-amber-600 dark:text-amber-400", icon: AlertTriangle },
  completed: { color: "text-emerald-600 dark:text-emerald-400", icon: CheckCircle2 },
  dismissed: { color: "text-neutral-400", icon: CheckCircle2 },
} as const;

type Priority = keyof typeof priorityConfig;
type Status = keyof typeof statusConfig;

export default function ActionsPage() {
  const t = useTranslations("pages.actions");

  const [actions] = useState(() => [
    { id: 1, titleKey: "pauseAdSet", client: "Level Egypt", campaign: "Retargeting — Cart Abandoners", priority: "critical" as Priority, status: "new" as Status, reasonKey: "cpaAboveTarget", createdAtKey: "2h", category: "performance" },
    { id: 2, titleKey: "fixPixel", client: "Smart Home Damietta", campaign: "All Campaigns", priority: "critical" as Priority, status: "in_progress" as Status, reasonKey: "purchaseMissing", createdAtKey: "4d", category: "tracking" },
    { id: 3, titleKey: "scaleCampaign", client: "Al Reda Steel", campaign: "Lead Gen — Broad Interest", priority: "high" as Priority, status: "new" as Status, reasonKey: "cplBelowTarget", createdAtKey: "1d", category: "budget" },
    { id: 4, titleKey: "refreshCreatives", client: "Level Egypt", campaign: "Prospecting — Lookalike", priority: "medium" as Priority, status: "new" as Status, reasonKey: "frequencyHigh", createdAtKey: "1d", category: "creative" },
  ]);

  const [demoMeta] = useState<HonestMeta>(() => ({
    source: "demo",
    confidence: "high",
    lastUpdated: new Date(),
  }));

  const tDashActions = useTranslations("dashboard.actions");
  const tDashReasons = useTranslations("dashboard.actions.reasons");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Button size="sm" variant="outline"><Filter className="h-4 w-4 me-1" /> {t("filter")}</Button>
      </PageHeader>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-rose-500">2</p><p className="text-xs text-neutral-500">{t("summary.critical")}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-500">1</p><p className="text-xs text-neutral-500">{t("summary.high")}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-sky-500">2</p><p className="text-xs text-neutral-500">{t("summary.medium")}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-emerald-500">1</p><p className="text-xs text-neutral-500">{t("summary.completed")}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-sky-500" />{t("tableTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((action) => {
            const pConfig = priorityConfig[action.priority];
            const sConfig = statusConfig[action.status];
            const StatusIcon = sConfig.icon;
            return (
              <div key={action.id} className="flex items-start gap-3 p-4 rounded-lg border border-neutral-100 dark:border-[#2A3544] hover:bg-neutral-50 dark:hover:bg-[#0F1419] transition-colors">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${pConfig.bg}`}>
                  <Zap className={`h-4 w-4 ${pConfig.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{tDashActions(action.titleKey)}</h4>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={pConfig.badge}>{t(`priority.${action.priority}`)}</Badge>
                      <div className={`flex items-center gap-1 text-xs ${sConfig.color}`}>
                        <StatusIcon className="h-3 w-3" />{t(`status.${action.status}`)}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{action.client} — {action.campaign}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{tDashReasons(action.reasonKey)}</p>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <Badge variant="secondary" className="text-[10px]">{action.category}</Badge>
                    {action.status === "new" && (
                      <div className="flex gap-2 ms-auto">
                        <Button size="sm">{t("buttons.takeAction")}</Button>
                        <Button size="sm" variant="ghost">{t("buttons.dismiss")}</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <HonestTooltip meta={demoMeta} />
    </div>
  );
}
