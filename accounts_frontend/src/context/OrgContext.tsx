"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiListOrgs } from "@/lib/apiClient";
import { useAuth } from "./AuthContext";

export type Org = { id: number; name: string };

type OrgContextType = {
  orgs: Org[];
  // PUBLIC_INTERFACE
  refresh: () => Promise<void>;
};

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [orgs, setOrgs] = useState<Org[]>([]);

  const load = useCallback(async () => {
    if (!isAuthenticated) {
      setOrgs([]);
      return;
    }
    try {
      const list = await apiListOrgs<Org[]>();
      setOrgs(list || []);
    } catch {
      setOrgs([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    void load();
  }, [load]);

  const value = useMemo(() => ({ orgs, refresh: load }), [orgs, load]);
  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

// PUBLIC_INTERFACE
export function useOrgs(): OrgContextType {
  /** Hook to access organizations list and refresh function. */
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error("useOrgs must be used within OrgProvider");
  return ctx;
}
