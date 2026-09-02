import MenuItem from '../models/MenuItem.js'

// GET /api/menu?restaurantId=xxxx
export const getMenuItems = async (req, res) => {
  try {
    const filter = {}
    if (req.query.restaurantId) filter.restaurant = req.query.restaurantId

    const items = await MenuItem.find(filter).populate('restaurant', 'name cuisine')
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/menu/:id
export const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id).populate('restaurant', 'name cuisine')
    if (!item) return res.status(404).json({ message: 'Menu item not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/menu
export const createMenuItem = async (req, res) => {
  try {
    const { restaurant, name, description, price, image, category } = req.body
    if (!restaurant || !name || price === undefined) {
      return res.status(400).json({ message: 'restaurant, name, and price are required' })
    }
    const item = await MenuItem.create({ restaurant, name, description, price, image, category })
    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/menu/:id
export const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ message: 'Menu item not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/menu/:id
export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Menu item not found' })
    res.json({ message: 'Menu item deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
