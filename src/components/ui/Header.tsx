"use client";

import { useTitle } from "@/hooks/useTitle";
import { Menu, LogOut, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { title } = useTitle();
  const router = useRouter();
  const pathname = usePathname();

  const isDetailPage = pathname.includes("/details-");

  const handleLogout = () => {
    localStorage.removeItem("token_vendeyaonline");
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors p-2 rounded-lg flex-shrink-0"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-base font-semibold text-slate-800 truncate">
            {title}
          </h1>
          {isDetailPage && (
            <>
              <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
              <span className="text-sm text-slate-500 truncate">Detalle</span>
            </>
          )}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all px-3 py-2 rounded-lg flex-shrink-0"
        aria-label="Cerrar sesión"
      >
        <LogOut size={17} />
        <span className="hidden sm:inline font-medium">Salir</span>
      </button>
    </header>
  );
}
