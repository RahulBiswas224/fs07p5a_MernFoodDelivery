# Server — Food Delivery API

## Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env: set MONGO_URI to your local MongoDB or MongoDB Atlas connection string
npm run dev
```

Server runs at `http://localhost:5000`. Health check: `GET /api/health`

## API Endpoints (Sprint 2)

### Users
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | /api/users | List all users |
| GET | /api/users/:id | Get single user |
| POST | /api/users | Create user (password hashed) |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

### Restaurants
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | /api/restaurants | List all restaurants |
| GET | /api/restaurants/:id | Get single restaurant |
| POST | /api/restaurants | Create restaurant |
| PUT | /api/restaurants/:id | Update restaurant |
| DELETE | /api/restaurants/:id | Delete restaurant |

### Menu Items
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | /api/menu | List all menu items (optional `?restaurantId=`) |
| GET | /api/menu/:id | Get single menu item |
| POST | /api/menu | Create menu item |
| PUT | /api/menu/:id | Update menu item |
| DELETE | /api/menu/:id | Delete menu item |

### Auth (Sprint 3)
| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | /api/auth/signup | Register a new user, returns JWT |
| POST | /api/auth/login | Log in, returns JWT |
| GET | /api/auth/me | Get logged-in user's profile (requires `Authorization: Bearer <token>`) |

### Orders (Sprint 5 & 6)
| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | /api/orders | Place an order (requires auth) |
| GET | /api/orders/my | Get logged-in user's order history (requires auth) |
| GET | /api/orders/:id | Get a single order (requires auth, owner or admin) |
| PUT | /api/orders/:id/status | Update order status (admin only) — pushes live update via Socket.io |

### Real-time tracking (Sprint 6)
The server runs Socket.io alongside Express. Clients emit `trackOrder` with an order ID to join
that order's room, and receive `orderStatusUpdate` events whenever the order's status changes.

### Payments (Sprint 7)
| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | /api/payments/create-order | Create a Razorpay order for an existing order (requires auth) |
| POST | /api/payments/verify | Verify Razorpay payment signature, marks order paid (requires auth) |

Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env` (get test keys from the
[Razorpay Dashboard](https://dashboard.razorpay.com/) → Settings → API Keys).

## Testing (Sprint 7)
```bash
npm test
```
Runs route-validation and JWT-middleware tests with Jest + Supertest. These tests don't require
a live MongoDB connection — they check request validation (400s), auth rejection (401/403s), and
health/404 routing directly against the Express app.
