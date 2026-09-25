"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function ProductCatalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function clearFilters() {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesMinPrice = minPrice === "" || product.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" || product.price <= Number(maxPrice);

    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700">
            Buscar por nombre
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ej. Mascara, Lipstick..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-32">
          <label htmlFor="minPrice" className="mb-1 block text-sm font-medium text-gray-700">
            Precio mínimo
          </label>
          <input
            id="minPrice"
            type="number"
            min={0}
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="$0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-32">
          <label htmlFor="maxPrice" className="mb-1 block text-sm font-medium text-gray-700">
            Precio máximo
          </label>
          <input
            id="maxPrice"
            type="number"
            min={0}
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="$999"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Limpiar filtros
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="text-5xl">🔍</span>
          <h2 className="text-xl font-semibold text-gray-900">No se encontraron productos</h2>
          <p className="text-gray-500">Prueba con otros criterios de búsqueda.</p>
          <button
            type="button"
            onClick={clearFilters}
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
