require('dotenv').config();
const path = require('path');
const Fastify = require('fastify');
const ejs = require('ejs');
const { connectDB } = require('./src/config/db');

const fastify = Fastify({
  logger: true
});

// Register form body parser
fastify.register(require('@fastify/formbody'));

// Register static assets directory under /public/
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
  maxAge: '1d'
});

// Favicon handler
fastify.get('/favicon.ico', (req, reply) => {
  reply.header('Content-Type', 'image/svg+xml');
  return reply.send(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0F6CBD"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`);
});

// Register EJS view engine
fastify.register(require('@fastify/view'), {
  engine: {
    ejs: ejs
  },
  root: path.join(__dirname, 'src', 'views'),
  propertyName: 'view',
  viewExt: 'ejs'
});

// Register MVC Routes
fastify.register(require('./src/routes/webRoutes'));
fastify.register(require('./src/routes/apiRoutes'));
fastify.register(require('./src/routes/adminRoutes'));

// Custom 404 Not Found Handler
fastify.setNotFoundHandler((request, reply) => {
  const isApi = request.raw.url.startsWith('/api/');
  if (isApi) {
    return reply.status(404).send({
      success: false,
      message: 'API endpoint not found'
    });
  }
  return reply.status(404).view('pages/404', {
    pageTitle: 'Page Not Found | OmniLIS Informatics',
    activeNav: '',
    message: 'The requested page or diagnostic resource does not exist in the system.'
  });
});

// Global Error Handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  if (request.raw.url.startsWith('/api/')) {
    return reply.status(error.statusCode || 500).send({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
  return reply.status(500).send(`
    <html>
      <body style="font-family: sans-serif; padding: 40px; background: #F8FAFC; color: #172033;">
        <h2 style="color: #0F6CBD;">OmniLIS Application Notice</h2>
        <p>A server error occurred while processing this clinical view.</p>
        <pre style="background: #FFFFFF; padding: 15px; border-radius: 8px; border: 1px solid #E2E8F0;">${error.message}</pre>
        <p><a href="/" style="color: #0F6CBD; font-weight: 600;">&larr; Return to Dashboard</a></p>
      </body>
    </html>
  `);
});

// Start Server & Connect MongoDB
const start = async () => {
  const PORT = parseInt(process.env.PORT, 10) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  try {
    // Attempt MongoDB connection
    await connectDB();

    await fastify.listen({ port: PORT, host: HOST });
    console.log(`\n============================================================`);
    console.log(`  OmniLIS Informatics Platform running at: http://localhost:${PORT}`);
    console.log(`  Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(`  Theme: Blue (#0F6CBD) + Teal (#0F9D8A)`);
    console.log(`============================================================\n`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
