import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { menuItemId, name, price, quantity }

  const addToCart = (menuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === menuItem._id)
      if (existing) {
        return prev.map((i) =>
          i.menuItemId === menuItem._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [
        ...prev,
        { menuItemId: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: 1 },
      ]
    })
  }

  const removeFromCart = (menuItemId) => {
    setItems((prev) => prev.filter((i) => i.menuItemId !== menuItemId))
  }

  const updateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) return removeFromCart(menuItemId)
    setItems((prev) =>
      prev.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
