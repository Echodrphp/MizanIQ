import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    const loginPath = locale === "en" ? "/login" : `/${locale}/login`;
    redirect(loginPath);
  }

  return <AppShell locale={locale}>{children}</AppShell>;
}
