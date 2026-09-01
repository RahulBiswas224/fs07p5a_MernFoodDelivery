import { Link } from 'react-router-dom'
import './RestaurantCard.css'

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/menu/${restaurant.id}`} className="restaurant-card">
      <img src={restaurant.image} alt={restaurant.name} />
      <div className="restaurant-card-body">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisine}</p>
        <span className="rating">⭐ {restaurant.rating}</span>
      </div>
    </Link>
  )
}

export default RestaurantCard
