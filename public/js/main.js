/**
 * LISDESK - Enterprise Client Interactivity & Diagnostics Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initAnimatedCounters();
  initRoiCalculator();
  initConsoleWorkstation();
  initWorkflowTabs();
});

// Navbar scroll shadow
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-omni');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Enterprise Console Workstation Simulation (Hero UI)
function initConsoleWorkstation() {
  const tbodyQueue = document.getElementById('consoleSpecimenBody');
  const tbodyGenomics = document.getElementById('consoleGenomicsBody');
  const tbodyTelemetry = document.getElementById('consoleTelemetryBody');
  const tabBtns = document.querySelectorAll('.console-tab-btn');

  // Datasets for different clinical disciplines
  const datasets = {
    chemistry: [
      { id: 'SP-94821', patient: 'Anderson, J. (48M)', test: 'Comprehensive Metabolic (CMP)', analyzer: 'Cobas 8000', delta: '0.0% (Stable)', status: 'Auto-Verified', cls: 'badge-status-auto' },
      { id: 'SP-94822', patient: 'Rodriguez, M. (34F)', test: 'Lipid Panel + hs-CRP', analyzer: 'Alinity c-series', delta: '+1.4% (Normal)', status: 'Auto-Verified', cls: 'badge-status-auto' },
      { id: 'SP-94823', patient: 'Chen, L. (62M)', test: 'Renal Function + Electrolytes', analyzer: 'Cobas 8000', delta: 'High K+ (5.8)', status: 'Review Flag', cls: 'badge-status-review' },
      { id: 'SP-94824', patient: 'Patel, S. (29F)', test: 'CBC w/ 5-Part Differential', analyzer: 'Sysmex XN-9000', delta: '-0.8% (Normal)', status: 'Auto-Verified', cls: 'badge-status-auto' },
      { id: 'SP-94825', patient: 'Williams, D. (71M)', test: 'Troponin I High-Sensitivity', analyzer: 'Atellica Solution', delta: '<0.01 ng/mL', status: 'Auto-Verified', cls: 'badge-status-auto' }
    ],
    genomics: [
      { id: 'NGS-4019', patient: 'Taylor, R. (54F)', test: 'Targeted Oncology (52 Genes)', analyzer: 'NovaSeq 6000', delta: 'Q30 > 94.2%', status: 'DRAGEN Pipeline', cls: 'badge-status-seq' },
      { id: 'NGS-4020', patient: 'Kowalski, E. (41M)', test: 'Hereditary BRCA1/2 Panel', analyzer: 'NextSeq 2000', delta: 'Coverage 500x', status: 'ACMG Tier II', cls: 'badge-status-seq' },
      { id: 'NGS-4021', patient: 'Kumar, V. (38M)', test: 'Whole Exome Sequencing (WES)', analyzer: 'NovaSeq X Plus', delta: 'Align 99.8%', status: 'Variant Curation', cls: 'badge-status-review' },
      { id: 'NGS-4022', patient: 'Davis, C. (66F)', test: 'Liquid Biopsy ctDNA EGFR', analyzer: 'NextSeq 2000', delta: 'VAF 1.2%', status: 'Auto-Classified', cls: 'badge-status-auto' }
    ],
    telemetry: [
      { id: 'IF-701', patient: 'Epic EHR Engine', test: 'HL7 ORM / OML Order Stream', analyzer: 'TCP/IP 2575', delta: '3.2 ms latency', status: 'Bidirectional Sync', cls: 'badge-status-sync' },
      { id: 'IF-702', patient: 'Roche Cobas 8000 #1', test: 'ASTM E1394 Result Dispatch', analyzer: 'RS232 -> IP', delta: '0 Frame Drops', status: 'Connected (Online)', cls: 'badge-status-auto' },
      { id: 'IF-703', patient: 'Sysmex XN Line 2', test: 'Host Query Automated Rack', analyzer: 'ASTM E1381', delta: '128 Tests/Hr', status: 'Connected (Online)', cls: 'badge-status-auto' },
      { id: 'IF-704', patient: 'Clearinghouse 837P', test: 'EDI ANSI X12 Real-Time Scrub', analyzer: 'HTTPS REST', delta: '98.4% Clean', status: 'Claim Verified', cls: 'badge-status-auto' }
    ]
  };

  const renderQueueTable = () => {
    if (!tbodyQueue) return;
    tbodyQueue.innerHTML = datasets.chemistry.map((item, index) => `
      <tr class="${index === 0 ? 'selected' : ''}" style="cursor: pointer;" onclick="window.selectConsoleRow(this)">
        <td class="table-barcode"><i class="bi bi-upc me-1 text-muted"></i>${item.id}</td>
        <td class="fw-semibold text-dark">${item.patient}</td>
        <td>${item.test}</td>
        <td class="small text-muted">${item.analyzer}</td>
        <td class="small font-mono">${item.delta}</td>
        <td><span class="badge-status ${item.cls}">${item.status}</span></td>
      </tr>
    `).join('');
  };

  const renderGenomicsTable = () => {
    if (!tbodyGenomics) return;
    tbodyGenomics.innerHTML = datasets.genomics.map((item, index) => `
      <tr class="${index === 0 ? 'selected' : ''}">
        <td class="table-barcode text-purple"><i class="bi bi-dna me-1"></i>${item.id}</td>
        <td class="fw-semibold text-dark">${item.patient}</td>
        <td>${item.test}</td>
        <td class="small text-muted">${item.analyzer}</td>
        <td class="small font-mono text-cyan">${item.delta}</td>
        <td><span class="badge-status ${item.cls}">${item.status}</span></td>
      </tr>
    `).join('');
  };

  const renderTelemetryTable = () => {
    if (!tbodyTelemetry) return;
    tbodyTelemetry.innerHTML = datasets.telemetry.map((item, index) => `
      <tr class="${index === 0 ? 'selected' : ''}">
        <td class="table-barcode font-mono text-info"><i class="bi bi-broadcast me-1"></i>${item.id}</td>
        <td class="fw-semibold text-dark">${item.patient}</td>
        <td>${item.test}</td>
        <td class="small text-muted font-mono">${item.analyzer}</td>
        <td class="small font-mono text-success">${item.delta}</td>
        <td><span class="badge-status ${item.cls}">${item.status}</span></td>
      </tr>
    `).join('');
  };

  // View Panels mapping
  const panels = {
    lab: document.getElementById('viewLab'),
    queue: document.getElementById('viewQueue'),
    genomics: document.getElementById('viewGenomics'),
    telemetry: document.getElementById('viewTelemetry')
  };

  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const viewKey = btn.getAttribute('data-view') || 'lab';
        Object.keys(panels).forEach(key => {
          if (panels[key]) {
            if (key === viewKey) {
              panels[key].classList.remove('d-none');
            } else {
              panels[key].classList.add('d-none');
            }
          }
        });
      });
    });
  }

  // Row selection handler
  window.selectConsoleRow = (row) => {
    if (tbodyQueue) {
      tbodyQueue.querySelectorAll('tr').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
    }
  };

  // Initial render of all tables
  renderQueueTable();
  renderGenomicsTable();
  renderTelemetryTable();

  // Periodic subtle live ticker to simulate incoming analyzer records
  setInterval(() => {
    if (!tbodyQueue) return;
    const randomId = Math.floor(94826 + Math.random() * 800);
    const newSample = {
      id: `SP-${randomId}`,
      patient: 'Auto-Accession #' + Math.floor(100 + Math.random() * 900),
      test: 'Basic Metabolic Panel (BMP)',
      analyzer: 'Cobas 8000',
      delta: '0.0% (Passed)',
      status: 'Auto-Verified',
      cls: 'badge-status-auto'
    };
    datasets.chemistry.unshift(newSample);
    if (datasets.chemistry.length > 5) datasets.chemistry.pop();
    renderQueueTable();
  }, 6000);
}

// Interactive Laboratory ROI & TAT Calculator
function initRoiCalculator() {
  const slider = document.getElementById('testVolumeSlider');
  const volumeDisplay = document.getElementById('volumeDisplay');
  const annualSavingsDisplay = document.getElementById('annualSavings');
  const hoursSavedDisplay = document.getElementById('hoursSaved');
  const tatReductionDisplay = document.getElementById('tatReduction');

  if (!slider) return;

  const updateCalculations = () => {
    const volume = parseInt(slider.value, 10);
    if (volumeDisplay) {
      volumeDisplay.textContent = volume.toLocaleString() + ' tests / day';
    }

    // Calculations based on clinical laboratory operational models:
    // Manual review elimination + zero-error electronic accessioning
    const hoursSavedPerWeek = Math.round((volume * 6 * 0.8) / 60);
    const annualSavings = Math.round((hoursSavedPerWeek * 52 * 42) + (volume * 365 * 0.22));
    
    let tatPercent = 40;
    if (volume >= 2500) tatPercent = 46;
    if (volume >= 6000) tatPercent = 52;

    if (annualSavingsDisplay) {
      annualSavingsDisplay.textContent = '$' + annualSavings.toLocaleString();
    }
    if (hoursSavedDisplay) {
      hoursSavedDisplay.textContent = hoursSavedPerWeek.toLocaleString() + ' hrs/wk';
    }
    if (tatReductionDisplay) {
      tatReductionDisplay.textContent = '-' + tatPercent + '%';
    }
  };

  slider.addEventListener('input', updateCalculations);
  updateCalculations();
}

// Architecture Workflow Tab Switcher
function initWorkflowTabs() {
  const tabs = document.querySelectorAll('.arch-tab-btn');
  const panels = document.querySelectorAll('.arch-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.add('d-none'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.remove('d-none');
      }
    });
  });
}

// Animated Metric Counters
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        
        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const current = (progress * (target - start) + start).toFixed(decimals);
          el.textContent = prefix + Number(current).toLocaleString() + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = prefix + target.toLocaleString() + suffix;
          }
        };

        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(c => observer.observe(c));
}

// Global Toast helper
window.showOmniToast = (message, isSuccess = true) => {
  let toast = document.getElementById('omniToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'omniToast';
    toast.className = 'omni-toast';
    document.body.appendChild(toast);
  }

  toast.style.borderLeftColor = isSuccess ? '#0D9488' : '#DC2626';
  toast.innerHTML = `
    <i class="bi ${isSuccess ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'} fs-5"></i>
    <div style="font-size: 0.88rem; font-weight: 600; color: #0F172A;">${message}</div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
};
