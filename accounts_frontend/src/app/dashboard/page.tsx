"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { apiGetDashboard } from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";
import type { DashboardResponse } from "@/lib/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const d = await apiGetDashboard<DashboardResponse>();
        setData(d);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load dashboard";
        setError(msg);
      }
    })();
  }, []);

  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-neutral-500">Role: {user?.role || data?.role || "N/A"}</p>
          </div>
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="text-xs uppercase text-neutral-500">Overview</div>
              <div className="mt-2 text-3xl font-semibold">{data?.summary?.total ?? "--"}</div>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="text-xs uppercase text-neutral-500">Active</div>
              <div className="mt-2 text-3xl font-semibold">{data?.summary?.active ?? "--"}</div>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="text-xs uppercase text-neutral-500">Pending</div>
              <div className="mt-2 text-3xl font-semibold">{data?.summary?.pending ?? "--"}</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
