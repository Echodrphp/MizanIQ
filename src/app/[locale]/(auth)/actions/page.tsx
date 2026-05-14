"use client";

import { useTranslations } from "next-intl";
import { Zap, CheckCircle2, Clock, AlertTriangle, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import { DEMO_META } from "@/data/demo-clients";

const actions = [
  { id: 1, title: "Pause underperforming ad set", client: "Level Egypt", campaign: "Retargeting — Cart Abandoners", priority: "critical" as const, status: "new" as const, reason: "CPA 2.3x above target for 4 consecutive days. No improvement trend.", createdAt: "2 hours ago", category: "performance" },
  { id: 2, title: "Fix Meta Pixel Purchase event", client: "Smart Home Damietta", campaign: "All Campaigns", priority: "critical" as const, status: "in_progress" as const, reason: "Purchase event not firing since May 10. Attribution data is unreliable.", createdAt: "4 days ago", category: "tracking" },
  { id: 3, title: "Scale winning campaign +20%", client: "Al Reda Steel", campaign: "Lead Gen — Broad Interest", priority: "high" as const, status: "new" as const, reason: "CPL 40% below target, stable for 7 days. Strong creative performance.", createdAt: "1 day ago", category: "budget" },
  { id: 4, title: "Refresh top 3 creatives", client: "Level Egypt", campaign: "Prospecting — Lookalike", priority: "medium" as const, status: "new" as const, reason: "Frequency > 3.5, CTR declining 15% week-over-week. Creative fatigue signals.", createdAt: "1 day ago", category: "creative" },
  { id: 5, title: "Review WhatsApp lead quality", client: "Smart Home Damietta", campaign: "Lead Gen — WhatsApp", priority: "medium" as const, status: "waiting_approval" as const, reason: "40% of leads marked unqualified. Consider audience refinement.", createdAt: "3 days ago", category: "performance" },
  { id: 6, title: "Set up conversion API", client: "Level Egypt", campaign: "All Campaigns", priority: "low" as const, status: "new" as const, reason: "Browser-only tracking losing ~20% of conversions. CAPI would improve match rates.", createdAt: "5 days ago", category: "tracking" },
  { id: 7, title: "A/B test landing page headline", client: "Al Reda Steel", campaign: "Lead Gen — Search", priority: "low" as const, status: "completed" as const, reason: "Current page converts at 12%. Industry benchmark is 15%+.", createdAt: "7 days ago", category: "creative" },
];

const priorityConfig = {
  critical: { color: "text-danger", bg: "bg-danger/10", badge: "danger" as const },
  high: { color: "text-warning", bg: "bg-warning/10", badge: "warning" as const },
  medium: { color: "text-info", bg: "bg-info/10", badge: "info" as const },
  low: { color: "text-neutral-500", bg: "bg-neutral-100 dark:bg-neutral-800", badge: "secondary" as const },
};

const statusConfig = {
  new: { label: "New", color: "text-teal", icon: Zap },
  in_progress: { label: "In Progress", color: "text-info", icon: Clock },
  waiting_approval: { label: "Waiting Approval", color: "text-warning", icon: AlertTriangle },
  completed: { label: "Completed", color: "text-success", icon: CheckCircle2 },
  dismissed: { label: "Dismissed", color: "text-neutral-400", icon: CheckCircle2 },
};

export default function ActionsPage() {
  const t = useTranslations("pages.actions");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Button size="sm" variant="outline"><Filter className="h-4 w-4 me-1" /> Filter</Button>
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-danger">2</p><p className="text-xs text-neutral-500">Critical</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-warning">1</p><p className="text-xs text-neutral-500">High Priority</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-info">2</p><p className="text-xs text-neutral-500">Medium</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-success">1</p><p className="text-xs text-neutral-500">Completed</p></CardContent></Card>
      </div>

      {/* Actions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-teal" />All Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((action) => {
            const pConfig = priorityConfig[action.priority];
            const sConfig = statusConfig[action.status];
            const StatusIcon = sConfig.icon;
            return (
              <div key={action.id} className="flex items-start gap-3 p-4 rounded-lg border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${pConfig.bg}`}>
                  <Zap className={`h-4 w-4 ${pConfig.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{action.title}</h4>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={pConfig.badge}>{action.priority}</Badge>
                      <div className={`flex items-center gap-1 text-xs ${sConfig.color}`}>
                        <StatusIcon className="h-3 w-3" />{sConfig.label}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{action.client} — {action.campaign}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{action.reason}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-neutral-400">{action.createdAt}</span>
                    <Badge variant="secondary" className="text-[10px]">{action.category}</Badge>
                    {action.status === "new" && (
                      <div className="flex gap-2 ms-auto">
                        <Button size="sm">Take Action</Button>
                        <Button size="sm" variant="ghost">Dismiss</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <HonestTooltip meta={DEMO_META} />
    </div>
  );
}
