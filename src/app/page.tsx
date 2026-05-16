import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calculator,
  Package,
  Shield,
  Clock,
  Star,
  Truck,
  Globe,
  CheckCircle,
  ArrowRight,
  Boxes,
  Shirt,
  Smartphone,
  Gem,
  ChevronRight,
} from "lucide-react";

const stats = [
  { value: "15.000+", label: "Pedidos Entregues" },
  { value: "98%", label: "Satisfação dos Clientes" },
  { value: "12-25", label: "Dias de Entrega" },
  { value: "R$0", label: "Taxa de Cadastro" },
];

const services = [
  {
    icon: Globe,
    title: "Compras na China",
    description:
      "Compramos qualquer produto na China por você. Eletrônicos, roupas, acessórios, calçados e muito mais com os melhores preços.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Truck,
    title: "Frete Internacional",
    description:
      "Enviamos via Correios China LE com prazo de 12 a 25 dias. Rastreamento completo do pedido do armazém até sua porta.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Shield,
    title: "Desembaraço Aduaneiro",
    description:
      "Cuidamos de todo o processo alfandegário. Calculamos e orientamos sobre os impostos de importação de forma transparente.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Boxes,
    title: "Armazenagem",
    description:
      "Consolidamos seus pedidos em nosso armazém na China antes do envio, economizando no frete com múltiplos itens.",
    color: "bg-purple-50 text-purple-600",
  },
];

const steps = [
  {
    number: "01",
    title: "Escolha o produto",
    description:
      "Encontrou algo no AliExpress, Taobao ou 1688? Nos envie o link pelo WhatsApp.",
  },
  {
    number: "02",
    title: "Calcule o frete",
    description:
      "Use nossa calculadora para estimar o custo total com frete e impostos.",
  },
  {
    number: "03",
    title: "Faça o pagamento",
    description:
      "Pague via PIX de forma rápida e segura. Confirmamos em minutos.",
  },
  {
    number: "04",
    title: "Aguarde e rastreie",
    description:
      "Compramos, embalamos e enviamos. Acompanhe em tempo real pelo nosso sistema.",
  },
];

const categories = [
  { icon: Shirt, label: "Roupas" },
  { icon: Smartphone, label: "Eletrônicos" },
  { icon: Gem, label: "Acessórios" },
  { icon: Package, label: "Casa & Decoração" },
];

const testimonials = [
  {
    name: "Ana Lima",
    city: "São Paulo, SP",
    rating: 5,
    text: "Recebi meu pedido em 18 dias! Qualidade excelente e atendimento via WhatsApp muito rápido. Recomendo demais!",
    product: "Roupas e acessórios",
  },
  {
    name: "Carlos Souza",
    city: "Curitiba, PR",
    rating: 5,
    text: "Fiz 3 pedidos nos últimos 2 meses. Tudo chegou corretamente, embalado com cuidado. O cálculo de imposto foi muito transparente.",
    product: "Eletrônicos",
  },
  {
    name: "Maria Ferreira",
    city: "Salvador, BA",
    rating: 5,
    text: "Economizei quase 60% comparado aos preços brasileiros. A Weng Quan me ajudou a negociar direto com o fornecedor.",
    product: "Calçados",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-bg pt-16 pb-20 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gold-400 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-primary-400 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-10">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary-700 border border-gold-500 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gold-300 text-sm font-medium">
                  Enviando para todo o Brasil
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Fornecedor Chinês
                <br />
                <span className="text-gold-400">Direto para Você</span>
              </h1>

              <p className="mt-5 text-lg text-primary-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Compre qualquer produto da China com segurança. Frete
                internacional em 12-25 dias, rastreamento completo e cálculo de
                impostos transparente.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/calcular"
                  className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-base"
                >
                  <Calculator size={18} />
                  Calcular Frete Agora
                </Link>
                <Link
                  href="/rastreio"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-base"
                >
                  <Package size={18} />
                  Rastrear Pedido
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                {[
                  { icon: CheckCircle, text: "Pague via PIX" },
                  { icon: Shield, text: "Compra Garantida" },
                  { icon: Clock, text: "Suporte no WhatsApp" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 text-primary-200 text-sm"
                  >
                    <Icon size={14} className="text-gold-400" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo / Visual */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-gold-500/20 animate-pulse" />
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-gold-400 shadow-2xl">
                  <Image
                    src="/logo.jpg"
                    alt="Weng Quan"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gold-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-sm text-amber-100 mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Nossos Serviços</h2>
            <p className="section-subtitle">
              Tudo que você precisa para importar da China com tranquilidade
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="card hover:shadow-xl transition-shadow group cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color}`}
                >
                  <service.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-primary-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 bg-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-800">
              Importamos de Tudo
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="flex items-center gap-2.5 bg-white rounded-xl px-5 py-3 shadow-sm border border-cream-200 hover:border-gold-400 transition-colors cursor-default"
              >
                <cat.icon size={18} className="text-gold-500" />
                <span className="text-sm font-semibold text-primary-700">
                  {cat.label}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 bg-gold-500 rounded-xl px-5 py-3 shadow-sm">
              <span className="text-sm font-semibold text-white">
                E muito mais...
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Como Funciona</h2>
            <p className="section-subtitle">
              Simples e rápido — do pedido à entrega
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="card relative z-10">
                  <div className="text-5xl font-black text-gold-500/30 mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-base font-bold text-primary-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-primary-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-20 text-gold-400">
                    <ChevronRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400 rounded-full px-4 py-1 mb-5">
            <Calculator size={14} className="text-gold-400" />
            <span className="text-gold-300 text-sm">Calculadora de Frete</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Calcule o custo completo <br />
            <span className="text-gold-400">antes de comprar</span>
          </h2>
          <p className="text-primary-300 mb-8 max-w-xl mx-auto">
            Nossa calculadora inclui frete internacional + imposto de importação
            (quando aplicável). Sem surpresas na hora do desembaraço.
          </p>
          <Link
            href="/calcular"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-base"
          >
            <Calculator size={18} />
            Abrir Calculadora
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">O que nossos clientes dizem</h2>
            <p className="section-subtitle">
              Mais de 15.000 clientes satisfeitos no Brasil
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card">
                <div className="flex items-center gap-1 mb-3">
                  {Array(t.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-gold-400 text-gold-400"
                      />
                    ))}
                </div>
                <p className="text-sm text-primary-600 leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-sm font-bold text-primary-800">{t.name}</p>
                    <p className="text-xs text-primary-400">{t.city}</p>
                  </div>
                  <div className="text-xs text-gold-500 font-medium bg-cream-200 px-2 py-1 rounded-full">
                    {t.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Info Banner */}
      <section className="py-10 bg-cream-200 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <Truck size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-primary-800">Canal de Envio</p>
                <p className="text-xs text-primary-500">Correios China LE</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <Clock size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-primary-800">Prazo de Entrega</p>
                <p className="text-xs text-primary-500">12-25 dias úteis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-black">PIX</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-primary-800">Pagamento</p>
                <p className="text-xs text-primary-500">Via PIX instantâneo</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-primary-800">Importação Segura</p>
                <p className="text-xs text-primary-500">Cálculo de imposto incluso</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
