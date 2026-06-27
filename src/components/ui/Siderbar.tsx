"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "/public/logo.svg";
import {
  Users,
  Search,
  Notebook,
  Wallet,
  OctagonX,
  X,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useTitle } from "@/hooks/useTitle";
import { useEffect, useState } from "react";
import { getTitle } from "@/utils";

const menuItems = [
  { name: "Suscripciones", icon: Wallet, href: "/" },
  { name: "Cancelaciones", icon: OctagonX, href: "/cancellations" },
  { name: "Formulario", icon: Notebook, href: "/form" },
  { name: "Usuarios", icon: Users, href: "/users" },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const [valueFilter, setValueFilter] = useState("");
  const { setTitle } = useTitle();

  useEffect(() => {
    const title = getTitle(pathname);
    setTitle(title);
  }, [pathname, setTitle]);

  const isActive = (item: (typeof menuItems)[0]) =>
    pathname === item.href ||
    (item.href === "/" && pathname.includes("/details-subscription")) ||
    (item.href === "/cancellations" &&
      pathname.includes("/details-cancellations")) ||
    (item.href === "/form" && pathname.includes("/details-form")) ||
    (item.href === "/users" && pathname.includes("/details-user"));

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
            <Image src={Logo} width={20} height={20} alt="logo" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">
              VendeYaOnline
            </p>
            <p className="text-xs text-slate-400">Panel Admin</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
        >
          <X size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
          <input
            onChange={(e) => setValueFilter(e.target.value.toLocaleLowerCase())}
            type="text"
            placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800/80 border border-slate-700/50 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-4 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
          Menú
        </p>
        {menuItems
          .filter((i) => i.name.toLocaleLowerCase().includes(valueFilter))
          .map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setTitle(item.name);
                  onClose?.();
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mb-1 transition-all duration-150 group ${
                  active
                    ? "bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-900/40"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    active
                      ? "text-white"
                      : "text-slate-500 group-hover:text-white"
                  }`}
                />
                <span className="flex-1">{item.name}</span>
                {active && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                )}
              </Link>
            );
          })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <p className="text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} VendeYaOnline
        </p>
      </div>
    </div>
  );
}
