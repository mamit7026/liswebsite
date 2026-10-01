const mongoose = require('mongoose');

const NewsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  source: {
    type: String,
    default: 'Website Footer'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);
