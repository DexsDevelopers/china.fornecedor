"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn, { StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/ui/AnimateIn";
import {
  Calculator, Package, Shield, Clock, Truck,
  CheckCircle, ArrowRight, Search, Plane, Ship,
  TrendingUp, DollarSign, Headphones, Star,
} from "lucide-react";

const stats = [
  { value: "+28.500", label: "Envios realizados", icon: Package },
  { value: "98.7%", label: "Entregas no prazo", icon: TrendingUp },
  { value: "12-25 dias", label: "Prazo médio de entrega", icon: Clock },
  { value: "+8 anos", label: "De experiência", icon: Star },
];

const trustBadges = [
  { icon: Shield, title: "Compra Segura", desc: "Proteção do início ao fim" },
  { icon: Plane, title: "Frete Internacional", desc: "Melhores preços do mercado" },
  { icon: Clock, title: "Entrega Rápida", desc: "Prazo médio de 12 a 25 dias" },
  { icon: Headphones, title: "Suporte Dedicado", desc: "Atendimento via WhatsApp" },
];

const features = [
  { icon: Shield, title: "100% Seguro", desc: "Seus produtos protegidos do início ao fim" },
  { icon: DollarSign, title: "Impostos Transparentes", desc: "Sem taxas ocultas, você sabe exatamente o que paga" },
  { icon: Package, title: "Rastreamento Completo", desc: "Acompanhe seu pedido em tempo real" },
  { icon: CheckCircle, title: "Pagamento Seguro", desc: "Pague via PIX com total segurança" },
  { icon: Headphones, title: "Suporte Especializado", desc: "Atendimento rápido e humanizado via WhatsApp" },
];

const easing = [0.21, 0.47, 0.32, 0.98] as const;

export default function HomePage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [weight, setWeight] = useState("1.50");

  return (
    <main className="min-h-screen bg-[#0C0A08]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0C0A08] via-[#0F0C09] to-[#1A1208]" />
          <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-[#C9822A]/5 to-transparent" />
          <motion.div
            className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9822A]/8 blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* ── Left ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easing }}
                className="inline-flex items-center gap-2 bg-[#1A1510] border border-[#2A1F10] rounded-full px-4 py-1.5 mb-6"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300 text-sm">Enviamos para todo o Brasil</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: easing }}
                  className="text-5xl lg:text-6xl font-black leading-tight"
                >
                  <span className="text-white">Fornecedor Chinês</span>
                  <br />
                  <span className="text-[#C9822A]">Direto para Você</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: easing }}
                className="mt-5 text-gray-400 text-lg leading-relaxed max-w-lg"
              >
                Compre qualquer produto da China com segurança. Frete
                internacional em 12-25 dias, rastreamento completo e cálculo
                de impostos transparente.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38, ease: easing }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/calcular"
                    className="flex items-center justify-center gap-2 bg-[#C9822A] hover:bg-[#A86820] text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#C9822A]/25"
                  >
                    <Calculator size={18} />
                    Calcular Frete Agora
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/rastreio"
                    className="flex items-center justify-center gap-2 bg-transparent border border-[#C9822A]/40 hover:border-[#C9822A] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
                  >
                    <Package size={18} />
                    Rastrear Pedido
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5 pt-8 border-t border-[#2A1F10]"
              >
                {trustBadges.map((badge, i) => (
                  <motion.div
                    key={badge.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.6 + i * 0.08, ease: easing }}
                    className="flex flex-col gap-1"
                  >
                    <badge.icon size={16} className="text-[#C9822A]" />
                    <p className="text-white text-xs font-semibold">{badge.title}</p>
                    <p className="text-gray-600 text-xs leading-tight">{badge.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Right — Globe Visual ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easing }}
              className="hidden lg:flex items-center justify-center relative h-[420px]"
            >
              <motion.div
                className="absolute w-96 h-96 rounded-full bg-[#C9822A]/8 blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full border border-[#C9822A]/20 animate-[spin_25s_linear_infinite]">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#C9822A] rounded-full shadow-[0_0_12px_#C9822A]" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C9822A]/40 rounded-full" />
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 bg-[#E8A84A]/50 rounded-full" />
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-[#E8A84A] rounded-full shadow-[0_0_10px_#E8A84A]" />
                </div>
                <div className="absolute inset-10 rounded-full border border-[#C9822A]/15 animate-[spin_18s_linear_infinite_reverse]">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#E8A84A]/60 rounded-full" />
                  <div className="absolute -bottom-1 right-6 w-1.5 h-1.5 bg-[#C9822A]/50 rounded-full" />
                </div>
                <motion.div
                  className="absolute inset-20 rounded-full border border-[#C9822A]/30 bg-[#C9822A]/5"
                  animate={{ boxShadow: ["0 0 0 0 rgba(201,130,42,0)", "0 0 0 12px rgba(201,130,42,0.05)", "0 0 0 0 rgba(201,130,42,0)"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#C9822A] shadow-[0_0_40px_rgba(201,130,42,0.35)]"
                  >
                    <Image src="/logo.jpg" alt="Weng Quan" fill className="object-cover" />
                  </motion.div>
                </div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-6 bg-[#1A1510] border border-[#C9822A]/30 rounded-xl p-2.5 shadow-xl"
                >
                  <Plane size={22} className="text-[#C9822A]" />
                </motion.div>
                <div className="absolute -bottom-8 -left-8 bg-[#1A1510] border border-[#C9822A]/20 rounded-xl p-2.5 shadow-lg">
                  <Ship size={20} className="text-[#C9822A]/70" />
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="absolute -bottom-6 -right-6 bg-[#C9822A] rounded-xl p-2.5 shadow-lg shadow-[#C9822A]/30 cursor-pointer"
                >
                  <Truck size={18} className="text-white" />
                </motion.div>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[#C9822A] rounded-full"
                    style={{
                      top: `${15 + Math.sin((i * 60 * Math.PI) / 180) * 50}%`,
                      left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 50}%`,
                      opacity: 0.2 + (i % 3) * 0.25,
                    }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: easing }}
                className="absolute top-6 left-0 bg-[#1A1510] border border-[#2A1F10] rounded-xl px-3.5 py-2.5 shadow-2xl"
              >
                <p className="text-[#C9822A] font-black text-xl">+28.500</p>
                <p className="text-gray-500 text-xs">Envios realizados</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.65, ease: easing }}
                className="absolute bottom-10 right-0 bg-[#1A1510] border border-[#2A1F10] rounded-xl px-3.5 py-2.5 shadow-2xl"
              >
                <p className="text-[#C9822A] font-black text-xl">98.7%</p>
                <p className="text-gray-500 text-xs">Entregas no prazo</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUICK TOOLS ── */}
      <section className="py-10 bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimateIn direction="left">
              <motion.div
                whileHover={{ borderColor: "rgba(201,130,42,0.3)", y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-[#141210] border border-[#2A1F10] rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Package size={18} className="text-[#C9822A]" />
                  <h3 className="text-white font-bold">Rastreie seu pedido</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Digite seu código de rastreamento para acompanhar seu pedido
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input
                      type="text"
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value)}
                      placeholder="Ex: LP123456789CN"
                      className="w-full pl-9 pr-4 py-3 bg-[#1A1510] border border-[#2A1F10] rounded-xl text-white placeholder-gray-700 text-sm focus:outline-none focus:border-[#C9822A]/50 transition-colors"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      href="/rastreio"
                      className="bg-[#C9822A] hover:bg-[#A86820] text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm whitespace-nowrap shadow-md shadow-[#C9822A]/20"
                    >
                      Rastrear Agora
                    </Link>
                  </motion.div>
                </div>
                <p className="text-[#C9822A] text-xs mt-3 hover:underline cursor-pointer">
                  Não tem um código? Saiba como funciona →
                </p>
              </motion.div>
            </AnimateIn>

            <AnimateIn direction="right">
              <motion.div
                whileHover={{ borderColor: "rgba(201,130,42,0.3)", y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-[#141210] border border-[#2A1F10] rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Calculator size={18} className="text-[#C9822A]" />
                  <h3 className="text-white font-bold">Calculadora de frete</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Calcule o valor do frete e prazo de entrega
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Peso (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-[#1A1510] border border-[#2A1F10] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9822A]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">País de origem</label>
                    <select className="w-full bg-[#1A1510] border border-[#2A1F10] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9822A]/50 appearance-none cursor-pointer">
                      <option>China</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">País de destino</label>
                    <select className="w-full bg-[#1A1510] border border-[#2A1F10] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9822A]/50 appearance-none cursor-pointer">
                      <option>Brasil</option>
                    </select>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/calcular"
                    className="w-full flex items-center justify-center gap-2 bg-[#C9822A] hover:bg-[#A86820] text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-md shadow-[#C9822A]/20"
                  >
                    <Calculator size={15} />
                    Calcular Frete
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
                <p className="text-gray-700 text-xs mt-2 text-center cursor-pointer hover:text-gray-500">
                  Mais opções de cálculo →
                </p>
              </motion.div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-6 border-y border-[#2A1F10] bg-[#0F0D0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} variants={staggerItemVariants} className="flex items-center gap-3 py-3">
                <div className="w-10 h-10 bg-[#C9822A]/10 border border-[#C9822A]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <stat.icon size={16} className="text-[#C9822A]" />
                </div>
                <div>
                  <p className="text-xl font-black text-white leading-tight">{stat.value}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section id="servicos" className="py-20 bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn direction="up" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Por que escolher a{" "}
              <span className="text-[#C9822A]">WENG QUAN</span>
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Vantagens exclusivas para sua experiência de compra
            </p>
          </AnimateIn>
          <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {features.map((f) => (
              <StaggerItem key={f.title} variants={staggerItemVariants}>
                <motion.div
                  whileHover={{ borderColor: "rgba(201,130,42,0.35)", y: -4, boxShadow: "0 8px 32px rgba(201,130,42,0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#141210] border border-[#2A1F10] rounded-2xl p-5 cursor-default h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(201,130,42,0.2)" }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-[#C9822A]/10 rounded-xl flex items-center justify-center mb-4"
                  >
                    <f.icon size={18} className="text-[#C9822A]" />
                  </motion.div>
                  <p className="text-white text-sm font-semibold mb-2">{f.title}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <AnimateIn direction="scale">
        <section className="py-16 bg-[#141210] border-y border-[#2A1F10]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              animate={{ boxShadow: ["0 0 0 0 rgba(201,130,42,0)", "0 0 0 16px rgba(201,130,42,0.05)", "0 0 0 0 rgba(201,130,42,0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-[#C9822A]/15 border border-[#C9822A]/30 rounded-2xl flex items-center justify-center mx-auto mb-5"
            >
              <Calculator size={28} className="text-[#C9822A]" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para começar a importar?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Calcule seu frete agora e descubra o quanto você pode economizar
              comprando direto da China.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/calcular"
                  className="inline-flex items-center justify-center gap-2 bg-[#C9822A] hover:bg-[#A86820] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-xl shadow-[#C9822A]/20"
                >
                  <Calculator size={18} />
                  Calcular Frete Agora
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <a
                  href="https://wa.me/5511999990000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#1A1510] border border-[#2A1F10] hover:border-[#C9822A]/30 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  💬 Falar no WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimateIn>

      <Footer />
    </main>
  );
}
