import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrgProvider } from "@/context/OrgContext";

export const metadata: Metadata = {
  title: "Accounts Platform",
  description: "Multi-tenant Accounts Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <OrgProvider>{children}</OrgProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
