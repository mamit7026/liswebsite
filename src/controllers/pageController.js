const Solution = require('../models/Solution');
const Product = require('../models/Product');
const { solutionsData, productsData, caseStudiesData } = require('../config/seedData');

// Fetch solutions directly from database with fallback
const getSolutionsList = async () => {
  try {
    const list = await Solution.find().sort({ displayOrder: 1 }).lean();
    if (list && list.length > 0) return list;
  } catch (err) {
    console.warn('[PageController] MongoDB query warning:', err.message);
  }
  return solutionsData;
};

// Fetch products directly from database with fallback
const getProductsList = async () => {
  try {
    const list = await Product.find().lean();
    if (list && list.length > 0) return list;
  } catch (err) {
    console.warn('[PageController] MongoDB query warning:', err.message);
  }
  return productsData;
};

exports.getHomePage = async (req, reply) => {
  const solutions = await getSolutionsList();
  const products = await getProductsList();

  return reply.view('pages/index', {
    pageTitle: 'OmniLIS Informatics | Next-Gen Laboratory Information System & Precision Diagnostics',
    activeNav: 'home',
    solutions,
    products,
    caseStudies: caseStudiesData,
    query: req.query || {}
  });
};

exports.getSolutionsPage = async (req, reply) => {
  const solutions = await getSolutionsList();
  
  return reply.view('pages/solutions', {
    pageTitle: 'Laboratory Solutions & Clinical Disciplines | OmniLIS Informatics',
    activeNav: 'solutions',
    solutions,
    query: req.query || {}
  });
};

exports.getSolutionDetailPage = async (req, reply) => {
  const { slug } = req.params;
  const solutions = await getSolutionsList();
  const solution = solutions.find(s => s.slug === slug);

  if (!solution) {
    return reply.status(404).view('pages/404', {
      pageTitle: 'Solution Not Found | OmniLIS Informatics',
      activeNav: '',
      message: `The laboratory solution "${slug}" was not found.`
    });
  }

  const relatedSolutions = solutions.filter(s => s.slug !== slug).slice(0, 3);

  return reply.view('pages/solution-detail', {
    pageTitle: `${solution.title} | OmniLIS Informatics`,
    activeNav: 'solutions',
    solution,
    relatedSolutions,
    query: req.query || {}
  });
};

exports.getProductsPage = async (req, reply) => {
  const products = await getProductsList();

  return reply.view('pages/products', {
    pageTitle: 'Enterprise LIS Modules & Technology Hub | OmniLIS Informatics',
    activeNav: 'products',
    products,
    query: req.query || {}
  });
};

exports.getIndustriesPage = async (req, reply) => {
  return reply.view('pages/industries', {
    pageTitle: 'Industries & Healthcare Sectors We Serve | OmniLIS Informatics',
    activeNav: 'industries',
    query: req.query || {}
  });
};

exports.getResourcesPage = async (req, reply) => {
  return reply.view('pages/resources', {
    pageTitle: 'Informatics Resources, Case Studies & Regulatory Guides | OmniLIS',
    activeNav: 'resources',
    caseStudies: caseStudiesData,
    query: req.query || {}
  });
};

exports.getAboutPage = async (req, reply) => {
  return reply.view('pages/about', {
    pageTitle: 'About OmniLIS Informatics | Precision Diagnostics Operating System',
    activeNav: 'about',
    query: req.query || {}
  });
};

exports.getContactPage = async (req, reply) => {
  return reply.view('pages/contact', {
    pageTitle: 'Contact Lab Specialists & Enterprise Support | OmniLIS Informatics',
    activeNav: 'contact',
    query: req.query || {}
  });
};

exports.getRequestDemoPage = async (req, reply) => {
  const solutions = await getSolutionsList();
  
  return reply.view('pages/request-demo', {
    pageTitle: 'Request a Live Consultation & Tailored Demo | OmniLIS Informatics',
    activeNav: 'demo',
    solutions,
    query: req.query || {}
  });
};
