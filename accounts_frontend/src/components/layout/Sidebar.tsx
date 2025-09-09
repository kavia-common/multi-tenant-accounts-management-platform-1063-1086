"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "../ui/utils";

type Role = "admin" | "manager" | "sales_rep" | "viewer";

type NavItem = {
  href: string;
  label: string;
  roles: Role[];
};

const navItems: ReadonlyArray<NavItem> = [
  { href: "/dashboard", label: "Dashboard", roles: ["admin", "manager", "sales_rep", "viewer"] },
  { href: "/users", label: "Users", roles: ["admin", "manager"] },
  { href: "/organizations", label: "Organizations", roles: ["admin"] },
];

export function Sidebar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const role: Role = (user?.role || "viewer") as Role;

  return (
    <>
      <button
        onClick={() => setOpen((s) => !s)}
        className="md:hidden fixed top-4 left-4 z-50 rounded-md bg-neutral-200 p-2 text-neutral-900 dark:bg-neutral-800 dark:text-white"
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-neutral-200 bg-white p-4 transition-transform duration-200 ease-in-out dark:border-neutral-800 dark:bg-neutral-950 md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="mb-6 flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-[var(--color-accent)]" />
          <div>
            <div className="text-sm font-semibold text-neutral-900 dark:text-white">Accounts</div>
            <div className="text-xs text-neutral-500">Multi-tenant</div>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems
            .filter((i) => i.roles.includes(role))
            .map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                {i.label}
              </Link>
            ))}
        </nav>
      </aside>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
