import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import './OrderHistory.css'

function OrderHistory() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    api
      .get('/orders/my')
      .then((res) => setOrders(res.data))
      .catch(() => setError('Could not load your orders.'))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return (
      <div className="order-history">
        <h2>Order History</h2>
        <p>Please <Link to="/login">log in</Link> to see your orders.</p>
      </div>
    )
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && orders.length === 0 && <p>You haven't placed any orders yet.</p>}

      <div className="order-list">
        {orders.map((order) => (
          <Link to={`/track/${order._id}`} key={order._id} className="order-card">
            <div>
              <strong>Order #{order._id.slice(-6)}</strong>
              <p>{order.items.length} item(s) — ₹{order.totalAmount}</p>
            </div>
            <span className={`status-badge status-${order.status}`}>
              {order.status.replace(/_/g, ' ')}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory
