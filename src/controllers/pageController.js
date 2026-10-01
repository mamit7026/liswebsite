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
    pageTitle: 'LISDESK | Next-Gen Laboratory Information Management System & Precision Diagnostics',
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
    pageTitle: 'LIMS Solutions & Clinical Disciplines | LISDESK',
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
      pageTitle: 'Solution Not Found | LISDESK',
      activeNav: '',
      message: `The laboratory solution "${slug}" was not found.`
    });
  }

  const relatedSolutions = solutions.filter(s => s.slug !== slug).slice(0, 3);

  return reply.view('pages/solution-detail', {
    pageTitle: `${solution.title} | LISDESK`,
    activeNav: 'solutions',
    solution,
    relatedSolutions,
    query: req.query || {}
  });
};

exports.getProductsPage = async (req, reply) => {
  const products = await getProductsList();

  return reply.view('pages/products', {
    pageTitle: 'Enterprise LIMS Modules & Technology Hub | LISDESK',
    activeNav: 'products',
    products,
    query: req.query || {}
  });
};

exports.getIndustriesPage = async (req, reply) => {
  return reply.view('pages/industries', {
    pageTitle: 'Industries & Healthcare Sectors We Serve | LISDESK',
    activeNav: 'industries',
    query: req.query || {}
  });
};

exports.getResourcesPage = async (req, reply) => {
  return reply.view('pages/resources', {
    pageTitle: 'LIMS Resources, Case Studies & Regulatory Guides | LISDESK',
    activeNav: 'resources',
    caseStudies: caseStudiesData,
    query: req.query || {}
  });
};

exports.getAboutPage = async (req, reply) => {
  return reply.view('pages/about', {
    pageTitle: 'About LISDESK | Precision Laboratory Information Management System',
    activeNav: 'about',
    query: req.query || {}
  });
};

exports.getContactPage = async (req, reply) => {
  return reply.view('pages/contact', {
    pageTitle: 'Contact Lab Specialists & Enterprise Support | LISDESK',
    activeNav: 'contact',
    query: req.query || {}
  });
};

exports.getRequestDemoPage = async (req, reply) => {
  const solutions = await getSolutionsList();
  
  return reply.view('pages/request-demo', {
    pageTitle: 'Request a Live Consultation & Tailored Demo | LISDESK',
    activeNav: 'demo',
    solutions,
    query: req.query || {}
  });
};

exports.getTermsPage = async (req, reply) => {
  return reply.view('pages/terms', {
    pageTitle: 'Terms & Conditions | LISDESK — LIMS Platform',
    activeNav: '',
    query: req.query || {}
  });
};

exports.getPrivacyPolicyPage = async (req, reply) => {
  return reply.view('pages/privacy-policy', {
    pageTitle: 'Privacy Policy | LISDESK — LIMS Platform',
    activeNav: '',
    query: req.query || {}
  });
};

exports.getDataPolicyPage = async (req, reply) => {
  return reply.view('pages/data-policy', {
    pageTitle: 'Data Policy | LISDESK — LIMS Platform',
    activeNav: '',
    query: req.query || {}
  });
};

exports.getRefundPolicyPage = async (req, reply) => {
  return reply.view('pages/refund-policy', {
    pageTitle: 'Refund & Cancellation Policy | LISDESK — LIMS Platform',
    activeNav: '',
    query: req.query || {}
  });
};
