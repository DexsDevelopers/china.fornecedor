"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  Calculator,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  Truck,
  Bell,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/pedidos", label: "Pedidos", icon: Package, badge: "12" },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/fretes", label: "Fretes", icon: Truck },
  { href: "/admin/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col bg-primary-900 border-r border-primary-800 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center border-b border-primary-800 h-16 px-3 ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-gold-400 flex-shrink-0">
          <Image src="/logo.jpg" alt="Weng Quan" fill className="object-cover" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-tight">WENG QUAN</p>
            <p className="text-gold-400 text-xs">Painel Admin</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    active
                      ? "bg-gold-500 text-white"
                      : "text-primary-300 hover:bg-primary-800 hover:text-white"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-primary-800 p-2 space-y-1">
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-primary-400 hover:text-white hover:bg-primary-800 transition-all text-sm ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "Ver site" : undefined}
          target="_blank"
        >
          <ExternalLink size={16} />
          {!collapsed && <span>Ver Site</span>}
        </Link>
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-primary-400 hover:text-red-400 hover:bg-primary-800 transition-all text-sm ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "Sair" : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-primary-700 border border-primary-600 rounded-full p-1 text-primary-300 hover:text-white hover:bg-primary-600 transition-all z-10"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
