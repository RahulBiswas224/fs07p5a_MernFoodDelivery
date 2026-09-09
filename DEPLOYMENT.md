# Deployment Guide (Sprint 8)

## Database — MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user and whitelist your IP (or `0.0.0.0/0` for simplicity during grading)
3. Copy the connection string — this is your `MONGO_URI`

## Backend — Render
1. Push this repo to GitHub
2. On https://render.com → New → Web Service → connect the repo
3. Root directory: `server`
4. Build command: `npm install`  |  Start command: `npm start`
5. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
6. Deploy — note the resulting URL, e.g. `https://foodexpress-api.onrender.com`

## Frontend — Vercel
1. On https://vercel.com → New Project → import the repo
2. Root directory: `client`
3. Framework preset: Vite
4. Add environment variables:
   - `VITE_API_URL` = `https://foodexpress-api.onrender.com/api`
   - `VITE_SOCKET_URL` = `https://foodexpress-api.onrender.com`
5. Deploy

## Verifying the deployment
- Visit `https://<your-backend>.onrender.com/api/health` → should return `{"status":"ok"}`
- Visit the Vercel frontend URL → sign up, browse restaurants, place a test order
