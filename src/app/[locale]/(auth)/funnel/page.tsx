"use client";

import { useTranslations } from "next-intl";
import { Activity, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { HonestTooltip } from "@/components/shared/honest-tooltip";
import { DEMO_META } from "@/data/demo-clients";

const funnels = [
  {
    client: "Level Egypt",
    type: "E-commerce",
    stages: [
      { name: "Impressions", value: 245000, rate: 100 },
      { name: "Link Clicks", value: 6860, rate: 2.8 },
      { name: "Page Views", value: 5488, rate: 80 },
      { name: "Add to Cart", value: 824, rate: 15 },
      { name: "Initiate Checkout", value: 412, rate: 50 },
      { name: "Purchase", value: 142, rate: 34.5 },
    ],
  },
  {
    client: "Smart Home Damietta",
    type: "WhatsApp Lead",
    stages: [
      { name: "Impressions", value: 180000, rate: 100 },
      { name: "Link Clicks", value: 4320, rate: 2.4 },
      { name: "Landing Page", value: 3456, rate: 80 },
      { name: "WhatsApp Click", value: 691, rate: 20 },
      { name: "Conversation Started", value: 387, rate: 56 },
      { name: "Qualified Lead", value: 116, rate: 30 },
    ],
  },
  {
    client: "Al Reda Steel",
    type: "Lead Generation",
    stages: [
      { name: "Impressions", value: 95000, rate: 100 },
      { name: "Link Clicks", value: 3800, rate: 4.0 },
      { name: "Landing Page", value: 3230, rate: 85 },
      { name: "Form Start", value: 646, rate: 20 },
      { name: "Form Submit", value: 387, rate: 60 },
      { name: "Qualified Lead", value: 310, rate: 80 },
    ],
  },
];

export default function FunnelPage() {
  const t = useTranslations("pages.funnel");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Badge variant="demo" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-warning animate-pulse" />Demo Data</Badge>
      </PageHeader>

      {funnels.map((funnel) => (
        <Card key={funnel.client}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-teal" />{funnel.client}</CardTitle>
              <Badge variant="secondary">{funnel.type}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {funnel.stages.map((stage, i) => {
                const widthPercent = Math.max((stage.value / funnel.stages[0].value) * 100, 8);
                return (
                  <div key={stage.name}>
                    {i > 0 && (
                      <div className="flex items-center justify-center py-1">
                        <ArrowDown className="h-4 w-4 text-neutral-300" />
                        <span className="text-[10px] text-neutral-400 ms-1">{stage.rate}% conversion</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-500 w-32 shrink-0 text-end">{stage.name}</span>
                      <div className="flex-1 relative">
                        <div className="h-10 rounded-lg bg-teal/10 flex items-center px-3 transition-all" style={{ width: `${widthPercent}%` }}>
                          <span className="text-sm font-semibold text-neutral-900 dark:text-white">{stage.value.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <HonestTooltip meta={DEMO_META} className="mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
