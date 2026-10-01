const pageController = require('../controllers/pageController');

async function webRoutes(fastify, options) {
  fastify.get('/', pageController.getHomePage);
  fastify.get('/solutions', pageController.getSolutionsPage);
  fastify.get('/solutions/:slug', pageController.getSolutionDetailPage);
  fastify.get('/products', pageController.getProductsPage);
  fastify.get('/industries', pageController.getIndustriesPage);
  fastify.get('/resources', pageController.getResourcesPage);
  fastify.get('/about', pageController.getAboutPage);
  fastify.get('/contact', pageController.getContactPage);
  fastify.get('/request-demo', pageController.getRequestDemoPage);
}

module.exports = webRoutes;
