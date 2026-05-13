export * from "./honest-intelligence";

export type UserRole = "owner" | "agency_admin" | "account_manager" | "media_buyer" | "analyst" | "client_viewer";
export type WorkspaceMode = "agency" | "individual";
export type BusinessType = "ecommerce" | "whatsapp" | "lead_gen" | "manual_ecommerce";
export type SalesChannel = "shopify" | "whatsapp" | "lead_form" | "manual_ecommerce";
export type ActionStatus = "new" | "in_progress" | "waiting_approval" | "completed" | "dismissed";
export type AlertSeverity = "critical" | "warning" | "info";
export type RiskLevel = "low" | "medium" | "high";
export type Priority = "critical" | "high" | "medium" | "low";
export type PacingStatus = "on_track" | "over_pacing" | "under_pacing";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
  comingSoon?: boolean;
}
