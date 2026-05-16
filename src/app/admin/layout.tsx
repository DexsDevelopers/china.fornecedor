import Sidebar from "@/components/admin/Sidebar";
import { Bell, Search } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="relative max-w-xs w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar pedidos, clientes..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 bg-gray-50"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-primary-700 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">WQ</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">Admin</p>
                <p className="text-xs text-gray-400">Weng Quan</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
