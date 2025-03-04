// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: null },
  reviewsCount: { type: Number, default: 0 },
  description: { type: String, default: null },
  image: { type: String, default: null },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
