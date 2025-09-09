"use client";

import React from "react";
import { cn } from "./utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helpText?: string;
};

export function Input({ className, label, helpText, id, ...props }: Props) {
  const input = (
    <input
      id={id}
      className={cn(
        "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
        className
      )}
      {...props}
    />
  );
  if (!label) return input;
  return (
    <label className="block text-sm text-neutral-700 dark:text-neutral-300" htmlFor={id}>
      <span className="mb-1 block">{label}</span>
      {input}
      {helpText && <span className="mt-1 block text-xs text-neutral-500">{helpText}</span>}
    </label>
  );
}
