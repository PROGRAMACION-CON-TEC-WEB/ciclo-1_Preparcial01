import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/types/product";

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Volver al catálogo
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg bg-gray-50 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-80 w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase text-blue-600">
            {product.brand ?? product.category}
          </span>

          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-3xl font-bold text-gray-900">${product.price}</p>

          <p className="text-gray-500">Stock disponible: {product.stock}</p>

          <p className="leading-relaxed text-gray-700">{product.description}</p>

          <div className="mt-4 max-w-xs">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
