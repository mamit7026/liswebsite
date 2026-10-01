/**
 * OmniLIS Informatics - Form Validation & AJAX Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  setupDemoForms();
  setupContactForm();
  setupNewsletterForm();
  setupAdminStatusButtons();
});

// Setup Demo Forms (Modal + Request Demo Page)
function setupDemoForms() {
  const forms = document.querySelectorAll('form[action="/api/demo"]');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      const alertBox = form.querySelector('.form-alert-box') || createAlertBox(form);

      // Collect form data
      const formData = new FormData(form);
      const payload = {};
      
      formData.forEach((value, key) => {
        if (key === 'modulesOfInterest') {
          if (!payload[key]) payload[key] = [];
          payload[key].push(value);
        } else {
          payload[key] = value;
        }
      });

      // Show loading spinner
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Scheduling Consultation...';
      }
      alertBox.className = 'form-alert-box d-none';

      try {
        const response = await fetch('/api/demo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          alertBox.className = 'form-alert-box alert alert-success mt-3';
          alertBox.innerHTML = `<strong><i class="bi bi-check-circle-fill me-2"></i>Confirmed!</strong> ${data.message}`;
          form.reset();

          if (window.showOmniToast) {
            window.showOmniToast('Demo request received! Our clinical team will reach out shortly.');
          }

          // If inside a bootstrap modal, close after 2.5s
          const modalEl = form.closest('.modal');
          if (modalEl && window.bootstrap) {
            setTimeout(() => {
              const modalInstance = bootstrap.Modal.getInstance(modalEl);
              if (modalInstance) modalInstance.hide();
            }, 2500);
          }
        } else {
          // Display validation error messages from Joi
          const errors = data.errors || [data.message || 'Validation failed.'];
          alertBox.className = 'form-alert-box alert alert-danger mt-3';
          alertBox.innerHTML = `
            <strong><i class="bi bi-exclamation-triangle-fill me-2"></i>Please check the following:</strong>
            <ul class="mb-0 mt-2 ps-3">
              ${errors.map(err => `<li>${err}</li>`).join('')}
            </ul>
          `;
        }
      } catch (err) {
        console.error('Submission error:', err);
        alertBox.className = 'form-alert-box alert alert-danger mt-3';
        alertBox.innerHTML = '<strong>Connection Error:</strong> Unable to transmit demo request. Please verify connection or call 1-800-OMNI-LIS.';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  });
}

// Setup Contact Form
function setupContactForm() {
  const form = document.querySelector('form[action="/api/contact"]');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
    const alertBox = form.querySelector('.form-alert-box') || createAlertBox(form);

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    }
    alertBox.className = 'form-alert-box d-none';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alertBox.className = 'form-alert-box alert alert-success mt-3';
        alertBox.innerHTML = `<strong><i class="bi bi-check-circle-fill me-2"></i>Message Sent!</strong> ${data.message}`;
        form.reset();
        if (window.showOmniToast) {
          window.showOmniToast('Message sent to specialist team!');
        }
      } else {
        const errors = data.errors || [data.message || 'Validation failed.'];
        alertBox.className = 'form-alert-box alert alert-danger mt-3';
        alertBox.innerHTML = `
          <strong><i class="bi bi-exclamation-triangle-fill me-2"></i>Please review:</strong>
          <ul class="mb-0 mt-2 ps-3">
            ${errors.map(err => `<li>${err}</li>`).join('')}
          </ul>
        `;
      }
    } catch (err) {
      alertBox.className = 'form-alert-box alert alert-danger mt-3';
      alertBox.innerHTML = 'Unable to send message right now. Please try again.';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}

// Setup Newsletter Form in Footer
function setupNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email) return;

    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        if (window.showOmniToast) {
          window.showOmniToast(data.message, true);
        } else {
          alert(data.message);
        }
        form.reset();
      } else {
        if (window.showOmniToast) {
          window.showOmniToast(data.message || 'Subscription failed', false);
        }
      }
    } catch (err) {
      if (window.showOmniToast) {
        window.showOmniToast('Subscription error', false);
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// Admin Demo Status Toggle
function setupAdminStatusButtons() {
  const statusSelects = document.querySelectorAll('.demo-status-select');
  statusSelects.forEach(select => {
    select.addEventListener('change', async (e) => {
      const id = select.getAttribute('data-id');
      const newStatus = select.value;

      try {
        const response = await fetch(`/admin/demo/${id}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        const result = await response.json();
        if (result.success && window.showOmniToast) {
          window.showOmniToast(`Status updated to "${newStatus}"!`);
        }
      } catch (err) {
        alert('Failed to update status');
      }
    });
  });
}

function createAlertBox(form) {
  const div = document.createElement('div');
  div.className = 'form-alert-box d-none';
  form.appendChild(div);
  return div;
}
