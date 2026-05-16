import { Settings } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
        <p className="text-sm text-gray-500">Configurações do sistema</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
        <Settings size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Módulo em desenvolvimento</p>
        <p className="text-sm text-gray-400 mt-1">As configurações do sistema estarão disponíveis em breve.</p>
      </div>
    </div>
  );
}
