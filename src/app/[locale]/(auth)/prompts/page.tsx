"use client";

import { useTranslations } from "next-intl";
import { Sparkles, Copy, CheckCircle2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/page-header";
import { useState } from "react";

const prompts = [
  { id: 1, title: "Ad Copy — Pain Point Hook", category: "Copywriting", language: "en", prompt: "Write 3 Facebook ad hooks for [product] targeting [audience]. Focus on the pain point of [problem]. Each hook should be under 125 characters, create urgency, and speak directly to the reader. Include an emoji at the start.", tags: ["Meta", "Copy", "Hooks"] },
  { id: 2, title: "نص إعلاني — خطاف المشكلة", category: "Copywriting", language: "ar", prompt: "اكتب 3 خطافات إعلانية لفيسبوك لـ [المنتج] تستهدف [الجمهور]. ركز على مشكلة [المشكلة]. كل خطاف أقل من 125 حرف، يخلق إلحاح، ويتحدث مباشرة للقارئ.", tags: ["Meta", "نص", "خطافات"] },
  { id: 3, title: "Campaign Strategy Brief", category: "Strategy", language: "en", prompt: "Create a media buying strategy for [client] with a monthly budget of [budget]. Business type: [type]. Goals: [goals]. Include: platform mix recommendation, audience strategy, creative approach, KPIs, and testing plan for the first 30 days.", tags: ["Strategy", "Planning"] },
  { id: 4, title: "Performance Analysis Report", category: "Analysis", language: "en", prompt: "Analyze this campaign data and provide: 1) Top 3 wins this week, 2) Top 3 concerns, 3) Recommended actions with priority levels, 4) Budget reallocation suggestions. Data: [paste metrics]", tags: ["Analysis", "Reports"] },
  { id: 5, title: "Creative Brief Generator", category: "Creative", language: "en", prompt: "Generate a creative brief for [product/service]. Target audience: [audience]. Key message: [message]. Tone: [tone]. Include: 3 headline options, 3 body copy variations, CTA suggestions, and visual direction notes.", tags: ["Creative", "Brief"] },
  { id: 6, title: "Audience Research Prompt", category: "Research", language: "en", prompt: "Research the ideal audience for [product] in [market]. Provide: demographics, psychographics, pain points, desires, objections, where they spend time online, and 5 interest-based targeting suggestions for Meta Ads.", tags: ["Research", "Audience"] },
  { id: 7, title: "Client Report Summary", category: "Reports", language: "en", prompt: "Write a professional client report summary for [client]. Period: [dates]. Include: executive summary (3 sentences), key metrics vs targets, wins, challenges, and next month's priorities. Tone: confident but honest.", tags: ["Reports", "Client"] },
  { id: 8, title: "تقرير أداء أسبوعي", category: "Reports", language: "ar", prompt: "اكتب ملخص تقرير أسبوعي لعميل [الاسم]. الفترة: [التواريخ]. يشمل: ملخص تنفيذي، المقاييس الرئيسية مقابل الأهداف، الإنجازات، التحديات، وخطة الأسبوع القادم.", tags: ["تقارير", "عميل"] },
];

const categories = ["all", "copywriting", "strategy", "analysis", "creative", "research", "reports"] as const;
type CategoryKey = typeof categories[number];

export default function PromptsPage() {
  const t = useTranslations("pages.prompts");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filtered = prompts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.prompt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || p.category.toLowerCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")} />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input placeholder={t("searchPlaceholder")} value={search} onChange={(e) => setSearch(e.target.value)} className="ps-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button key={cat} size="sm" variant={activeCategory === cat ? "default" : "ghost"} onClick={() => setActiveCategory(cat)}>
              {t(`categories.${cat}`)}
            </Button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((prompt) => (
          <Card key={prompt.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-500" />
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">{prompt.title}</h3>
                </div>
                <Badge variant="secondary">{prompt.language === "ar" ? "عربي" : "EN"}</Badge>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-3 font-mono bg-neutral-50 dark:bg-[#0F1419] p-2 rounded">{prompt.prompt}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {prompt.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>)}
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleCopy(prompt.id, prompt.prompt)}>
                  {copiedId === prompt.id ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
