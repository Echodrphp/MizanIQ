"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, TrendingUp, CheckCircle2, Zap, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/shared/metric-card";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import type { MetricData } from "@/types";

const demoMetrics: MetricData[] = [
  { label: "Total Spend", value: 28450, formattedValue: "$28,450", trend: { direction: "up", percentage: 12.5, isPositive: false }, meta: { source: "demo", confidence: "high", lastUpdated: new Date(Date.now() - 300000), limitation: "Demo data" } },
  { label: "Revenue", value: 96800, formattedValue: "$96,800", trend: { direction: "up", percentage: 8.3, isPositive: true }, meta: { source: "demo", confidence: "high", lastUpdated: new Date(Date.now() - 300000) } },
  { label: "Avg. ROAS", value: 3.4, formattedValue: "3.40x", trend: { direction: "down", percentage: 4.2, isPositive: false }, target: 4.0, meta: { source: "demo", confidence: "medium", lastUpdated: new Date(Date.now() - 600000), limitation: "Blended across all clients" } },
  { label: "Active Clients", value: 3, formattedValue: "3", trend: { direction: "stable", percentage: 0, isPositive: true }, meta: { source: "demo", confidence: "high", lastUpdated: new Date(Date.now() - 60000) } },
];

const clients = [
  { name: "Level Egypt", score: 72, status: "needs_attention" as const, issue: "Creative fatigue detected" },
  { name: "Smart Home Damietta", score: 45, status: "critical" as const, issue: "Tracking pixel issues" },
  { name: "Al Reda Steel", score: 88, status: "healthy" as const, issue: "On track — scaling opportunity" },
];

const actions = [
  { id: 1, title: "Pause underperforming ad set", client: "Level Egypt", priority: "critical" as const, reason: "CPA 2.3x above target for 4 days" },
  { id: 2, title: "Fix Meta Pixel event", client: "Smart Home Damietta", priority: "critical" as const, reason: "Purchase event missing since May 10" },
  { id: 3, title: "Scale winning campaign", client: "Al Reda Steel", priority: "high" as const, reason: "CPL 40% below target, stable 7 days" },
  { id: 4, title: "Refresh creative angles", client: "Level Egypt", priority: "medium" as const, reason: "Frequency > 3.5, CTR declining" },
];

const statusColors = { critical: "text-danger", needs_attention: "text-warning", healthy: "text-success" };
const priorityBg = { critical: "bg-danger/10", high: "bg-warning/10", medium: "bg-info/10", low: "bg-neutral-100" };
const priorityColor = { critical: "text-danger", high: "text-warning", medium: "text-info", low: "text-neutral-500" };

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-6">
      <PageHeader title={t("commandCenter")} description={`${t("welcome")}, Demo User`}>
        <Badge variant="demo" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-warning animate-pulse" />Demo Mode</Badge>
      </PageHeader>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-danger/20 bg-danger/5 dark:bg-danger/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger/10"><AlertTriangle className="h-5 w-5 text-danger" /></div>
            <div><p className="text-2xl font-bold text-danger">1</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("criticalClients")}</p></div>
          </CardContent>
        </Card>
        <Card className="border-warning/20 bg-warning/5 dark:bg-warning/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10"><Clock className="h-5 w-5 text-warning" /></div>
            <div><p className="text-2xl font-bold text-warning">1</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("attentionClients")}</p></div>
          </CardContent>
        </Card>
        <Card className="border-success/20 bg-success/5 dark:bg-success/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10"><CheckCircle2 className="h-5 w-5 text-success" /></div>
            <div><p className="text-2xl font-bold text-success">1</p><p className="text-xs text-neutral-600 dark:text-neutral-400">{t("healthyClients")}</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoMetrics.map((m) => <MetricCard key={m.label} metric={m} />)}
      </div>

      {/* Actions + Client Health */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-teal" />{t("todayActions")}</CardTitle>
            <Badge variant="default">{actions.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {actions.map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${priorityBg[a.priority]}`}><Zap className={`h-3 w-3 ${priorityColor[a.priority]}`} /></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-neutral-900 dark:text-white">{a.title}</p><p className="text-xs text-neutral-500 mt-0.5">{a.client} — {a.reason}</p></div>
                <Badge variant={a.priority === "critical" ? "danger" : a.priority === "high" ? "warning" : "secondary"}>{a.priority}</Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-2">View All Actions →</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-teal" />Client Health</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
                <div className="relative h-12 w-12 shrink-0">
                  <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" fill="none" className="stroke-neutral-100 dark:stroke-neutral-800" strokeWidth="3" /><circle cx="18" cy="18" r="15.5" fill="none" className={statusColors[c.status]} stroke="currentColor" strokeWidth="3" strokeDasharray={`${(c.score / 100) * 97.4} 97.4`} strokeLinecap="round" /></svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-neutral-900 dark:text-white">{c.score}</span>
                </div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{c.name}</p><p className="text-xs text-neutral-500 truncate">{c.issue}</p></div>
              </div>
            ))}
            <HonestTooltip meta={{ source: "demo", confidence: "medium", lastUpdated: new Date(Date.now() - 600000), limitation: "Scores from demo data" }} />
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-4"><p className="text-xs text-neutral-400">⚖️ Recommendations are decision-support, not guaranteed results. All actions require manual approval.</p></div>
    </div>
  );
}
