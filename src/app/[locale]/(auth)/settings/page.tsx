"use client";

import { useTranslations } from "next-intl";
import { User, Bell, Palette, Link2, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";

const integrations = [
  { name: "Meta Ads", status: "connected" as const, icon: "📘" },
  { name: "Google Ads", status: "not_connected" as const, icon: "🔍" },
  { name: "TikTok Ads", status: "not_connected" as const, icon: "🎵" },
  { name: "Shopify", status: "connected" as const, icon: "🛒" },
  { name: "Google Analytics", status: "not_connected" as const, icon: "📊" },
];

export default function SettingsPage() {
  const t = useTranslations("pages.settings");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("description")} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-teal" />Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="Demo User" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="demo@mizaniq.com" type="email" /></div>
                <div className="space-y-2"><Label>Role</Label><Input defaultValue="Agency Admin" disabled /></div>
                <div className="space-y-2"><Label>Agency</Label><Input defaultValue="MizanIQ Demo Agency" /></div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-5 w-5 text-teal" />Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {integrations.map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{integration.icon}</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{integration.name}</span>
                  </div>
                  {integration.status === "connected" ? (
                    <Badge variant="success">Connected</Badge>
                  ) : (
                    <Button size="sm" variant="outline">Connect</Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-teal" />Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Critical alerts", "Daily summary", "Weekly report", "Budget warnings", "Tracking issues"].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{item}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-neutral-300 text-teal focus:ring-teal" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-teal" />Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Theme</span>
                <Badge variant="secondary">System</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Language</span>
                <Badge variant="secondary">English</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-teal" />Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full" size="sm">Change Password</Button>
              <Button variant="outline" className="w-full" size="sm">Enable 2FA</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
