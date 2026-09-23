import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const socialImage = host ? `${protocol}://${host}/og.png` : undefined;

  return {
    title: "Conteii | Auditoria e Recuperação de Recebíveis",
    description:
      "Auditoria de operações com adquirentes para identificar, demonstrar e buscar recuperar divergências confirmadas em recebíveis.",
    icons: {
      icon: "/symbol-conteii-orange.png",
      shortcut: "/symbol-conteii-orange.png",
      apple: "/symbol-conteii-orange.png",
    },
    openGraph: {
      title: "Conteii | Auditoria e Recuperação de Recebíveis",
      description:
        "Até cinco anos da operação com adquirentes auditados para entender o que aconteceu com os recebíveis da sua empresa.",
      images: socialImage ? [{ url: socialImage, width: 1536, height: 1024, alt: "Conteii — Auditoria e Recuperação de Recebíveis" }] : undefined,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Conteii | Auditoria e Recuperação de Recebíveis",
      description:
        "Auditoria, comprovação e recuperação de divergências confirmadas em recebíveis.",
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script src="/site-config.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
