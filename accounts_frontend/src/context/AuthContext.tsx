"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  apiConfirmPasswordReset,
  apiLogin,
  apiLogout,
  apiRegister,
  apiRequestPasswordReset,
  getAccessToken,
  getRefreshToken,
  getTenantId,
  setAccessToken,
  setRefreshToken,
  setTenantId,
} from "@/lib/apiClient";
import type { Role } from "@/lib/types";

export type AuthUser = {
  id?: number | string;
  name?: string;
  email?: string;
  role?: Role;
};

type AuthContextType = {
  user: AuthUser | null;
  tenantId: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // PUBLIC_INTERFACE
  login: (args: { tenant_id: number; email: string; password: string }) => Promise<void>;
  // PUBLIC_INTERFACE
  register: (args: {
    tenant_id: number; email: string; name: string; password: string; role?: Role;
  }) => Promise<void>;
  // PUBLIC_INTERFACE
  logout: () => Promise<void>;
  // PUBLIC_INTERFACE
  requestPasswordReset: (args: { tenant_id: number; email: string }) => Promise<void>;
  // PUBLIC_INTERFACE
  confirmPasswordReset: (token: string, args: { tenant_id: number; new_password: string }) => Promise<void>;
  // PUBLIC_INTERFACE
  switchTenant: (tenantId: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tenantIdState, setTenantIdState] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from persisted tokens/tenant
  useEffect(() => {
    const t = getTenantId();
    setTenantIdState(t);
    const access = getAccessToken();
    const refresh = getRefreshToken();
    if (access || refresh) {
      // Session exists but we may not have user profile; backend doesn't provide "me" endpoint in spec
      // We'll mark as authenticated; role-specific UI will rely on dashboard response or user info from login.
      setUser((prev) => prev ?? { email: undefined, name: undefined });
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (args: { tenant_id: number; email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await apiLogin(args);
      setTenantId(args.tenant_id);
      setTenantIdState(args.tenant_id);
      setUser(res.user ?? { email: args.email });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (args: {
    tenant_id: number; email: string; name: string; password: string; role?: Role;
  }) => {
    setIsLoading(true);
    try {
      await apiRegister(args);
      // Auto login after register
      await login({ tenant_id: args.tenant_id, email: args.email, password: args.password });
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestPasswordReset = useCallback(async (args: { tenant_id: number; email: string }) => {
    await apiRequestPasswordReset(args);
  }, []);

  const confirmPasswordReset = useCallback(async (token: string, args: { tenant_id: number; new_password: string }) => {
    await apiConfirmPasswordReset(token, args);
  }, []);

  const switchTenant = useCallback((tid: number) => {
    setTenantId(tid);
    setTenantIdState(tid);
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    tenantId: tenantIdState,
    isAuthenticated: !!getAccessToken() || !!getRefreshToken(),
    isLoading,
    login,
    register,
    logout,
    requestPasswordReset,
    confirmPasswordReset,
    switchTenant,
  }), [user, tenantIdState, isLoading, login, register, logout, requestPasswordReset, confirmPasswordReset, switchTenant]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth(): AuthContextType {
  /** Hook to access authentication state and actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
