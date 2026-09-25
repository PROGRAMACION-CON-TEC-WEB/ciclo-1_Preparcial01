import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Paginación">
      {currentPage > 1 ? (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-300">
          ← Anterior
        </span>
      )}

      <div className="flex flex-wrap items-center gap-1">
        {pages.map((page) => (
          <Link
            key={page}
            href={`/?page=${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Siguiente →
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-300">
          Siguiente →
        </span>
      )}
    </nav>
  );
}
