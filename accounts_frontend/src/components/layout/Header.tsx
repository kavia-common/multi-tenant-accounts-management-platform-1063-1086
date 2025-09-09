"use client";

import React, { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useOrgs } from "@/context/OrgContext";
import { Button } from "../ui/Button";

export function HeaderBar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { user, logout, switchTenant, tenantId } = useAuth();
  const { orgs } = useOrgs();

  const themeIcon = useMemo(() => (resolvedTheme === "dark" ? "🌙" : "☀️"), [resolvedTheme]);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <span className="hidden sm:inline">Welcome</span>
        <strong className="text-neutral-900 dark:text-white">{user?.name || user?.email || "Guest"}</strong>
      </div>
      <div className="flex items-center gap-3">
        <select
          className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          value={tenantId ?? ""}
          onChange={(e) => switchTenant(Number(e.target.value))}
          aria-label="Select organization"
        >
          <option value="" disabled>
            Select org
          </option>
          {orgs.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
          title={`Theme: ${theme} (${themeIcon})`}
          aria-label="Toggle theme"
        >
          {themeIcon}
        </Button>
        <Button variant="secondary" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </header>
  );
}
