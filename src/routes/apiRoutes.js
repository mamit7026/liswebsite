const inquiryController = require('../controllers/inquiryController');

async function apiRoutes(fastify, options) {
  // Public form submissions
  fastify.post('/api/demo', inquiryController.submitDemoRequest);
  fastify.post('/api/contact', inquiryController.submitContactMessage);
  fastify.post('/api/newsletter', inquiryController.submitNewsletter);

  // Health check endpoint
  fastify.get('/api/health', async (request, reply) => {
    return {
      status: 'operational',
      timestamp: new Date().toISOString(),
      service: 'OmniLIS Informatics Engine',
      version: '2.4.0'
    };
  });
}

module.exports = apiRoutes;
