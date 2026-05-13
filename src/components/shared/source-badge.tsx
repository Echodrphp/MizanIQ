"use client";
import { Badge } from "@/components/ui/badge";
import type { DataSource } from "@/types";

const config: Record<DataSource, { label: string; variant: "official" | "platform" | "store" | "manual" | "estimated" | "inferred" | "thirdParty" | "demo" }> = {
  official_api: { label: "Official API", variant: "official" },
  platform_reported: { label: "Platform Reported", variant: "platform" },
  store_actual: { label: "Store Actual", variant: "store" },
  manual_input: { label: "Manual Input", variant: "manual" },
  estimated: { label: "Estimated", variant: "estimated" },
  inferred: { label: "Inferred", variant: "inferred" },
  third_party: { label: "Third-Party", variant: "thirdParty" },
  demo: { label: "Demo Data", variant: "demo" },
};

export function SourceBadge({ source, className }: { source: DataSource; className?: string }) {
  const c = config[source];
  return <Badge variant={c.variant} className={className}>{c.label}</Badge>;
}
