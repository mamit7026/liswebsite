const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  badge: String,
  tagline: String,
  summary: String,
  capabilities: [String],
  supportedProtocols: [String],
  specifications: [{
    label: String,
    value: String
  }],
  icon: String,
  isFeatured: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
