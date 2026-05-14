"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight, BarChart3, Shield, Zap, Globe, Users, TrendingUp, CheckCircle2, Star, Play, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function LandingPage() {
  const t = useTranslations("landing");
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Detect current locale from path
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";

  const toggleLocale = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${newLocale}${pathWithoutLocale || ""}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F1419]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-lg dark:border-[#2A3544] dark:bg-[#0F1419]/95">
        <div className="max-w-6xl mx-auto px-6 flex h-16 items-center justify-between">
          <Logo size="sm" variant="auto" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">{t("nav.features")}</a>
            <a href="#how-it-works" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">{t("nav.howItWorks")}</a>
            <a href="#pricing" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">{t("nav.pricing")}</a>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleLocale}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-[#1C2432] dark:hover:text-white transition-colors"
              title={currentLocale === "en" ? "العربية" : "English"}
            >
              <Globe className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-[#1C2432] dark:hover:text-white transition-colors"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="ms-2 flex items-center gap-2">
              <Link href="/login"><Button variant="ghost" size="sm">{t("nav.login")}</Button></Link>
              <Link href="/signup"><Button size="sm">{t("nav.getStarted")}</Button></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/5 border border-teal/20 text-teal text-sm font-medium mb-8">
            <Star className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white leading-[1.15] tracking-tight">
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.titleHighlight")}</span>
            <br />{t("hero.title2")}
          </h1>
          <p className="mt-6 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="px-8 h-12 text-[15px] font-semibold rounded-xl">
                {t("hero.cta")} <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 h-12 text-[15px] font-semibold rounded-xl">
                <Play className="h-4 w-4 me-2" /> {t("hero.demo")}
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-neutral-400">{t("hero.noCreditCard")}</p>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-[#2A3544] bg-neutral-50 dark:bg-[#1C2432] shadow-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#141D26] border-b border-neutral-200 dark:border-[#2A3544]">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-neutral-400 mx-auto font-mono">app.mizaniq.com/dashboard</span>
            </div>
            <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl bg-white dark:bg-[#0F1419] p-5 shadow-sm border border-neutral-100 dark:border-[#2A3544]">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{t("preview.totalSpend")}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">$28,450</p>
                <p className="text-xs text-red-500 mt-1 font-medium">↑ 12.5%</p>
              </div>
              <div className="rounded-xl bg-white dark:bg-[#0F1419] p-5 shadow-sm border border-neutral-100 dark:border-[#2A3544]">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{t("preview.revenue")}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">$96,800</p>
                <p className="text-xs text-green-500 mt-1 font-medium">↑ 8.3%</p>
              </div>
              <div className="rounded-xl bg-white dark:bg-[#0F1419] p-5 shadow-sm border border-neutral-100 dark:border-[#2A3544]">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{t("preview.avgRoas")}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">3.40x</p>
                <p className="text-xs text-red-500 mt-1 font-medium">↓ 4.2%</p>
              </div>
              <div className="rounded-xl bg-white dark:bg-[#0F1419] p-5 shadow-sm border border-neutral-100 dark:border-[#2A3544]">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{t("preview.clients")}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">3</p>
                <p className="text-xs text-green-500 mt-1 font-medium">{t("preview.stable")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-neutral-50 dark:bg-[#141D26]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-teal uppercase tracking-wide mb-3">{t("features.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">{t("features.title")}</h2>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">{t("features.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: BarChart3, title: t("features.performance.title"), desc: t("features.performance.desc") },
              { icon: Shield, title: t("features.tracking.title"), desc: t("features.tracking.desc") },
              { icon: Zap, title: t("features.actions.title"), desc: t("features.actions.desc") },
              { icon: Globe, title: t("features.bilingual.title"), desc: t("features.bilingual.desc") },
              { icon: Users, title: t("features.clients.title"), desc: t("features.clients.desc") },
              { icon: TrendingUp, title: t("features.budget.title"), desc: t("features.budget.desc") },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#1C2432] border border-neutral-200 dark:border-[#2A3544] hover:border-teal/30 hover:shadow-lg transition-all duration-200">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 mb-4">
                  <f.icon className="h-5 w-5 text-teal" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-teal uppercase tracking-wide mb-3">{t("howItWorks.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">{t("howItWorks.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: "1", title: t("howItWorks.step1.title"), desc: t("howItWorks.step1.desc") },
              { step: "2", title: t("howItWorks.step2.title"), desc: t("howItWorks.step2.desc") },
              { step: "3", title: t("howItWorks.step3.title"), desc: t("howItWorks.step3.desc") },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 border border-teal/20 mx-auto mb-5">
                  <span className="text-xl font-bold text-teal">{s.step}</span>
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Intelligence */}
      <section className="py-24 px-6 bg-neutral-900 dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-teal uppercase tracking-wide mb-3">{t("honest.badge")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">{t("honest.title")}</h2>
              <p className="text-neutral-400 mb-8 leading-relaxed">{t("honest.subtitle")}</p>
              <div className="space-y-4">
                {[t("honest.point1"), t("honest.point2"), t("honest.point3"), t("honest.point4")].map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal shrink-0 mt-0.5" />
                    <span className="text-neutral-300 text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">{t("honestCard.title")}</span>
                <span className="text-xs px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400 font-medium">{t("honestCard.confidence")}</span>
              </div>
              <p className="text-white font-semibold text-lg">&ldquo;{t("honestCard.quote")}&rdquo;</p>
              <div className="space-y-3 text-sm pt-2">
                <div className="flex justify-between"><span className="text-neutral-500">{t("honestCard.source")}</span><span className="text-neutral-200">{t("honestCard.sourceValue")}</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">{t("honestCard.confLabel")}</span><span className="text-yellow-400">{t("honestCard.confValue")}</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">{t("honestCard.limitation")}</span><span className="text-neutral-300">{t("honestCard.limitationValue")}</span></div>
              </div>
              <div className="pt-4 border-t border-neutral-700">
                <p className="text-xs text-neutral-500">⚖️ {t("honest.disclaimer")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-teal uppercase tracking-wide mb-3">{t("pricing.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">{t("pricing.title")}</h2>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">{t("pricing.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: t("pricing.starter.name"), price: t("pricing.starter.price"), desc: t("pricing.starter.desc"), features: [t("pricing.starter.f1"), t("pricing.starter.f2"), t("pricing.starter.f3"), t("pricing.starter.f4")], popular: false },
              { name: t("pricing.pro.name"), price: t("pricing.pro.price"), desc: t("pricing.pro.desc"), features: [t("pricing.pro.f1"), t("pricing.pro.f2"), t("pricing.pro.f3"), t("pricing.pro.f4"), t("pricing.pro.f5")], popular: true },
              { name: t("pricing.agency.name"), price: t("pricing.agency.price"), desc: t("pricing.agency.desc"), features: [t("pricing.agency.f1"), t("pricing.agency.f2"), t("pricing.agency.f3"), t("pricing.agency.f4"), t("pricing.agency.f5")], popular: false },
            ].map((plan, i) => (
              <div key={i} className={`relative rounded-2xl p-6 ${plan.popular ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 ring-2 ring-teal" : "bg-white dark:bg-[#1C2432] border border-neutral-200 dark:border-[#2A3544]"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="px-3 py-1 rounded-full bg-teal text-white text-xs font-semibold">{t("pricing.popular")}</span></div>}
                <h3 className={`text-lg font-semibold ${plan.popular ? "" : "text-neutral-900 dark:text-white"}`}>{plan.name}</h3>
                <p className={`text-sm mt-1 ${plan.popular ? "text-neutral-300 dark:text-neutral-500" : "text-neutral-500"}`}>{plan.desc}</p>
                <div className="mt-5 mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? "" : "text-neutral-900 dark:text-white"}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-500"}`}>/{t("pricing.month")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className={`flex items-start gap-2.5 text-sm ${plan.popular ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-600 dark:text-neutral-400"}`}>
                      <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button variant={plan.popular ? "default" : "outline"} className="w-full rounded-xl h-11">{t("pricing.choosePlan")}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-black dark:to-[#0F1419]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{t("cta.title")}</h2>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">{t("cta.subtitle")}</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="px-8 h-12 text-[15px] font-semibold rounded-xl">{t("cta.start")} <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" /></Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 h-12 text-[15px] font-semibold rounded-xl border-neutral-600 text-white hover:bg-white/10">{t("cta.demo")}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-[#2A3544] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" variant="auto" />
          <p className="text-sm text-neutral-400">© 2026 MizanIQ. {t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  );
}
