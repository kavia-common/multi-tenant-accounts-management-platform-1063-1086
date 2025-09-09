"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { HeaderBar } from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="flex">
        <Sidebar />
        <div className="flex min-h-screen w-full flex-col md:ml-64">
          <HeaderBar />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
