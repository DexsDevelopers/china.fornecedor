"use client";

import {
  Package, Users, DollarSign, TrendingUp, Clock,
  CheckCircle, AlertCircle, Truck,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { AdminStatCard, StatusBadge, PremiumCard } from "@/components/ui/cards";
import AnimateIn from "@/components/ui/AnimateIn";

const revenueData = [
  { mes: "Jun", receita: 8200, pedidos: 42 },
  { mes: "Jul", receita: 11400, pedidos: 58 },
  { mes: "Ago", receita: 9800, pedidos: 51 },
  { mes: "Set", receita: 13200, pedidos: 67 },
  { mes: "Out", receita: 15600, pedidos: 79 },
  { mes: "Nov", receita: 18900, pedidos: 96 },
];

const statusData = [
  { name: "Entregues", value: 312, color: "#22c55e" },
  { name: "Em Trânsito", value: 89, color: "#C9822A" },
  { name: "Alfândega", value: 24, color: "#f59e0b" },
  { name: "Processando", value: 18, color: "#6366f1" },
  { name: "Problemas", value: 5, color: "#ef4444" },
];

const recentOrders = [
  { id: "WQ2024001234", cliente: "Ana Lima", cidade: "São Paulo, SP", produto: "Roupas (3 itens)", valor: "R$ 189,00", status: "transit", data: "12/11/2024" },
  { id: "WQ2024001235", cliente: "Carlos Souza", cidade: "Curitiba, PR", produto: "Eletrônicos", valor: "R$ 342,50", status: "customs", data: "10/11/2024" },
  { id: "WQ2024001236", cliente: "Maria Ferreira", cidade: "Salvador, BA", produto: "Calçados (2 pares)", valor: "R$ 156,00", status: "delivered", data: "08/11/2024" },
  { id: "WQ2024001237", cliente: "João Santos", cidade: "Recife, PE", produto: "Acessórios", valor: "R$ 94,00", status: "processing", data: "13/11/2024" },
  { id: "WQ2024001238", cliente: "Luiza Costa", cidade: "Brasília, DF", produto: "Roupas (5 itens)", valor: "R$ 278,00", status: "delivered", data: "07/11/2024" },
];

const stats = [
  { title: "Total de Pedidos", value: "448", change: "+12%", trend: "up" as const, sub: "vs. mês anterior", icon: Package, iconBg: "bg-blue-500/10 text-blue-400" },
  { title: "Receita Total", value: "R$ 76.900", change: "+21%", trend: "up" as const, sub: "vs. mês anterior", icon: DollarSign, iconBg: "bg-green-500/10 text-green-400" },
  { title: "Clientes Ativos", value: "1.243", change: "+8%", trend: "up" as const, sub: "cadastrados", icon: Users, iconBg: "bg-purple-500/10 text-purple-400" },
  { title: "Pedidos Pendentes", value: "131", change: "-3%", trend: "down" as const, sub: "aguardando entrega", icon: Clock, iconBg: "bg-[#C9822A]/10 text-[#C9822A]" },
];

const chartTooltipStyle = {
  backgroundColor: "#1A1510",
  border: "1px solid rgba(201,130,42,0.2)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimateIn direction="up">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-0.5">Visão geral do negócio — Novembro 2024</p>
        </div>
      </AnimateIn>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <AdminStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            iconBg={stat.iconBg}
            sub={stat.sub}
            delay={i * 0.07}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <PremiumCard variant="soft" className="xl:col-span-2 p-5" delay={0.1}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white">Receita Mensal</h2>
              <p className="text-xs text-gray-600">Últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold bg-green-500/10 px-2.5 py-1 rounded-full">
              <TrendingUp size={12} />
              +21% este mês
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9822A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9822A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Receita"]} />
              <Area type="monotone" dataKey="receita" stroke="#C9822A" strokeWidth={2.5} fill="url(#colorReceita)" />
            </AreaChart>
          </ResponsiveContainer>
        </PremiumCard>

        {/* Status Pie */}
        <PremiumCard variant="soft" className="p-5" delay={0.15}>
          <h2 className="text-base font-bold text-white mb-1">Status dos Pedidos</h2>
          <p className="text-xs text-gray-600 mb-4">Todos os pedidos ativos</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={2} stroke="#111">
                {statusData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [`${v} pedidos`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </PremiumCard>
      </div>

      {/* Recent Orders */}
      <PremiumCard variant="soft" delay={0.2}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <div>
            <h2 className="text-base font-bold text-white">Pedidos Recentes</h2>
            <p className="text-xs text-gray-600">Últimas movimentações</p>
          </div>
          <a href="/admin/pedidos" className="text-xs font-semibold text-[#C9822A] hover:text-[#E8A84A] transition-colors">
            Ver todos →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                {["Código", "Cliente", "Produto", "Valor", "Data", "Status"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[rgba(201,130,42,0.04)] transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono font-bold text-[#C9822A]">{order.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-white">{order.cliente}</p>
                    <p className="text-xs text-gray-600">{order.cidade}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-gray-400">{order.produto}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold text-white">{order.valor}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-gray-600">{order.data}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={order.status} pulse={order.status === "transit" || order.status === "processing"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimateIn direction="up" delay={0.05}>
          <div className="bg-[#1A1510] border border-[#C9822A]/20 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle size={15} className="text-[#C9822A] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">24 pedidos na alfândega</p>
              <p className="text-xs text-gray-600 mt-0.5">Aguardando desembaraço</p>
            </div>
          </div>
        </AnimateIn>
        <AnimateIn direction="up" delay={0.1}>
          <div className="bg-green-500/5 border border-green-500/15 rounded-2xl p-4 flex items-start gap-3">
            <CheckCircle size={15} className="text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">96 entregas este mês</p>
              <p className="text-xs text-gray-600 mt-0.5">Recorde de novembro</p>
            </div>
          </div>
        </AnimateIn>
        <AnimateIn direction="up" delay={0.15}>
          <div className="bg-blue-500/5 border border-blue-500/15 rounded-2xl p-4 flex items-start gap-3">
            <Truck size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">89 pedidos em trânsito</p>
              <p className="text-xs text-gray-600 mt-0.5">Tempo médio: 18 dias</p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
