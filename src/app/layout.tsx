import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "../components/ui/Siderbar";
import Header from "../components/ui/Header";

export const metadata: Metadata = {
  title: "VendeYaOnline",
  description: "Panel de administración",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <div className="p-5">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
