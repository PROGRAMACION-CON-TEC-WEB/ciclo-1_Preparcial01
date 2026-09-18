// Forma de un producto tal como lo devuelve la API de DummyJSON.
// description y brand pues solo vienen en el detalle (no en el listado),
// por eso son opcionales.
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
  description?: string;
  brand?: string;
}

// Un producto dentro del carrito, junto con la cantidad seleccionada.
export interface CartItem {
  product: Product;
  quantity: number;
}