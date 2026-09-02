import Restaurant from '../models/Restaurant.js'

// GET /api/restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
    res.json(restaurants)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/restaurants/:id
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' })
    res.json(restaurant)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/restaurants
export const createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, image, rating, address } = req.body
    if (!name || !cuisine) {
      return res.status(400).json({ message: 'name and cuisine are required' })
    }
    const restaurant = await Restaurant.create({ name, cuisine, image, rating, address })
    res.status(201).json(restaurant)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/restaurants/:id
export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' })
    res.json(restaurant)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/restaurants/:id
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' })
    res.json({ message: 'Restaurant deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
