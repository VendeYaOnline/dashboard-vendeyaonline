"use client";

import { useTitle } from "@/hooks/useTitle";
import { Bell, Download } from "lucide-react";

export default function Header() {
  const { title } = useTitle();
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <select className="bg-white border rounded-md px-3 py-2 text-sm">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </header>
  );
}
