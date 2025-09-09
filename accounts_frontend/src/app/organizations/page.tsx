"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { RequireAuth, RequireRole } from "@/components/auth/RequireAuth";
import { apiCreateOrg, apiListOrgs } from "@/lib/apiClient";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { OrgSummary } from "@/lib/types";

export default function OrgsPage() {
  const [orgs, setOrgs] = useState<OrgSummary[]>([]);
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      const list = await apiListOrgs<OrgSummary[]>();
      setOrgs(list || []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load organizations";
      setErr(msg);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      if (!name.trim()) throw new Error("Organization name is required");
      await apiCreateOrg({ name });
      setName("");
      await load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to create org";
      setErr(msg);
    }
  }

  return (
    <RequireAuth>
      <DashboardLayout>
        <RequireRole allowed={["admin"]}>
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Organizations</h1>
            {err && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{err}</div>}
            <form onSubmit={onCreate} className="flex gap-2">
              <Input placeholder="New organization name" value={name} onChange={(e) => setName(e.target.value)} />
              <Button type="submit">Create</Button>
            </form>
            <ul className="space-y-2">
              {orgs.map((o) => (
                <li key={o.id} className="rounded-md border border-neutral-200 bg-white p-3 text-sm dark:border-neutral-800 dark:bg-neutral-900">
                  {o.name}
                </li>
              ))}
            </ul>
          </div>
        </RequireRole>
      </DashboardLayout>
    </RequireAuth>
  );
}
