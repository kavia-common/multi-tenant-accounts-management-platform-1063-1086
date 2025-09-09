"use client";

import React from "react";
import { cn } from "./utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  const base = "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[var(--color-accent)] text-white hover:opacity-90 focus:ring-[var(--color-accent)]",
    secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-400 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600",
    ghost: "bg-transparent text-current hover:bg-neutral-100 dark:hover:bg-neutral-800",
  } as const;
  return <button className={cn(base, variants[variant], className)} {...props} />;
}
