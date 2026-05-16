import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weng Quan | Fornecedor Chinês & Frete Internacional",
  description:
    "Compre produtos da China com segurança. Frete internacional, rastreamento em tempo real e cálculo de impostos. Entrega para todo o Brasil em 12-25 dias.",
  keywords: "fornecedor chinês, frete internacional, importação china brasil, weng quan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
