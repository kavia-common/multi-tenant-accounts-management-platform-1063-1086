"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  // PUBLIC_INTERFACE
  setTheme: (next: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_KEY = "ui.theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(THEME_KEY) as Theme) || "system";
  });

  const resolved = useMemo(() => {
    return theme === "system" ? getSystemTheme() : theme;
  }, [theme]);

  // Apply data-theme for CSS
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = resolved;
    }
  }, [resolved]);

  // Persist preference
  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (typeof window !== "undefined") localStorage.setItem(THEME_KEY, t);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme: resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTheme(): ThemeContextType {
  /** Hook to access theme context, includes current theme and setter. */
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
