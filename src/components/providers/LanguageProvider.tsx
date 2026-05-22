"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type LanguageCode = "PT" | "EN" | "ES" | "ZH";

export const languages = [
  { code: "PT" as const, region: "BR", label: "Português" },
  { code: "EN" as const, region: "US", label: "English" },
  { code: "ES" as const, region: "ES", label: "Español" },
  { code: "ZH" as const, region: "CN", label: "中文" },
];

const dictionaries = {
  PT: {
    brandTagline: "Fornecedor Chinês",
    nav: {
      home: "Início",
      calculate: "Calcular Frete",
      track: "Rastrear Pedido",
      services: "Serviços",
      about: "Sobre Nós",
      help: "Ajuda",
      admin: "Área Admin",
      language: "Idioma",
    },
    home: {
      badge: "Enviamos para todo o Brasil",
      heroTitle1: "Fornecedor Chinês",
      heroTitle2: "Direto para Você",
      heroDescription: "Compre qualquer produto da China com segurança. Frete internacional em 12-25 dias, rastreamento completo e cálculo de impostos transparente.",
      calculateNow: "Calcular Frete Agora",
      trackOrder: "Rastrear Pedido",
      trustBadges: [
        { title: "Compra Segura", desc: "Proteção do início ao fim" },
        { title: "Frete Internacional", desc: "Melhores preços do mercado" },
        { title: "Entrega Rápida", desc: "Prazo médio de 12 a 25 dias" },
        { title: "Suporte Dedicado", desc: "Atendimento via WhatsApp" },
      ],
      stats: [
        { value: "+28.500", label: "Envios realizados" },
        { value: "98.7%", label: "Entregas no prazo" },
        { value: "12-25 dias", label: "Prazo médio de entrega" },
        { value: "+8 anos", label: "De experiência" },
      ],
      trackingCardTitle: "Rastreie seu pedido",
      trackingCardDesc: "Digite seu código de rastreamento para acompanhar seu pedido",
      trackingCardButton: "Rastrear Agora",
      trackingCardHelp: "Não tem um código? Saiba como funciona →",
      calculatorCardTitle: "Calculadora de frete",
      calculatorCardDesc: "Calcule o valor do frete e prazo de entrega",
      weight: "Peso (kg)",
      originCountry: "País de origem",
      destinationCountry: "País de destino",
      calculateShipping: "Calcular Frete",
      moreOptions: "Mais opções de cálculo →",
      whyTitle: "Por que escolher a",
      whySubtitle: "Vantagens exclusivas para sua experiência de compra",
      features: [
        { title: "100% Seguro", desc: "Seus produtos protegidos do início ao fim" },
        { title: "Impostos Transparentes", desc: "Sem taxas ocultas, você sabe exatamente o que paga" },
        { title: "Rastreamento Completo", desc: "Acompanhe seu pedido em tempo real" },
        { title: "Pagamento Seguro", desc: "Pague via PIX com total segurança" },
        { title: "Suporte Especializado", desc: "Atendimento rápido e humanizado via WhatsApp" },
      ],
      ctaTitle: "Pronto para começar a importar?",
      ctaDesc: "Calcule seu frete agora e descubra o quanto você pode economizar comprando direto da China.",
      whatsapp: "💬 Falar no WhatsApp",
    },
    footer: {
      description: "Conectando o Brasil à China com segurança, transparência e os melhores preços do mercado.",
      safePurchase: "Compra 100% segura",
      navigation: "Navegação",
      services: "Serviços",
      servicesList: ["Frete Internacional", "Compras na China", "Desembaraço Aduaneiro", "Armazenagem", "Cálculo de Impostos", "Embalagem Segura"],
      contact: "Contato",
      hours: "Seg–Sex: 9h–18h",
      saturday: "Sáb: 9h–13h",
      paymentAccepted: "Pagamento aceito",
      rights: "© 2024 Weng Quan. Todos os direitos reservados.",
      privacy: "Política de Privacidade",
      terms: "Termos de Uso",
    },
  },
  EN: {
    brandTagline: "Chinese Supplier",
    nav: {
      home: "Home",
      calculate: "Calculate Shipping",
      track: "Track Order",
      services: "Services",
      about: "About Us",
      help: "Help",
      admin: "Admin Area",
      language: "Language",
    },
    home: {
      badge: "We ship throughout Brazil",
      heroTitle1: "Chinese Supplier",
      heroTitle2: "Direct to You",
      heroDescription: "Buy any product from China safely. International shipping in 12-25 days, full tracking, and transparent tax calculation.",
      calculateNow: "Calculate Shipping Now",
      trackOrder: "Track Order",
      trustBadges: [
        { title: "Secure Purchase", desc: "Protection from start to finish" },
        { title: "International Shipping", desc: "Best market prices" },
        { title: "Fast Delivery", desc: "Average delivery time of 12 to 25 days" },
        { title: "Dedicated Support", desc: "Support via WhatsApp" },
      ],
      stats: [
        { value: "+28,500", label: "Shipments completed" },
        { value: "98.7%", label: "On-time deliveries" },
        { value: "12-25 days", label: "Average delivery time" },
        { value: "+8 years", label: "Of experience" },
      ],
      trackingCardTitle: "Track your order",
      trackingCardDesc: "Enter your tracking code to follow your order",
      trackingCardButton: "Track Now",
      trackingCardHelp: "No code yet? See how it works →",
      calculatorCardTitle: "Shipping calculator",
      calculatorCardDesc: "Calculate shipping cost and delivery time",
      weight: "Weight (kg)",
      originCountry: "Origin country",
      destinationCountry: "Destination country",
      calculateShipping: "Calculate Shipping",
      moreOptions: "More calculation options →",
      whyTitle: "Why choose",
      whySubtitle: "Exclusive advantages for your shopping experience",
      features: [
        { title: "100% Secure", desc: "Your products protected from start to finish" },
        { title: "Transparent Taxes", desc: "No hidden fees, you know exactly what you pay" },
        { title: "Full Tracking", desc: "Track your order in real time" },
        { title: "Secure Payment", desc: "Pay via PIX with total security" },
        { title: "Specialized Support", desc: "Fast, human support via WhatsApp" },
      ],
      ctaTitle: "Ready to start importing?",
      ctaDesc: "Calculate your shipping now and find out how much you can save by buying directly from China.",
      whatsapp: "💬 Chat on WhatsApp",
    },
    footer: {
      description: "Connecting Brazil to China with safety, transparency, and the best market prices.",
      safePurchase: "100% secure purchase",
      navigation: "Navigation",
      services: "Services",
      servicesList: ["International Shipping", "Shopping in China", "Customs Clearance", "Storage", "Tax Calculation", "Secure Packaging"],
      contact: "Contact",
      hours: "Mon–Fri: 9am–6pm",
      saturday: "Sat: 9am–1pm",
      paymentAccepted: "Payment accepted",
      rights: "© 2024 Weng Quan. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
    },
  },
  ES: {
    brandTagline: "Proveedor Chino",
    nav: {
      home: "Inicio",
      calculate: "Calcular Envío",
      track: "Rastrear Pedido",
      services: "Servicios",
      about: "Sobre Nosotros",
      help: "Ayuda",
      admin: "Área Admin",
      language: "Idioma",
    },
    home: {
      badge: "Enviamos a todo Brasil",
      heroTitle1: "Proveedor Chino",
      heroTitle2: "Directo para Ti",
      heroDescription: "Compra cualquier producto de China con seguridad. Envío internacional en 12-25 días, rastreo completo y cálculo transparente de impuestos.",
      calculateNow: "Calcular Envío Ahora",
      trackOrder: "Rastrear Pedido",
      trustBadges: [
        { title: "Compra Segura", desc: "Protección de principio a fin" },
        { title: "Envío Internacional", desc: "Mejores precios del mercado" },
        { title: "Entrega Rápida", desc: "Plazo promedio de 12 a 25 días" },
        { title: "Soporte Dedicado", desc: "Atención por WhatsApp" },
      ],
      stats: [
        { value: "+28.500", label: "Envíos realizados" },
        { value: "98.7%", label: "Entregas a tiempo" },
        { value: "12-25 días", label: "Plazo promedio de entrega" },
        { value: "+8 años", label: "De experiencia" },
      ],
      trackingCardTitle: "Rastrea tu pedido",
      trackingCardDesc: "Ingresa tu código de rastreo para acompañar tu pedido",
      trackingCardButton: "Rastrear Ahora",
      trackingCardHelp: "¿No tienes código? Mira cómo funciona →",
      calculatorCardTitle: "Calculadora de envío",
      calculatorCardDesc: "Calcula el valor del envío y plazo de entrega",
      weight: "Peso (kg)",
      originCountry: "País de origen",
      destinationCountry: "País de destino",
      calculateShipping: "Calcular Envío",
      moreOptions: "Más opciones de cálculo →",
      whyTitle: "Por qué elegir",
      whySubtitle: "Ventajas exclusivas para tu experiencia de compra",
      features: [
        { title: "100% Seguro", desc: "Tus productos protegidos de principio a fin" },
        { title: "Impuestos Transparentes", desc: "Sin tasas ocultas, sabes exactamente lo que pagas" },
        { title: "Rastreo Completo", desc: "Acompaña tu pedido en tiempo real" },
        { title: "Pago Seguro", desc: "Paga vía PIX con total seguridad" },
        { title: "Soporte Especializado", desc: "Atención rápida y humana por WhatsApp" },
      ],
      ctaTitle: "¿Listo para empezar a importar?",
      ctaDesc: "Calcula tu envío ahora y descubre cuánto puedes ahorrar comprando directamente de China.",
      whatsapp: "💬 Hablar por WhatsApp",
    },
    footer: {
      description: "Conectando Brasil con China con seguridad, transparencia y los mejores precios del mercado.",
      safePurchase: "Compra 100% segura",
      navigation: "Navegación",
      services: "Servicios",
      servicesList: ["Envío Internacional", "Compras en China", "Despacho Aduanero", "Almacenamiento", "Cálculo de Impuestos", "Embalaje Seguro"],
      contact: "Contacto",
      hours: "Lun–Vie: 9h–18h",
      saturday: "Sáb: 9h–13h",
      paymentAccepted: "Pago aceptado",
      rights: "© 2024 Weng Quan. Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
    },
  },
  ZH: {
    brandTagline: "中国供应商",
    nav: {
      home: "首页",
      calculate: "运费计算",
      track: "订单追踪",
      services: "服务",
      about: "关于我们",
      help: "帮助",
      admin: "管理后台",
      language: "语言",
    },
    home: {
      badge: "我们配送至巴西全境",
      heroTitle1: "中国供应商",
      heroTitle2: "直达您手中",
      heroDescription: "安全购买来自中国的任何商品。国际运输 12-25 天，全程追踪，税费计算透明。",
      calculateNow: "立即计算运费",
      trackOrder: "追踪订单",
      trustBadges: [
        { title: "安全购买", desc: "从开始到结束全程保障" },
        { title: "国际运输", desc: "市场优质价格" },
        { title: "快速配送", desc: "平均 12 到 25 天送达" },
        { title: "专属支持", desc: "通过 WhatsApp 提供服务" },
      ],
      stats: [
        { value: "+28,500", label: "已完成运输" },
        { value: "98.7%", label: "准时送达" },
        { value: "12-25 天", label: "平均配送时间" },
        { value: "+8 年", label: "行业经验" },
      ],
      trackingCardTitle: "追踪您的订单",
      trackingCardDesc: "输入追踪码以查看订单状态",
      trackingCardButton: "立即追踪",
      trackingCardHelp: "还没有追踪码？了解流程 →",
      calculatorCardTitle: "运费计算器",
      calculatorCardDesc: "计算运费和预计送达时间",
      weight: "重量 (kg)",
      originCountry: "发货国家",
      destinationCountry: "目的国家",
      calculateShipping: "计算运费",
      moreOptions: "更多计算选项 →",
      whyTitle: "为什么选择",
      whySubtitle: "为您的采购体验提供专属优势",
      features: [
        { title: "100% 安全", desc: "您的商品从始至终受到保护" },
        { title: "税费透明", desc: "无隐藏费用，清楚了解每一笔付款" },
        { title: "全程追踪", desc: "实时跟踪您的订单" },
        { title: "安全支付", desc: "通过 PIX 安全付款" },
        { title: "专业支持", desc: "通过 WhatsApp 提供快速人工服务" },
      ],
      ctaTitle: "准备开始进口了吗？",
      ctaDesc: "立即计算运费，了解直接从中国购买可以节省多少成本。",
      whatsapp: "💬 WhatsApp 咨询",
    },
    footer: {
      description: "以安全、透明和优惠价格连接巴西与中国。",
      safePurchase: "100% 安全购买",
      navigation: "导航",
      services: "服务",
      servicesList: ["国际运输", "中国采购", "清关服务", "仓储", "税费计算", "安全包装"],
      contact: "联系方式",
      hours: "周一至周五：9:00–18:00",
      saturday: "周六：9:00–13:00",
      paymentAccepted: "接受付款",
      rights: "© 2024 Weng Quan. 保留所有权利。",
      privacy: "隐私政策",
      terms: "使用条款",
    },
  },
} as const;

type Dictionary = (typeof dictionaries)[LanguageCode];

interface LanguageContextValue {
  language: LanguageCode;
  selectedLanguage: (typeof languages)[number];
  setLanguage: (language: LanguageCode) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("PT");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("wengquan-language");
    if (storedLanguage && languages.some((item) => item.code === storedLanguage)) {
      setLanguageState(storedLanguage as LanguageCode);
    }
  }, []);

  const setLanguage = (newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
    window.localStorage.setItem("wengquan-language", newLanguage);
    document.documentElement.lang = newLanguage === "PT" ? "pt-BR" : newLanguage.toLowerCase();
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      selectedLanguage: languages.find((item) => item.code === language) ?? languages[0],
      setLanguage,
      t: dictionaries[language as keyof typeof dictionaries],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
