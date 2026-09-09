# Sprint Plan — Dynamic Food Delivery Application (MERN)

Project Code: FS07P5A
Target completion: Sep 8, 2026

| Sprint | Date | Goal |
|--------|------|------|
| 1 | Sep 1 | Project setup, homepage + restaurant listing UI |
| 2 | Sep 2 | Backend server (Express) + MongoDB connection + REST APIs (users, restaurants, menus) |
| 3 | Sep 3 | JWT authentication (signup/login) |
| 4 | Sep 4 | Frontend-backend integration (Axios) — connect real data to UI |
| 5 | Sep 5 | Cart, order placement, order history |
| 6 | Sep 6 | Real-time order tracking (Socket.io) |
| 7 | Sep 7 | Payment gateway integration (Stripe/Razorpay) + testing/bug fixes |
| 8 | Sep 8 | Deployment (Vercel/Render/Atlas) + final project report + submission |

## Sprint 1 — Done ✅
- Initialized React frontend (Vite)
- Basic routing (Home, Restaurant Listing, Menu, Cart)
- Homepage UI component
- Restaurant listing UI component (static/mock data)
- Basic CSS styling

## Sprint 2 — Done ✅
- Express server setup (server.js, middleware, error handling, health check route)
- MongoDB connection via Mongoose (config/db.js)
- Models: User, Restaurant, MenuItem
- REST APIs (full CRUD) for users, restaurants, and menu items
- Password hashing on user creation (bcryptjs) — full JWT auth login/signup comes in Sprint 3

## Sprint 3 — Done ✅ (Sep 3)
- JWT auth: signup, login, /auth/me endpoints
- authMiddleware.js: protect (verify token) + authorize (role-based access)
- Passwords compared via bcrypt on login

## Sprint 4 — Done ✅ (Sep 4)
- Axios instance (services/api.js) with JWT auto-attached via interceptor
- AuthContext (signup/login/logout state, persisted token in localStorage)
- RestaurantListing and MenuPage now pull real data from the backend instead of mock data
- Login and Signup pages

## Sprint 5 — Done ✅ (Sep 5)
- CartContext: add/remove/update quantity, cart total (frontend state)
- Cart page: review items, place order
- Backend: Order model, full order controller (create, my orders, get by id, update status), order routes
- OrderHistory page: lists a logged-in user's past orders with status badges

## Sprint 6 — Done ✅ (Sep 6)
- Socket.io wired into server.js (rooms per order: `order_<id>`)
- Order status updates emitted in real time from orderController
- Frontend socket client (services/socket.js)
- TrackOrder page: live-updating delivery progress tracker, no page refresh needed

## Sprint 7 — Done ✅ (Sep 7)
- Razorpay integration: create-order + verify-signature endpoints (server/controllers/paymentController.js)
- Frontend Razorpay Checkout flow wired into Cart page
- Refactored server: Express app (app.js) separated from server bootstrap (server.js) for testability
- Jest + Supertest test suite (14 tests): route validation, auth rejection, health/404 routing, JWT middleware unit tests — all passing

## Sprint 8 — Done ✅ (Sep 8)
- Deployment configs: vercel.json (client), render.yaml (server)
- Environment-based API/socket URLs (VITE_API_URL, VITE_SOCKET_URL) for production builds
- Final Project Report (docx/pdf)
- Project submitted as ZIP + Report per submission requirements

## Project status: COMPLETE ✅ — submitted Sep 8, 2026
