import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['starters', 'mains', 'desserts', 'drinks'],
    },
    image: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isVegetarian: { type: Boolean, default: false },
    isSpicy: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
