// ============================================
// The Horror Hounds - Main Application JS
// ============================================

(function() {
  'use strict';

  // --- Config ---
  const EVENTS_PER_PAGE = 20;
  let currentPage = 1;
  let activeCategory = 'All';
  let searchQuery = '';
  let filteredEvents = [...EVENTS_DATA];

  // --- DOM Elements ---
  const pastEventsGrid = document.getElementById('pastEventsGrid');
  const filterCategories = document.getElementById('filterCategories');
  const searchInput = document.getElementById('searchInput');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  const eventsCount = document.getElementById('eventsCount');
  const mainNav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Modal elements
  const eventModal = document.getElementById('eventModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalTime = document.getElementById('modalTime');
  const modalLocation = document.getElementById('modalLocation');
  const modalAttendees = document.getElementById('modalAttendees');
  const modalDescription = document.getElementById('modalDescription');

  // --- Initialize ---
  function init() {
    sortEvents();
    renderFilterPills();
    applyFilters();
    setupNav();
    setupSearch();
    setupLoadMore();
    setupModal();
    setupScrollAnimations();
    animateStats();
  }

  // --- Sort events newest to oldest ---
  function sortEvents() {
    EVENTS_DATA.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // --- Filter Pills ---
  function renderFilterPills() {
    filterCategories.innerHTML = EVENT_CATEGORIES.map(cat => `
      <button class="filter-pill${cat === 'All' ? ' active' : ''}" data-category="${cat}">
        ${cat === 'All' ? 'All Events' : cat}
      </button>
    `).join('');

    filterCategories.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category;
      currentPage = 1;
      applyFilters();
    });
  }

  // --- Search ---
  function setupSearch() {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.toLowerCase().trim();
        currentPage = 1;
        applyFilters();
      }, 300);
    });
  }

  // --- Apply Filters ---
  function applyFilters() {
    filteredEvents = EVENTS_DATA.filter(event => {
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      const matchesSearch = !searchQuery ||
        event.title.toLowerCase().includes(searchQuery) ||
        event.location.toLowerCase().includes(searchQuery) ||
        event.description.toLowerCase().includes(searchQuery) ||
        event.category.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    renderEvents();
    updateEventsCount();
    updateLoadMore();
  }

  // --- Render Events ---
  function renderEvents() {
    const eventsToShow = filteredEvents.slice(0, currentPage * EVENTS_PER_PAGE);

    pastEventsGrid.innerHTML = eventsToShow.map((event, index) => `
      <article class="event-card fade-in" data-index="${EVENTS_DATA.indexOf(event)}" style="animation-delay: ${(index % EVENTS_PER_PAGE) * 0.05}s">
        <div class="event-card-image">
          <img src="${event.image}" alt="${event.title}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22><rect fill=%22%231a1a1a%22 width=%22400%22 height=%22225%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%23444%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22>The Horror Hounds</text></svg>'">
          <span class="event-card-category">${event.category}</span>
        </div>
        <div class="event-card-body">
          <h3 class="event-card-title">${event.title}</h3>
          <p class="event-card-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ${formatDate(event.date)} &bull; ${event.time}
          </p>
          <p class="event-card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            ${truncateLocation(event.location)}
          </p>
        </div>
        <div class="event-card-footer">
          <span class="event-card-attendees">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
            ${event.attendees} attended
          </span>
        </div>
      </article>
    `).join('');

    // Trigger fade-in animations
    requestAnimationFrame(() => {
      document.querySelectorAll('.event-card.fade-in').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 50);
      });
    });
  }

  // --- Format date ---
  function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // --- Truncate location ---
  function truncateLocation(location) {
    const parts = location.split(',');
    if (parts.length > 2) {
      return parts.slice(0, 2).join(',').trim();
    }
    return location.length > 50 ? location.substring(0, 47) + '...' : location;
  }

  // --- Events count ---
  function updateEventsCount() {
    const total = filteredEvents.length;
    const showing = Math.min(currentPage * EVENTS_PER_PAGE, total);
    eventsCount.textContent = `Showing ${showing} of ${total} events`;
  }

  // --- Load More ---
  function setupLoadMore() {
    loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      applyFilters();

      // Scroll to newly loaded events smoothly
      const cards = pastEventsGrid.querySelectorAll('.event-card');
      const firstNew = cards[(currentPage - 1) * EVENTS_PER_PAGE];
      if (firstNew) {
        setTimeout(() => {
          firstNew.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }

  function updateLoadMore() {
    const totalShown = currentPage * EVENTS_PER_PAGE;
    loadMoreContainer.style.display = totalShown >= filteredEvents.length ? 'none' : 'flex';
  }

  // --- Navigation ---
  function setupNav() {
    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      mainNav.classList.toggle('scrolled', currentScroll > 50);
      lastScroll = currentScroll;
    }, { passive: true });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.querySelectorAll('a').forEach(link => {
            link.classList.toggle('active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  // --- Modal ---
  function setupModal() {
    // Open modal on card click
    pastEventsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.event-card');
      if (!card) return;

      const index = parseInt(card.dataset.index);
      const event = EVENTS_DATA[index];
      openModal(event);
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal(event) {
    modalImage.style.backgroundImage = `url('${event.image}')`;
    modalCategory.textContent = event.category;
    modalTitle.textContent = event.title;
    modalDate.textContent = formatDate(event.date);
    modalTime.textContent = event.time;
    modalLocation.textContent = event.location;
    modalAttendees.textContent = `${event.attendees} attendee${event.attendees !== 1 ? 's' : ''}`;
    modalDescription.textContent = event.description || 'No description available.';

    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    eventModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- Scroll Animations ---
  function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section-header, .about-text, .about-categories, .upcoming-placeholder').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // --- Stats Counter Animation ---
  function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
  }

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Add + suffix for members
        if (target > 100) {
          el.textContent = target.toLocaleString() + '+';
        }
      }
    }

    requestAnimationFrame(update);
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = mainNav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Init on DOM ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
