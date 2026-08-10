/* ==========================================================================
   Interactive JavaScript Logic — Kumari Sonal Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Header Scrolled State & Mobile Menu Toggle
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close mobile menu when clicking any nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });

  // 2. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Active Nav Link Scroll-Spy
  const sections = document.querySelectorAll('section');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Interactive Skills Filtering Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillItems = document.querySelectorAll('.skill-item-cat');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tab');

      skillItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else if (item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 5. Lightbox Modal for Graphic Design Showcase
  const galleryModal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.getAttribute('data-img');
      const title = item.getAttribute('data-title');
      const category = item.getAttribute('data-category');

      modalImg.src = img;
      modalTitle.textContent = title;
      modalCategory.textContent = category;
      galleryModal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      galleryModal.classList.remove('active');
    });
  }

  // 6. Resume Modal Controls
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const resumeModalClose = document.getElementById('resume-modal-close');
  const closeResumeBtn2 = document.getElementById('close-resume-btn-2');

  if (openResumeBtn) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });
  }

  [resumeModalClose, closeResumeBtn2].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        resumeModal.classList.remove('active');
      });
    }
  });

  // Close modals when clicking backdrop
  [galleryModal, resumeModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // 7. Copy Email Button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Copied: kumari.sonal@example.com');
      });
    });
  }

  // 8. Contact Form Handling & Toast Notification
  const contactForm = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      
      // Simulate form sending
      showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

  function showToast(msg) {
    if (toast && toastMessage) {
      toastMessage.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

});
