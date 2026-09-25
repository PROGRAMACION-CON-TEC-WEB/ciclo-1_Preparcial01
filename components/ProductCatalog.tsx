"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function ProductCatalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700">
          Buscar por nombre
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Ej. Mascara, Lipstick..."
          className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="text-5xl">🔍</span>
          <h2 className="text-xl font-semibold text-gray-900">No se encontraron productos</h2>
          <p className="text-gray-500">Prueba con otro término de búsqueda.</p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
