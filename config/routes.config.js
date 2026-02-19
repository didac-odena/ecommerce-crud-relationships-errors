/**
 * Iteration 1 - Bootstrap
 * TODO:
 * - Create an `express.Router()`.
 * - Add a `GET /health` endpoint.
 * - Mount the router under `/api` (e.g. `app.use("/api", router)`).
 *
 * Iterations 2–7 - CRUD + Order actions
 * TODO:
 * - Import controllers and wire these endpoints:
 *   - Categories:
 *     - POST   `/categories`
 *     - GET    `/categories`
 *     - GET    `/categories/:id`
 *     - PATCH  `/categories/:id`
 *     - DELETE `/categories/:id`
 *   - Products:
 *     - POST   `/products`
 *     - GET    `/products` (Iteration 8: filters + pagination)
 *     - GET    `/products/:id`
 *     - PATCH  `/products/:id`
 *     - DELETE `/products/:id`
 *   - Customers:
 *     - POST   `/customers`
 *     - GET    `/customers`
 *     - GET    `/customers/:id`
 *     - PATCH  `/customers/:id`
 *     - DELETE `/customers/:id`
 *   - Orders:
 *     - POST   `/orders` (Iteration 6: create with items)
 *     - GET    `/orders` (Iteration 8: filters)
 *     - GET    `/orders/:id`
 *     - PATCH  `/orders/:id/status`
 *     - DELETE `/orders/:id`
 *
 * Tip:
 * - Use `validateObjectIdMiddleware()` for routes that include `:id`.
 */
const routesConfig = (app) => {
  // TODO: implement routes configuration.
};

export default routesConfig;
