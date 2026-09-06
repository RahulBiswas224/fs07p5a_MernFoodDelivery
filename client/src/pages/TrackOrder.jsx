import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api.js'
import socket from '../services/socket.js'
import './TrackOrder.css'

const STEPS = ['placed', 'preparing', 'out_for_delivery', 'delivered']

function TrackOrder() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // Load initial order state
    api
      .get(`/orders/${orderId}`)
      .then((res) => setOrder(res.data))
      .catch(() => setError('Could not load this order.'))

    // Subscribe to live updates for this order
    socket.emit('trackOrder', orderId)
    const handleUpdate = (updatedOrder) => {
      if (updatedOrder._id === orderId) setOrder(updatedOrder)
    }
    socket.on('orderStatusUpdate', handleUpdate)

    return () => {
      socket.off('orderStatusUpdate', handleUpdate)
    }
  }, [orderId])

  if (error) return <div className="track-page"><p style={{ color: 'red' }}>{error}</p></div>
  if (!order) return <div className="track-page"><p>Loading order...</p></div>

  const currentStepIndex = STEPS.indexOf(order.status)

  return (
    <div className="track-page">
      <h2>Tracking Order #{order._id.slice(-6)}</h2>
      <div className="tracker">
        {STEPS.map((step, i) => (
          <div key={step} className={`tracker-step ${i <= currentStepIndex ? 'active' : ''}`}>
            <div className="tracker-dot" />
            <span>{step.replace(/_/g, ' ')}</span>
          </div>
        ))}
      </div>
      <p className="live-note">This updates automatically in real time as the restaurant updates your order.</p>
    </div>
  )
}

export default TrackOrder
