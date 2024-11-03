import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sujeito pizza - A melhor pizzaria",
  description: "Sistema de pizzaria para a empresa sujeito programador.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body >
        <Toaster richColors/>
        {children}
      </body>
    </html>
  );
}
