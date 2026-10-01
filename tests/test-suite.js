const http = require('http');
const mongoose = require('mongoose');

const BASE_URL = 'http://127.0.0.1:3500';

const request = (path, options = {}, postData = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
};

async function runTestSuite() {
  console.log('================================================================');
  console.log('   LISDESK Platform - Comprehensive Automated Test Suite');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName, detail = '') => {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} ${detail ? '-> ' + detail : ''}`);
      failed++;
    }
  };

  try {
    // 1. Static Asset Verification
    console.log('--- 1. Testing Core Assets & Theme Tokens ---');
    const cssRes = await request('/public/css/main.css');
    assert(cssRes.statusCode === 200, 'main.css returns HTTP 200');
    assert(cssRes.body.includes('--primary: #0F6CBD'), 'CSS includes Primary Theme #0F6CBD');
    assert(cssRes.body.includes('--secondary: #0F9D8A'), 'CSS includes Secondary Theme #0F9D8A');
    assert(cssRes.body.includes('--bg-main: #F8FAFC'), 'CSS includes Background #F8FAFC');
    assert(cssRes.body.includes('--text-main: #172033'), 'CSS includes Text #172033');
    assert(cssRes.body.includes('--bg-light: #EFF6FF'), 'CSS includes Light Section #EFF6FF');

    const jsRes = await request('/public/js/main.js');
    assert(jsRes.statusCode === 200, 'main.js returns HTTP 200');
    assert(jsRes.body.includes('initRoiCalculator'), 'main.js includes ROI Calculator');

    const inqRes = await request('/public/js/inquiry.js');
    assert(inqRes.statusCode === 200, 'inquiry.js returns HTTP 200');

    // 2. Web Pages HTTP 200 Verification
    console.log('\n--- 2. Testing All Web Page Routes ---');
    const pages = [
      { path: '/', title: 'Home Page', check: 'LISDESK' },
      { path: '/solutions', title: 'Solutions Page', check: 'Tailored Solutions' },
      { path: '/products', title: 'Products Page', check: 'Enterprise Technology Modules' },
      { path: '/industries', title: 'Industries Page', check: 'Healthcare Ecosystem' },
      { path: '/resources', title: 'Resources Page', check: 'Clinical Informatics Resources' },
      { path: '/about', title: 'About Page', check: 'Pioneering the Future' },
      { path: '/contact', title: 'Contact Page', check: 'Speak with a Laboratory Specialist' },
      { path: '/request-demo', title: 'Request Demo Page', check: 'Schedule a Live Demonstration' },
      { path: '/admin', title: 'Admin Dashboard', check: 'Informatics Lead' }
    ];

    for (let p of pages) {
      const res = await request(p.path);
      assert(res.statusCode === 200, `${p.title} (${p.path}) returns HTTP 200`);
      assert(res.body.includes(p.check), `${p.title} contains expected markup: "${p.check}"`);
    }

    // 3. 404 Route Verification
    console.log('\n--- 3. Testing 404 Handling ---');
    const notFoundRes = await request('/non-existent-page-xyz');
    assert(notFoundRes.statusCode === 404, 'Non-existent page returns HTTP 404');
    assert(notFoundRes.body.includes('Diagnostic Record Not Located'), '404 renders custom branded view');

    // 4. Joi Validation on Demo Requests
    console.log('\n--- 4. Testing Joi Validation on Demo Request API ---');
    
    // 4.1 Empty payload
    const emptyDemo = await request('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }, {});
    assert(emptyDemo.statusCode === 400, 'Empty demo payload rejected with HTTP 400');
    const emptyJson = JSON.parse(emptyDemo.body);
    assert(emptyJson.success === false, 'Error response has success: false');
    assert(emptyJson.errors.length >= 3, 'Returns at least 3 Joi validation errors for missing required fields');

    // 4.2 Invalid Email
    const invalidEmailDemo = await request('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }, {
      fullName: 'Test User',
      email: 'not-an-email',
      organization: 'Test Labs'
    });
    assert(invalidEmailDemo.statusCode === 400, 'Invalid email rejected with HTTP 400');
    const invalidEmailJson = JSON.parse(invalidEmailDemo.body);
    assert(invalidEmailJson.errors.some(e => e.includes('valid email')), 'Returns clear email format error');

    // 4.3 Valid Submission
    const uniqueEmail = `dr.vance_${Date.now()}@metropathlabs.org`;
    const validDemo = await request('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }, {
      fullName: 'Dr. Eleanor Vance',
      email: uniqueEmail,
      phone: '+1 (555) 432-8899',
      organization: 'MetroPath Clinical Diagnostics',
      labType: 'Molecular & Pathology Lab',
      dailyTestVolume: '2,500 - 10,000 tests/day',
      timeframe: 'Immediate (1-3 months)',
      modulesOfInterest: ['Clinical Core LIS', 'Anatomic Pathology'],
      notes: 'Automated test suite verification request.'
    });
    assert(validDemo.statusCode === 201, 'Valid demo request accepted with HTTP 201');
    const validJson = JSON.parse(validDemo.body);
    assert(validJson.success === true, 'Response confirms success');
    assert(validJson.data && validJson.data.id, 'Response returns saved MongoDB ID');

    // 5. Contact Form Submission & Validation
    console.log('\n--- 5. Testing Contact Message Submission ---');
    const validContact = await request('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }, {
      name: 'Marcus Brody',
      email: 'mbrody@museumlab.edu',
      company: 'Museum Pathology Archive',
      department: 'HL7/FHIR Integrations',
      subject: 'Biobanking Specimen Interface Protocol',
      message: 'Inquiring regarding automated cryo-freezer temperature and RFID logging integration.'
    });
    assert(validContact.statusCode === 201, 'Contact inquiry accepted with HTTP 201');

    // 6. Newsletter Subscription
    console.log('\n--- 6. Testing Newsletter Subscription ---');
    const validNews = await request('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }, {
      email: `subscriber_${Date.now()}@diagnosticnetwork.org`
    });
    assert(validNews.statusCode === 200, 'Newsletter subscription returns HTTP 200');

    // 7. Database & Admin Table Reflection
    console.log('\n--- 7. Testing Admin Dashboard Reflection ---');
    const adminCheck = await request('/admin');
    assert(adminCheck.statusCode === 200, 'Admin Dashboard renders HTTP 200');
    assert(adminCheck.body.includes('Dr. Eleanor Vance'), 'Admin Dashboard contains "Dr. Eleanor Vance"');
    assert(adminCheck.body.includes('MetroPath Clinical Diagnostics'), 'Admin Dashboard contains "MetroPath Clinical Diagnostics"');
    assert(adminCheck.body.includes('Marcus Brody'), 'Admin Dashboard contains contact sender "Marcus Brody"');
    assert(adminCheck.body.includes('demo-status-select'), 'Admin Dashboard contains interactive status select controls');

    console.log('\n================================================================');
    console.log(`   TEST SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');

  } catch (err) {
    console.error('Test execution error:', err);
  }
}

runTestSuite();

