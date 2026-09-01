import RestaurantCard from '../components/RestaurantCard.jsx'
import './RestaurantListing.css'

// Mock data — will be replaced by API calls in Sprint 5
const mockRestaurants = [
  { id: 1, name: 'Spice Villa', cuisine: 'Indian', rating: 4.5, image: 'https://placehold.co/300x150?text=Spice+Villa' },
  { id: 2, name: 'Pasta Palace', cuisine: 'Italian', rating: 4.3, image: 'https://placehold.co/300x150?text=Pasta+Palace' },
  { id: 3, name: 'Sushi Central', cuisine: 'Japanese', rating: 4.7, image: 'https://placehold.co/300x150?text=Sushi+Central' },
  { id: 4, name: 'Burger Hub', cuisine: 'American', rating: 4.1, image: 'https://placehold.co/300x150?text=Burger+Hub' },
]

function RestaurantListing() {
  return (
    <div className="restaurant-listing">
      <h2>Restaurants near you</h2>
      <div className="restaurant-grid">
        {mockRestaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  )
}

export default RestaurantListing
