const adminController = require('../controllers/adminController');

async function adminRoutes(fastify, options) {
  fastify.get('/admin', adminController.getAdminDashboard);
  fastify.post('/admin/demo/:id/status', adminController.updateDemoStatus);
}

module.exports = adminRoutes;
