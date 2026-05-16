"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Package, Calculator, LayoutDashboard, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-800 shadow-xl border-b border-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold-400 shadow-md">
              <Image
                src="/logo.jpg"
                alt="Weng Quan Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-lg leading-tight tracking-wide">WENG QUAN</p>
              <p className="text-gold-400 text-xs font-medium leading-tight">Fornecedor Chinês</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="text-cream-200 hover:text-gold-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary-700"
            >
              Início
            </Link>
            <Link
              href="/calcular"
              className="flex items-center gap-1.5 text-cream-200 hover:text-gold-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary-700"
            >
              <Calculator size={15} />
              Calcular Frete
            </Link>
            <Link
              href="/rastreio"
              className="flex items-center gap-1.5 text-cream-200 hover:text-gold-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary-700"
            >
              <Package size={15} />
              Rastrear Pedido
            </Link>
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <LayoutDashboard size={15} />
              Área Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-cream-200 hover:text-gold-400 p-2 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-800 border-t border-primary-700 pb-4">
          <div className="px-4 pt-2 space-y-1">
            <Link
              href="/"
              className="block text-cream-200 hover:text-gold-400 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-primary-700"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/calcular"
              className="flex items-center gap-2 text-cream-200 hover:text-gold-400 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-primary-700"
              onClick={() => setIsOpen(false)}
            >
              <Calculator size={16} />
              Calcular Frete
            </Link>
            <Link
              href="/rastreio"
              className="flex items-center gap-2 text-cream-200 hover:text-gold-400 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-primary-700"
              onClick={() => setIsOpen(false)}
            >
              <Package size={16} />
              Rastrear Pedido
            </Link>
            <div className="pt-2 border-t border-primary-700 mt-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 bg-gold-500 text-white px-3 py-2.5 rounded-lg text-sm font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={16} />
                Área Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
