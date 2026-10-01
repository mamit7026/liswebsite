const mongoose = require('mongoose');

const DemoRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  organization: {
    type: String,
    required: true,
    trim: true,
  },
  labType: {
    type: String,
    required: true,
    enum: [
      'Hospital & Health System',
      'Commercial Reference Lab',
      'Molecular & Pathology Lab',
      'Genomics & NGS Core',
      'Biobanking & Environmental',
      'CRO / Clinical Research',
      'Other'
    ],
    default: 'Clinical Reference Lab'
  },
  dailyTestVolume: {
    type: String,
    enum: ['< 500 tests/day', '500 - 2,500 tests/day', '2,500 - 10,000 tests/day', '10,000+ tests/day'],
    default: '500 - 2,500 tests/day'
  },
  timeframe: {
    type: String,
    enum: ['Immediate (1-3 months)', '3-6 months', '6-12 months', 'Just Researching'],
    default: '3-6 months'
  },
  modulesOfInterest: [{
    type: String
  }],
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Scheduled', 'Demo Delivered', 'Closed'],
    default: 'New'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DemoRequest', DemoRequestSchema);
