"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}

export function RequireRole({ allowed, children }: { allowed: Array<"admin" | "manager" | "sales_rep" | "viewer">; children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user?.role || !allowed.includes(user.role)) {
    return <div className="text-sm text-neutral-500">You do not have access to this section.</div>;
  }
  return <>{children}</>;
}
