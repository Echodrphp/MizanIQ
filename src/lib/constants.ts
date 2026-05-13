export const APP_NAME = "MizanIQ";
export const APP_TAGLINE = "Balanced Intelligence for Smarter Ad Decisions";

export const COLORS = {
  navy: "#061A2F", navyLight: "#0C2A47", navyDark: "#040E1A",
  teal: "#00A6A6", tealLight: "#00C4C4", tealDark: "#008585",
  cyan: "#19C7D4", cyanLight: "#4DD9E3",
  success: "#16A34A", warning: "#F59E0B", danger: "#DC2626", info: "#3B82F6",
} as const;

export const CHART_COLORS = ["#00A6A6", "#19C7D4", "#061A2F", "#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899"];

export const SCORE_WEIGHTS = {
  trackingHealth: 20, performanceVsTarget: 25, budgetUtilization: 15,
  creativeFreshness: 15, funnelHealth: 15, actionDiscipline: 10,
} as const;

export const ROLES = {
  owner: { label: "Owner", level: 100 },
  agency_admin: { label: "Agency Admin", level: 80 },
  account_manager: { label: "Account Manager", level: 60 },
  media_buyer: { label: "Media Buyer", level: 50 },
  analyst: { label: "Analyst", level: 30 },
  client_viewer: { label: "Client Viewer", level: 10 },
} as const;
