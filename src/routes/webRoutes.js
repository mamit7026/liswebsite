const pageController = require('../controllers/pageController');

async function webRoutes(fastify, options) {
  // Main Pages
  fastify.get('/', pageController.getHomePage);
  fastify.get('/solutions', pageController.getSolutionsPage);
  fastify.get('/solutions/:slug', pageController.getSolutionDetailPage);
  fastify.get('/products', pageController.getProductsPage);
  fastify.get('/industries', pageController.getIndustriesPage);
  fastify.get('/resources', pageController.getResourcesPage);
  fastify.get('/about', pageController.getAboutPage);
  fastify.get('/contact', pageController.getContactPage);
  fastify.get('/request-demo', pageController.getRequestDemoPage);

  // Legal & Policy Pages
  fastify.get('/terms', pageController.getTermsPage);
  fastify.get('/privacy-policy', pageController.getPrivacyPolicyPage);
  fastify.get('/data-policy', pageController.getDataPolicyPage);
  fastify.get('/refund-policy', pageController.getRefundPolicyPage);

  // SEO Files — robots.txt
  fastify.get('/robots.txt', (req, reply) => {
    reply.header('Content-Type', 'text/plain');
    return reply.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: http://www.lisdesk.com/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
`);
  });

  // SEO Files — sitemap.xml
  fastify.get('/sitemap.xml', (req, reply) => {
    const baseUrl = 'http://www.lisdesk.com';
    const today = new Date().toISOString().split('T')[0];

    const urls = [
      { loc: '/', changefreq: 'daily', priority: '1.0' },
      { loc: '/solutions', changefreq: 'weekly', priority: '0.9' },
      { loc: '/solutions/clinical-diagnostics', changefreq: 'weekly', priority: '0.85' },
      { loc: '/solutions/molecular-pathology', changefreq: 'weekly', priority: '0.85' },
      { loc: '/solutions/genomics-ngs', changefreq: 'weekly', priority: '0.85' },
      { loc: '/solutions/enterprise-rcm', changefreq: 'weekly', priority: '0.85' },
      { loc: '/solutions/biobanking-lims', changefreq: 'weekly', priority: '0.85' },
      { loc: '/products', changefreq: 'weekly', priority: '0.8' },
      { loc: '/industries', changefreq: 'monthly', priority: '0.75' },
      { loc: '/resources', changefreq: 'weekly', priority: '0.75' },
      { loc: '/about', changefreq: 'monthly', priority: '0.7' },
      { loc: '/contact', changefreq: 'monthly', priority: '0.7' },
      { loc: '/request-demo', changefreq: 'monthly', priority: '0.9' },
      { loc: '/terms', changefreq: 'yearly', priority: '0.4' },
      { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.4' },
      { loc: '/data-policy', changefreq: 'yearly', priority: '0.4' },
      { loc: '/refund-policy', changefreq: 'yearly', priority: '0.4' },
    ];

    const xmlUrls = urls.map(u => `
  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlUrls}
</urlset>`;

    reply.header('Content-Type', 'application/xml');
    return reply.send(xml);
  });
}

module.exports = webRoutes;
