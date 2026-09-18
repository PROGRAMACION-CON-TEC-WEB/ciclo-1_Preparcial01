import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "ShopHub - plataforma de comercio electrónico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
