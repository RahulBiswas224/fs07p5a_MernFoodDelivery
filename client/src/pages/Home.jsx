import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Hungry? We've got you covered.</h1>
        <p>Order food from your favorite restaurants, delivered fast.</p>
        <Link to="/restaurants" className="hero-btn">Browse Restaurants</Link>
      </section>
    </div>
  )
}

export default Home
