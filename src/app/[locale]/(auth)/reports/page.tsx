"use client";

import { useTranslations } from "next-intl";
import { FileText, Download, Calendar, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";

const reports = [
  { id: 1, title: "Level Egypt — Weekly Performance", client: "Level Egypt", type: "Weekly", date: "May 12, 2026", status: "ready" as const },
  { id: 2, title: "Smart Home Damietta — Monthly Report", client: "Smart Home Damietta", type: "Monthly", date: "May 1, 2026", status: "ready" as const },
  { id: 3, title: "Al Reda Steel — Weekly Performance", client: "Al Reda Steel", type: "Weekly", date: "May 12, 2026", status: "ready" as const },
  { id: 4, title: "All Clients — Portfolio Overview", client: "All", type: "Portfolio", date: "May 10, 2026", status: "ready" as const },
  { id: 5, title: "Level Egypt — Creative Analysis", client: "Level Egypt", type: "Creative", date: "May 8, 2026", status: "draft" as const },
  { id: 6, title: "Q2 2026 — Quarterly Review", client: "All", type: "Quarterly", date: "Scheduled Jun 30", status: "scheduled" as const },
];

const statusConfig = {
  ready: { badge: "success" as const },
  draft: { badge: "warning" as const },
  scheduled: { badge: "secondary" as const },
};

export default function ReportsPage() {
  const t = useTranslations("pages.reports");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {t("generate")}</Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-sky-500" />{t("library")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => {
              const sConfig = statusConfig[report.status];
              return (
                <div key={report.id} className="flex items-center gap-4 p-4 rounded-lg border border-neutral-100 dark:border-[#2A3544] hover:bg-neutral-50 dark:hover:bg-[#0F1419] transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-500/10">
                    <FileText className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{report.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{report.type}</Badge>
                      <span className="text-xs text-neutral-500 flex items-center gap-1"><Calendar className="h-3 w-3" />{report.date}</span>
                    </div>
                  </div>
                  <Badge variant={sConfig.badge}>{t(`status.${report.status}`)}</Badge>
                  <div className="flex gap-1">
                    {report.status === "ready" && (
                      <>
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
