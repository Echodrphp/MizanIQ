"use client";

import { useTranslations } from "next-intl";
import { Megaphone, Plus, Target, Users, Image as ImageIcon, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { ComingSoon } from "@/components/shared/coming-soon";

const campaignTemplates = [
  { name: "E-commerce — Prospecting", objective: "Conversions", audience: "Lookalike 1-3%", budget: "$50-100/day", icon: Target },
  { name: "Lead Gen — WhatsApp", objective: "Messages", audience: "Interest-based", budget: "$30-60/day", icon: Users },
  { name: "Retargeting — Cart Abandoners", objective: "Conversions", audience: "Custom Audience", budget: "$20-40/day", icon: ImageIcon },
  { name: "Brand Awareness — Video", objective: "Video Views", audience: "Broad", budget: "$15-30/day", icon: DollarSign },
];

export default function CampaignBuilderPage() {
  const t = useTranslations("pages.campaignBuilder");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")}>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> New Campaign</Button>
      </PageHeader>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-teal" />Campaign Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {campaignTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div key={template.name} className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-teal/50 hover:bg-teal/5 transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10">
                    <Icon className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{template.name}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{template.objective}</Badge>
                      <Badge variant="secondary">{template.audience}</Badge>
                      <Badge variant="secondary">{template.budget}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <ComingSoon title="Full Campaign Builder" description="Create structured campaigns with AI-powered audience suggestions, budget allocation, and creative recommendations. Coming in the next update." />
    </div>
  );
}
