"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calculator,
  Package,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Truck,
  Zap,
  Shield,
} from "lucide-react";

const PRODUCT_CATEGORIES = [
  { id: "roupas", label: "Roupas / Têxteis", taxRate: 0.2, icon: "👗" },
  { id: "calcados", label: "Calçados", taxRate: 0.2, icon: "👟" },
  { id: "eletronicos", label: "Eletrônicos", taxRate: 0.2, icon: "📱" },
  { id: "acessorios", label: "Acessórios / Bijuterias", taxRate: 0.2, icon: "💍" },
  { id: "cosmeticos", label: "Cosméticos / Perfumes", taxRate: 0.2, icon: "💄" },
  { id: "brinquedos", label: "Brinquedos", taxRate: 0.2, icon: "🧸" },
  { id: "casa", label: "Casa & Decoração", taxRate: 0.2, icon: "🏠" },
  { id: "esportes", label: "Esportes & Fitness", taxRate: 0.2, icon: "⚽" },
  { id: "ferramentas", label: "Ferramentas", taxRate: 0.2, icon: "🔧" },
  { id: "outros", label: "Outros", taxRate: 0.2, icon: "📦" },
];

const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Padrão",
    subtitle: "Correios China LE",
    days: "15-25 dias",
    basePricePerKg: 49.9,
    minPrice: 25,
    icon: Truck,
    color: "border-primary-300 bg-cream-50",
    selectedColor: "border-gold-500 bg-amber-50",
  },
  {
    id: "express",
    name: "Expresso",
    subtitle: "Envio Prioritário",
    days: "7-12 dias",
    basePricePerKg: 89.9,
    minPrice: 55,
    icon: Zap,
    color: "border-primary-300 bg-cream-50",
    selectedColor: "border-gold-500 bg-amber-50",
  },
  {
    id: "economy",
    name: "Econômico",
    subtitle: "Envio Agrupado",
    days: "25-40 dias",
    basePricePerKg: 29.9,
    minPrice: 15,
    icon: Package,
    color: "border-primary-300 bg-cream-50",
    selectedColor: "border-gold-500 bg-amber-50",
  },
];

const USD_TO_BRL = 5.1;

function calculateShipping(
  weightKg: number,
  declaredValueUSD: number,
  shippingMethodId: string,
  categoryId: string
) {
  const method = SHIPPING_METHODS.find((m) => m.id === shippingMethodId)!;
  const category = PRODUCT_CATEGORIES.find((c) => c.id === categoryId)!;

  const shippingCost = Math.max(
    method.minPrice,
    weightKg * method.basePricePerKg
  );

  const declaredValueBRL = declaredValueUSD * USD_TO_BRL;
  const isExempt = declaredValueUSD <= 50;

  let importTax = 0;
  let icms = 0;
  let taxBreakdown = "";

  if (!isExempt) {
    const taxableValue = declaredValueBRL;
    importTax = taxableValue * 0.2;
    const baseIcms = taxableValue + importTax + shippingCost;
    icms = baseIcms * 0.17;
    taxBreakdown = `II: R$ ${importTax.toFixed(2)} + ICMS: R$ ${icms.toFixed(2)}`;
  }

  const totalTax = importTax + icms;
  const totalCost = shippingCost + totalTax;

  return {
    shippingCost,
    importTax,
    icms,
    totalTax,
    totalCost,
    declaredValueBRL,
    isExempt,
    taxBreakdown,
    method,
    category,
  };
}

export default function CalculatorPage() {
  const [weight, setWeight] = useState<string>("0.5");
  const [declaredValue, setDeclaredValue] = useState<string>("30");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [category, setCategory] = useState("roupas");
  const [insurance, setInsurance] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateShipping> | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight) || 0;
    const v = parseFloat(declaredValue) || 0;

    if (w <= 0 || v <= 0) return;

    const res = calculateShipping(w, v, shippingMethod, category);
    const insuranceCost = insurance ? res.totalCost * 0.02 : 0;
    setResult({ ...res, totalCost: res.totalCost + insuranceCost });
    setCalculated(true);
  };

  return (
    <main className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-primary-800 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400 rounded-full px-4 py-1 mb-4">
              <Calculator size={14} className="text-gold-400" />
              <span className="text-gold-300 text-sm font-medium">Calculadora de Frete</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Calcule seu Frete Internacional
            </h1>
            <p className="text-primary-300 max-w-xl mx-auto">
              Estimativa de frete + imposto de importação. Valores sujeitos à
              confirmação após análise do produto.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category */}
              <div className="card">
                <h2 className="text-base font-bold text-primary-800 mb-4 flex items-center gap-2">
                  <Package size={18} className="text-gold-500" />
                  Categoria do Produto
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        category === cat.id
                          ? "border-gold-500 bg-amber-50 text-primary-800"
                          : "border-cream-300 bg-white text-primary-500 hover:border-gold-300"
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-xs leading-tight">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight & Value */}
              <div className="card">
                <h2 className="text-base font-bold text-primary-800 mb-4 flex items-center gap-2">
                  <DollarSign size={18} className="text-gold-500" />
                  Peso e Valor Declarado
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Peso estimado (kg)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.1"
                        max="30"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="input-field pr-12"
                        placeholder="Ex: 0.5"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 text-sm font-medium">
                        kg
                      </span>
                    </div>
                    <p className="text-xs text-primary-400 mt-1">Máx: 30kg por envio</p>
                  </div>
                  <div>
                    <label className="label">Valor declarado (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 text-sm font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={declaredValue}
                        onChange={(e) => setDeclaredValue(e.target.value)}
                        className="input-field pl-7"
                        placeholder="Ex: 30"
                      />
                    </div>
                    <p className="text-xs text-primary-400 mt-1">
                      ≈ R$ {(parseFloat(declaredValue || "0") * USD_TO_BRL).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Tax notice */}
                {parseFloat(declaredValue) <= 50 ? (
                  <div className="mt-4 flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-lg p-3">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-700">
                      <strong>Isento de imposto!</strong> Pedidos com valor declarado até USD 50 são
                      isentos de imposto de importação (Remessa Conforme).
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      <strong>Imposto aplicável.</strong> Pedidos acima de USD 50 estão sujeitos a
                      20% de II + ICMS de 17% sobre o valor total.
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping Method */}
              <div className="card">
                <h2 className="text-base font-bold text-primary-800 mb-4 flex items-center gap-2">
                  <Truck size={18} className="text-gold-500" />
                  Método de Envio
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SHIPPING_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setShippingMethod(method.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        shippingMethod === method.id
                          ? method.selectedColor + " border-gold-500"
                          : "border-cream-300 bg-white hover:border-gold-300"
                      }`}
                    >
                      <method.icon
                        size={20}
                        className={
                          shippingMethod === method.id
                            ? "text-gold-500"
                            : "text-primary-400"
                        }
                      />
                      <p className="text-sm font-bold text-primary-800 mt-2">
                        {method.name}
                      </p>
                      <p className="text-xs text-primary-400">{method.subtitle}</p>
                      <p className="text-xs text-gold-600 font-semibold mt-1">
                        <Clock size={10} className="inline mr-0.5" />
                        {method.days}
                      </p>
                      <p className="text-xs text-primary-500 mt-1">
                        R$ {method.basePricePerKg.toFixed(2)}/kg
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insurance */}
              <div className="card">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={insurance}
                    onChange={(e) => setInsurance(e.target.checked)}
                    className="w-4 h-4 accent-gold-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-primary-800 flex items-center gap-1.5">
                      <Shield size={14} className="text-gold-500" />
                      Seguro de Envio (+2% sobre o total)
                    </p>
                    <p className="text-xs text-primary-400 mt-0.5">
                      Proteção em caso de extravio ou avaria durante o transporte
                    </p>
                  </div>
                </label>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base"
              >
                <Calculator size={18} />
                Calcular Frete
              </button>
            </div>

            {/* Result Panel */}
            <div className="lg:col-span-1">
              {!calculated ? (
                <div className="card h-fit sticky top-20">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator size={28} className="text-primary-400" />
                    </div>
                    <p className="text-primary-500 text-sm">
                      Preencha os dados ao lado e clique em{" "}
                      <strong>Calcular Frete</strong> para ver a estimativa.
                    </p>
                  </div>

                  <div className="border-t border-cream-200 pt-4 mt-2 space-y-2">
                    {[
                      "Pedidos até USD 50: isentos",
                      "Acima: 20% II + 17% ICMS",
                      "PIX aceito",
                      "Rastreio incluído",
                    ].map((info) => (
                      <div key={info} className="flex items-center gap-2 text-xs text-primary-400">
                        <Info size={11} className="text-gold-400 flex-shrink-0" />
                        {info}
                      </div>
                    ))}
                  </div>
                </div>
              ) : result ? (
                <div className="card h-fit sticky top-20 border-2 border-gold-400">
                  <div className="flex items-center gap-2 mb-5">
                    <CheckCircle size={18} className="text-green-500" />
                    <h3 className="font-bold text-primary-800">Estimativa de Frete</h3>
                  </div>

                  {/* Method badge */}
                  <div className="bg-cream-100 rounded-lg p-3 mb-4">
                    <p className="text-xs text-primary-400 mb-1">Modalidade selecionada</p>
                    <p className="text-sm font-bold text-primary-800">
                      {result.method.name} — {result.method.subtitle}
                    </p>
                    <p className="text-xs text-gold-600 flex items-center gap-1 mt-1">
                      <Clock size={10} />
                      {result.method.days}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-2.5 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-500">Frete Internacional</span>
                      <span className="font-semibold text-primary-800">
                        R$ {result.shippingCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-500">Valor Declarado</span>
                      <span className="font-semibold text-primary-800">
                        R$ {result.declaredValueBRL.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-cream-200 pt-2.5">
                      {result.isExempt ? (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 font-medium">Imposto de Importação</span>
                          <span className="font-semibold text-green-600">Isento ✓</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-primary-500">Imp. Importação (20%)</span>
                            <span className="font-semibold text-primary-800">
                              R$ {result.importTax.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-primary-500">ICMS (17%)</span>
                            <span className="font-semibold text-primary-800">
                              R$ {result.icms.toFixed(2)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    {insurance && (
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-500 flex items-center gap-1">
                          <Shield size={11} />
                          Seguro (2%)
                        </span>
                        <span className="font-semibold text-primary-800">
                          R$ {(result.totalCost * 0.02 / 1.02).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="bg-primary-800 rounded-xl p-4 text-center">
                    <p className="text-primary-300 text-xs mb-1">Total Estimado</p>
                    <p className="text-3xl font-black text-gold-400">
                      R$ {result.totalCost.toFixed(2)}
                    </p>
                    <p className="text-xs text-primary-400 mt-1">
                      * Valor estimado. Sujeito à confirmação.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/5551996148568?text=Olá! Quero fazer um pedido."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all text-sm"
                  >
                    💬 Fazer Pedido no WhatsApp
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {/* Info box */}
          <div className="mt-8 card bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-800 mb-1">
                  Sobre o Cálculo de Impostos
                </p>
                <p className="text-sm text-blue-600 leading-relaxed">
                  Pedidos enviados pela modalidade &ldquo;Remessa Conforme&rdquo; com valor até USD 50
                  são isentos de impostos de importação para pessoa física. Acima desse valor,
                  incidem II (20%) e ICMS (17%). Os valores são estimativas — podem variar
                  conforme a classificação fiscal do produto pela Receita Federal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
