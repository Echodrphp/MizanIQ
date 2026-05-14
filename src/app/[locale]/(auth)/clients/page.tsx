"use client";

import { useTranslations } from "next-intl";
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import { DEMO_META } from "@/data/demo-clients";

const statusBadge = { critical: "danger" as const, needs_attention: "warning" as const, healthy: "success" as const };
const trendIcons = { improving: TrendingUp, stable: Minus, declining: TrendingDown };
const trendColors = { improving: "text-emerald-500 dark:text-emerald-400", stable: "text-neutral-400", declining: "text-rose-500 dark:text-rose-400" };
const scoreStrokeColors = {
  critical: "stroke-rose-500",
  needs_attention: "stroke-amber-500",
  healthy: "stroke-emerald-500"
};
const headerGradients = {
  critical: "from-rose-400 to-rose-500",
  needs_attention: "from-amber-400 to-amber-500",
  healthy: "from-emerald-400 to-emerald-500"
};

export default function ClientsPage() {
  const t = useTranslations("pages.clients");
  const tDemo = useTranslations("pages.demoClients");

  // Build clients array from translations
  const clients = [
    {
      id: "level-egypt",
      name: "Level Egypt",
      key: "levelEgypt" as const,
      currency: "EGP",
      monthlyBudget: 150000,
      targetCPA: 350,
      score: 72,
      status: "needs_attention" as const,
      trend: "declining" as const,
    },
    {
      id: "smart-home",
      name: "Smart Home Damietta",
      key: "smartHome" as const,
      currency: "EGP",
      monthlyBudget: 80000,
      targetCPA: 200,
      score: 45,
      status: "critical" as const,
      trend: "declining" as const,
    },
    {
      id: "al-reda",
      name: "Al Reda Steel",
      key: "alReda" as const,
      currency: "EGP",
      monthlyBudget: 50000,
      targetCPA: 500,
      score: 88,
      status: "healthy" as const,
      trend: "improving" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {t("addClient")}</Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {clients.map((client) => {
          const TrendIcon = trendIcons[client.trend];
          const issues = tDemo.raw(`${client.key}.issues`) as string[];
          return (
            <Card key={client.id} className="overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${headerGradients[client.status]}`} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{client.name}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {tDemo(`${client.key}.businessType`)} • {tDemo(`${client.key}.salesChannel`)} • {tDemo(`${client.key}.country`)}
                    </p>
                  </div>
                  <Badge variant={statusBadge[client.status]}>
                    {t(`status.${client.status}`)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Health Score */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-[#0F1419]">
                  <div className="relative h-16 w-16 shrink-0">
                    <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-neutral-200 dark:stroke-[#2A3544]" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.5" fill="none" className={scoreStrokeColors[client.status]} strokeWidth="3" strokeDasharray={`${(client.score / 100) * 97.4} 97.4`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-neutral-900 dark:text-white">{client.score}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{tDemo(`${client.key}.mainReason`)}</p>
                    <div className={`flex items-center gap-1.5 mt-1.5 text-xs font-medium ${trendColors[client.trend]}`}>
                      <TrendIcon className="h-3 w-3" />
                      <span>{t(`trend.${client.trend}`)}</span>
                    </div>
                  </div>
                </div>

                {/* Top Issues */}
                <div className="space-y-1.5">
                  {issues.slice(0, 3).map((issue, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="h-1 w-1 rounded-full bg-neutral-400 shrink-0" />
                      {issue}
                    </div>
                  ))}
                </div>

                {/* Next Action */}
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200/50 dark:border-sky-500/20">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">{t("nextAction")}</p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">{tDemo(`${client.key}.nextAction`)}</p>
                </div>

                {/* Targets */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-neutral-200 dark:border-[#2A3544] p-2.5">
                    <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">{t("budget")}</span>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5">{client.currency} {client.monthlyBudget.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg border border-neutral-200 dark:border-[#2A3544] p-2.5">
                    <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">{t("targetCpa")}</span>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5">{client.currency} {client.targetCPA}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-[#2A3544]">
                  <HonestTooltip meta={DEMO_META} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
