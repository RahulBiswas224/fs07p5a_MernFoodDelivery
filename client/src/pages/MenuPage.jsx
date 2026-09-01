import { useParams } from 'react-router-dom'

function MenuPage() {
  const { restaurantId } = useParams()

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Menu for Restaurant #{restaurantId}</h2>
      <p>Menu items will be loaded from the backend in a later sprint.</p>
    </div>
  )
}

export default MenuPage
