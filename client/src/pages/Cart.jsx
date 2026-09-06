import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api.js'
import './Cart.css'

function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  const handlePlaceOrder = async () => {
    if (!user) {
      setError('Please log in to place an order.')
      return
    }
    setPlacing(true)
    setError('')
    try {
      await api.post('/orders', {
        items: items.map((i) => ({ menuItem: i.menuItemId, quantity: i.quantity, price: i.price })),
        totalAmount: total,
      })
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order')
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty. Go add something tasty!</p>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.menuItemId} className="cart-item">
            <span>{item.name}</span>
            <div className="cart-item-controls">
              <button onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}>+</button>
            </div>
            <span>₹{item.price * item.quantity}</span>
            <button className="remove-btn" onClick={() => removeFromCart(item.menuItemId)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-total">Total: ₹{total}</div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="place-order-btn" onClick={handlePlaceOrder} disabled={placing}>
        {placing ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  )
}

export default Cart
