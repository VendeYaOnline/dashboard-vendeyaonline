"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { jwtDecode } from "jwt-decode";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const queryClient = new QueryClient();
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
      } catch (error) {
        console.log("Error al verificar el token");
      }
    }
  }, [route]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="p-5">{children}</div>
    </QueryClientProvider>
  );
};

export default Layout;
