"use client";

import { Globe, Moon, Sun, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";

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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 lg:px-6 border-neutral-200 bg-white/95 backdrop-blur-md dark:border-[#2A3544] dark:bg-[#141D26]/95">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:text-[#8899A6] dark:hover:bg-[#1C2432]">
          <Menu className="h-5 w-5" />
        </button>
        <Logo size="sm" variant="auto" />
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
        <div className="ms-2 h-8 w-8 rounded-full bg-gradient-to-br from-[#2D3748] to-[#38BDF8] flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}
