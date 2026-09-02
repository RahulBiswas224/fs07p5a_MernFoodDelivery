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

Note: JWT authentication and route protection are added in Sprint 3.
