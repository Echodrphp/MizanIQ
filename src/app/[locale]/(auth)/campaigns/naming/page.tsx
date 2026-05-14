"use client";

import { useTranslations } from "next-intl";
import { Type, Copy, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { useState } from "react";

const namingConvention = {
  campaign: "[Client]_[Objective]_[Audience]_[Month][Year]",
  adSet: "[Targeting]_[Placement]_[Age]_[Gender]",
  ad: "[Format]_[Hook]_[CTA]_[Version]",
};

const examples = [
  { levelKey: "campaign", example: "LevelEgypt_Conv_LAL1_May25" },
  { levelKey: "adSet", example: "Interest_AllPlacements_25-45_All" },
  { levelKey: "ad", example: "Video_PainPoint_ShopNow_V2" },
];

export default function NamingPage() {
  const t = useTranslations("pages.naming");
  const [utmSource, setUtmSource] = useState("facebook");
  const [utmMedium, setUtmMedium] = useState("paid_social");
  const [utmCampaign, setUtmCampaign] = useState("level_egypt_conv_may25");
  const [utmContent, setUtmContent] = useState("video_painpoint_v2");
  const [copied, setCopied] = useState(false);

  const utmUrl = `https://example.com?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${utmContent}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(utmUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")} />

      {/* Naming Convention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Type className="h-5 w-5 text-sky-500" />{t("convention")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {Object.entries(namingConvention).map(([level, pattern]) => (
              <div key={level} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-[#0F1419]">
                <Badge variant="default" className="w-24 justify-center">{t(`levels.${level === "adSet" ? "adSet" : level}`)}</Badge>
                <code className="text-sm text-neutral-700 dark:text-neutral-300 font-mono">{pattern}</code>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-200 dark:border-[#2A3544] pt-4">
            <h4 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">{t("examples")}</h4>
            <div className="space-y-2">
              {examples.map((ex) => (
                <div key={ex.levelKey} className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 w-24">{t(`levels.${ex.levelKey}`)}</span>
                  <code className="text-sm font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 px-2 py-1 rounded">{ex.example}</code>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UTM Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Type className="h-5 w-5 text-sky-500" />{t("utmBuilder")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>utm_source</Label>
              <Input value={utmSource} onChange={(e) => setUtmSource(e.target.value)} placeholder="facebook" />
            </div>
            <div className="space-y-2">
              <Label>utm_medium</Label>
              <Input value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} placeholder="paid_social" />
            </div>
            <div className="space-y-2">
              <Label>utm_campaign</Label>
              <Input value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} placeholder="campaign_name" />
            </div>
            <div className="space-y-2">
              <Label>utm_content</Label>
              <Input value={utmContent} onChange={(e) => setUtmContent(e.target.value)} placeholder="ad_content" />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-[#0F1419] border border-neutral-200 dark:border-[#2A3544]">
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs text-neutral-700 dark:text-neutral-300 break-all">{utmUrl}</code>
              <Button size="sm" variant="ghost" onClick={handleCopy}>
                {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
