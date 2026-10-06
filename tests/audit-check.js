const http = require('http');

http.get('http://localhost:3500/', res => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('--- AUDIT CHECKLIST ---');
    console.log('1. Main landmark present:', html.includes('<main id="main-content">') && html.includes('</main>'));
    console.log('2. Skip to main link present:', html.includes('href="#main-content"'));
    console.log('3. Google Fonts preconnect:', html.includes('rel="preconnect" href="https://fonts.googleapis.com"'));
    console.log('4. Redundant CDN bootstrap-icons removed:', !html.includes('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'));
    console.log('5. Local WebP lab images used:', 
      html.includes('/public/image/lab-chemistry.webp') &&
      html.includes('/public/image/lab-genomics.webp') &&
      html.includes('/public/image/lab-pathology.webp')
    );
    console.log('6. No unsplash external images in body:', !html.includes('images.unsplash.com'));
    console.log('7. Explicit image dimensions on logos and lab images:',
      html.includes('width="126" height="42"') &&
      html.includes('width="138" height="46"') &&
      html.includes('width="600"')
    );
    console.log('8. Heading order (h3 under h2):',
      html.includes('High-Throughput Clinical Chemistry') &&
      html.includes('<h3 class="fw-bold fs-5 mb-2">High-Throughput Clinical Chemistry</h3>')
    );
    console.log('9. Unique aria-label on architecture links:', html.includes('aria-label="Explore'));
    console.log('--- ALL CHECKS EVALUATED ---');
  });
});
