# ShopHub - Preparcial (20%)
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

## 🏗️ Requisitos de Arquitectura y Buenas Prácticas

*   **Estado Global Compartido:** Implementar un `React Context` que centralice la información del carrito y exponga métodos para agregar ítems desde cualquier nivel de la aplicación.
*   **Persistencia de Navegación:** El estado global no debe reiniciarse ni borrarse al cambiar entre rutas.
*   **Inmutabilidad:** Garantizar la actualización adecuada de arreglos y objetos en memoria, asegurando que React detecte los cambios de estado.
*   **Modelado y Tipado:** Definir interfaces/tipos en TypeScript para los modelos de datos y props de componentes.
*   **Fronteras Cliente/Servidor (`"use client"`):** Identificar y marcar como componentes de cliente únicamente aquellos que requieran interactividad o hooks (`useState`, `useEffect`, `useContext`).
*   **Diseño de Interfaz:** Aplicar un diseño visual ordenado, limpio y funcional (UI/UX) utilizando Tailwind CSS o CSS Modules.

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
