"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Checkout</h1>
        <p className="text-gray-600">Tu carrito está vacío.</p>
        <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Resumen de tu compra</h2>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-red-600 hover:underline"
          >
            Vaciar carrito
          </button>
        </div>

        <ul className="mt-4 flex flex-col divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.product.id} className="flex items-center gap-4 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.product.title}</p>
                <p className="text-sm text-gray-500">${item.product.price} c/u</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.product.id)}
                  className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => increaseQuantity(item.product.id)}
                  className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <p className="w-20 text-right font-semibold text-gray-900">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
                className="text-sm text-gray-400 hover:text-red-600"
                aria-label={`Quitar ${item.product.title}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
