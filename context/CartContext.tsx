"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product, CartItem } from "@/types/product";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setItems((prevItems) => {
      const alreadyInCart = prevItems.find((item) => item.product.id === product.id);

      // Si ya está en el carrito, solo sube la cantidad en 1 (sin mutar el arreglo).
      if (alreadyInCart) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Si es nuevo, se agrega al final como un ítem con cantidad 1.
      return [...prevItems, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: number) {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Aqui tenemos el hook para consumir el carrito desde cualquier componente cliente.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>");
  }

  return context;
}
