export type DataSource = "official_api" | "platform_reported" | "store_actual" | "manual_input" | "estimated" | "inferred" | "third_party" | "demo";
export type ConfidenceLevel = "high" | "medium" | "low" | "unknown";

export interface HonestMeta {
  source: DataSource;
  confidence: ConfidenceLevel;
  lastUpdated: Date;
  limitation?: string;
}

export interface HonestValue<T> {
  value: T;
  meta: HonestMeta;
}

export interface MetricData {
  label: string;
  value: number;
  formattedValue: string;
  trend?: { direction: "up" | "down" | "stable"; percentage: number; isPositive: boolean; };
  target?: number;
  meta: HonestMeta;
}

export type ClientHealthStatus = "healthy" | "needs_attention" | "critical";

export interface ScoreBreakdown {
  trackingHealth: number;
  performanceVsTarget: number;
  budgetUtilization: number;
  creativeFreshness: number;
  funnelHealth: number;
  actionDiscipline: number;
}
