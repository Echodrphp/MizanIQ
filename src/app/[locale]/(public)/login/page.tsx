"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import Link from "next/link";

const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL ?? "demo@mizaniq.com";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD ?? "demo1234";

export default function LoginPage() {
  const t = useTranslations("auth");
  const tBrand = useTranslations("auth.brand");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.startsWith("/ar") ? "ar" : "en";
  const dashboardPath = locale === "en" ? "/dashboard" : "/ar/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function performLogin(emailValue: string, passwordValue: string) {
    setError(null);
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: emailValue,
      password: passwordValue,
      redirect: false,
    });
    setIsLoading(false);

    if (res?.error) {
      setError(t("invalidCredentials"));
      return;
    }
    router.push(dashboardPath);
    router.refresh();
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    void performLogin(email, password);
  };

  const handleDemo = () => {
    void performLogin(DEMO_EMAIL, DEMO_PASSWORD);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-navy p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-teal blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-cyan blur-3xl" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <Logo size="lg" variant="dark" />
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            {tBrand("heroTitle1")}<br />
            <span className="text-teal">{tBrand("heroTitle2")}</span>
          </h1>
          <p className="text-lg text-neutral-300 max-w-md">{tBrand("heroSubtitle")}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />{tBrand("pillar1")}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal" />{tBrand("pillar2")}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan" />{tBrand("pillar3")}</span>
          </div>
        </div>
        <p className="relative z-10 text-xs text-neutral-500">© 2026 MizanIQ. {tBrand("rights")}</p>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background dark:bg-background-dark">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex justify-center mb-8">
            <Logo size="md" />
          </div>
          <div className="text-center lg:text-start">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{t("loginTitle")}</h2>
            <p className="mt-1 text-sm text-neutral-500">{t("loginSubtitle")}</p>
          </div>

          {/* Demo CTA */}
          <Card className="border-teal/20 bg-teal/5 dark:bg-teal/10">
            <CardContent className="p-4">
              <button onClick={handleDemo} className="w-full flex items-center gap-3 group" disabled={isLoading} type="button">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 group-hover:bg-teal/20">
                  <Sparkles className="h-5 w-5 text-teal" />
                </div>
                <div className="flex-1 text-start">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">{t("demoAccess")}</p>
                  <p className="text-xs text-neutral-500">{t("demoDescription")}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-teal opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
              </button>
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-200 dark:border-neutral-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background dark:bg-background-dark px-2 text-neutral-500">{t("orEmailLogin")}</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("password")}</Label>
                <button type="button" className="text-xs text-teal hover:text-teal-dark">{t("forgotPassword")}</button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400"
                  aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {t("loading")}
                </span>
              ) : (
                t("login")
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500">
            {t("noAccount")}{" "}
            <Link href="/signup" className="font-medium text-teal hover:text-teal-dark">{t("signup")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
