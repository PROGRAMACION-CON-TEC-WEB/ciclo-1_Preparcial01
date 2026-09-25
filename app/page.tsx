import ProductCatalog from "@/components/ProductCatalog";
import Pagination from "@/components/Pagination";
import type { Product } from "@/types/product";

const PAGE_SIZE = 20;

async function getProducts(page: number): Promise<{ products: Product[]; total: number }> {
  const skip = (page - 1) * PAGE_SIZE;
  const url = `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}&select=id,title,price,category,thumbnail,stock`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  const data: { products: Product[]; total: number } = await res.json();
  return { products: data.products, total: data.total };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const { products, total } = await getProducts(currentPage);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Catálogo de productos</h1>

      <ProductCatalog products={products} />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
