# ShopHub - Parcial (20%)
**Plataforma E-Commerce con Next.js y React Context**


---

## Objetivo General

Integrar conceptos fundamentales y de arquitectura en **React** y **Next.js (App Router)** para diseñar una aplicación web modular que gestione un catálogo de productos, permita la navegación fluida entre vistas estáticas y dinámicas, y mantenga un estado global compartido y persistente a lo largo de toda la experiencia de usuario, haciendo uso de:

*   **App Router:** Enrutamiento de vistas y layouts persistentes.
*   **Componentes de Cliente:** Manejo de estado local, efectos e interactividad.
*   **Props & Callbacks:** Comunicación entre componentes y flujo unidireccional de datos.
*   **React Context API:** Gestión y consumo de estado global compartido.
*   **HTTP & Fetch API:** Consulta asíncrona a servicios web externos.
*   **TypeScript:** Tipado estricto de modelos, APIs y componentes.

---

##  Preparación del Entorno

La aplicación consume directamente la API pública de **DummyJSON**, por lo que no requiere desplegar servicios de backend adicionales.

### Puntos de Entrada (API Endpoints):
*   **Listado del Catálogo:**  
    `GET https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock`
*   **Detalle de Producto:**  
    `GET https://dummyjson.com/products/{id}`

---

## Enunciado del Reto

Desarrollar **"ShopHub"**, una plataforma de comercio electrónico construida sobre la arquitectura **App Router** de Next.js.

La aplicación debe permitir:
1. Consultar un catálogo de artículos obtenidos de forma asíncrona.
2. Explorar la información detallada de cualquier producto mediante navegación dinámica.
3. Administrar un carrito de compras global con datos sincronizados y persistentes a lo largo de todas las vistas sin recargas de página (SPA).

---

## Especificación de Pantallas y Funcionalidades

### 1. Barra Superior Persistente (`Header`)
Componente visible en todas las rutas de la aplicación:
*   **Identidad de la tienda:** Título o marca con enlace de retorno hacia la vista principal (`/`).
*   **Indicador del Carrito:** Contador dinámico que muestra en todo momento la cantidad acumulada de productos seleccionados, reflejando de inmediato cualquier modificación.

### 2. Vista del Catálogo Principal (`/`)
Página de inicio encargada de presentar los artículos disponibles:
*   **Carga y despliegue:** Petición asíncrona al servicio externo y presentación en tarjetas modulares.
*   **Contenido por artículo:**
    *   Miniatura del producto, nombre, categoría, precio y stock disponible.
    *   Enlace interactivo a la ficha de detalle.
    *   Botón de acción rápida para añadir al carrito global.

### 3. Vista de Detalle de Producto (`/productos/[id]`)
Ruta dinámica parametrizada para consultar la información completa de un producto:
*   **Carga de datos:** Petición asíncrona mediante el identificador del producto (`id`).
*   **Panel de detalle:**
    *   Fotografía principal, nombre, categoría/marca, precio y stock disponible.
    *   Descripción detallada.
    *   Botón de acción para añadir al carrito desde esta vista.
    *   Enlace o botón de retorno hacia el catálogo principal.

---

## Req. de Arquitectura y Buenas Prác

-   Estado Global Compartido: Implementar un React Context que centralice la información del carrito y exponga métodos para agregar ítems desde cualquier nivel de la aplicación.
-   Persistencia de Navegación: El estado global no debe reiniciarse ni borrarse al cambiar entre rutas.
-   Inmutabilidad: Garantizar la actualización adecuada de arreglos y objetos en memoria, asegurando que React detecte los cambios de estado.
-   Modelado y Tipado: Definir interfaces/tipos en TypeScript para los modelos de datos y props de componentes.
-   Fronteras Cliente/Servidor (use client): Identificar y marcar como componentes de cliente únicamente aquellos que requieran interactividad o hooks (useState, useEffect, useContext).
-   Diseño de Interfaz: Aplicar un diseño visual ordenado, limpio y funcional tipo UI/UX CSS Modules.


---

**Decisiones de Arquitectura y Cambios**

**Punto 1 CartContext**
En el preparcial solo teníamos addToCart y no se podía restar o borrar nada. El tipo CartItem ya guardaba el product y la quantity, así que no cambié esa estructura, solo agregué las funciones que faltaban: removeFromCart para borrar un producto por id, updateQuantity para subir/bajar cantidades (si la cantidad baja de 1 se llama a removeFromCart para no dejar ítems en 0), y clearCart para vaciar todo dejando el array en `[]`.

Para la inmutabilidad no usé push ni splice. En addToCart y updateQuantity usé .map() devolviendo copia del ítem actualizado ({ ...item, quantity }), en removeFromCart usé .filter() y en clearCart pasé el array nuevo vacío []. Todo se maneja con la forma funcional de setItems(prev => ...) para que React detecte bien los cambios por referencia y no rompa la reactividad.

**Punto 2] Totales**
totalItems y totalPrice no son estados en este caso (useState), se calculan directo en el render recorriendo items con .reduce()

Decidí hacerlo así porque items es la única fuente de verdad. Si los totales tuvieran su propio  useState, habría que acordarse de actualizarlos manualmente en cada función (add, update, remove, clear) y es muy fácil que queden desincronizados. Al calcularlos al vuelo con .reduce() siempre coinciden con lo que hay en el carrito. Como el array del carrito es pequeño, no afectaba el rendimiento y no hizo falta meterle useMemo.

**Punto 3 Formulario de Checkout**
Hice el formulario en app/checkout/page.tsx usando puro React sin librerías como react-hook-form o sino estoy mal zod.

- Usé un solo objeto de estado formValues para todos los campos (fullName, mail, paymentMethod, acceptedTerms).
- Hice un handleChange genérico que lee e.target.name, value y checked para actualizar la clave correspondiente del estado sin repetir código.
- Los errores no se guardan en un estado, se calculan en cada render pasando formValues por una función de validación (usé un regex sencillo para el email).
- Para que las validaciones no molesten al escribir por primera vez, usé un estado touched que se activa en el onBlur. Los mensajes solo salen si el campo fue tocado y tiene error.
- El botón de enviar se deshabilita si la función de errores devuelve algo o si el checkbox de términos está en fals.
- En el handleSubmit puse preventDefault() para evitar recargas. Manejo un estado isSubmitting para simular la petición de 1.5s con un setTimeout y evitar doble clic. Al terminar, llamo a clearCart() (que de una actualiza el badge del Header porque consumen el mismo contexto), reseteo los inputs y muestro la pantalla de confirmación. Todo estilizado con Tailwind y tipado con TypeScript.

---

## Entrega y Evaluación

### 1. Enlace al Release de GitHub
*   El proyecto debe alojarse en un repositorio público.
*   Generar un **GitHub Release** (etiqueta sugerida: `v1.0.0` o `preparcial-v1.0`) que congelará el código previo a la fecha límite.
*   Enviar el enlace al Release en Bloque Neón.

### 2. Video Demostrativo (4 - 7 minutos)
Adjuntar en la entrega un enlace público (YouTube, Loom, Google Drive) con los siguientes puntos:
1.  **Evidencia del Release:** Mostrar en la pestaña de GitHub la sección *Releases*, la versión creada (`v1.0.0`) y el *commit hash*.
2.  **Evidencia Local:** Mostrar en terminal `git status` y `git log -1` con el servidor corriendo (`npm run dev`) en el mismo commit y sin cambios pendientes (`working tree clean`).
3.  **Navegación SPA:** Transición entre el catálogo (`/`) y el detalle (`/productos/[id]`) de al menos 2 productos sin recargas del navegador.
4.  **Sincronización de Estado Global:** Adición de productos desde el catálogo y desde el detalle.
5.  **Actualización del Header:** Demostrar la actualización reactiva en tiempo real del contador del carrito.
6.  **Calidad:** Consola del navegador limpia de errores o advertencias críticas.

---

> **Nota para el Examen Parcial:** El código congelado en este Release será la base de trabajo individual obligatoria sobre la cual se trabajará en tiempo real durante el Examen Parcial.
