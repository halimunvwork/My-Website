/**
 * main.js — MyWebsite
 * Handles: navbar scroll, mobile menu, counter animation,
 * scroll reveal, contact form validation, active nav links
 */

// =============================================
// NAVBAR — Scrolled state
// =============================================
const navbar = document.getElementById('navbar');

const handleNavbarScroll = () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// =============================================
// MOBILE MENU — Hamburger toggle
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// =============================================
// ACTIVE NAV LINK — Based on scroll position
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const updateActiveLink = () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });

// =============================================
// COUNTER ANIMATION — Stats numbers
// =============================================
const animateCounter = (el, target, duration = 2000) => {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-target]');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el, parseInt(el.dataset.target, 10));
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
};

// =============================================
// SCROLL REVEAL — Fade in on scroll
// =============================================
const initScrollReveal = () => {
  const revealEls = document.querySelectorAll(
    '.service-card, .team-card, .feature-item, .about-visual, .about-content, .contact-info, .contact-form-wrapper'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
};

// =============================================
// CONTACT FORM — Validation & Submit
// =============================================
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById('name'),
      err: document.getElementById('name-error'),
    },
    email: {
      el: document.getElementById('email'),
      err: document.getElementById('email-error'),
    },
    subject: {
      el: document.getElementById('subject'),
      err: document.getElementById('subject-error'),
    },
    message: {
      el: document.getElementById('message'),
      err: document.getElementById('message-error'),
    },
  };

  const validate = (name, value) => {
    if (name === 'name')
      return value.trim().length < 2 ? 'Nama minimal 2 karakter' : '';
    if (name === 'email')
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? 'Format email tidak valid'
        : '';
    if (name === 'subject')
      return value.trim().length < 3 ? 'Subjek minimal 3 karakter' : '';
    if (name === 'message')
      return value.trim().length < 10 ? 'Pesan minimal 10 karakter' : '';
    return '';
  };

  const showError = (field, msg) => {
    field.el.classList.toggle('error', !!msg);
    field.err.textContent = msg;
  };

  // Real-time validation
  Object.entries(fields).forEach(([name, field]) => {
    field.el.addEventListener('blur', () => {
      showError(field, validate(name, field.el.value));
    });
    field.el.addEventListener('input', () => {
      if (field.el.classList.contains('error')) {
        showError(field, validate(name, field.el.value));
      }
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    Object.entries(fields).forEach(([name, field]) => {
      const msg = validate(name, field.el.value);
      showError(field, msg);
      if (msg) isValid = false;
    });

    if (!isValid) return;

    // Sending to Web3Forms
    const btn = document.getElementById('submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');

    btn.disabled = true;
    btnText.hidden = true;
    btnLoader.hidden = false;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'a1849c6c-be8e-4201-8bce-00f486c1f0e8',
          name: fields.name.el.value,
          email: fields.email.el.value,
          subject: fields.subject.el.value,
          message: fields.message.el.value,
          from_name: 'MyWebsite Contact Form'
        })
      });

      const json = await response.json();

      if (response.status === 200) {
        // Show success
        const wrapper = form.parentElement;
        wrapper.innerHTML = `
          <div class="form-success">
            <span class="form-success-icon">✅</span>
            <h3 style="font-size:1.5rem;font-weight:700;margin-bottom:0.75rem;">Pesan Terkirim!</h3>
            <p style="color:var(--clr-text-2)">Terima kasih! Kami akan menghubungi kamu dalam 1-2 hari kerja.</p>
          </div>
        `;
      } else {
        throw new Error(json.message || 'Gagal mengirim pesan');
      }
    } catch (error) {
      console.error(error);
      alert('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba beberapa saat lagi.');
      btn.disabled = false;
      btnText.hidden = false;
      btnLoader.hidden = true;
    }
  });
};

// =============================================
// FOOTER YEAR
// =============================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =============================================
// INIT ALL
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initScrollReveal();
  initContactForm();
  handleNavbarScroll();
  updateActiveLink();
});
