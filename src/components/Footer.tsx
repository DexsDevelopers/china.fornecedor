"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Instagram, MessageCircle, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const footerLinks = [
  { key: "home" as const, href: "/" },
  { key: "calculate" as const, href: "/calcular" },
  { key: "track" as const, href: "/rastreio" },
  { key: "services" as const, href: "/#servicos" },
  { key: "about" as const, href: "/#sobre" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0A0806] border-t border-[#2A1F10] text-gray-400 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9822A] shadow-[0_0_12px_rgba(201,130,42,0.2)]">
                <Image src="/logo.jpg" alt="Weng Quan" fill className="object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight">WENG QUAN</p>
                <p className="text-[#C9822A] text-xs">{t.brandTagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Shield size={14} className="text-[#C9822A]" />
              <span className="text-xs text-gray-600">{t.footer.safePurchase}</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">{t.footer.navigation}</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-[#C9822A] transition-colors">
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">{t.footer.services}</h3>
            <ul className="space-y-2.5">
              {t.footer.servicesList.map((s) => (
                <li key={s}>
                  <span className="text-sm text-gray-600">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <MessageCircle size={14} className="text-[#C9822A] flex-shrink-0" />
                <span className="text-sm text-gray-600">WhatsApp: +55 51 99614-8568</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram size={14} className="text-[#C9822A] flex-shrink-0" />
                <span className="text-sm text-gray-600">@wengquan.brasil</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#C9822A] flex-shrink-0" />
                <span className="text-sm text-gray-600">contato@wengquan.com.br</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="text-[#C9822A] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  {t.footer.hours}<br />{t.footer.saturday}
                </span>
              </li>
            </ul>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#141210] border border-[#2A1F10] rounded-lg px-3 py-1.5">
              <span className="text-xs font-bold text-green-400">PIX</span>
              <span className="text-xs text-gray-600">{t.footer.paymentAccepted}</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2A1F10] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-700">{t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-700 hover:text-[#C9822A] transition-colors">{t.footer.privacy}</Link>
            <Link href="#" className="text-xs text-gray-700 hover:text-[#C9822A] transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
