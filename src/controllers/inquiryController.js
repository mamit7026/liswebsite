const DemoRequest = require('../models/DemoRequest');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const {
  demoRequestSchema,
  contactMessageSchema,
  newsletterSchema
} = require('../validators/inquiryValidator');

// Helper to determine if request expects JSON
const isJsonRequest = (req) => {
  const accept = req.headers['accept'] || '';
  const contentType = req.headers['content-type'] || '';
  return accept.includes('application/json') || contentType.includes('application/json') || req.headers['x-requested-with'] === 'XMLHttpRequest';
};

// In-memory fallback stores in case MongoDB is temporarily starting or offline
const fallbackDemos = [];
const fallbackContacts = [];
const fallbackSubscribers = [];

exports.submitDemoRequest = async (req, reply) => {
  const isJson = isJsonRequest(req);
  const payload = req.body || {};

  // Normalize modulesOfInterest if it's sent as a single string from a form checkbox
  if (typeof payload.modulesOfInterest === 'string') {
    payload.modulesOfInterest = [payload.modulesOfInterest];
  }

  // Validate with Joi
  const { error, value } = demoRequestSchema.validate(payload, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map(d => d.message);
    if (isJson) {
      return reply.status(400).send({
        success: false,
        message: 'Validation failed. Please correct the highlighted errors.',
        errors: errorDetails
      });
    }
    // Redirect back with error indicator
    return reply.redirect('/request-demo?status=error&msg=' + encodeURIComponent(errorDetails[0]));
  }

  try {
    let savedRecord;
    try {
      savedRecord = await DemoRequest.create(value);
    } catch (dbErr) {
      console.warn('[Demo Submission] Database save failed, saving to memory buffer:', dbErr.message);
      savedRecord = { ...value, _id: 'mem_' + Date.now(), createdAt: new Date(), status: 'New' };
      fallbackDemos.unshift(savedRecord);
    }

    if (isJson) {
      return reply.status(201).send({
        success: true,
        message: 'Your laboratory demonstration request has been scheduled! A clinical specialist will contact you within 4 business hours.',
        data: { id: savedRecord._id }
      });
    }

    return reply.redirect('/request-demo?status=success');
  } catch (err) {
    console.error('[Demo Submission Error]', err);
    if (isJson) {
      return reply.status(500).send({
        success: false,
        message: 'Internal server error processing your request. Please try again or call our support line.'
      });
    }
    return reply.redirect('/request-demo?status=server_error');
  }
};

exports.submitContactMessage = async (req, reply) => {
  const isJson = isJsonRequest(req);
  const payload = req.body || {};

  // Validate with Joi
  const { error, value } = contactMessageSchema.validate(payload, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map(d => d.message);
    if (isJson) {
      return reply.status(400).send({
        success: false,
        message: 'Validation error in contact form.',
        errors: errorDetails
      });
    }
    return reply.redirect('/contact?status=error&msg=' + encodeURIComponent(errorDetails[0]));
  }

  try {
    let savedRecord;
    try {
      savedRecord = await ContactMessage.create(value);
    } catch (dbErr) {
      console.warn('[Contact Submission] Database save failed, buffering to memory:', dbErr.message);
      savedRecord = { ...value, _id: 'mem_' + Date.now(), createdAt: new Date(), status: 'New' };
      fallbackContacts.unshift(savedRecord);
    }

    if (isJson) {
      return reply.status(201).send({
        success: true,
        message: 'Thank you! Your message has been routed to our specialist team. We will respond promptly.'
      });
    }

    return reply.redirect('/contact?status=success');
  } catch (err) {
    console.error('[Contact Error]', err);
    if (isJson) {
      return reply.status(500).send({
        success: false,
        message: 'Unable to send message at this time. Please try again.'
      });
    }
    return reply.redirect('/contact?status=server_error');
  }
};

exports.submitNewsletter = async (req, reply) => {
  const isJson = isJsonRequest(req);
  const payload = req.body || {};

  // Validate with Joi
  const { error, value } = newsletterSchema.validate(payload);

  if (error) {
    const msg = error.details[0].message;
    if (isJson) {
      return reply.status(400).send({ success: false, message: msg });
    }
    return reply.redirect('/?newsletter=invalid');
  }

  try {
    try {
      await NewsletterSubscriber.findOneAndUpdate(
        { email: value.email },
        { email: value.email, active: true },
        { upsert: true, returnDocument: 'after' }
      );
    } catch (dbErr) {
      console.warn('[Newsletter] Fallback buffer used:', dbErr.message);
      if (!fallbackSubscribers.includes(value.email)) {
        fallbackSubscribers.push(value.email);
      }
    }

    if (isJson) {
      return reply.status(200).send({
        success: true,
        message: 'Thank you for subscribing to LISDESK Clinical Insights & Regulatory Updates!'
      });
    }

    return reply.redirect('/?newsletter=success');
  } catch (err) {
    console.error('[Newsletter Error]', err);
    if (isJson) {
      return reply.status(500).send({ success: false, message: 'Subscription failed. Please try again.' });
    }
    return reply.redirect('/?newsletter=error');
  }
};

// Export in-memory fallbacks for admin dashboard when needed
exports.getBufferedData = () => ({
  demos: fallbackDemos,
  contacts: fallbackContacts,
  subscribers: fallbackSubscribers
});
