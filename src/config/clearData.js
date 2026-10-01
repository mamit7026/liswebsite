require('dotenv').config();
const { connectDB } = require('./db');
const mongoose = require('mongoose');
const Solution = require('../models/Solution');
const Product = require('../models/Product');
const DemoRequest = require('../models/DemoRequest');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

const clearAllSeedData = async () => {
  console.log('[Clear] Connecting to MongoDB to purge all seed data...');
  await connectDB();

  try {
    const solRes = await Solution.deleteMany({});
    const prodRes = await Product.deleteMany({});
    const demoRes = await DemoRequest.deleteMany({});
    const contactRes = await ContactMessage.deleteMany({});
    const subRes = await NewsletterSubscriber.deleteMany({});

    console.log(`[Clear] Purged Solutions: ${solRes.deletedCount}`);
    console.log(`[Clear] Purged Products: ${prodRes.deletedCount}`);
    console.log(`[Clear] Purged DemoRequests: ${demoRes.deletedCount}`);
    console.log(`[Clear] Purged ContactMessages: ${contactRes.deletedCount}`);
    console.log(`[Clear] Purged NewsletterSubscribers: ${subRes.deletedCount}`);
    console.log('[Clear] All seed and static data cleared from MongoDB successfully.');
  } catch (err) {
    console.error('[Clear Error] Failed to clear seed data:', err.message);
  } finally {
    await mongoose.disconnect();
  }
};

if (require.main === module) {
  clearAllSeedData().then(() => process.exit(0));
}

module.exports = clearAllSeedData;
