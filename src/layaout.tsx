"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

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
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="p-5">{children}</div>
    </QueryClientProvider>
  );
};

export default Layout;
