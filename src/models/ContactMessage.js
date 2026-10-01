const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: {
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
    default: ''
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    enum: ['Enterprise Sales', 'Technical Support', 'HL7/FHIR Integrations', 'Billing & RCM', 'Partnerships'],
    default: 'Enterprise Sales'
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['New', 'In Review', 'Resolved'],
    default: 'New'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
