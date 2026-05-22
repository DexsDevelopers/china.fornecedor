"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/ui/AnimateIn";
import { MetricCard, FeatureCard } from "@/components/ui/cards";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  Calculator, Package, Shield, Clock, Truck,
  CheckCircle, ArrowRight, Search, Plane, Ship,
  TrendingUp, DollarSign, Headphones, Star,
} from "lucide-react";

const stats = [
  { icon: Package },
  { icon: TrendingUp },
  { icon: Clock },
  { icon: Star },
];

const trustBadges = [
  { icon: Shield },
  { icon: Plane },
  { icon: Clock },
  { icon: Headphones },
];

const features = [
  { icon: Shield },
  { icon: DollarSign },
  { icon: Package },
  { icon: CheckCircle },
  { icon: Headphones },
];

const easing = [0.21, 0.47, 0.32, 0.98] as const;

export default function HomePage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [weight, setWeight] = useState("1.50");
  const { t } = useLanguage();

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
                <span className="text-gray-300 text-sm">{t.home.badge}</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: easing }}
                  className="text-5xl lg:text-6xl font-black leading-tight"
                >
                  <span className="text-white">{t.home.heroTitle1}</span>
                  <br />
                  <span className="text-[#C9822A]">{t.home.heroTitle2}</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: easing }}
                className="mt-5 text-gray-400 text-lg leading-relaxed max-w-lg"
              >
                {t.home.heroDescription}
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
                    {t.home.calculateNow}
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/rastreio"
                    className="flex items-center justify-center gap-2 bg-transparent border border-[#C9822A]/40 hover:border-[#C9822A] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
                  >
                    <Package size={18} />
                    {t.home.trackOrder}
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
                    key={t.home.trustBadges[i].title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.6 + i * 0.08, ease: easing }}
                    className="flex flex-col gap-1"
                  >
                    <badge.icon size={16} className="text-[#C9822A]" />
                    <p className="text-white text-xs font-semibold">{t.home.trustBadges[i].title}</p>
                    <p className="text-gray-600 text-xs leading-tight">{t.home.trustBadges[i].desc}</p>
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
                <p className="text-gray-500 text-xs">{t.home.stats[0].label}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.65, ease: easing }}
                className="absolute bottom-10 right-0 bg-[#1A1510] border border-[#2A1F10] rounded-xl px-3.5 py-2.5 shadow-2xl"
              >
                <p className="text-[#C9822A] font-black text-xl">98.7%</p>
                <p className="text-gray-500 text-xs">{t.home.stats[1].label}</p>
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
                  <h3 className="text-white font-bold">{t.home.trackingCardTitle}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {t.home.trackingCardDesc}
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
                      {t.home.trackingCardButton}
                    </Link>
                  </motion.div>
                </div>
                <p className="text-[#C9822A] text-xs mt-3 hover:underline cursor-pointer">
                  {t.home.trackingCardHelp}
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
                  <h3 className="text-white font-bold">{t.home.calculatorCardTitle}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {t.home.calculatorCardDesc}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">{t.home.weight}</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-[#1A1510] border border-[#2A1F10] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9822A]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">{t.home.originCountry}</label>
                    <select className="w-full bg-[#1A1510] border border-[#2A1F10] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9822A]/50 appearance-none cursor-pointer">
                      <option>China</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">{t.home.destinationCountry}</label>
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
                    {t.home.calculateShipping}
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
                <p className="text-gray-700 text-xs mt-2 text-center cursor-pointer hover:text-gray-500">
                  {t.home.moreOptions}
                </p>
              </motion.div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-8 border-y border-[#2A1F10] bg-[#0F0D0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <MetricCard
                key={t.home.stats[i].label}
                icon={stat.icon}
                value={t.home.stats[i].value}
                label={t.home.stats[i].label}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section id="servicos" className="py-20 bg-[#0C0A08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn direction="up" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t.home.whyTitle}{" "}
              <span className="text-[#C9822A]">WENG QUAN</span>
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {t.home.whySubtitle}
            </p>
          </AnimateIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {features.map((f, i) => (
              <FeatureCard
                key={t.home.features[i].title}
                icon={f.icon}
                title={t.home.features[i].title}
                desc={t.home.features[i].desc}
                delay={i * 0.08}
              />
            ))}
          </div>
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
              {t.home.ctaTitle}
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              {t.home.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/calcular"
                  className="inline-flex items-center justify-center gap-2 bg-[#C9822A] hover:bg-[#A86820] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-xl shadow-[#C9822A]/20"
                >
                  <Calculator size={18} />
                  {t.home.calculateNow}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <a
                  href="https://wa.me/5551996148568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#1A1510] border border-[#2A1F10] hover:border-[#C9822A]/30 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  {t.home.whatsapp}
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
