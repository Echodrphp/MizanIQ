export const APP_NAME = "MizanIQ";
export const APP_TAGLINE = "Balanced Intelligence for Smarter Ad Decisions";

export const COLORS = {
  navy: "#2D3748", navyLight: "#4A5568", navyDark: "#1A202C",
  teal: "#38BDF8", tealLight: "#7DD3FC", tealDark: "#0EA5E9",
  cyan: "#22D3EE", cyanLight: "#67E8F9",
  success: "#10B981", warning: "#F59E0B", danger: "#EF4444", info: "#3B82F6",
} as const;

export const CHART_COLORS = ["#38BDF8", "#22D3EE", "#2D3748", "#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899"];

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
