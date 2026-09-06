import { useEffect, useState } from 'react'
import RestaurantCard from '../components/RestaurantCard.jsx'
import api from '../services/api.js'
import './RestaurantListing.css'

function RestaurantListing() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/restaurants')
      .then((res) => setRestaurants(res.data))
      .catch(() => setError('Could not load restaurants. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="restaurant-listing">
      <h2>Restaurants near you</h2>
      {loading && <p>Loading restaurants...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && restaurants.length === 0 && (
        <p>No restaurants found yet. Add some via the API.</p>
      )}
      <div className="restaurant-grid">
        {restaurants.map((r) => (
          <RestaurantCard
            key={r._id}
            restaurant={{
              id: r._id,
              name: r.name,
              cuisine: r.cuisine,
              rating: r.rating,
              image: r.image || 'https://placehold.co/300x150?text=' + encodeURIComponent(r.name),
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default RestaurantListing
