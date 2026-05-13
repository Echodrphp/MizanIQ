"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignupPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => { e.preventDefault(); setIsLoading(true); setTimeout(() => router.push("/dashboard"), 800); };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background dark:bg-background-dark">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center"><span className="text-xl font-bold text-neutral-900 dark:text-white">Mizan<span className="text-teal">IQ</span></span></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{t("signupTitle")}</h2>
          <p className="mt-1 text-sm text-neutral-500">{t("signupSubtitle")}</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2"><Label htmlFor="name">{t("fullName")}</Label><Input id="name" type="text" placeholder="Ahmed Mohamed" required /></div>
          <div className="space-y-2"><Label htmlFor="email">{t("email")}</Label><Input id="email" type="email" placeholder="name@company.com" required /></div>
          <div className="space-y-2"><Label htmlFor="password">{t("password")}</Label>
            <div className="relative"><Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Creating...</span> : t("signup")}
          </Button>
        </form>
        <p className="text-center text-sm text-neutral-500">{t("hasAccount")} <Link href="/login" className="font-medium text-teal hover:text-teal-dark">{t("login")}</Link></p>
      </div>
    </div>
  );
}
