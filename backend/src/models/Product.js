const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  shortDescription: { type: String, maxLength: 150 },
  fullDescription: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Advanced'] },
  images: [{ url: String, publicId: String }],
  mainImageIndex: { type: Number, default: 0 },
  basePrice: { type: Number, required: true },
  salePrice: Number,
  sizePricing: { S: Number, M: Number, L: Number },
  stock: { type: Number, default: 0 },
  lowStockAlert: { type: Number, default: 5 },
  sunlight: { type: String, enum: ['Full Sun', 'Partial', 'Shade'] },
  watering: { type: String, enum: ['Daily', 'Weekly', 'Rarely'] },
  soilType: String,
  petFriendly: { type: Boolean, default: false },
  airPurifying: { type: Boolean, default: false },
  growthRate: { type: String, enum: ['Slow', 'Medium', 'Fast'] },
  floweringSeason: String,
  badges: {
    newArrival: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    featured: { type: Boolean, default: false }
  },
  visibility: { type: String, enum: ['Active', 'Draft', 'Hidden'], default: 'Active' },
  views: { type: Number, default: 0 },
  cartAdds: { type: Number, default: 0 },
  purchases: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
