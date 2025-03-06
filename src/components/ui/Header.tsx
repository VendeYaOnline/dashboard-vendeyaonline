"use client";

import { useTitle } from "@/hooks/useTitle";
import { Bell, Download } from "lucide-react";

export default function Header() {
  const { title } = useTitle();
  return (
    <header className="flex justify-between items-center p-5 border-b">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
}
