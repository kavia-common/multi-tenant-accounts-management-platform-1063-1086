"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function PasswordResetPage() {
  const { requestPasswordReset } = useAuth();
  const [tenantId, setTenantId] = useState<number | "">("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setErr(null);
    try {
      if (tenantId === "") throw new Error("Please select tenant id");
      await requestPasswordReset({ tenant_id: Number(tenantId), email });
      setStatus("If the email exists, a reset link has been sent.");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to request reset";
      setErr(msg);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 dark:bg-neutral-950">
      <section className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="mb-2 text-xl font-semibold">Reset your password</h1>
        {status && <div className="mb-3 rounded-md bg-green-50 p-2 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-300">{status}</div>}
        {err && <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <Input label="Tenant ID" type="number" value={tenantId} onChange={(e) => setTenantId(e.target.value ? Number(e.target.value) : "")} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button className="w-full">Send reset link</Button>
        </form>
      </section>
    </main>
  );
}
