"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [tenantId, setTenantId] = useState<number | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      if (tenantId === "") throw new Error("Please select tenant id");
      await register({ tenant_id: Number(tenantId), name, email, password });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Registration failed";
      setErr(msg);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 dark:bg-neutral-950">
      <section className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="mb-2 text-xl font-semibold">Create your account</h1>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300">
          Join your organization&apos;s workspace.
        </p>
        {err && <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <Input label="Tenant ID" type="number" value={tenantId} onChange={(e) => setTenantId(e.target.value ? Number(e.target.value) : "")} placeholder="e.g. 1" />
          <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          <Button disabled={isLoading} className="w-full">{isLoading ? "Creating..." : "Create account"}</Button>
        </form>
        <div className="mt-4 text-sm">
          <Link href="/login" className="text-[var(--color-accent)] hover:underline">Already have an account? Sign in</Link>
        </div>
      </section>
    </main>
  );
}
