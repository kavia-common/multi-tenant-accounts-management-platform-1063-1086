"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { RequireAuth, RequireRole } from "@/components/auth/RequireAuth";
import { apiListUsers } from "@/lib/apiClient";
import type { UserSummary } from "@/lib/types";

export default function UsersPage() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await apiListUsers<UserSummary[]>();
        setUsers(list || []);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load users";
        setErr(msg);
      }
    })();
  }, []);

  return (
    <RequireAuth>
      <DashboardLayout>
        <RequireRole allowed={["admin", "manager"]}>
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Users</h1>
            {err && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{err}</div>}
            <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
              <table className="min-w-full divide-y divide-neutral-200 text-sm dark:divide-neutral-800">
                <thead className="bg-neutral-50 dark:bg-neutral-900">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Name</th>
                    <th className="px-4 py-2 text-left font-medium">Email</th>
                    <th className="px-4 py-2 text-left font-medium">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {users.map((u, idx) => (
                    <tr key={idx} className="bg-white dark:bg-neutral-950">
                      <td className="px-4 py-2">{u.name}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </RequireRole>
      </DashboardLayout>
    </RequireAuth>
  );
}
