import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">FoodExpress</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/cart">Cart{itemCount > 0 ? ` (${itemCount})` : ''}</Link>
        <Link to="/orders">Orders</Link>
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name.split(' ')[0]}</span>
            <button className="navbar-logout" onClick={logout}>Log out</button>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
