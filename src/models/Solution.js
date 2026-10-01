const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  tagline: String,
  category: String,
  heroHighlight: String,
  shortDesc: String,
  fullDesc: String,
  icon: String,
  badgeText: String,
  keyFeatures: [String],
  benefits: [{
    title: String,
    description: String,
    stat: String,
  }],
  workflowSteps: [{
    stepNumber: Number,
    title: String,
    detail: String
  }],
  complianceStandards: [String],
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Solution', SolutionSchema);
