const DemoRequest = require('../models/DemoRequest');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { getStatus } = require('../config/db');
const { getBufferedData } = require('./inquiryController');

exports.getAdminDashboard = async (req, reply) => {
  const dbStatus = getStatus();
  let demos = [];
  let contacts = [];
  let subscriberCount = 0;

  try {
    if (dbStatus.connected) {
      demos = await DemoRequest.find().sort({ createdAt: -1 }).limit(50).lean();
      contacts = await ContactMessage.find().sort({ createdAt: -1 }).limit(50).lean();
      subscriberCount = await NewsletterSubscriber.countDocuments({ active: true });
    } else {
      const buffered = getBufferedData();
      demos = buffered.demos;
      contacts = buffered.contacts;
      subscriberCount = buffered.subscribers.length;
    }
  } catch (err) {
    console.error('[Admin Dashboard Error]', err);
    const buffered = getBufferedData();
    demos = buffered.demos;
    contacts = buffered.contacts;
    subscriberCount = buffered.subscribers.length;
  }

  // Count stats
  const stats = {
    totalDemos: demos.length,
    newDemos: demos.filter(d => d.status === 'New').length,
    scheduledDemos: demos.filter(d => d.status === 'Scheduled').length,
    totalContacts: contacts.length,
    newContacts: contacts.filter(c => c.status === 'New').length,
    subscribers: subscriberCount,
    dbStatus
  };

  return reply.view('pages/admin-dashboard', {
    pageTitle: 'Informatics Admin Portal | Lead & Inquiries Manager',
    activeNav: 'admin',
    demos,
    contacts,
    stats,
    query: req.query || {}
  });
};

exports.updateDemoStatus = async (req, reply) => {
  const { id } = req.params;
  const { status } = req.body || {};

  const validStatuses = ['New', 'Contacted', 'Scheduled', 'Demo Delivered', 'Closed'];
  if (!validStatuses.includes(status)) {
    return reply.status(400).send({ success: false, message: 'Invalid status' });
  }

  try {
    await DemoRequest.findByIdAndUpdate(id, { status });
    return reply.send({ success: true, message: `Status updated to ${status}` });
  } catch (err) {
    return reply.status(500).send({ success: false, message: err.message });
  }
};
