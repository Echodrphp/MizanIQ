"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark" | "auto";
  iconOnly?: boolean;
  className?: string;
}

const heights = {
  sm: 32,
  md: 38,
  lg: 46,
  xl: 56,
};

// Intrinsic dimensions (used by next/image for aspect ratio)
const FULL_W = 280;
const FULL_H = 60;
const ICON_W = 60;
const ICON_H = 60;

export function Logo({ size = "md", variant = "auto", iconOnly = false, className }: LogoProps) {
  const h = heights[size];

  if (iconOnly) {
    if (variant === "light") {
      return (
        <Image
          src="/icon.png"
          alt="MizanIQ"
          width={ICON_W}
          height={ICON_H}
          style={{ height: h, width: "auto", filter: "invert(1) brightness(0.4)" }}
          className={cn("object-contain", className)}
          priority
        />
      );
    }
    if (variant === "dark") {
      return (
        <Image
          src="/icon.png"
          alt="MizanIQ"
          width={ICON_W}
          height={ICON_H}
          style={{ height: h, width: "auto" }}
          className={cn("object-contain", className)}
          priority
        />
      );
    }
    return (
      <>
        <Image
          src="/icon.png"
          alt="MizanIQ"
          width={ICON_W}
          height={ICON_H}
          style={{ height: h, width: "auto", filter: "invert(1) brightness(0.4)" }}
          className={cn("object-contain dark:hidden", className)}
          priority
        />
        <Image
          src="/icon.png"
          alt="MizanIQ"
          width={ICON_W}
          height={ICON_H}
          style={{ height: h, width: "auto" }}
          className={cn("object-contain hidden dark:block", className)}
          priority
        />
      </>
    );
  }

  if (variant === "dark") {
    return (
      <Image
        src="/logo-dark.png"
        alt="MizanIQ"
        width={FULL_W}
        height={FULL_H}
        style={{ height: h, width: "auto" }}
        className={cn("object-contain", className)}
        priority
      />
    );
  }

  if (variant === "light") {
    return (
      <Image
        src="/logo.png"
        alt="MizanIQ"
        width={FULL_W}
        height={FULL_H}
        style={{ height: h, width: "auto" }}
        className={cn("object-contain", className)}
        priority
      />
    );
  }

  return (
    <div className={cn("shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="MizanIQ"
        width={FULL_W}
        height={FULL_H}
        style={{ height: h, width: "auto" }}
        className="object-contain dark:hidden"
        priority
      />
      <Image
        src="/logo-dark.png"
        alt="MizanIQ"
        width={FULL_W}
        height={FULL_H}
        style={{ height: h, width: "auto" }}
        className="object-contain hidden dark:block"
        priority
      />
    </div>
  );
}
