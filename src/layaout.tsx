"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { jwtDecode } from "jwt-decode";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const [queryClient] = useState(() => new QueryClient());
  const route = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token_vendeyaonline");
    if (!token) {
      route.push("/login");
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const expirationDate = decodedToken.exp! * 1000;
        const currentDate = new Date().getTime();
        if (currentDate > expirationDate) {
          localStorage.removeItem("token_vendeyaonline");
          route.push("/login");
        }
      } catch {
        localStorage.removeItem("token_vendeyaonline");
        route.push("/login");
      }
    }
  }, [route]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#0f172a",
            color: "#f1f5f9",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#6366f1", secondary: "#fff" },
          },
        }}
      />
      <div className="p-4 sm:p-6">{children}</div>
    </QueryClientProvider>
  );
};

export default Layout;
