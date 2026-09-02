import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    cuisine: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    address: { type: String, trim: true },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Restaurant', restaurantSchema)
