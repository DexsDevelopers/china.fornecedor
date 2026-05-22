"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Package,
  Search,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Globe,
  Home,
  AlertCircle,
  RefreshCw,
  Copy,
  ExternalLink,
} from "lucide-react";

type TrackingStatus =
  | "processing"
  | "warehouse"
  | "transit"
  | "customs"
  | "customs_cleared"
  | "out_for_delivery"
  | "delivered";

interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  description: string;
  status: TrackingStatus;
  done: boolean;
}

interface TrackingResult {
  code: string;
  status: TrackingStatus;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  weight: string;
  description: string;
  events: TrackingEvent[];
}

const MOCK_ORDERS: Record<string, TrackingResult> = {
  WQ2024001234: {
    code: "WQ2024001234",
    status: "transit",
    origin: "Guangzhou, China",
    destination: "São Paulo, Brasil",
    estimatedDelivery: "28/11/2024",
    weight: "0.8 kg",
    description: "Roupas (3 itens)",
    events: [
      {
        date: "12/11/2024",
        time: "09:15",
        location: "São Paulo, Brasil",
        description: "Pacote em rota de distribuição local",
        status: "transit",
        done: true,
      },
      {
        date: "10/11/2024",
        time: "14:30",
        location: "Guarulhos, SP — Centro de Distribuição",
        description: "Desembaraço aduaneiro concluído",
        status: "customs_cleared",
        done: true,
      },
      {
        date: "07/11/2024",
        time: "08:00",
        location: "Guarulhos, SP — Alfândega",
        description: "Pacote em análise na alfândega brasileira",
        status: "customs",
        done: true,
      },
      {
        date: "02/11/2024",
        time: "16:00",
        location: "Em trânsito — Oceano Pacífico",
        description: "Pacote em trânsito internacional",
        status: "transit",
        done: true,
      },
      {
        date: "30/10/2024",
        time: "11:20",
        location: "Guangzhou, China — Aeroporto",
        description: "Pacote despachado do armazém para voo internacional",
        status: "warehouse",
        done: true,
      },
      {
        date: "29/10/2024",
        time: "15:45",
        location: "Guangzhou, China — Armazém Weng Quan",
        description: "Pedido recebido e processado no armazém",
        status: "processing",
        done: true,
      },
    ],
  },
  WQ2024005678: {
    code: "WQ2024005678",
    status: "delivered",
    origin: "Shenzhen, China",
    destination: "Rio de Janeiro, Brasil",
    estimatedDelivery: "05/11/2024",
    weight: "1.2 kg",
    description: "Eletrônicos",
    events: [
      {
        date: "04/11/2024",
        time: "14:22",
        location: "Rio de Janeiro, RJ",
        description: "Pacote entregue ao destinatário",
        status: "delivered",
        done: true,
      },
      {
        date: "04/11/2024",
        time: "08:00",
        location: "Rio de Janeiro, RJ",
        description: "Saiu para entrega",
        status: "out_for_delivery",
        done: true,
      },
      {
        date: "01/11/2024",
        time: "10:30",
        location: "Rio de Janeiro, RJ — Agência Correios",
        description: "Desembaraço concluído, enviado para agência local",
        status: "customs_cleared",
        done: true,
      },
      {
        date: "29/10/2024",
        time: "09:00",
        location: "Guarulhos, SP — Alfândega",
        description: "Pacote aprovado na alfândega",
        status: "customs",
        done: true,
      },
      {
        date: "25/10/2024",
        time: "22:00",
        location: "Em trânsito",
        description: "Voo internacional",
        status: "transit",
        done: true,
      },
      {
        date: "24/10/2024",
        time: "16:00",
        location: "Shenzhen, China",
        description: "Pacote despachado",
        status: "warehouse",
        done: true,
      },
      {
        date: "23/10/2024",
        time: "10:00",
        location: "Shenzhen, China",
        description: "Pedido processado",
        status: "processing",
        done: true,
      },
    ],
  },
  WQ2024009999: {
    code: "WQ2024009999",
    status: "processing",
    origin: "Yiwu, China",
    destination: "Belo Horizonte, Brasil",
    estimatedDelivery: "05/12/2024",
    weight: "2.5 kg",
    description: "Acessórios e bijuterias",
    events: [
      {
        date: "13/11/2024",
        time: "10:00",
        location: "Yiwu, China — Armazém Weng Quan",
        description: "Pedido recebido e em processamento",
        status: "processing",
        done: true,
      },
    ],
  },
};

const STATUS_CONFIG: Record<
  TrackingStatus,
  { label: string; color: string; bgColor: string; icon: React.ElementType }
> = {
  processing: {
    label: "Em Processamento",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    icon: Package,
  },
  warehouse: {
    label: "No Armazém",
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    icon: Package,
  },
  transit: {
    label: "Em Trânsito",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    icon: Globe,
  },
  customs: {
    label: "Na Alfândega",
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
    icon: AlertCircle,
  },
  customs_cleared: {
    label: "Desembaraço Concluído",
    color: "text-teal-600",
    bgColor: "bg-teal-50 border-teal-200",
    icon: CheckCircle,
  },
  out_for_delivery: {
    label: "Saiu para Entrega",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 border-indigo-200",
    icon: Truck,
  },
  delivered: {
    label: "Entregue",
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    icon: CheckCircle,
  },
};

const DEMO_CODES = ["WQ2024001234", "WQ2024005678", "WQ2024009999"];

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSearch = () => {
    const code = trackingCode.trim().toUpperCase();
    if (!code) return;

    setLoading(true);
    setNotFound(false);
    setResult(null);

    setTimeout(() => {
      const found = MOCK_ORDERS[code];
      if (found) {
        setResult(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 800);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const statusCfg = result ? STATUS_CONFIG[result.status] : null;

  return (
    <main className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-primary-800 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400 rounded-full px-4 py-1 mb-4">
              <Package size={14} className="text-gold-400" />
              <span className="text-gold-300 text-sm font-medium">
                Rastreamento de Pedidos
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Rastreie seu Pedido
            </h1>
            <p className="text-primary-300">
              Acompanhe seu pacote desde o armazém na China até a entrega na
              sua casa
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Search Box */}
          <div className="card mb-6">
            <label className="label text-base mb-3">
              Código de Rastreamento
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"
                />
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Ex: WQ2024001234"
                  className="input-field pl-10 text-sm uppercase"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gold-500 hover:bg-gold-600 text-white font-semibold px-5 py-3 rounded-lg transition-all flex items-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Search size={16} />
                )}
                <span className="hidden sm:inline">Rastrear</span>
              </button>
            </div>

            {/* Demo codes */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-primary-400">Testar com:</span>
              {DEMO_CODES.map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setTrackingCode(code);
                  }}
                  className="text-xs text-gold-600 hover:text-gold-700 font-mono bg-cream-100 hover:bg-cream-200 px-2 py-0.5 rounded transition-colors"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Not Found */}
          {notFound && (
            <div className="card border-red-200 bg-red-50 text-center py-8">
              <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
              <p className="font-semibold text-red-700">
                Código não encontrado
              </p>
              <p className="text-sm text-red-500 mt-1">
                Verifique o código e tente novamente. Se o pedido foi feito há
                menos de 24h, aguarde a atualização.
              </p>
            </div>
          )}

          {/* Result */}
          {result && statusCfg && (
            <div className="space-y-5">
              {/* Status Card */}
              <div className={`card border-2 ${statusCfg.bgColor}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <statusCfg.icon size={16} className={statusCfg.color} />
                      <span
                        className={`text-sm font-bold ${statusCfg.color}`}
                      >
                        {statusCfg.label}
                      </span>
                      {result.status === "delivered" && (
                        <span className="text-green-500 text-lg">✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-mono font-bold text-primary-800">
                        {result.code}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="text-primary-400 hover:text-gold-500 transition-colors"
                        title="Copiar código"
                      >
                        {copied ? (
                          <CheckCircle size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-primary-500 mt-1">
                      {result.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary-400">Entrega estimada</p>
                    <p className="text-base font-bold text-primary-800">
                      {result.estimatedDelivery}
                    </p>
                    <p className="text-xs text-primary-400 mt-1">
                      {result.weight}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-current border-opacity-20 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className={statusCfg.color} />
                    <div>
                      <p className="text-xs text-primary-400">Origem</p>
                      <p className="text-xs font-medium text-primary-700">
                        {result.origin}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home size={13} className={statusCfg.color} />
                    <div>
                      <p className="text-xs text-primary-400">Destino</p>
                      <p className="text-xs font-medium text-primary-700">
                        {result.destination}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="card">
                <h3 className="font-bold text-primary-800 mb-5 flex items-center gap-2">
                  <Clock size={16} className="text-gold-500" />
                  Histórico de Movimentações
                </h3>
                <div className="relative pl-10 space-y-5">
                  {/* Animated progress line */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{ originY: 0 }}
                    className="absolute left-[1.15rem] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#C9822A] via-[#C9822A]/50 to-[#2A1F10]"
                  />
                  {result.events.map((event, i) => {
                    const evtCfg = STATUS_CONFIG[event.status];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="relative"
                      >
                        {/* Dot */}
                        <div className="absolute -left-10 flex items-center justify-center z-10">
                          {i === 0 ? (
                            <motion.div
                              animate={{ boxShadow: ["0 0 0 0 rgba(201,130,42,0.4)", "0 0 0 8px rgba(201,130,42,0)", "0 0 0 0 rgba(201,130,42,0)"] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-5 h-5 rounded-full bg-[#C9822A] border-2 border-[#0C0A08] flex items-center justify-center shadow-lg shadow-[#C9822A]/40"
                            >
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </motion.div>
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-[#2A1F10] border-2 border-[#C9822A]/30" />
                          )}
                        </div>
                        <div
                          className={`rounded-xl p-3.5 border ${
                            i === 0
                              ? "bg-[#1A1510] border-[#C9822A]/30 shadow-sm shadow-[#C9822A]/10"
                              : "bg-[#141210] border-[#2A1F10]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className={`text-sm font-semibold ${i === 0 ? "text-white" : "text-gray-400"}`}>
                                {event.description}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <MapPin size={11} className="text-[#C9822A]/60" />
                                <span className="text-xs text-gray-600">{event.location}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className={`text-xs font-medium ${i === 0 ? "text-[#C9822A]" : "text-gray-500"}`}>{event.date}</p>
                              <p className="text-xs text-gray-700">{event.time}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Need help */}
              <div className="card bg-primary-800 text-center">
                <p className="text-white font-semibold mb-1">
                  Dúvidas sobre seu pedido?
                </p>
                <p className="text-primary-300 text-sm mb-4">
                  Fale conosco no WhatsApp com o código do rastreamento
                </p>
                <a
                  href={`https://wa.me/5551996148568?text=Olá! Quero informações sobre o pedido ${result.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
                >
                  💬 Falar no WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!result && !notFound && !loading && (
            <div className="card text-center py-12">
              <Package size={48} className="text-primary-300 mx-auto mb-4" />
              <p className="font-semibold text-primary-600 mb-2">
                Insira o código do seu pedido
              </p>
              <p className="text-sm text-primary-400 max-w-sm mx-auto">
                O código de rastreamento é enviado por WhatsApp assim que seu
                pedido é processado no armazém da China.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
