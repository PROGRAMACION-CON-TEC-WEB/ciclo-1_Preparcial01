import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

const PRODUCTS_URL =
  "https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(PRODUCTS_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  const data: { products: Product[] } = await res.json();
  return data.products;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Catálogo de productos</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
