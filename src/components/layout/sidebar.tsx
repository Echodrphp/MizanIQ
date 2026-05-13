"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, BarChart3, ShieldCheck, Wallet, TrendingUp, Activity, Zap, Megaphone, Type, FlaskConical, Sparkles, Eye, FileText, Settings, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const navigation = [
  { items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }] },
  { title: "Performance", items: [
    { label: "Clients", href: "/clients", icon: Users },
    { label: "Performance", href: "/performance", icon: BarChart3 },
    { label: "Tracking Audit", href: "/tracking", icon: ShieldCheck },
    { label: "Funnel Analyzer", href: "/funnel", icon: Activity },
  ]},
  { title: "Budget", items: [
    { label: "Recommendations", href: "/budget/recommendations", icon: TrendingUp },
    { label: "Pacing", href: "/budget/pacing", icon: Wallet },
  ]},
  { title: "Actions", items: [{ label: "Action Center", href: "/actions", icon: Zap, badge: 3 }] },
  { title: "Campaigns", items: [
    { label: "Builder", href: "/campaigns/builder", icon: Megaphone },
    { label: "Naming & UTM", href: "/campaigns/naming", icon: Type },
    { label: "Creative Testing", href: "/campaigns/testing", icon: FlaskConical },
  ]},
  { title: "AI Tools", items: [
    { label: "Prompt Library", href: "/prompts", icon: Sparkles },
    { label: "Creative Intel", href: "/creative/intelligence", icon: Eye },
  ]},
  { title: "Reports", items: [{ label: "VIP Reports", href: "/reports", icon: FileText }] },
  { items: [
    { label: "Documentation", href: "/docs", icon: BookOpen },
    { label: "Settings", href: "/settings", icon: Settings },
  ]},
];

export function Sidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isRTL = locale === "ar";
  const prefix = locale === "en" ? "" : `/${locale}`;

  const isActive = (href: string) => pathname === `${prefix}${href}` || pathname.startsWith(`${prefix}${href}/`);

  return (
    <aside className={cn("fixed top-0 h-screen flex flex-col bg-sidebar dark:bg-sidebar-dark border-neutral-800 transition-all duration-300 z-40", collapsed ? "w-16" : "w-64", isRTL ? "right-0 border-l" : "left-0 border-r")}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal to-cyan flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M 7 16 A 7 7 0 0 1 17 16" strokeLinecap="round" /><line x1="12" y1="15" x2="12" y2="7" strokeLinecap="round" /><circle cx="12" cy="15" r="1.5" fill="currentColor" />
            </svg>
          </div>
          {!collapsed && <span className="text-lg font-bold"><span className="text-white">Mizan</span><span className="text-teal">IQ</span></span>}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-sidebar-hover hover:text-white">
          {collapsed ? (isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />) : (isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />)}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navigation.map((section, sIdx) => (
          <div key={sIdx} className="mb-2">
            {section.title && !collapsed && <div className="px-3 py-2"><span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">{section.title}</span></div>}
            {section.items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link key={item.href} href={`${prefix}${item.href}`} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative", active ? "bg-teal/10 text-teal" : "text-sidebar-text hover:bg-sidebar-hover hover:text-white", collapsed && "justify-center px-2")}>
                  <Icon className={cn("h-5 w-5 shrink-0", active && "text-teal")} />
                  {!collapsed && <><span className="flex-1 truncate">{item.label}</span>{"badge" in item && item.badge && <Badge variant="default" className="h-5 min-w-5 justify-center text-[10px]">{item.badge}</Badge>}</>}
                  {active && <div className={cn("absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-teal rounded-full", isRTL ? "-left-2" : "-right-2")} />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Demo indicator */}
      {!collapsed && <div className="p-3 mx-2 mb-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50"><div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-warning animate-pulse" /><span className="text-xs text-neutral-400">Demo Mode</span></div></div>}
    </aside>
  );
}
