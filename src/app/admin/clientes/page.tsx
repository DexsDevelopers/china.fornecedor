"use client";

import { useState } from "react";
import {
  Search,
  Users,
  Package,
  DollarSign,
  Star,
  Eye,
  Download,
  UserPlus,
  X,
} from "lucide-react";

const CLIENTS = [
  { id: 1, nome: "Ana Lima", email: "ana.lima@gmail.com", cidade: "São Paulo, SP", pedidos: 8, gasto: "R$ 1.240,00", ultimoPedido: "12/11/2024", nivel: "VIP", desde: "Jan/2023" },
  { id: 2, nome: "Carlos Souza", email: "carlos.souza@hotmail.com", cidade: "Curitiba, PR", pedidos: 5, gasto: "R$ 876,50", ultimoPedido: "10/11/2024", nivel: "Regular", desde: "Mar/2023" },
  { id: 3, nome: "Maria Ferreira", email: "maria.ferreira@gmail.com", cidade: "Salvador, BA", pedidos: 12, gasto: "R$ 2.103,00", ultimoPedido: "08/11/2024", nivel: "VIP", desde: "Nov/2022" },
  { id: 4, nome: "João Santos", email: "joao.santos@outlook.com", cidade: "Recife, PE", pedidos: 2, gasto: "R$ 189,00", ultimoPedido: "13/11/2024", nivel: "Novo", desde: "Out/2024" },
  { id: 5, nome: "Luiza Costa", email: "luiza.costa@gmail.com", cidade: "Brasília, DF", pedidos: 7, gasto: "R$ 1.456,00", ultimoPedido: "07/11/2024", nivel: "VIP", desde: "Fev/2023" },
  { id: 6, nome: "Roberto Dias", email: "roberto.dias@gmail.com", cidade: "Porto Alegre, RS", pedidos: 3, gasto: "R$ 421,00", ultimoPedido: "11/11/2024", nivel: "Regular", desde: "Jun/2024" },
  { id: 7, nome: "Fernanda Alves", email: "fernanda.alves@yahoo.com", cidade: "Fortaleza, CE", pedidos: 15, gasto: "R$ 3.201,00", ultimoPedido: "05/11/2024", nivel: "VIP", desde: "Ago/2022" },
  { id: 8, nome: "Pedro Martins", email: "pedro.martins@gmail.com", cidade: "Manaus, AM", pedidos: 4, gasto: "R$ 698,00", ultimoPedido: "09/11/2024", nivel: "Regular", desde: "Jan/2024" },
  { id: 9, nome: "Carla Nunes", email: "carla.nunes@gmail.com", cidade: "Goiânia, GO", pedidos: 6, gasto: "R$ 987,50", ultimoPedido: "12/11/2024", nivel: "Regular", desde: "Jul/2023" },
  { id: 10, nome: "Marcos Lima", email: "marcos.lima@hotmail.com", cidade: "Florianópolis, SC", pedidos: 1, gasto: "R$ 198,00", ultimoPedido: "06/11/2024", nivel: "Novo", desde: "Nov/2024" },
  { id: 11, nome: "Patrícia Souza", email: "patricia.souza@gmail.com", cidade: "Belo Horizonte, MG", pedidos: 9, gasto: "R$ 1.602,00", ultimoPedido: "04/11/2024", nivel: "VIP", desde: "Set/2022" },
  { id: 12, nome: "Diego Costa", email: "diego.costa@gmail.com", cidade: "Campinas, SP", pedidos: 2, gasto: "R$ 367,00", ultimoPedido: "13/11/2024", nivel: "Novo", desde: "Out/2024" },
];

const NIVEL_BADGE: Record<string, string> = {
  VIP: "bg-amber-100 text-amber-700 border border-amber-200",
  Regular: "bg-blue-50 text-blue-600 border border-blue-100",
  Novo: "bg-green-50 text-green-600 border border-green-100",
};

const summaryStats = [
  { label: "Total de Clientes", value: "1.243", icon: Users, color: "bg-purple-50 text-purple-600" },
  { label: "Clientes VIP", value: "89", icon: Star, color: "bg-amber-50 text-amber-600" },
  { label: "Novos este mês", value: "47", icon: UserPlus, color: "bg-green-50 text-green-600" },
  { label: "Ticket Médio", value: "R$ 312,00", icon: DollarSign, color: "bg-blue-50 text-blue-600" },
];

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [nível, setNível] = useState("all");
  const [selectedClient, setSelectedClient] = useState<typeof CLIENTS[0] | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = CLIENTS.filter((c) => {
    const matchSearch =
      search === "" ||
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.cidade.toLowerCase().includes(search.toLowerCase());
    const matchNivel = nível === "all" || c.nivel === nível;
    return matchSearch && matchNivel;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <p className="text-sm text-gray-500">{CLIENTS.length} clientes cadastrados</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Download size={14} />
            Exportar
          </button>
          <button className="flex items-center gap-1.5 text-sm text-white bg-gold-500 hover:bg-gold-600 px-4 py-2 rounded-lg transition-colors font-semibold shadow-sm">
            <UserPlus size={14} />
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon size={16} />
            </div>
            <div>
              <p className="text-lg font-black text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, e-mail ou cidade..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <div className="flex gap-1.5">
            {["all", "VIP", "Regular", "Novo"].map((n) => (
              <button
                key={n}
                onClick={() => { setNível(n); setPage(1); }}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  nível === n
                    ? "bg-primary-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {n === "all" ? "Todos" : n}
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
                {["Cliente", "E-mail", "Cidade", "Pedidos", "Total Gasto", "Último Pedido", "Nível", ""].map((h) => (
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
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                paginated.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-700 text-xs font-bold">
                            {client.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{client.nome}</p>
                          <p className="text-xs text-gray-400">Desde {client.desde}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-500">{client.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{client.cidade}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Package size={13} className="text-gray-400" />
                        <span className="text-sm font-semibold text-gray-800">{client.pedidos}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-800">{client.gasto}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-400">{client.ultimoPedido}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${NIVEL_BADGE[client.nivel]}`}>
                        {client.nivel === "VIP" && <Star size={10} className="inline mr-0.5 mb-0.5" />}
                        {client.nivel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="text-gold-500 hover:text-gold-600 transition-colors"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} de {filtered.length}
            </p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 text-xs rounded-md transition-all ${
                    page === p ? "bg-primary-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 text-base font-bold">
                    {selectedClient.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{selectedClient.nome}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${NIVEL_BADGE[selectedClient.nivel]}`}>
                    {selectedClient.nivel}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Pedidos", value: selectedClient.pedidos, icon: Package },
                { label: "Total Gasto", value: selectedClient.gasto, icon: DollarSign },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <Icon size={16} className="text-gold-500 mx-auto mb-1" />
                  <p className="text-base font-black text-gray-800">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              {[
                { label: "E-mail", value: selectedClient.email },
                { label: "Cidade", value: selectedClient.cidade },
                { label: "Último Pedido", value: selectedClient.ultimoPedido },
                { label: "Cliente desde", value: selectedClient.desde },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedClient(null)}
              className="mt-5 w-full bg-gold-500 hover:bg-gold-600 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
