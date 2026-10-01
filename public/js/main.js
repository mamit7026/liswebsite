/**
 * OmniLIS Informatics - Interactive Client Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initAnimatedCounters();
  initRoiCalculator();
  initLiveSpecimenStream();
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

// Interactive ROI & Lab TAT Calculator
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

    // Calculations based on industry clinical lab benchmarks
    // Average 0.75 mins manual tech labor saved per test via automated verification & bidirectional interfacing
    const hoursSavedPerWeek = Math.round((volume * 6 * 0.75) / 60);
    // Estimated labor cost savings @ $38/hr loaded technologist wage + elimination of re-draws
    const annualSavings = Math.round((hoursSavedPerWeek * 52 * 38) + (volume * 365 * 0.18));
    
    // TAT reduction logic based on volume tiers
    let tatPercent = 38;
    if (volume > 2000) tatPercent = 44;
    if (volume > 5000) tatPercent = 48;

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

// Live specimen stream simulator on hero visual
function initLiveSpecimenStream() {
  const container = document.getElementById('specimenLiveStream');
  if (!container) return;

  const sampleTypes = [
    { code: 'CHEM-4892', test: 'Comprehensive Metabolic Panel', time: '1s ago', status: 'Auto-Verified', cls: 'status-verified' },
    { code: 'HEM-7319', test: 'CBC with 5-Part Differential', time: 'Just now', status: 'Auto-Verified', cls: 'status-verified' },
    { code: 'MOL-1044', test: 'Targeted NGS Oncology Panel (52 Genes)', time: '4s ago', status: 'Sequencing QC Pass', cls: 'status-processing' },
    { code: 'PATH-8812', test: 'Surgical Biopsy - Synoptic Signout', time: '8s ago', status: 'E-Signed', cls: 'status-verified' },
    { code: 'TOX-6621', test: 'LC-MS/MS Confirmation Assay', time: '12s ago', status: 'Review Flag', cls: 'status-flagged' }
  ];

  const renderStream = () => {
    container.innerHTML = sampleTypes.map(item => `
      <div class="specimen-row">
        <div>
          <div class="fw-bold" style="color: var(--text-main); font-size: 0.88rem;">${item.code} &bull; <span class="fw-normal text-muted">${item.test}</span></div>
          <div class="text-muted" style="font-size: 0.76rem;"><i class="bi bi-clock me-1"></i>${item.time} &bull; Analyzer: Cobas / NovaSeq</div>
        </div>
        <span class="status-badge ${item.cls}">${item.status}</span>
      </div>
    `).join('');
  };

  renderStream();

  // Periodically update first item to simulate real-time live events
  setInterval(() => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newItem = {
      code: 'SPEC-' + randomId,
      test: 'HL7 Bidirectional Verification & Release',
      time: 'Just now',
      status: 'Auto-Verified',
      cls: 'status-verified'
    };
    sampleTypes.unshift(newItem);
    sampleTypes.pop();
    renderStream();
  }, 4500);
}

// Diagnostic Workflow Architecture tab switcher
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

// Animated metric counters
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
        const duration = 1800;
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
  }, { threshold: 0.3 });

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

  toast.style.borderLeftColor = isSuccess ? '#0F9D8A' : '#EF4444';
  toast.innerHTML = `
    <i class="bi ${isSuccess ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'} fs-5"></i>
    <div style="font-size: 0.92rem; font-weight: 500; color: #172033;">${message}</div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
};
