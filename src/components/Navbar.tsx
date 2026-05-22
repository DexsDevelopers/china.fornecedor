"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, LayoutDashboard, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Calcular Frete", href: "/calcular" },
  { label: "Rastrear Pedido", href: "/rastreio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Sobre Nós", href: "/#sobre" },
  { label: "Ajuda", href: "/#ajuda" },
];

const languages = [
  { code: "PT", region: "BR", label: "Português" },
  { code: "EN", region: "US", label: "English" },
  { code: "ES", region: "ES", label: "Español" },
  { code: "ZH", region: "CN", label: "中文" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0806]/95 backdrop-blur-md border-b border-[#2A1F10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9822A] shadow-[0_0_12px_rgba(201,130,42,0.3)]">
              <Image src="/logo.jpg" alt="Weng Quan Logo" fill className="object-cover" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-base leading-tight tracking-wider">WENG QUAN</p>
              <p className="text-[#C9822A] text-xs font-medium leading-tight">Fornecedor Chinês</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? "text-[#C9822A]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C9822A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button
                className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <Globe size={14} />
                <span>{selectedLanguage.region} / {selectedLanguage.code}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full mt-3 w-44 rounded-2xl border border-[#2A1F10] bg-[#0C0A08]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
                  {languages.map((language) => {
                    const active = language.code === selectedLanguage.code;

                    return (
                      <button
                        key={language.code}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                          active
                            ? "text-[#C9822A] bg-[#C9822A]/10"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => {
                          setSelectedLanguage(language);
                          setIsLangOpen(false);
                        }}
                      >
                        <span>{language.label}</span>
                        <span className="text-xs font-semibold">{language.region} / {language.code}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 bg-[#C9822A] hover:bg-[#A86820] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-[#C9822A]/20"
            >
              <LayoutDashboard size={14} />
              Área Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0C0A08] border-t border-[#2A1F10] pb-4">
          <div className="px-4 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-[#C9822A] bg-[#1A1208]"
                    : "text-gray-400 hover:text-white hover:bg-[#1A1208]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#2A1F10] mt-2">
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Globe size={13} />
                  Idioma
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => {
                    const active = language.code === selectedLanguage.code;

                    return (
                      <button
                        key={language.code}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                          active
                            ? "bg-[#C9822A]/15 text-[#C9822A] border border-[#C9822A]/30"
                            : "bg-[#141210] text-gray-500 border border-[#2A1F10]"
                        }`}
                        onClick={() => setSelectedLanguage(language)}
                      >
                        {language.region} / {language.code}
                      </button>
                    );
                  })}
                </div>
              </div>
              <Link
                href="/admin"
                className="flex items-center gap-2 bg-[#C9822A] text-white px-3 py-2.5 rounded-lg text-sm font-semibold"
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
