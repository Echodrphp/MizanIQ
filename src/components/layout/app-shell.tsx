"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { cn } from "@/lib/utils";

export function AppShell({ children, locale }: { children: React.ReactNode; locale: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = locale === "ar";

  return (
    <div className={cn("min-h-screen")} dir={isRTL ? "rtl" : "ltr"}>
      <div className="hidden lg:block"><Sidebar locale={locale} /></div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className={cn("fixed top-0 h-full", isRTL ? "right-0" : "left-0")}><Sidebar locale={locale} /></div>
        </div>
      )}
      <div className={cn("lg:transition-all lg:duration-300", isRTL ? "lg:mr-64" : "lg:ml-64")}>
        <Topbar locale={locale} onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="p-4 lg:p-6 max-w-[1440px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
