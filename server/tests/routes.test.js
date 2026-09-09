import request from 'supertest'
import app from '../app.js'

describe('Health & routing', () => {
  test('GET /api/health returns ok status', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })

  test('GET /api/unknown-route returns 404', async () => {
    const res = await request(app).get('/api/unknown-route')
    expect(res.status).toBe(404)
  })
})

describe('Auth validation', () => {
  test('POST /api/auth/signup without required fields returns 400', async () => {
    const res = await request(app).post('/api/auth/signup').send({ email: 'a@b.com' })
    expect(res.status).toBe(400)
  })

  test('POST /api/auth/login without required fields returns 400', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'a@b.com' })
    expect(res.status).toBe(400)
  })
})

describe('Protected routes reject requests with no token', () => {
  test('GET /api/auth/me without token returns 401', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })

  test('POST /api/orders without token returns 401', async () => {
    const res = await request(app).post('/api/orders').send({ items: [] })
    expect(res.status).toBe(401)
  })

  test('GET /api/orders/my without token returns 401', async () => {
    const res = await request(app).get('/api/orders/my')
    expect(res.status).toBe(401)
  })
})

describe('Restaurant/menu creation validation', () => {
  test('POST /api/restaurants without required fields returns 400', async () => {
    const res = await request(app).post('/api/restaurants').send({})
    expect(res.status).toBe(400)
  })

  test('POST /api/menu without required fields returns 400', async () => {
    const res = await request(app).post('/api/menu').send({})
    expect(res.status).toBe(400)
  })
})
