import type { HonestMeta } from "@/types";

export const DEMO_META: HonestMeta = {
  source: "demo",
  confidence: "high",
  lastUpdated: new Date(),
  limitation: "Demo data for illustration purposes",
};

export interface DemoClient {
  id: string;
  name: string;
  businessType: string;
  salesChannel: string;
  country: string;
  currency: string;
  targets: { monthlyBudget: number; targetCPA: number; targetCPL?: number; targetROAS?: number; breakEvenROAS?: number; grossMargin: number; averageOrderValue?: number };
  healthScore: { total: number; status: "healthy" | "needs_attention" | "critical"; mainReason: string; topIssues: string[]; nextAction: string; trend: "improving" | "stable" | "declining" };
}

export const demoClients: DemoClient[] = [
  {
    id: "client-level-egypt", name: "Level Egypt", businessType: "ecommerce", salesChannel: "shopify", country: "Egypt", currency: "EGP",
    targets: { monthlyBudget: 150000, targetCPA: 350, targetROAS: 4.0, breakEvenROAS: 2.5, grossMargin: 45, averageOrderValue: 850 },
    healthScore: { total: 72, status: "needs_attention", mainReason: "Creative fatigue — top creatives declining", topIssues: ["Frequency > 3.5", "CPA 18% above target", "AddToCart drop"], nextAction: "Refresh top 3 creatives", trend: "declining" },
  },
  {
    id: "client-smart-home", name: "Smart Home Damietta", businessType: "whatsapp", salesChannel: "whatsapp", country: "Egypt", currency: "EGP",
    targets: { monthlyBudget: 80000, targetCPA: 200, targetCPL: 25, targetROAS: 3.5, breakEvenROAS: 2.0, grossMargin: 35, averageOrderValue: 1200 },
    healthScore: { total: 45, status: "critical", mainReason: "Pixel tracking broken — Purchase event missing", topIssues: ["Pixel event not firing", "WhatsApp leads 40% unqualified", "Budget underpacing at 45%"], nextAction: "Fix Meta Pixel immediately", trend: "declining" },
  },
  {
    id: "client-al-reda", name: "Al Reda Steel", businessType: "lead_gen", salesChannel: "lead_form", country: "Egypt", currency: "EGP",
    targets: { monthlyBudget: 50000, targetCPA: 500, targetCPL: 80, grossMargin: 25 },
    healthScore: { total: 88, status: "healthy", mainReason: "Strong performance — scaling opportunity", topIssues: ["Could increase budget", "New creative angles needed", "Landing page A/B test recommended"], nextAction: "Increase budget 20% on top campaign", trend: "improving" },
  },
];
