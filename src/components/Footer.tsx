import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, MessageCircle, Clock, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-cream-200 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400">
                <Image src="/logo.jpg" alt="Weng Quan" fill className="object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight">WENG QUAN</p>
                <p className="text-gold-400 text-xs">Fornecedor Chinês</p>
              </div>
            </div>
            <p className="text-sm text-primary-300 leading-relaxed">
              Conectando o Brasil à China com segurança, transparência e os melhores preços do mercado.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Shield size={14} className="text-gold-400" />
              <span className="text-xs text-primary-300">Compra 100% segura</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navegação</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Início", href: "/" },
                { label: "Calcular Frete", href: "/calcular" },
                { label: "Rastrear Pedido", href: "/rastreio" },
                { label: "Como Funciona", href: "/#como-funciona" },
                { label: "Nossos Serviços", href: "/#servicos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-300 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Serviços</h3>
            <ul className="space-y-2.5">
              {[
                "Frete Internacional",
                "Compras na China",
                "Desembaraço Aduaneiro",
                "Armazenagem",
                "Cálculo de Impostos",
                "Embalagem Segura",
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-primary-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <MessageCircle size={15} className="text-gold-400 flex-shrink-0" />
                <span className="text-sm text-primary-300">WhatsApp: (11) 99999-0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram size={15} className="text-gold-400 flex-shrink-0" />
                <span className="text-sm text-primary-300">@wengquan.brasil</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-gold-400 flex-shrink-0" />
                <span className="text-sm text-primary-300">contato@wengquan.com.br</span>
              </li>
              <li className="flex items-start gap-2.5 mt-2">
                <Clock size={15} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-300">
                  Seg–Sex: 9h–18h<br />
                  Sáb: 9h–13h
                </span>
              </li>
            </ul>

            {/* PIX badge */}
            <div className="mt-4 inline-flex items-center gap-2 bg-primary-800 border border-primary-700 rounded-lg px-3 py-1.5">
              <span className="text-xs font-bold text-green-400">PIX</span>
              <span className="text-xs text-primary-300">Pagamento aceito</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-400">
            © 2024 Weng Quan. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-primary-400 hover:text-gold-400 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-xs text-primary-400 hover:text-gold-400 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
