"use client";

import { Globe, Moon, Sun, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";

export function Topbar({ locale, onMenuToggle }: { locale: string; onMenuToggle?: () => void }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${newLocale}${pathWithoutLocale || "/"}`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/80 backdrop-blur-md px-4 lg:px-6 dark:border-neutral-800 dark:bg-background-dark/80">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal to-cyan flex items-center justify-center"><span className="text-xs font-bold text-white">M</span></div>
          <div className="flex flex-col"><span className="text-sm font-semibold text-neutral-900 dark:text-white">MizanIQ Demo</span><span className="text-[10px] text-neutral-500">Agency Mode</span></div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggleLocale} className="h-9 w-9" title={locale === "en" ? "Switch to Arabic" : "Switch to English"}>
          <Globe className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-9 w-9">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">3</span>
        </Button>
        <div className="ms-2 h-8 w-8 rounded-full bg-gradient-to-br from-navy to-teal flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}
