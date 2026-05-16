"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Calculator, Package, LayoutDashboard } from "lucide-react";

const items = [
  { icon: Home, label: "Início", href: "/" },
  { icon: Calculator, label: "Calculadora", href: "/calcular" },
  { icon: Package, label: "Rastrear", href: "/rastreio" },
  { icon: LayoutDashboard, label: "Admin", href: "/admin" },
];

export default function MobileBottomBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-[#0A0806]/95 backdrop-blur-xl border-t border-[#2A1F10]">
        <div className="flex items-center justify-around h-16 px-2">
          {items.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 relative py-1 px-4"
              >
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="relative p-2 rounded-xl"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileBarGlow"
                      className="absolute inset-0 rounded-xl bg-[#C9822A]/15"
                      style={{
                        boxShadow: "0 0 16px rgba(201,130,42,0.25)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.div
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <item.icon
                      size={22}
                      className={
                        isActive ? "text-[#C9822A]" : "text-gray-600"
                      }
                    />
                  </motion.div>
                </motion.div>

                <motion.span
                  animate={
                    isActive
                      ? { color: "#C9822A", fontWeight: "600" }
                      : { color: "#4b5563", fontWeight: "400" }
                  }
                  className="text-[10px]"
                >
                  {item.label}
                </motion.span>

                {isActive && (
                  <motion.div
                    layoutId="mobileBarDot"
                    className="absolute -bottom-0.5 w-1 h-1 bg-[#C9822A] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
