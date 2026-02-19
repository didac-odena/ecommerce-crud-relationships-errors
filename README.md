# LAB | E-commerce API REST (Express + Mongoose)

## Introducción

Este repo es un ejercicio guiado para practicar una API REST de e-commerce con relaciones en MongoDB usando Mongoose.

Está pensado para un nivel bootcamp/junior:
- código directo y legible
- estructura simple
- manejo de errores consistente
- sin autenticación/autorización

---

## Stack obligatorio

- Node.js + Express 5
- MongoDB + Mongoose
- `http-errors`
- `morgan`

---

## Estructura del proyecto (raíz)

```txt
app.js
server.js
config/
  db.config.js
  routes.config.js
controllers/
  category.controller.js
  product.controller.js
  customer.controller.js
  order.controller.js
middlewares/
  error-handler.middleware.js
  validate-object-id.middleware.js
models/
  category.model.js
  product.model.js
  customer.model.js
  order.model.js
  order-item.model.js
data/
  seed.js
  postman_collection.json
```

---

## Configuración inicial

1. Instala dependencias:

```bash
npm install
```

2. Crea variables de entorno:

```bash
copy .env.example .env
```

3. Arranca el servidor:

```bash
npm run dev
```

4. URL base:

```txt
http://localhost:3000/api
```

---

## Seed y Postman

Seed mínimo:

```bash
npm run seed
```

Colección Postman:
- `data/postman_collection.json`

---

## Iteraciones (10 exactas)

### Iteración 1 - Bootstrap del proyecto
**Objetivo:** levantar base Express + Mongo + middlewares globales.

Incluye:
- conexión DB (`config/db.config.js`)
- rutas centralizadas (`config/routes.config.js`)
- `express.json()`
- `morgan("dev")`
- 404 con `createError(404, "Route not found")`
- middleware global de errores en JSON

<details>
<summary>Solución (Iteración 1)</summary>

- Crear `app.js` con: `express.json()`, `morgan("dev")`, `routesConfig(app)`, 404 y `errorHandlerMiddleware`.
- Crear `server.js` con: `connectToDatabase()` y `app.listen(PORT)`.
- Crear `config/db.config.js` para conectar con `mongoose.connect(process.env.MONGODB_URI)`.
- Crear `config/routes.config.js` con `app.use("/api", router)` y endpoint `/health`.
- Crear `middlewares/error-handler.middleware.js` devolviendo `{ statusCode, message, errors }`.

</details>

---

### Iteración 2 - Category CRUD completo
**Objetivo:** crear CRUD de categorías.

Endpoints:
- `POST /categories`
- `GET /categories`
- `GET /categories/:id`
- `PATCH /categories/:id`
- `DELETE /categories/:id`

<details>
<summary>Solución (Iteración 2)</summary>

- Crear `models/category.model.js` con `name` y `description` requeridos.
- Crear `controllers/category.controller.js` con `list`, `detail`, `create`, `update`, `remove`.
- En `routes.config.js`, añadir rutas CRUD de `categories`.
- Si no existe categoría en `:id`, lanzar `createError(404, "Category not found")`.

</details>

---

### Iteración 3 - Product CRUD + relación 1:N con Category
**Objetivo:** CRUD de productos referenciando categoría.

Reglas:
- `category` obligatorio
- validar que la categoría existe al crear/actualizar
- usar `populate("category")` en lecturas

<details>
<summary>Solución (Iteración 3)</summary>

- Crear `models/product.model.js` con: `name`, `description`, `price`, `stock`, `category`, `isActive`.
- En `product.controller.js`, antes de crear/actualizar, comprobar `Category.findById(category)`.
- Usar `Product.find(...).populate("category")` en `list` y `detail`.
- Añadir rutas CRUD de `products` en `routes.config.js`.

</details>

---

### Iteración 4 - Customer CRUD completo
**Objetivo:** CRUD de clientes.

Reglas:
- `email` único
- validación de formato
- conflicto por duplicado (código `11000`) controlado

<details>
<summary>Solución (Iteración 4)</summary>

- Crear `models/customer.model.js` con `firstName`, `lastName`, `email`.
- En `email`: `unique: true` y `match` para formato email.
- Crear `controllers/customer.controller.js` con CRUD.
- Añadir rutas CRUD de `customers`.
- Controlar error `11000` en `error-handler.middleware.js` y responder `409`.

</details>

---

### Iteración 5 - Modelos Order y OrderItem
**Objetivo:** base de relación N:M con colección intermedia.

Reglas mínimas:
- `OrderItem` referencia `order` y `product`
- `quantity > 0`
- `unitPrice >= 0`
- `subtotal >= 0`

<details>
<summary>Solución (Iteración 5)</summary>

- Crear `models/order.model.js` con `customer`, `status`, `total`.
- Crear `models/order-item.model.js` con `order`, `product`, `quantity`, `unitPrice`, `subtotal`.
- Añadir enums de `status`: `pending`, `paid`, `shipped`, `cancelled`.
- Validar mínimos numéricos con `min`.

</details>

---

### Iteración 6 - Crear pedido con líneas
**Objetivo:** crear `order + orderItems` en una operación.

Reglas:
- validar customer existente
- validar products existentes
- guardar snapshot de `unitPrice` desde Product
- calcular y guardar `total` en Order

<details>
<summary>Solución (Iteración 6)</summary>

- En `order.controller.js`, crear acción `create`.
- Validar `items` (array no vacío) y `quantity > 0`.
- Verificar customer (`Customer.findById`) y productos (`Product.find` por IDs).
- Crear `Order` con `total: 0`.
- Crear `OrderItem` con `unitPrice` tomado de cada `Product`.
- Calcular total con suma de `subtotal` y guardar en `Order`.

</details>

---

### Iteración 7 - CRUD de pedidos
**Objetivo:** completar operaciones principales de pedido.

Incluye:
- listar pedidos con customer y líneas
- detalle por id
- actualizar estado (`pending`, `paid`, `shipped`, `cancelled`)
- eliminar pedido y sus `orderItems`

<details>
<summary>Solución (Iteración 7)</summary>

- En `order.controller.js`, crear: `list`, `detail`, `updateStatus`, `remove`.
- `list/detail`: `Order.populate("customer")` y cargar líneas desde `OrderItem.populate("product")`.
- `updateStatus`: `findByIdAndUpdate(..., { runValidators: true })`.
- `remove`: borrar pedido y luego `OrderItem.deleteMany({ order: req.params.id })`.
- Añadir rutas `/orders`, `/orders/:id`, `/orders/:id/status`.

</details>

---

### Iteración 8 - Filtros y queries útiles
**Objetivo:** mejorar listados con filtros.

Products:
- filtro por `category`
- `minPrice` / `maxPrice`
- paginación (`page`, `limit`)
- orden por precio (`sortPrice=asc|desc`)

Orders:
- filtro por `status`
- filtro por `customer`

<details>
<summary>Solución (Iteración 8)</summary>

- En `product.controller.js`, construir `filter` dinámico (`category`, `minPrice`, `maxPrice`).
- Implementar `page`, `limit`, `skip` y `sortPrice`.
- Responder productos con:
  - `meta: { page, limit, total, totalPages }`
  - `data: [...]`
- En `order.controller.js`, filtrar por `status` y `customer`.

</details>

---

### Iteración 9 - Error handling endurecido
**Objetivo:** respuestas de error consistentes.

Cubrir:
- `CastError`
- `ValidationError`
- duplicados Mongo (`11000`)

Formato:
- `statusCode`
- `message`
- `errors` (si aplica)

<details>
<summary>Solución (Iteración 9)</summary>

- En `middlewares/error-handler.middleware.js`:
  - `ValidationError` → `400` + array `errors`.
  - `CastError` → `400`.
  - `11000` → `409`.
- Mantener respuesta homogénea en todos los casos:
  - `{ statusCode, message, errors }`
- En controladores, lanzar errores controlados con `createError(...)`.

</details>

---

### Iteración 10 - Cierre del ejercicio
**Objetivo:** dejar el paquete de práctica cerrado.

Incluye:
- seed mínimo
- colección Postman
- guía de prueba manual

<details>
<summary>Solución (Iteración 10)</summary>

- Crear `data/seed.js` con categorías, productos y customer demo.
- Añadir script en `package.json`: `"seed": "node data/seed.js"`.
- Crear `data/postman_collection.json` con ejemplos de rutas principales.
- Completar este `README` con:
  - arranque del proyecto
  - iteraciones
  - flujo recomendado
  - casos de prueba manuales

</details>

---

## Formato recomendado para cada entrega de iteración

- `Iteración X - Objetivo`
- Cambios realizados
- Archivos tocados
- Cómo probar (3-6 pasos)
- Resultado esperado
- Siguiente iteración propuesta

---

## Flujo recomendado para probar la API

1. `GET /health`
2. Crear categoría
3. Crear producto usando esa categoría
4. Crear customer
5. Crear order con líneas
6. Consultar order
7. Cambiar estado del order
8. Listar products con filtros
9. Listar orders por status/customer
10. Eliminar order

---

## Casos de prueba manuales (10)

1. Crear categoría sin `name` → `400`.
2. Crear categoría válida → `201`.
3. Crear producto con `category` inexistente → `400`.
4. Crear producto válido → `201` con categoría populada.
5. Crear dos customers con mismo email → segundo `409`.
6. Crear order con `items: []` → `400`.
7. Crear order válido con 2 líneas → `201` y `total` correcto.
8. Actualizar estado con valor no permitido → `400`.
9. Pedir recurso con ObjectId inválido → `400`.
10. Ruta inexistente → `404` con mensaje `Route not found`.
