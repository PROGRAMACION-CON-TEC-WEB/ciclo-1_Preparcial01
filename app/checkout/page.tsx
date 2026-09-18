"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface FormValues {
  fullName: string;
  email: string;
  paymentMethod: string;
  acceptedTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
}

interface Touched {
  fullName: boolean;
  email: boolean;
}

const initialFormValues: FormValues = {
  fullName: "",
  email: "",
  paymentMethod: "tarjeta",
  acceptedTerms: false,
};

const initialTouched: Touched = {
  fullName: false,
  email: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Se recalculan en cada render a partir de formValues ttipo caso donde no hay un estado aparte para los errores, así nunca quedan desactualizados.
function getErrors(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 5) {
    errors.fullName = "El nombre debe tener al menos 5 caracteres";
  }

  if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Ingresa un correo electrónico válido";
  }

  return errors;
}

export default function CheckoutPage() {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  // Un solo objeto de estado gobierna todos los campos del formulario.
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  // Qué campos ya perdieron el foco alguna vez (para no mostrar errores agresivamente mientras el usuario escribe por primera vez).
  const [touched, setTouched] = useState<Touched>(initialTouched);

  const errors = getErrors(formValues);
  const isFormValid = Object.keys(errors).length === 0 && formValues.acceptedTerms;


  // Estado de carga mientras por decirlo asi se procesa el pedido, y bandera de éxito para mostrar la confirmaci aonnl terminar.
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Un unico manejador sirve para cualquier input: lee name y value del evento y actualiza esa sola llave del objeto de estado (o `checked` si es un checkbox).
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Marca el campo como "tocado" cuando el usuario le quita el foco, que es el único momento en el que se muestran sus mensajes de error.
  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { name } = event.target;

    if (name === "fullName" || name === "email") {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Evita la recarga nativa del navegador al enviar el formulario.
    event.preventDefault();

    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Simula la llamada asíncrona a un servicio de pagos/órdenes.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clearCart();
    setFormValues(initialFormValues);
    setTouched(initialTouched);
    setIsSubmitting(false);
    setOrderCompleted(true);
  }

  if (orderCompleted) {
    return (
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-green-600">
          ¡Pedido confirmado, Thanks =)!
        </h1>
        <p className="text-gray-600">
          Gracias por tu compra. Te enviamos la confirmación a tu correo.
        </p>
        <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

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
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                  className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
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

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold">Datos de pago</h2>

        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formValues.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {touched.fullName && errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Correo de facturación
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="paymentMethod" className="mb-1 block text-sm font-medium text-gray-700">
            Método de pago
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formValues.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="tarjeta">Tarjeta de crédito/débito</option>
            <option value="pse">PSE</option>
            <option value="contraentrega">Pago contraentrega</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            name="acceptedTerms"
            type="checkbox"
            checked={formValues.acceptedTerms}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Acepto los términos y condiciones
        </label>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="mt-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isSubmitting ? "Procesando pedido..." : "Confirmar pedido"}
        </button>
      </form>
    </div>
  );
}