"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ShopHub
        </Link>

        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
          <span className="text-xl">🛒</span>
          <span className="font-semibold text-blue-700">{totalItems}</span>
        </div>
      </div>
    </header>
  );
}
