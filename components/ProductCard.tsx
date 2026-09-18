import Link from "next/link";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <Link href={`/productos/${product.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase text-blue-600">
          {product.category}
        </span>

        <Link
          href={`/productos/${product.id}`}
          className="font-semibold text-gray-900 hover:text-blue-600"
        >
          {product.title}
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>

        <div className="mt-auto pt-2">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
