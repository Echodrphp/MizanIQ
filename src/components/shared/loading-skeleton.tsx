"use client";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800", className)} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div><Skeleton className="h-7 w-48 mb-2" /><Skeleton className="h-4 w-32" /></div></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}</div>
    </div>
  );
}
