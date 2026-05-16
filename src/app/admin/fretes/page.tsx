import { Truck, Construction } from "lucide-react";

export default function FretesPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Fretes</h1>
        <p className="text-sm text-gray-500">Gerenciamento de fretes e cotações</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
        <Truck size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Módulo em desenvolvimento</p>
        <p className="text-sm text-gray-400 mt-1">Em breve você poderá gerenciar todas as cotações de frete aqui.</p>
      </div>
    </div>
  );
}
