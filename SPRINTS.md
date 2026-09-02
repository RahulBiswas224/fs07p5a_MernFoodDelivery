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

## Sprint 3 — Up next
- JWT authentication (signup/login endpoints, auth middleware, protected routes)
