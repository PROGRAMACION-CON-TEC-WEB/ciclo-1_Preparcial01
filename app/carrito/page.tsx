"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CarritoPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="text-5xl">🛒</span>
        <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="text-gray-500">Agrega productos desde el catálogo para verlos aquí.</p>
        <Link
          href="/"
          className="mt-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Tu carrito ({totalItems})</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.product.thumbnail}
              alt={item.product.title}
              className="h-20 w-20 rounded-lg object-cover"
            />

            <div className="flex flex-1 flex-col gap-1">
              <Link
                href={`/productos/${item.product.id}`}
                className="font-semibold text-gray-900 hover:text-blue-600"
              >
                {item.product.title}
              </Link>
              <span className="text-sm text-gray-500">${item.product.price} c/u</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
                className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>

            <span className="w-20 text-right font-semibold text-gray-900">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>

            <button
              type="button"
              onClick={() => removeFromCart(item.product.id)}
              className="text-gray-400 hover:text-red-600"
              aria-label={`Quitar ${item.product.title} del carrito`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-end gap-3 border-t border-gray-200 pt-6">
        <div className="text-xl font-bold">
          Total: <span className="text-blue-700">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={clearCart}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            Vaciar carrito
          </button>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
