"use client";

import { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ArrowDownRight, X, Eye } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

// ─────────────────────────────────────────────────────────────────────────────
// PremiumCard — base reutilizável com 3 variantes
// ─────────────────────────────────────────────────────────────────────────────
interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "glass" | "gradient" | "soft";
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

export function PremiumCard({
  children,
  className = "",
  variant = "soft",
  hover = true,
  glow = false,
  delay = 0,
}: PremiumCardProps) {
  const base = "rounded-[24px] transition-all duration-300 relative overflow-hidden";

  const variants = {
    glass: "bg-[rgba(18,18,18,0.72)] backdrop-blur-[18px] border border-[rgba(201,130,42,0.18)] shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
    gradient: "border border-transparent bg-[#0B0B0B]",
    soft: "bg-[#111111] border border-[rgba(255,255,255,0.06)] shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`${base} ${variants[variant]} ${className}`}
      style={
        variant === "gradient"
          ? {
              background:
                "linear-gradient(#0B0B0B, #0B0B0B) padding-box, linear-gradient(135deg, #F4B55A, transparent 50%, #8A5A1F) border-box",
            }
          : undefined
      }
    >
      {glow && (
        <motion.div
          animate={{ opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-[24px] bg-[#C9822A] pointer-events-none"
        />
      )}
      {children}
    </motion.div>
  );
}

export const GlassCard = (props: Omit<PremiumCardProps, "variant">) => (
  <PremiumCard {...props} variant="glass" />
);

// ─────────────────────────────────────────────────────────────────────────────
// MetricCard — número grande + ícone + trend
// ─────────────────────────────────────────────────────────────────────────────
interface MetricCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  sub?: string;
  trend?: { value: string; direction: "up" | "down" };
  delay?: number;
}

export function MetricCard({ icon: Icon, value, label, sub, trend, delay = 0 }: MetricCardProps) {
  return (
    <PremiumCard variant="soft" delay={delay} className="p-5">
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="w-11 h-11 rounded-xl bg-[#C9822A]/12 border border-[#C9822A]/20 flex items-center justify-center"
        >
          <Icon size={18} className="text-[#C9822A]" />
        </motion.div>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              trend.direction === "up"
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight size={11} />
            ) : (
              <ArrowDownRight size={11} />
            )}
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-white tracking-tight leading-none">
        {value}
      </p>
      <p className="text-sm font-medium text-gray-500 mt-1.5">{label}</p>
      {sub && <p className="text-xs text-gray-700 mt-0.5">{sub}</p>}
    </PremiumCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FeatureCard — ícone + título + descrição
// ─────────────────────────────────────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, desc, delay = 0 }: FeatureCardProps) {
  return (
    <PremiumCard variant="soft" hover delay={delay} className="p-5 group cursor-default h-full">
      <motion.div
        whileHover={{ scale: 1.12, backgroundColor: "rgba(201,130,42,0.2)" }}
        transition={{ duration: 0.2 }}
        className="w-11 h-11 bg-[#C9822A]/10 rounded-xl flex items-center justify-center mb-4"
      >
        <Icon size={19} className="text-[#C9822A]" />
      </motion.div>
      <p className="text-white text-sm font-bold mb-1.5 leading-tight">{title}</p>
      <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
    </PremiumCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AdminStatCard — painel admin com gráfico sparkline via mini-bar
// ─────────────────────────────────────────────────────────────────────────────
interface AdminStatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  iconBg: string;
  sub?: string;
  delay?: number;
}

export function AdminStatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  iconBg,
  sub,
  delay = 0,
}: AdminStatCardProps) {
  return (
    <PremiumCard variant="soft" hover delay={delay} className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={17} />
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${
            trend === "up"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {trend === "up" ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {change}
        </span>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.15, duration: 0.4, ease }}
        className="text-[1.65rem] font-black text-white tracking-tight"
      >
        {value}
      </motion.p>
      <p className="text-sm text-gray-500 mt-1 font-medium">{title}</p>
      {sub && <p className="text-xs text-gray-700 mt-0.5">{sub}</p>}
    </PremiumCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StatusBadge — badge de status colorido
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  processing: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  transit: { bg: "bg-[#C9822A]/10", text: "text-[#C9822A]", dot: "bg-[#C9822A]" },
  customs: { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  delivered: { bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400" },
  problem: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  warehouse: { bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-400" },
};

const STATUS_LABELS: Record<string, string> = {
  processing: "Processando",
  transit: "Em Trânsito",
  customs: "Alfândega",
  delivered: "Entregue",
  problem: "Problema",
  warehouse: "No Armazém",
};

export function StatusBadge({ status, pulse = false }: { status: string; pulse?: boolean }) {
  const colors = STATUS_COLORS[status] ?? STATUS_COLORS.processing;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.dot} opacity-60`} />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${colors.dot}`} />
      </span>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OrderMobileCard — card de pedido para mobile
// ─────────────────────────────────────────────────────────────────────────────
interface OrderMobileCardProps {
  id: string;
  produto: string;
  status: string;
  cidade: string;
  valor: string;
  data: string;
  onDetails?: () => void;
  delay?: number;
}

export function OrderMobileCard({
  id,
  produto,
  status,
  cidade,
  valor,
  data,
  onDetails,
  delay = 0,
}: OrderMobileCardProps) {
  return (
    <PremiumCard variant="soft" hover delay={delay} className="p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs font-mono font-bold text-[#C9822A]">{id}</p>
          <p className="text-sm font-semibold text-white mt-0.5">{produto}</p>
          <p className="text-xs text-gray-600 mt-0.5">{cidade}</p>
        </div>
        <StatusBadge status={status} pulse={status === "transit" || status === "processing"} />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
        <div>
          <p className="text-base font-black text-white">{valor}</p>
          <p className="text-xs text-gray-700">{data}</p>
        </div>
        {onDetails && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDetails}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#C9822A] bg-[#C9822A]/10 hover:bg-[#C9822A]/20 px-3 py-2 rounded-xl transition-colors"
          >
            <Eye size={13} />
            Detalhes
          </motion.button>
        )}
      </div>
    </PremiumCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BottomSheetCard — bottom sheet mobile com drag para fechar
// ─────────────────────────────────────────────────────────────────────────────
interface BottomSheetCardProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function BottomSheetCard({ isOpen, onClose, children, title }: BottomSheetCardProps) {
  const y = useMotionValue(0);
  const overlayOpacity = useTransform(y, [0, 300], [1, 0]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ opacity: overlayOpacity }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            style={{ y }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-2xl rounded-t-[28px] border-t border-[rgba(201,130,42,0.15)] max-h-[88vh] overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-center pt-3.5 pb-1 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 bg-[rgba(201,130,42,0.3)] rounded-full" />
            </div>
            {title && (
              <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.06)]">
                <h3 className="font-bold text-white text-base">{title}</h3>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={15} />
                </motion.button>
              </div>
            )}
            <div className="overflow-y-auto max-h-[calc(88vh-90px)] p-5">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
