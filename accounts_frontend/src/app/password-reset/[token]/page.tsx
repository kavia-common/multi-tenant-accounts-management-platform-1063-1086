"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";



export default function PasswordResetConfirmPage() {
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { confirmPasswordReset } = useAuth();

  // Extract token from the last segment of the path (since with export we can't pre-generate)
  const token = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || search.get("token") || "";
  }, [pathname, search]);

  const [tenantId, setTenantId] = useState<number | "">("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setStatus(null);
    try {
      if (!token) throw new Error("Reset token is missing");
      if (tenantId === "") throw new Error("Please select tenant id");
      await confirmPasswordReset(String(token), { tenant_id: Number(tenantId), new_password: password });
      setStatus("Password updated. Redirecting to login...");
      setTimeout(() => router.replace("/login"), 1200);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to reset password";
      setErr(msg);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 dark:bg-neutral-950">
      <section className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="mb-2 text-xl font-semibold">Set a new password</h1>
        {status && <div className="mb-3 rounded-md bg-green-50 p-2 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-300">{status}</div>}
        {err && <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <Input label="Tenant ID" type="number" value={tenantId} onChange={(e) => setTenantId(e.target.value ? Number(e.target.value) : "")} />
          <Input label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full">Update password</Button>
        </form>
      </section>
    </main>
  );
}
