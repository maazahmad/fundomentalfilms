/* ============================================================
   FUNDOMENTALFILMS — Main Application
   ============================================================
   SPA with hash-based routing, page transitions,
   Vimeo embeds, and intersection observer animations.
   ============================================================ */

(function () {
  'use strict';

  // ---- DOM References ----
  const appContainer = document.getElementById('app');
  const navLinks = document.querySelectorAll('.nav-link[data-route]');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  const mobileNavLinks = document.querySelectorAll('.nav-mobile .nav-link[data-route]');

  // ---- State ----
  let currentRoute = null;
  let isTransitioning = false;

  // ---- Router ----
  function getRoute() {
    const hash = window.location.hash || '#/';
    return hash;
  }

  function navigate(route) {
    if (isTransitioning) return;
    window.location.hash = route;
  }

  function handleRouteChange() {
    const route = getRoute();
    if (route === currentRoute) return;

    const oldRoute = currentRoute;
    currentRoute = route;

    // Close mobile nav if open
    closeMobileNav();

    // Transition pages
    transitionToPage(route);

    // Update nav active state
    updateActiveNav(route);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ---- Page Transitions ----
  function transitionToPage(route) {
    isTransitioning = true;

    // If there's existing content, fade it out first
    const existingPage = appContainer.querySelector('.page');
    if (existingPage) {
      existingPage.classList.remove('visible');
      setTimeout(() => {
        renderPage(route);
        isTransitioning = false;
      }, 250);
    } else {
      renderPage(route);
      isTransitioning = false;
    }
  }

  function renderPage(route) {
    let html = '';

    if (route === '#/' || route === '#') {
      html = renderHome();
    } else if (route === '#/projects') {
      html = renderProjects();
    } else if (route.startsWith('#/project/')) {
      const slug = route.replace('#/project/', '');
      html = renderProjectDetail(slug);
    } else if (route === '#/about') {
      html = renderAbout();
    } else if (route === '#/contact') {
      html = renderContact();
    } else {
      html = render404();
    }

    appContainer.innerHTML = html;

    // Trigger page enter animation
    requestAnimationFrame(() => {
      const page = appContainer.querySelector('.page');
      if (page) {
        requestAnimationFrame(() => {
          page.classList.add('visible');
        });
      }
    });

    // Init page-specific features
    if (route === '#/' || route === '#') {
      initHomeHoverPreview();
    } else if (route === '#/projects') {
      initProjectCardAnimations();
    } else if (route === '#/contact') {
      initContactForm();
    }

    // Bind project card clicks
    bindProjectLinks();
  }

  // ---- Page Renderers ----

  function renderHome() {
    const cards = projects.map(p => `
      <a href="#/project/${p.slug}" class="home-card" data-project-link>
        <img src="${p.thumbnail}" alt="${p.title}" loading="lazy" />
        <div class="home-card-title">
          <span>${p.title}</span>
        </div>
      </a>
    `).join('');

    return `
      <div class="page">
        <section class="home-grid">
          ${cards}
        </section>
      </div>
    `;
  }

  function renderProjects() {
    const cards = projects.map((p, i) => `
      <a href="#/project/${p.slug}" class="project-card" data-project-link style="transition-delay: ${i * 0.08}s">
        <img 
          src="${p.thumbnail}" 
          alt="${p.title}" 
          class="project-card-image"
          loading="lazy"
        />
        <div class="project-card-overlay">
          <div class="project-card-title">${p.title}</div>
          <div class="project-card-category">${formatCategory(p.category)}</div>
        </div>
      </a>
    `).join('');

    return `
      <div class="page">
        <section class="projects-page">
          <h1 class="projects-page-title">Projects</h1>
          <div class="projects-grid">
            ${cards}
          </div>
        </section>
      </div>
    `;
  }

  function renderProjectDetail(slug) {
    const project = projects.find(p => p.slug === slug);

    if (!project) {
      return render404();
    }

    // Build meta items
    let metaHtml = '';
    if (project.year) {
      metaHtml += `
        <div class="project-meta-item">
          <span class="project-meta-label">Year</span>
          <span class="project-meta-value">${project.year}</span>
        </div>
      `;
    }
    metaHtml += `
      <div class="project-meta-item">
        <span class="project-meta-label">Category</span>
        <span class="project-meta-value">${formatCategory(project.category)}</span>
      </div>
    `;
    if (project.client) {
      metaHtml += `
        <div class="project-meta-item">
          <span class="project-meta-label">Client</span>
          <span class="project-meta-value">${project.client}</span>
        </div>
      `;
    }
    if (project.role) {
      metaHtml += `
        <div class="project-meta-item">
          <span class="project-meta-label">Role</span>
          <span class="project-meta-value">${project.role}</span>
        </div>
      `;
    }

    return `
      <div class="page">
        <section class="project-detail">
          <a href="#/projects" class="project-back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Projects
          </a>

          <div class="vimeo-container">
            <div class="vimeo-loading"></div>
            <iframe 
              src="https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0&dnt=1" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowfullscreen
              title="${project.title}"
              onload="this.previousElementSibling.style.display='none'"
            ></iframe>
          </div>

          <h1 class="project-detail-title">${project.title}</h1>

          <div class="project-detail-meta">
            ${metaHtml}
          </div>

          <p class="project-detail-description">${project.description}</p>
        </section>
      </div>
    `;
  }

  function renderAbout() {
    // Split about text into paragraphs
    const paragraphs = siteConfig.aboutText
      .split('\n\n')
      .filter(p => p.trim())
      .map(p => `<p>${p.trim()}</p>`)
      .join('');

    return `
      <div class="page">
        <section class="about-page">
          <h1 class="about-page-title">About</h1>
          <div class="about-content">
            <div class="about-text">
              ${paragraphs}
            </div>
            <div class="about-contact">
              <h2 class="about-contact-title">Contact</h2>
              ${siteConfig.email ? `<a href="mailto:${siteConfig.email}" class="about-contact-item">${siteConfig.email}</a>` : ''}
              ${siteConfig.phone ? `<a href="tel:${siteConfig.phone}" class="about-contact-item">${siteConfig.phone}</a>` : ''}
              
              <div class="about-social-links">
                ${siteConfig.social.instagram ? `<a href="${siteConfig.social.instagram}" target="_blank" rel="noopener noreferrer" class="about-social-link">Instagram</a>` : ''}
                ${siteConfig.social.vimeo ? `<a href="${siteConfig.social.vimeo}" target="_blank" rel="noopener noreferrer" class="about-social-link">Vimeo</a>` : ''}
                ${siteConfig.social.linkedin ? `<a href="${siteConfig.social.linkedin}" target="_blank" rel="noopener noreferrer" class="about-social-link">LinkedIn</a>` : ''}
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  function renderContact() {
    return `
      <div class="page">
        <section class="contact-page">
          <h1 class="contact-page-title">Contact</h1>
          <div class="contact-content">
            <div class="contact-intro">
              <p>For enquiries, collaborations, or bookings, send a message below and we'll get back to you.</p>
              ${siteConfig.email ? `<a href="mailto:${siteConfig.email}" class="contact-direct">${siteConfig.email}</a>` : ''}
            </div>

            <form class="contact-form" id="contact-form" novalidate>
              <div class="form-row">
                <label class="form-label" for="cf-name">Name</label>
                <input class="form-input" type="text" id="cf-name" name="name" required autocomplete="name" />
              </div>
              <div class="form-row">
                <label class="form-label" for="cf-email">Email</label>
                <input class="form-input" type="email" id="cf-email" name="email" required autocomplete="email" />
              </div>
              <div class="form-row">
                <label class="form-label" for="cf-message">Message</label>
                <textarea class="form-input form-textarea" id="cf-message" name="message" rows="6" required></textarea>
              </div>

              <!-- Honeypot: hidden from humans, catches bots -->
              <input type="text" name="company" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />

              <div class="form-footer">
                <button type="submit" class="form-submit" id="cf-submit">Send Message</button>
                <p class="form-status" id="cf-status" role="status" aria-live="polite"></p>
              </div>
            </form>
          </div>
        </section>
      </div>
    `;
  }

  function render404() {
    return `
      <div class="page">
        <section class="home-hero">
          <h1 class="hero-name" style="font-size: clamp(1.5rem, 3vw, 2.5rem)">Page not found</h1>
          <p class="hero-subtitle" style="margin-top: 1rem">
            <a href="#/" style="text-decoration: underline; text-underline-offset: 4px;">Return home</a>
          </p>
        </section>
      </div>
    `;
  }

  // ---- Navigation ----
  function updateActiveNav(route) {
    // Determine which nav section is active
    let activeSection = '';
    if (route === '#/' || route === '#') {
      activeSection = '/';
    } else if (route === '#/projects' || route.startsWith('#/project/')) {
      activeSection = '/projects';
    } else if (route === '#/about') {
      activeSection = '/about';
    } else if (route === '#/contact') {
      activeSection = '/contact';
    }

    // Update desktop nav
    navLinks.forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === activeSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update mobile nav
    mobileNavLinks.forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === activeSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ---- Mobile Navigation ----
  function toggleMobileNav() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileNav() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ---- Project Card Animations (Intersection Observer) ----
  function initProjectCardAnimations() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(card => observer.observe(card));
  }

  // ---- Home Hover Preview (floating thumbnail on project title hover) ----
  function initHomeHoverPreview() {
    const preview = document.getElementById('hover-preview');
    const previewImg = document.getElementById('hover-preview-img');
    const items = document.querySelectorAll('.home-project-item');
    if (!preview || !previewImg || !items.length) return;

    let currentThumbnail = '';
    let mouseX = 0;
    let mouseY = 0;
    let previewX = 0;
    let previewY = 0;
    let rafId = null;
    let isHovering = false;

    // Smooth follow with lerp
    function animatePreview() {
      previewX += (mouseX - previewX) * 0.12;
      previewY += (mouseY - previewY) * 0.12;

      // Offset so preview doesn't sit right under cursor
      const offsetX = 20;
      const offsetY = -10;

      // Keep within viewport
      const previewW = preview.offsetWidth || 300;
      const previewH = preview.offsetHeight || 170;
      let x = previewX + offsetX;
      let y = previewY + offsetY;

      if (x + previewW > window.innerWidth - 16) {
        x = previewX - previewW - offsetX;
      }
      if (y + previewH > window.innerHeight - 16) {
        y = window.innerHeight - previewH - 16;
      }
      if (y < 80) y = 80;

      preview.style.left = x + 'px';
      preview.style.top = y + 'px';

      if (isHovering) {
        rafId = requestAnimationFrame(animatePreview);
      }
    }

    items.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const thumb = item.getAttribute('data-thumbnail');
        if (thumb && thumb !== currentThumbnail) {
          currentThumbnail = thumb;
          previewImg.src = thumb;
          previewImg.alt = item.querySelector('.home-project-title')?.textContent || '';
        }
        isHovering = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        previewX = mouseX;
        previewY = mouseY;
        preview.classList.add('visible');
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animatePreview);
      });

      item.addEventListener('mouseleave', () => {
        isHovering = false;
        preview.classList.remove('visible');
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });

      item.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
    });
  }

  // ---- Contact Form ----
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('cf-submit');
    const status = document.getElementById('cf-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      status.textContent = '';
      status.className = 'form-status';

      if (!form.checkValidity()) {
        status.textContent = 'Please fill in all fields correctly.';
        status.classList.add('error');
        return;
      }

      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const res = await fetch('sendmail.php', {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' },
        });
        const data = await res.json().catch(() => ({ ok: false }));

        if (res.ok && data.ok) {
          form.reset();
          status.textContent = 'Thank you — your message has been sent.';
          status.classList.add('success');
        } else {
          status.textContent = data.error || 'Something went wrong. Please try again.';
          status.classList.add('error');
        }
      } catch (err) {
        status.textContent = 'Network error. Please try again, or email us directly.';
        status.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  // ---- Bind Project Links ----
  function bindProjectLinks() {
    // Links are handled via href hash, no extra binding needed
  }

  // ---- Utility Functions ----
  function formatCategory(category) {
    const map = {
      'showreel': 'Showreel',
      'commercial': 'Commercial',
      'narrative': 'Narrative',
      'documentary': 'Documentary',
      'music-video': 'Music Video',
      'fashion': 'Fashion',
      'short-film': 'Short Film',
    };
    return map[category] || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  }

  // ---- Event Listeners ----
  window.addEventListener('hashchange', handleRouteChange);

  hamburger.addEventListener('click', toggleMobileNav);

  // Desktop nav click handling
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      navigate('#' + route);
    });
  });

  // Mobile nav click handling
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      navigate('#' + route);
    });
  });

  // ---- Initialize ----
  document.addEventListener('DOMContentLoaded', () => {
    // Set default route if none
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/';
    }
    handleRouteChange();
  });

  // Handle initial load (if hash already set)
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/';
    }
    handleRouteChange();
  }

})();
