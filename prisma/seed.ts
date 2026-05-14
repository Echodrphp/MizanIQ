/**
 * MizanIQ — Demo seed
 *
 * Creates a demo workspace with 3 clients (Level Egypt, Smart Home Damietta, Al Reda Steel),
 * representative campaigns, metric snapshots, alerts, recommendations, action items,
 * client success scores, budget pacing, and funnel snapshots.
 *
 * Every record is marked with source="demo" and a confidence level so the UI can
 * disclose data provenance via HonestTooltip.
 *
 * Run:  npm run db:seed
 */
import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

const db = new PrismaClient();

const DEMO_USER_EMAIL = "demo@mizaniq.com";
const DEMO_USER_PASSWORD = "demo1234";
const DEMO_WORKSPACE_SLUG = "demo-agency";

const dayAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

async function main() {
  console.log("→ Seeding demo data…");

  // ===== USER =====
  const passwordHash = await hash(DEMO_USER_PASSWORD, 10);
  const user = await db.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: { passwordHash },
    create: {
      email: DEMO_USER_EMAIL,
      name: "Demo User",
      passwordHash,
      preferredLang: "en",
      preferredTheme: "system",
    },
  });

  // ===== WORKSPACE =====
  const workspace = await db.workspace.upsert({
    where: { slug: DEMO_WORKSPACE_SLUG },
    update: {},
    create: {
      slug: DEMO_WORKSPACE_SLUG,
      name: "MizanIQ Demo Agency",
      mode: "agency",
      defaultLang: "en",
      defaultCurrency: "USD",
      isDemo: true,
    },
  });

  await db.workspaceMember.upsert({
    where: { userId_workspaceId: { userId: user.id, workspaceId: workspace.id } },
    update: { role: "agency_admin" },
    create: { userId: user.id, workspaceId: workspace.id, role: "agency_admin" },
  });

  // Wipe demo client data to make seed idempotent (children cascade delete)
  await db.client.deleteMany({ where: { workspaceId: workspace.id } });

  // ===== CLIENTS =====
  const clients = await Promise.all([
    db.client.create({
      data: {
        workspaceId: workspace.id,
        name: "Level Egypt",
        businessType: "ecommerce",
        country: "Egypt",
        currency: "EGP",
        salesChannel: "shopify",
        reportingLang: "ar",
        targets: {
          create: {
            monthlyBudget: 150000,
            targetCPA: 350,
            targetROAS: 4.0,
            breakEvenROAS: 2.5,
            grossMargin: 45,
            averageOrderValue: 850,
          },
        },
      },
    }),
    db.client.create({
      data: {
        workspaceId: workspace.id,
        name: "Smart Home Damietta",
        businessType: "whatsapp",
        country: "Egypt",
        currency: "EGP",
        salesChannel: "whatsapp",
        reportingLang: "ar",
        whatsappNumber: "+201001234567",
        targets: {
          create: {
            monthlyBudget: 80000,
            targetCPA: 200,
            targetCPL: 25,
            targetROAS: 3.5,
            breakEvenROAS: 2.0,
            grossMargin: 35,
            averageOrderValue: 1200,
          },
        },
      },
    }),
    db.client.create({
      data: {
        workspaceId: workspace.id,
        name: "Al Reda Steel",
        businessType: "lead_gen",
        country: "Egypt",
        currency: "EGP",
        salesChannel: "lead_form",
        reportingLang: "ar",
        targets: {
          create: { monthlyBudget: 50000, targetCPA: 500, targetCPL: 80, grossMargin: 25 },
        },
      },
    }),
  ]);
  const [levelEgypt, smartHome, alReda] = clients;

  // ===== CAMPAIGNS =====
  await db.campaign.createMany({
    data: [
      { clientId: levelEgypt.id, name: "Prospecting — Lookalike 1%", objective: "conversions", dailyBudget: 2500, startDate: dayAgo(45) },
      { clientId: levelEgypt.id, name: "Retargeting — Cart Abandoners", objective: "conversions", dailyBudget: 1500, startDate: dayAgo(30) },
      { clientId: smartHome.id, name: "Lead Gen — WhatsApp", objective: "messages", dailyBudget: 1200, startDate: dayAgo(60) },
      { clientId: alReda.id, name: "Lead Gen — Broad Interest", objective: "leads", dailyBudget: 1700, startDate: dayAgo(20), status: "active" },
    ],
  });

  // ===== METRIC SNAPSHOTS (last 7 days, blended per client) =====
  const buildSnapshot = (clientId: string, daysAgo: number, base: Partial<Prisma.MetricSnapshotCreateManyInput>) => ({
    clientId,
    date: dayAgo(daysAgo),
    level: "client",
    source: "demo",
    confidence: "high",
    lastSynced: dayAgo(daysAgo),
    ...base,
  } as Prisma.MetricSnapshotCreateManyInput);

  await db.metricSnapshot.createMany({
    data: [
      // Level Egypt — 7 days
      ...Array.from({ length: 7 }).map((_, i) => buildSnapshot(levelEgypt.id, i, {
        spend: 4900 + i * 90,
        impressions: 245000 - i * 4000,
        clicks: 6860 - i * 110,
        ctr: 2.8 - i * 0.04,
        purchases: 47 - Math.floor(i / 2),
        revenue: 16500 - i * 250,
        roas: 3.4,
        addToCart: 312 - i * 8,
        initiateCheckout: 156 - i * 4,
        landingPageViews: 5488,
        cpa: 380,
      })),
      // Smart Home — 7 days
      ...Array.from({ length: 7 }).map((_, i) => buildSnapshot(smartHome.id, i, {
        spend: 1800 + i * 30,
        impressions: 180000 - i * 2000,
        clicks: 4320 - i * 50,
        ctr: 2.4,
        purchases: 0,
        revenue: 0,
        roas: 0,
        leads: 23 - Math.floor(i / 3),
        whatsappClicks: 691 - i * 12,
        cpl: 78,
        confidence: "low",
        limitation: "Pixel Purchase event not firing since May 10",
      })),
      // Al Reda — 7 days
      ...Array.from({ length: 7 }).map((_, i) => buildSnapshot(alReda.id, i, {
        spend: 1925 + i * 20,
        impressions: 95000 - i * 1500,
        clicks: 3800 - i * 60,
        ctr: 4.0,
        leads: 67 - Math.floor(i / 2),
        cpl: 28,
        landingPageViews: 3230,
      })),
    ],
  });

  // ===== CLIENT SUCCESS SCORES =====
  await db.clientSuccessScore.createMany({
    data: [
      {
        clientId: levelEgypt.id,
        totalScore: 72,
        status: "needs_attention",
        trackingHealth: 85,
        performanceVsTarget: 65,
        budgetUtilization: 78,
        creativeFreshness: 50,
        funnelHealth: 75,
        actionDiscipline: 80,
        mainReason: "Creative fatigue — top creatives declining",
        topIssues: ["Frequency > 3.5", "CPA 18% above target", "AddToCart drop"],
        nextAction: "Refresh top 3 creatives",
        trend: "declining",
        confidence: "medium",
        source: "calculated",
      },
      {
        clientId: smartHome.id,
        totalScore: 45,
        status: "critical",
        trackingHealth: 30,
        performanceVsTarget: 40,
        budgetUtilization: 55,
        creativeFreshness: 60,
        funnelHealth: 45,
        actionDiscipline: 50,
        mainReason: "Pixel tracking broken — Purchase event missing",
        topIssues: ["Pixel event not firing", "WhatsApp leads 40% unqualified", "Budget underpacing at 45%"],
        nextAction: "Fix Meta Pixel immediately",
        trend: "declining",
        confidence: "low",
        source: "calculated",
        limitation: "Score reliability impacted by tracking gap",
      },
      {
        clientId: alReda.id,
        totalScore: 88,
        status: "healthy",
        trackingHealth: 95,
        performanceVsTarget: 92,
        budgetUtilization: 75,
        creativeFreshness: 80,
        funnelHealth: 90,
        actionDiscipline: 95,
        mainReason: "Strong performance — scaling opportunity",
        topIssues: ["Could increase budget", "New creative angles needed", "Landing page A/B test recommended"],
        nextAction: "Increase budget 20% on top campaign",
        trend: "improving",
        confidence: "high",
        source: "calculated",
      },
    ],
  });

  // ===== TRACKING AUDITS =====
  await db.trackingAudit.createMany({
    data: [
      {
        clientId: levelEgypt.id,
        priorityScore: 80,
        pixelInstalled: true,
        capiStatus: "partial",
        purchaseEvent: "active",
        addToCartEvent: "active",
        checkoutEvent: "active",
        deduplication: "good",
        utmConsistency: "good",
        criticalIssues: [],
        warnings: ["CAPI match rate 62% — improvement possible"],
        goodSignals: ["Browser pixel firing", "Standard events deduplicated"],
      },
      {
        clientId: smartHome.id,
        priorityScore: 30,
        pixelInstalled: true,
        capiStatus: "missing",
        purchaseEvent: "broken",
        leadEvent: "degraded",
        deduplication: "n/a",
        utmConsistency: "warning",
        criticalIssues: ["Purchase event has not fired in 4 days", "WhatsApp Lead event delayed > 30min"],
        warnings: ["No CAPI configured"],
        goodSignals: ["PageView event firing"],
        confidence: "high",
      },
      {
        clientId: alReda.id,
        priorityScore: 92,
        pixelInstalled: true,
        capiStatus: "active",
        leadEvent: "active",
        deduplication: "good",
        utmConsistency: "good",
        goodSignals: ["All events firing", "CAPI match rate 89%", "UTM parameters consistent"],
      },
    ],
  });

  // ===== ALERTS =====
  await db.alert.createMany({
    data: [
      { clientId: smartHome.id, type: "tracking", severity: "critical", title: "Purchase event missing", message: "Meta Pixel Purchase event has not fired in 4 days. Attribution data is unreliable.", metricAffected: "purchases", recommendedAction: "Fix Meta Pixel immediately" },
      { clientId: levelEgypt.id, type: "performance", severity: "warning", title: "Creative fatigue detected", message: "Frequency > 3.5 with declining CTR for 5 consecutive days.", metricAffected: "ctr", recommendedAction: "Refresh top 3 creatives" },
      { clientId: alReda.id, type: "opportunity", severity: "info", title: "Scale opportunity", message: "CPL is 40% below target with stable performance — consider scaling budget.", metricAffected: "budget", recommendedAction: "Increase budget 20% on top campaign" },
    ],
  });

  // ===== RECOMMENDATIONS =====
  await db.recommendation.createMany({
    data: [
      {
        clientId: alReda.id,
        type: "scale",
        action: "Increase budget by 20% on Lead Gen — Broad Interest",
        reason: "CPL 40% below target for 7 consecutive days. Stable performance with room to scale.",
        evidence: { cplDelta: -0.4, daysStable: 7 },
        riskLevel: "low",
        confidenceScore: 85,
        oldBudget: 1700,
        suggestedBudget: 2040,
        expectedImpact: "+$10,000 monthly budget → estimated +62 leads",
        source: "rule_engine",
        confidence: "high",
      },
      {
        clientId: levelEgypt.id,
        type: "reduce",
        action: "Reduce budget by 30% on Retargeting — Cart Abandoners",
        reason: "Frequency > 4.2, diminishing returns. Audience saturation detected.",
        evidence: { frequency: 4.2 },
        riskLevel: "medium",
        confidenceScore: 65,
        oldBudget: 1500,
        suggestedBudget: 1050,
        expectedImpact: "-$4,500 monthly → reallocate to prospecting",
        source: "rule_engine",
        confidence: "medium",
      },
      {
        clientId: smartHome.id,
        type: "pause",
        action: "Pause Awareness — Video Views campaign",
        reason: "No measurable impact on lead volume. Tracking issues make attribution unreliable.",
        evidence: { trackingBroken: true },
        riskLevel: "medium",
        confidenceScore: 60,
        expectedImpact: "Save $2,000/month until tracking is fixed",
        source: "rule_engine",
        confidence: "medium",
        limitation: "Recommendation impacted by tracking gap",
      },
    ],
  });

  // ===== ACTION ITEMS =====
  await db.actionItem.createMany({
    data: [
      { clientId: levelEgypt.id, type: "creative", title: "Pause underperforming ad set", description: "Retargeting — Cart Abandoners", priority: "critical", reason: "CPA 2.3x above target for 4 days", source: "system", confidence: "high" },
      { clientId: smartHome.id, type: "tracking", title: "Fix Meta Pixel Purchase event", description: "Browser pixel + CAPI", priority: "critical", reason: "Purchase event missing since May 10", status: "in_progress", source: "system", confidence: "high" },
      { clientId: alReda.id, type: "budget", title: "Scale winning campaign +20%", description: "Lead Gen — Broad Interest", priority: "high", reason: "CPL 40% below target, stable 7 days", source: "system", confidence: "high" },
      { clientId: levelEgypt.id, type: "creative", title: "Refresh top 3 creatives", description: "Prospecting — Lookalike", priority: "medium", reason: "Frequency > 3.5, CTR declining", source: "system", confidence: "medium" },
    ],
  });

  // ===== BUDGET PACING (current month) =====
  const month = new Date().toISOString().slice(0, 7);
  await db.budgetPacing.createMany({
    data: [
      { clientId: levelEgypt.id, month, monthlyBudget: 150000, spendToDate: 98500, expectedSpendToday: 100000, remainingBudget: 51500, requiredDailySpend: 5150, projectedMonthEnd: 147750, pacingStatus: "on_track", pacingPercentage: 98.5 },
      { clientId: smartHome.id, month, monthlyBudget: 80000, spendToDate: 36000, expectedSpendToday: 53333, remainingBudget: 44000, requiredDailySpend: 4400, projectedMonthEnd: 54000, pacingStatus: "under_pacing", pacingPercentage: 67.5 },
      { clientId: alReda.id, month, monthlyBudget: 50000, spendToDate: 38500, expectedSpendToday: 33333, remainingBudget: 11500, requiredDailySpend: 1150, projectedMonthEnd: 57750, pacingStatus: "over_pacing", pacingPercentage: 115.5 },
    ],
  });

  // ===== FUNNEL SNAPSHOTS (today) =====
  await db.funnelSnapshot.createMany({
    data: [
      { clientId: levelEgypt.id, date: dayAgo(0), impressions: 245000, clicks: 6860, landingPageViews: 5488, addToCart: 824, initiateCheckout: 412, purchases: 142, revenue: 96800 },
      { clientId: smartHome.id, date: dayAgo(0), impressions: 180000, clicks: 4320, landingPageViews: 3456, whatsappClicks: 691, qualifiedLeads: 116, confidence: "low", limitation: "Tracking gap inflates funnel uncertainty" },
      { clientId: alReda.id, date: dayAgo(0), impressions: 95000, clicks: 3800, landingPageViews: 3230, qualifiedLeads: 310 },
    ],
  });

  console.log("✓ Demo data ready");
  console.log(`  → Login email:    ${DEMO_USER_EMAIL}`);
  console.log(`  → Login password: ${DEMO_USER_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
