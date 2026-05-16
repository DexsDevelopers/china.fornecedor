import { BarChart3 } from "lucide-react";

export default function RelatoriosPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
        <p className="text-sm text-gray-500">Análises e relatórios detalhados</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
        <BarChart3 size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Módulo em desenvolvimento</p>
        <p className="text-sm text-gray-400 mt-1">Em breve você terá acesso a relatórios completos de desempenho.</p>
      </div>
    </div>
  );
}
