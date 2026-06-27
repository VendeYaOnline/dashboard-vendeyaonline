import type { Metadata } from "next";
import "./globals.css";
import DashboardShell from "../components/ui/DashboardShell";
import Layout from "@/layaout";

export const metadata: Metadata = {
  title: "Panel de administración",
  description: "Panel de administración de VendeYaOnline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <DashboardShell>
          <Layout>{children}</Layout>
        </DashboardShell>
      </body>
    </html>
  );
}
