"use client";

import {
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

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
  {
    id: "WQ2024001234",
    cliente: "Ana Lima",
    cidade: "São Paulo, SP",
    produto: "Roupas (3 itens)",
    valor: "R$ 189,00",
    status: "transit",
    statusLabel: "Em Trânsito",
    data: "12/11/2024",
  },
  {
    id: "WQ2024001235",
    cliente: "Carlos Souza",
    cidade: "Curitiba, PR",
    produto: "Eletrônicos",
    valor: "R$ 342,50",
    status: "customs",
    statusLabel: "Alfândega",
    data: "10/11/2024",
  },
  {
    id: "WQ2024001236",
    cliente: "Maria Ferreira",
    cidade: "Salvador, BA",
    produto: "Calçados (2 pares)",
    valor: "R$ 156,00",
    status: "delivered",
    statusLabel: "Entregue",
    data: "08/11/2024",
  },
  {
    id: "WQ2024001237",
    cliente: "João Santos",
    cidade: "Recife, PE",
    produto: "Acessórios",
    valor: "R$ 94,00",
    status: "processing",
    statusLabel: "Processando",
    data: "13/11/2024",
  },
  {
    id: "WQ2024001238",
    cliente: "Luiza Costa",
    cidade: "Brasília, DF",
    produto: "Roupas (5 itens)",
    valor: "R$ 278,00",
    status: "delivered",
    statusLabel: "Entregue",
    data: "07/11/2024",
  },
];

const statusColors: Record<string, string> = {
  transit: "badge-warning",
  customs: "badge-pending",
  delivered: "badge-success",
  processing: "badge-info",
  problem: "badge-danger",
};

const stats = [
  {
    title: "Total de Pedidos",
    value: "448",
    change: "+12%",
    trend: "up",
    sub: "vs. mês anterior",
    icon: Package,
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    title: "Receita Total",
    value: "R$ 76.900",
    change: "+21%",
    trend: "up",
    sub: "vs. mês anterior",
    icon: DollarSign,
    iconBg: "bg-green-50 text-green-600",
  },
  {
    title: "Clientes Ativos",
    value: "1.243",
    change: "+8%",
    trend: "up",
    sub: "cadastrados",
    icon: Users,
    iconBg: "bg-purple-50 text-purple-600",
  },
  {
    title: "Pedidos Pendentes",
    value: "131",
    change: "-3%",
    trend: "down",
    sub: "aguardando entrega",
    icon: Clock,
    iconBg: "bg-amber-50 text-amber-600",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Visão geral do negócio — Novembro 2024
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}
              >
                <stat.icon size={18} />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.trend === "up"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-black text-gray-800">{stat.value}</p>
            <p className="text-sm font-medium text-gray-500 mt-0.5">
              {stat.title}
            </p>
            <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-800">
                Receita Mensal
              </h2>
              <p className="text-xs text-gray-400">Últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">
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
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [
                  `R$ ${value.toLocaleString("pt-BR")}`,
                  "Receita",
                ]}
              />
              <Area
                type="monotone"
                dataKey="receita"
                stroke="#C9822A"
                strokeWidth={2.5}
                fill="url(#colorReceita)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-800 mb-1">
            Status dos Pedidos
          </h2>
          <p className="text-xs text-gray-400 mb-4">Todos os pedidos ativos</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                dataKey="value"
                strokeWidth={2}
                stroke="#fff"
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v} pedidos`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-800">
              Pedidos Recentes
            </h2>
            <p className="text-xs text-gray-400">Últimas movimentações</p>
          </div>
          <a
            href="/admin/pedidos"
            className="text-xs font-semibold text-gold-500 hover:text-gold-600 transition-colors"
          >
            Ver todos →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {["Código", "Cliente", "Produto", "Valor", "Data", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono font-semibold text-primary-700">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-gray-800">
                      {order.cliente}
                    </p>
                    <p className="text-xs text-gray-400">{order.cidade}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-gray-600">{order.produto}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold text-gray-800">
                      {order.valor}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-gray-400">{order.data}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={statusColors[order.status]}>
                      {order.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              24 pedidos na alfândega
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              Aguardando desembaraço
            </p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-800">
              96 entregas este mês
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              Recorde de novembro
            </p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <Truck size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-800">
              89 pedidos em trânsito
            </p>
            <p className="text-xs text-blue-600 mt-0.5">
              Tempo médio: 18 dias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
