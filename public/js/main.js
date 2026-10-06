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
    core: document.getElementById('viewCore'),
    genomics: document.getElementById('viewGenomics'),
    telemetry: document.getElementById('viewTelemetry')
  };

  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const viewKey = btn.getAttribute('data-view') || 'core';
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

  // Interactive Sample Selection & Inspector Data
  const sampleProfiles = {
    anderson: {
      name: 'Anderson, James M.',
      mrn: 'MRN: #984210 • 48Y / M • Fasting Draw',
      panel: 'CMP14',
      analytes: [
        { name: 'Glucose (Fasting)', ref: 'Ref: 70 - 99 mg/dL', val: '94 mg/dL', pct: '55%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'Potassium (K+)', ref: 'Ref: 3.5 - 5.0 mEq/L', val: '4.2 mEq/L', pct: '60%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'Creatinine (eGFR)', ref: 'Ref: 0.6 - 1.2 mg/dL', val: '0.9 mg/dL', pct: '48%', tag: 'OPTIMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'Sodium (Na+)', ref: 'Ref: 136 - 145 mEq/L', val: '140 mEq/L', pct: '52%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' }
      ]
    },
    rodriguez: {
      name: 'Rodriguez, Maria K.',
      mrn: 'MRN: #739104 • 34Y / F • Routine Draw',
      panel: 'LIPID+CRP',
      analytes: [
        { name: 'Total Cholesterol', ref: 'Ref: < 200 mg/dL', val: '182 mg/dL', pct: '50%', tag: 'DESIRABLE', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'HDL Cholesterol', ref: 'Ref: > 50 mg/dL', val: '58 mg/dL', pct: '65%', tag: 'OPTIMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'LDL Cholesterol', ref: 'Ref: < 100 mg/dL', val: '98 mg/dL', pct: '48%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'hs-CRP (Cardio)', ref: 'Ref: < 1.0 mg/L', val: '0.8 mg/L', pct: '40%', tag: 'LOW RISK', tagCls: 'bg-success-subtle text-success border-success-subtle' }
      ]
    },
    chen: {
      name: 'Chen, Larry T.',
      mrn: 'MRN: #481920 • 62Y / M • Urgent Care',
      panel: 'RENAL+K',
      analytes: [
        { name: 'Potassium (K+)', ref: 'Ref: 3.5 - 5.0 mEq/L', val: '5.8 mEq/L', pct: '92%', tag: 'HIGH CRITICAL', tagCls: 'bg-danger-subtle text-danger border-danger-subtle' },
        { name: 'Serum Creatinine', ref: 'Ref: 0.6 - 1.2 mg/dL', val: '2.1 mg/dL', pct: '88%', tag: 'ELEVATED', tagCls: 'bg-warning-subtle text-warning border-warning-subtle' },
        { name: 'Blood Urea Nitrogen', ref: 'Ref: 7 - 20 mg/dL', val: '38 mg/dL', pct: '85%', tag: 'HIGH', tagCls: 'bg-warning-subtle text-warning border-warning-subtle' },
        { name: 'eGFR CKD-EPI', ref: 'Ref: > 60 mL/min', val: '32 mL/min', pct: '30%', tag: 'STAGE 3B', tagCls: 'bg-danger-subtle text-danger border-danger-subtle' }
      ]
    },
    patel: {
      name: 'Patel, Sarah V.',
      mrn: 'MRN: #601839 • 29Y / F • Pre-Op Screen',
      panel: 'CBC-DIFF',
      analytes: [
        { name: 'White Blood Cells', ref: 'Ref: 4.5 - 11.0 K/uL', val: '6.8 K/uL', pct: '50%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'Hemoglobin (Hgb)', ref: 'Ref: 12.0 - 15.5 g/dL', val: '13.8 g/dL', pct: '60%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'Platelets', ref: 'Ref: 150 - 450 K/uL', val: '245 K/uL', pct: '52%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'Neutrophils %', ref: 'Ref: 40 - 70 %', val: '58 %', pct: '56%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' }
      ]
    },
    williams: {
      name: 'Williams, David B.',
      mrn: 'MRN: #892014 • 71Y / M • ED Chest Pain',
      panel: 'CARDIAC',
      analytes: [
        { name: 'Troponin I (hs-cTnI)', ref: 'Ref: < 0.04 ng/mL', val: '<0.01 ng/mL', pct: '20%', tag: 'NEGATIVE', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'CK-MB Mass', ref: 'Ref: < 5.0 ng/mL', val: '1.8 ng/mL', pct: '35%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'Myoglobin', ref: 'Ref: < 85 ng/mL', val: '32 ng/mL', pct: '38%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' },
        { name: 'BNP (Natriuretic)', ref: 'Ref: < 100 pg/mL', val: '45 pg/mL', pct: '45%', tag: 'NORMAL', tagCls: 'bg-success-subtle text-success border-success-subtle' }
      ]
    }
  };

  window.selectSample = (key, el) => {
    const data = sampleProfiles[key];
    if (!data) return;

    // Highlight clicked row
    const items = document.querySelectorAll('.console-queue-item');
    items.forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');

    // Update inspector
    const nameEl = document.getElementById('inspectorName');
    const analytesEl = document.getElementById('inspectorAnalytes');

    if (nameEl) {
      nameEl.textContent = data.name;
      if (nameEl.nextElementSibling) {
        nameEl.nextElementSibling.textContent = data.mrn;
      }
    }

    if (analytesEl) {
      analytesEl.innerHTML = data.analytes.map(a => `
        <div class="analyte-row">
          <div>
            <div class="analyte-name">${a.name}</div>
            <div class="analyte-ref">${a.ref}</div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <div class="analyte-bar"><div class="analyte-bar-fill" style="width: ${a.pct};"></div></div>
            <span class="analyte-val">${a.val}</span>
            <span class="badge ${a.tagCls} font-mono" style="font-size: 0.65rem;">${a.tag}</span>
          </div>
        </div>
      `).join('');
    }
  };

  // Initial render of tables
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
