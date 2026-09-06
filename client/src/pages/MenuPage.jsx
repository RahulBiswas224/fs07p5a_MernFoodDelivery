import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api.js'
import { useCart } from '../context/CartContext.jsx'
import './MenuPage.css'

function MenuPage() {
  const { restaurantId } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    api
      .get(`/menu?restaurantId=${restaurantId}`)
      .then((res) => setItems(res.data))
      .catch(() => setError('Could not load menu. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [restaurantId])

  return (
    <div className="menu-page">
      <h2>Menu</h2>
      {loading && <p>Loading menu...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && items.length === 0 && <p>No menu items yet for this restaurant.</p>}

      <div className="menu-list">
        {items.map((item) => (
          <div key={item._id} className="menu-item">
            <div>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <span className="price">₹{item.price}</span>
            </div>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuPage
