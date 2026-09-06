import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import RestaurantListing from './pages/RestaurantListing.jsx'
import MenuPage from './pages/MenuPage.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import OrderHistory from './pages/OrderHistory.jsx'
import TrackOrder from './pages/TrackOrder.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantListing />} />
        <Route path="/menu/:restaurantId" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/track/:orderId" element={<TrackOrder />} />
      </Routes>
    </>
  )
}

export default App
