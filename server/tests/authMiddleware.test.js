import jwt from 'jsonwebtoken'
import { jest } from '@jest/globals'
import { protect, authorize } from '../middleware/authMiddleware.js'

process.env.JWT_SECRET = 'test_secret'

function mockRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('protect middleware', () => {
  test('rejects requests with no Authorization header', () => {
    const req = { headers: {} }
    const res = mockRes()
    const next = jest.fn()

    protect(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })

  test('rejects an invalid token', () => {
    const req = { headers: { authorization: 'Bearer not-a-real-token' } }
    const res = mockRes()
    const next = jest.fn()

    protect(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })

  test('allows a valid token through and attaches req.user', () => {
    const token = jwt.sign({ id: 'user123', role: 'customer' }, process.env.JWT_SECRET)
    const req = { headers: { authorization: `Bearer ${token}` } }
    const res = mockRes()
    const next = jest.fn()

    protect(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(req.user.id).toBe('user123')
    expect(req.user.role).toBe('customer')
  })
})

describe('authorize middleware', () => {
  test('blocks a role that is not permitted', () => {
    const req = { user: { role: 'customer' } }
    const res = mockRes()
    const next = jest.fn()

    authorize('admin')(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })

  test('allows a permitted role through', () => {
    const req = { user: { role: 'admin' } }
    const res = mockRes()
    const next = jest.fn()

    authorize('admin')(req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
