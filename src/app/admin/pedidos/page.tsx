"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Package,
  Eye,
  ChevronDown,
  Download,
  Plus,
  X,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  Globe,
} from "lucide-react";

type Status = "all" | "processing" | "transit" | "customs" | "delivered" | "problem";

const ALL_ORDERS = [
  { id: "WQ2024001238", cliente: "Luiza Costa", cidade: "Brasília, DF", produto: "Roupas (5 itens)", peso: "1.5 kg", valor: "R$ 278,00", status: "delivered", data: "07/11/2024" },
  { id: "WQ2024001237", cliente: "João Santos", cidade: "Recife, PE", produto: "Acessórios", peso: "0.3 kg", valor: "R$ 94,00", status: "processing", data: "13/11/2024" },
  { id: "WQ2024001236", cliente: "Maria Ferreira", cidade: "Salvador, BA", produto: "Calçados (2 pares)", peso: "2.1 kg", valor: "R$ 156,00", status: "delivered", data: "08/11/2024" },
  { id: "WQ2024001235", cliente: "Carlos Souza", cidade: "Curitiba, PR", produto: "Eletrônicos", peso: "0.9 kg", valor: "R$ 342,50", status: "customs", data: "10/11/2024" },
  { id: "WQ2024001234", cliente: "Ana Lima", cidade: "São Paulo, SP", produto: "Roupas (3 itens)", peso: "0.8 kg", valor: "R$ 189,00", status: "transit", data: "12/11/2024" },
  { id: "WQ2024001233", cliente: "Roberto Dias", cidade: "Porto Alegre, RS", produto: "Brinquedos", peso: "1.2 kg", valor: "R$ 121,00", status: "transit", data: "11/11/2024" },
  { id: "WQ2024001232", cliente: "Fernanda Alves", cidade: "Fortaleza, CE", produto: "Cosméticos", peso: "0.6 kg", valor: "R$ 87,50", status: "delivered", data: "05/11/2024" },
  { id: "WQ2024001231", cliente: "Pedro Martins", cidade: "Manaus, AM", produto: "Casa & Decoração", peso: "3.4 kg", valor: "R$ 445,00", status: "customs", data: "09/11/2024" },
  { id: "WQ2024001230", cliente: "Carla Nunes", cidade: "Goiânia, GO", produto: "Fitness", peso: "2.8 kg", valor: "R$ 312,00", status: "transit", data: "12/11/2024" },
  { id: "WQ2024001229", cliente: "Marcos Lima", cidade: "Florianópolis, SC", produto: "Eletrônicos", peso: "0.4 kg", valor: "R$ 198,00", status: "problem", data: "06/11/2024" },
  { id: "WQ2024001228", cliente: "Patrícia Souza", cidade: "Belo Horizonte, MG", produto: "Bijuterias", peso: "0.2 kg", valor: "R$ 63,00", status: "delivered", data: "04/11/2024" },
  { id: "WQ2024001227", cliente: "Diego Costa", cidade: "Campinas, SP", produto: "Roupas (8 itens)", peso: "2.3 kg", valor: "R$ 367,00", status: "processing", data: "13/11/2024" },
];

const STATUS_META: Record<string, { label: string; badge: string; icon: React.ElementType; color: string }> = {
  processing: { label: "Processando", badge: "badge-info", icon: Package, color: "text-blue-500" },
  transit: { label: "Em Trânsito", badge: "badge-warning", icon: Globe, color: "text-amber-500" },
  customs: { label: "Alfândega", badge: "badge-pending", icon: AlertCircle, color: "text-orange-500" },
  delivered: { label: "Entregue", badge: "badge-success", icon: CheckCircle, color: "text-green-500" },
  problem: { label: "Problema", badge: "badge-danger", icon: AlertCircle, color: "text-red-500" },
};

const STATUS_FILTERS: { value: Status; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "processing", label: "Processando" },
  { value: "transit", label: "Em Trânsito" },
  { value: "customs", label: "Alfândega" },
  { value: "delivered", label: "Entregues" },
  { value: "problem", label: "Problemas" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof ALL_ORDERS[0] | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = ALL_ORDERS.filter((o) => {
    const matchSearch =
      search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.cliente.toLowerCase().includes(search.toLowerCase()) ||
      o.produto.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>
          <p className="text-sm text-gray-500">{ALL_ORDERS.length} pedidos no total</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Download size={14} />
            Exportar
          </button>
          <button className="flex items-center gap-1.5 text-sm text-white bg-gold-500 hover:bg-gold-600 px-4 py-2 rounded-lg transition-colors font-semibold shadow-sm">
            <Plus size={14} />
            Novo Pedido
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por código, cliente ou produto..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          {/* Status filter */}
          <div className="flex flex-wrap gap-1.5">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => { setStatusFilter(f.value); setPage(1); }}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  statusFilter === f.value
                    ? "bg-primary-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Código", "Cliente", "Produto", "Peso", "Valor", "Data", "Status", "Ações"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400 text-sm">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                paginated.map((order) => {
                  const meta = STATUS_META[order.status];
                  const Icon = meta.icon;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono font-bold text-primary-700">{order.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-800">{order.cliente}</p>
                        <p className="text-xs text-gray-400">{order.cidade}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{order.produto}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500">{order.peso}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-gray-800">{order.valor}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-400">{order.data}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={meta.badge}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-gold-500 hover:text-gold-600 transition-colors"
                          title="Ver detalhes"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Mostrando {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} de {filtered.length}
            </p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 text-xs rounded-md transition-all ${
                    page === p
                      ? "bg-primary-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Detalhes do Pedido</h3>
                <p className="text-xs font-mono text-primary-600 mt-0.5">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { label: "Cliente", value: selectedOrder.cliente },
                { label: "Localização", value: selectedOrder.cidade },
                { label: "Produto", value: selectedOrder.produto },
                { label: "Peso", value: selectedOrder.peso },
                { label: "Valor", value: selectedOrder.valor },
                { label: "Data", value: selectedOrder.data },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className={STATUS_META[selectedOrder.status].badge}>
                  {STATUS_META[selectedOrder.status].label}
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <a
                href={`/rastreio?code=${selectedOrder.id}`}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-all text-center"
              >
                Ver Rastreamento
              </a>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-lg transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
