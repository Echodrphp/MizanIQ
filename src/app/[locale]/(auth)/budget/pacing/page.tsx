"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import { DEMO_META } from "@/data/demo-clients";

const pacingData = [
  {
    client: "Level Egypt",
    budget: 150000,
    spent: 98500,
    daysElapsed: 20,
    daysTotal: 30,
    currency: "EGP",
    status: "on_track" as const,
    projectedSpend: 147750,
    dailyTarget: 5000,
    dailyActual: 4925,
  },
  {
    client: "Smart Home Damietta",
    budget: 80000,
    spent: 36000,
    daysElapsed: 20,
    daysTotal: 30,
    currency: "EGP",
    status: "under_pacing" as const,
    projectedSpend: 54000,
    dailyTarget: 2667,
    dailyActual: 1800,
  },
  {
    client: "Al Reda Steel",
    budget: 50000,
    spent: 38500,
    daysElapsed: 20,
    daysTotal: 30,
    currency: "EGP",
    status: "over_pacing" as const,
    projectedSpend: 57750,
    dailyTarget: 1667,
    dailyActual: 1925,
  },
];

const statusConfig = {
  on_track: { icon: CheckCircle2, color: "text-success", bg: "border-success/20 bg-success/5", label: "On Track", badge: "success" as const },
  under_pacing: { icon: TrendingDown, color: "text-warning", bg: "border-warning/20 bg-warning/5", label: "Under-pacing", badge: "warning" as const },
  over_pacing: { icon: AlertTriangle, color: "text-danger", bg: "border-danger/20 bg-danger/5", label: "Over-pacing", badge: "danger" as const },
};

export default function BudgetPacingPage() {
  const t = useTranslations("pages.budgetPacing");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Badge variant="demo" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-warning animate-pulse" />Demo Data</Badge>
      </PageHeader>

      <div className="space-y-4">
        {pacingData.map((client) => {
          const config = statusConfig[client.status];
          const StatusIcon = config.icon;
          const spentPercent = (client.spent / client.budget) * 100;
          const timePercent = (client.daysElapsed / client.daysTotal) * 100;
          const expectedPercent = timePercent;

          return (
            <Card key={client.client} className={config.bg}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{client.client}</h3>
                    <p className="text-sm text-neutral-500">Day {client.daysElapsed} of {client.daysTotal}</p>
                  </div>
                  <Badge variant={config.badge} className="gap-1">
                    <StatusIcon className="h-3 w-3" />{config.label}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Spent: {client.currency} {client.spent.toLocaleString()}</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Budget: {client.currency} {client.budget.toLocaleString()}</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                    <div className="absolute h-full rounded-full bg-teal transition-all" style={{ width: `${spentPercent}%` }} />
                    <div className="absolute h-full w-0.5 bg-neutral-900 dark:bg-white opacity-50" style={{ left: `${expectedPercent}%` }} title="Expected position" />
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{spentPercent.toFixed(1)}% spent</span>
                    <span>{timePercent.toFixed(0)}% of month elapsed</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-lg bg-white/60 dark:bg-neutral-800/60 p-3">
                    <p className="text-xs text-neutral-500">Daily Target</p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{client.currency} {client.dailyTarget.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-white/60 dark:bg-neutral-800/60 p-3">
                    <p className="text-xs text-neutral-500">Daily Actual</p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{client.currency} {client.dailyActual.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-white/60 dark:bg-neutral-800/60 p-3">
                    <p className="text-xs text-neutral-500">Projected Spend</p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{client.currency} {client.projectedSpend.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-white/60 dark:bg-neutral-800/60 p-3">
                    <p className="text-xs text-neutral-500">Remaining</p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{client.currency} {(client.budget - client.spent).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <HonestTooltip meta={DEMO_META} />
    </div>
  );
}
