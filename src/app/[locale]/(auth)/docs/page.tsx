"use client";

import { useTranslations } from "next-intl";
import { BookOpen, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/page-header";
import { useState } from "react";

const docs = [
  { title: "Getting Started", description: "Set up your account, connect ad platforms, and add your first client.", category: "Basics", readTime: "5 min" },
  { title: "Understanding Health Scores", description: "How MizanIQ calculates client health scores and what each component means.", category: "Concepts", readTime: "8 min" },
  { title: "Connecting Meta Ads", description: "Step-by-step guide to connecting your Meta Business Manager and ad accounts.", category: "Integrations", readTime: "4 min" },
  { title: "Connecting Google Ads", description: "Link your Google Ads accounts for cross-platform performance tracking.", category: "Integrations", readTime: "4 min" },
  { title: "Budget Pacing Explained", description: "How budget pacing works, what triggers alerts, and how to respond.", category: "Features", readTime: "6 min" },
  { title: "Action Center Guide", description: "Understanding action priorities, taking action, and tracking completion.", category: "Features", readTime: "7 min" },
  { title: "Honest Intelligence Philosophy", description: "Why we show confidence levels, data sources, and limitations on every metric.", category: "Concepts", readTime: "5 min" },
  { title: "Campaign Naming Convention", description: "Our recommended naming structure for campaigns, ad sets, and ads.", category: "Best Practices", readTime: "3 min" },
  { title: "Creative Testing Framework", description: "How to set up, run, and analyze creative A/B tests effectively.", category: "Best Practices", readTime: "10 min" },
  { title: "Generating Client Reports", description: "Create professional reports with customizable sections and branding.", category: "Features", readTime: "5 min" },
  { title: "Team & Permissions", description: "Managing team members, roles, and access levels.", category: "Admin", readTime: "4 min" },
  { title: "API Documentation", description: "REST API reference for programmatic access to MizanIQ data.", category: "Developer", readTime: "15 min" },
];

const categories = ["all", "basics", "concepts", "integrations", "features", "bestPractices", "admin", "developer"] as const;
type CategoryKey = typeof categories[number];

const categoryToKey = (category: string): CategoryKey => {
  switch (category) {
    case "Basics": return "basics";
    case "Concepts": return "concepts";
    case "Integrations": return "integrations";
    case "Features": return "features";
    case "Best Practices": return "bestPractices";
    case "Admin": return "admin";
    case "Developer": return "developer";
    default: return "all";
  }
};

export default function DocsPage() {
  const t = useTranslations("pages.docs");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filtered = docs.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || categoryToKey(d.category) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")} />

      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input placeholder={t("searchPlaceholder")} value={search} onChange={(e) => setSearch(e.target.value)} className="ps-9" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeCategory === cat ? "bg-sky-500 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-[#1C2432] dark:text-neutral-400"}`}>
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <Card key={doc.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <BookOpen className="h-5 w-5 text-sky-500 shrink-0" />
                <Badge variant="secondary" className="text-[10px]">{doc.readTime}</Badge>
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">{doc.title}</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">{doc.description}</p>
              <Badge variant="secondary" className="mt-3 text-[10px]">{t(`categories.${categoryToKey(doc.category)}`)}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
