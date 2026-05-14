"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LayoutDashboard, Users, BarChart3, ShieldCheck, Wallet, TrendingUp, Activity, Zap, Megaphone, Type, FlaskConical, Sparkles, Eye, FileText, Settings, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/shared/logo";

interface SidebarProps {
  locale: string;
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

export function Sidebar({ locale, collapsed, onCollapseChange }: SidebarProps) {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tSection = useTranslations("nav.sections");
  const isRTL = locale === "ar";
  const prefix = locale === "en" ? "" : `/${locale}`;

  const navigation = [
    { items: [{ label: tNav("dashboard"), href: "/dashboard", icon: LayoutDashboard }] },
    { title: tSection("performance"), items: [
      { label: tNav("clients"), href: "/clients", icon: Users },
      { label: tNav("performance"), href: "/performance", icon: BarChart3 },
      { label: tNav("tracking"), href: "/tracking", icon: ShieldCheck },
      { label: tNav("funnel"), href: "/funnel", icon: Activity },
    ]},
    { title: tSection("budget"), items: [
      { label: tNav("recommendations"), href: "/budget/recommendations", icon: TrendingUp },
      { label: tNav("pacing"), href: "/budget/pacing", icon: Wallet },
    ]},
    { title: tSection("actions"), items: [{ label: tNav("actions"), href: "/actions", icon: Zap, badge: 3 }] },
    { title: tSection("campaigns"), items: [
      { label: tNav("builder"), href: "/campaigns/builder", icon: Megaphone },
      { label: tNav("naming"), href: "/campaigns/naming", icon: Type },
      { label: tNav("testing"), href: "/campaigns/testing", icon: FlaskConical },
    ]},
    { title: tSection("aiTools"), items: [
      { label: tNav("prompts"), href: "/prompts", icon: Sparkles },
      { label: tNav("creative"), href: "/creative/intelligence", icon: Eye },
    ]},
    { title: tSection("reports"), items: [{ label: tNav("reports"), href: "/reports", icon: FileText }] },
    { items: [
      { label: tNav("docs"), href: "/docs", icon: BookOpen },
      { label: tNav("settings"), href: "/settings", icon: Settings },
    ]},
  ];

  const isActive = (href: string) => pathname === `${prefix}${href}` || pathname.startsWith(`${prefix}${href}/`);

  return (
    <aside className={cn(
      "fixed top-0 h-screen flex flex-col transition-all duration-300 z-40",
      "bg-gradient-to-b from-sky-50 via-white to-cyan-50 border-sky-100",
      "dark:bg-[#0F1419] dark:bg-none dark:border-[#2A3544]",
      collapsed ? "w-16" : "w-64",
      isRTL ? "right-0 border-l" : "left-0 border-r"
    )}>
      {/* Logo header */}
      <div className={cn(
        "flex h-16 items-center border-b border-sky-100 dark:border-[#2A3544] bg-white/40 dark:bg-transparent backdrop-blur-sm",
        collapsed ? "justify-center px-2" : "justify-between px-4"
      )}>
        {collapsed ? (
          <Logo size="sm" iconOnly={true} variant="auto" />
        ) : (
          <Logo size="sm" variant="auto" />
        )}
        {!collapsed && (
          <button onClick={() => onCollapseChange(!collapsed)} className="flex h-7 w-7 items-center justify-center rounded-md text-[#0EA5E9] hover:bg-[#38BDF8]/10 dark:text-[#8899A6] dark:hover:bg-[#1C2432] dark:hover:text-white transition-colors">
            {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}
        {collapsed && (
          <button onClick={() => onCollapseChange(!collapsed)} className="absolute top-4 -end-3 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-sky-200 text-[#0EA5E9] hover:border-[#38BDF8] dark:bg-[#1C2432] dark:border-[#2A3544] dark:text-[#8899A6] dark:hover:text-white transition-colors shadow-md shadow-sky-100 dark:shadow-none">
            {isRTL ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navigation.map((section, sIdx) => (
          <div key={sIdx} className="mb-2">
            {/* Subtle divider between sections (skip for first) */}
            {sIdx > 0 && !collapsed && (
              <div className="mx-3 my-2 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent dark:via-[#2A3544]" />
            )}
            {sIdx > 0 && collapsed && (
              <div className="mx-2 my-2 h-px bg-sky-200/40 dark:bg-[#2A3544]" />
            )}
            {section.title && !collapsed && (
              <div className="px-3 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0EA5E9] dark:text-[#8899A6]">{section.title}</span>
              </div>
            )}
            {section.items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={`${prefix}${item.href}`}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all relative",
                    active
                      ? "bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] text-white shadow-lg shadow-sky-200 dark:from-transparent dark:to-transparent dark:bg-[#38BDF8]/10 dark:text-[#38BDF8] dark:shadow-none"
                      : "text-slate-700 hover:bg-white hover:text-[#0EA5E9] hover:shadow-md hover:shadow-sky-100 dark:text-[#8899A6] dark:hover:bg-[#1C2432] dark:hover:text-white dark:hover:shadow-none",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    active
                      ? "text-white dark:text-[#38BDF8]"
                      : "text-slate-700 group-hover:text-[#0EA5E9] dark:text-[#8899A6] dark:group-hover:text-white"
                  )} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {"badge" in item && item.badge && (
                        <Badge
                          variant="default"
                          className={cn(
                            "h-5 min-w-5 justify-center text-[10px]",
                            active
                              ? "bg-white/25 text-white dark:bg-[#38BDF8]/20 dark:text-[#38BDF8]"
                              : "bg-[#38BDF8]/15 text-[#0EA5E9] dark:bg-[#38BDF8]/20 dark:text-[#38BDF8]"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Demo indicator */}
      {!collapsed && (
        <div className="p-3 mx-2 mb-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 dark:bg-[#1C2432] dark:from-transparent dark:to-transparent dark:border-[#2A3544]">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-xs font-medium text-amber-700 dark:text-[#8899A6]">{tNav("demoMode")}</span>
          </div>
        </div>
      )}
    </aside>
  );
}
