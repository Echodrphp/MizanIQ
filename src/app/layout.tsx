import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MizanIQ - Balanced Intelligence for Smarter Ad Decisions",
  description: "AI-powered bilingual media buying intelligence platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
