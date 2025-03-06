"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "/public/logo.svg";
import { Users, Search, Notebook, Wallet, OctagonX } from "lucide-react";
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

export default function Sidebar() {
  const pathname = usePathname();
  const [valueFilter, setValueFilter] = useState("");
  const { setTitle } = useTitle();

  useEffect(() => {
    const title = getTitle(pathname);
    setTitle(title);
  }, [pathname, setTitle]);

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r">
      <div className="p-4 flex items-center gap-2">
        <Image src={Logo} width={30} height={30} alt="logo" />
        <span className="text-xl font-semibold">VendeYaOnline</span>
      </div>
      <div className="px-4 mt-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            onChange={(e) => setValueFilter(e.target.value.toLocaleLowerCase())}
            type="text"
            placeholder="Buscar"
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 pt-4">
          <p className="text-xs font-semibold text-gray-400 mb-2">Menu</p>
          {menuItems
            .filter((i) => i.name.toLocaleLowerCase().includes(valueFilter))
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setTitle(item.name)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 ${
                  pathname === item.href ||
                  (item.href === "/" &&
                    pathname.includes("/details-subscription")) ||
                  (item.href === "/cancellations" &&
                    pathname.includes("/details-cancellations")) ||
                  (item.href === "/form" &&
                    pathname.includes("/details-form")) ||
                  (item.href === "/users" && pathname.includes("/details-user"))
                    ? "bg-indigo-100 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
        </nav>
        {/*         <nav className="px-4 pt-4 mt-4">
          <p className="text-xs font-semibold text-gray-400 mb-2">
            Sales Channel
          </p>
                    {salesChannelItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 ${
                pathname === item.href
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))} 
        </nav> */}
      </div>
    </div>
  );
}
