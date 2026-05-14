"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function SignupPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.startsWith("/ar") ? "ar" : "en";
  const dashboardPath = locale === "en" ? "/dashboard" : "/ar/dashboard";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // For Sprint 1 the signup form is connected to the demo credentials only.
    // Real workspace creation lands in Sprint 2.
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setIsLoading(false);

    if (res?.error) {
      setError(t("invalidCredentials"));
      return;
    }
    router.push(dashboardPath);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background dark:bg-background-dark">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center"><Logo size="md" /></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{t("signupTitle")}</h2>
          <p className="mt-1 text-sm text-neutral-500">{t("signupSubtitle")}</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("fullName")}</Label>
            <Input id="name" type="text" placeholder="Ahmed Mohamed" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400" aria-label={showPassword ? t("hidePassword") : t("showPassword")}>
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
                {t("creating")}
              </span>
            ) : (
              t("signup")
            )}
          </Button>
        </form>
        <p className="text-center text-sm text-neutral-500">
          {t("hasAccount")}{" "}
          <Link href="/login" className="font-medium text-teal hover:text-teal-dark">{t("login")}</Link>
        </p>
      </div>
    </div>
  );
}
