/* ============================================
   PORTFOLIO SCRIPT — Alex Morgan Portfolio
   ============================================ */

'use strict';

// =============================================
// LOADER
// =============================================
window.addEventListener('load', () => {
  document.body.classList.add('loading');
  const loader = document.getElementById('loader');

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    initAnimations();
  }, 2000);
});

// =============================================
// CUSTOM CURSOR
// =============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX - 20 + 'px';
  cursorFollower.style.top = followerY - 20 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .skill-card, .project-card, .exp-content-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});

// =============================================
// NAVBAR
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

// Scroll listener for sticky navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateScrollSpy();
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =============================================
// SCROLL SPY
// =============================================
function updateScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === currentSection) {
      link.classList.add('active');
    }
  });
}

// =============================================
// PARTICLES.JS CONFIG
// =============================================
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 70, density: { enable: true, value_area: 900 } },
      color: { value: ['#4f7cff', '#8b5cf6', '#22d3ee'] },
      shape: { type: 'circle' },
      opacity: {
        value: 0.35,
        random: true,
        anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false }
      },
      size: {
        value: 2.5,
        random: true,
        anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 140,
        color: '#4f7cff',
        opacity: 0.12,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 150, line_linked: { opacity: 0.4 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

// =============================================
// TYPED.JS
// =============================================
function initTyped() {
  if (typeof Typed === 'undefined') return;

  new Typed('#typed-text', {
    strings: [
      'web applications.',
      'seamless UIs.',
      'scalable APIs.',
      'creative experiences.',
      'things that matter.'
    ],
    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 2200,
    loop: true,
    smartBackspace: true,
    cursorChar: '|',
  });
}

// =============================================
// SKILLS — Dynamic Load
// =============================================
async function loadSkills() {
  try {
    const res = await fetch('skills.json');
    const data = await res.json();
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderEducation(data.education);
    renderExperience(data.experience);
  } catch (err) {
    console.warn('skills.json not found, using embedded data:', err);
    renderSkills(embeddedData.skills);
    renderProjects(embeddedData.projects);
    renderEducation(embeddedData.education);
    renderExperience(embeddedData.experience);
  }
}

function renderSkills(skills) {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = skills.map((s, i) => `
    <div class="skill-card" style="animation-delay: ${i * 0.06}s;" data-sr-skill>
      <div class="skill-header">
        <i class="${s.icon} skill-icon" style="color: ${s.color};"></i>
        <span class="skill-name">${s.name}</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-level="${s.level}"></div>
      </div>
      <span class="skill-percent">${s.level}% proficiency</span>
    </div>
  `).join('');

  initSkillBars();
  initVanillaTilt();
}

function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          setTimeout(() => {
            fill.style.width = fill.dataset.level + '%';
          }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) observer.observe(skillsGrid);
}

// =============================================
// PROJECTS — Dynamic Load
// =============================================
let allProjects = [];
let currentFilter = 'all';

function renderProjects(projects) {
  allProjects = projects;
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  displayProjects(currentFilter);
}

function displayProjects(filter) {
  const grid = document.getElementById('projectsGrid');
  const filtered = filter === 'all'
    ? allProjects
    : allProjects.filter(p => p.featured);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="project-card" data-filter="${p.featured ? 'featured' : 'normal'}"
         style="animation-delay: ${i * 0.1}s;">
      <div class="project-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <div class="project-overlay"></div>
        ${p.featured ? '<span class="project-featured-badge">✦ Featured</span>' : ''}
        <div class="project-links">
          <a href="${p.github}" class="project-link" title="GitHub" target="_blank">
            <i class="fab fa-github"></i>
          </a>
          <a href="${p.demo}" class="project-link" title="Live Demo" target="_blank">
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  initVanillaTilt();
  initProjectSR();
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    displayProjects(currentFilter);
  });
});

function initProjectSR() {
  if (typeof ScrollReveal === 'undefined') return;
  ScrollReveal().reveal('.project-card', {
    origin: 'bottom',
    distance: '30px',
    duration: 700,
    delay: 100,
    interval: 120,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    reset: false
  });
}

// =============================================
// EDUCATION — Dynamic Load
// =============================================
function renderEducation(education) {
  const container = document.getElementById('educationTimeline');
  if (!container) return;

  container.innerHTML = education.map((e, i) => `
    <div class="timeline-item" style="animation-delay: ${i * 0.15}s;">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-meta">
          <span class="timeline-date">📅 ${e.duration}</span>
          <span class="timeline-gpa">GPA: ${e.gpa}</span>
        </div>
        <h3 class="timeline-title">${e.degree}</h3>
        <p class="timeline-subtitle">🏛️ ${e.institution}</p>
        <p class="timeline-desc">${e.description}</p>
      </div>
    </div>
  `).join('');
}

// =============================================
// EXPERIENCE — Dynamic Load
// =============================================
function renderExperience(experience) {
  const container = document.getElementById('experienceTimeline');
  if (!container) return;

  container.innerHTML = experience.map((e, i) => `
    <div class="exp-card">
      <div class="exp-date-col">
        <span class="exp-duration">${e.duration}</span>
        <span class="exp-location">${e.location}</span>
      </div>
      <div class="exp-content-card">
        <p class="exp-company">${e.company}</p>
        <h3 class="exp-role">${e.role}</h3>
        <p class="exp-desc">${e.description}</p>
        <div class="exp-tech">
          ${e.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// =============================================
// VANILLA TILT
// =============================================
function initVanillaTilt() {
  if (typeof VanillaTilt === 'undefined') return;

  VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.15,
    perspective: 800,
  });
}

// =============================================
// SCROLL REVEAL
// =============================================
function initAnimations() {
  if (typeof ScrollReveal === 'undefined') return;

  const sr = ScrollReveal({
    distance: '40px',
    duration: 800,
    delay: 100,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    reset: false,
  });

  sr.reveal('.section-header', { origin: 'top', distance: '20px' });
  sr.reveal('.about-content', { origin: 'right' });
  sr.reveal('.about-image-wrap', { origin: 'left' });
  sr.reveal('.skill-card', { origin: 'bottom', interval: 80 });
  sr.reveal('.timeline-item', { origin: 'left', interval: 150 });
  sr.reveal('.exp-card', { origin: 'bottom', interval: 150 });
  sr.reveal('.contact-info', { origin: 'left' });
  sr.reveal('.contact-form-wrap', { origin: 'right' });
  sr.reveal('.footer-grid > *', { origin: 'bottom', interval: 100 });
}

// =============================================
// CONTACT FORM VALIDATION
// =============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function validateField(id, errorId, validator) {
  const field = document.getElementById(id);
  const error = document.getElementById(errorId);
  const value = field.value.trim();

  if (!validator(value)) {
    field.classList.add('error');
    error.textContent = getErrorMsg(id);
    return false;
  } else {
    field.classList.remove('error');
    error.textContent = '';
    return true;
  }
}

function getErrorMsg(id) {
  const msgs = {
    name: 'Please enter your full name.',
    email: 'Please enter a valid email address.',
    subject: 'Please provide a subject.',
    message: 'Message must be at least 20 characters.',
  };
  return msgs[id] || 'This field is required.';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  // Real-time validation
  ['name', 'email', 'subject', 'message'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', () => {
      el.classList.remove('error');
      document.getElementById(id + 'Error').textContent = '';
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const validations = [
      validateField('name', 'nameError', v => v.length >= 2),
      validateField('email', 'emailError', isValidEmail),
      validateField('subject', 'subjectError', v => v.length >= 3),
      validateField('message', 'messageError', v => v.length >= 20),
    ];

    if (validations.every(Boolean)) {
      const btn = document.getElementById('submitBtn');
      btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;

      // Simulate async send
      setTimeout(() => {
        contactForm.reset();
        btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
        formSuccess.classList.add('show');

        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 5000);
      }, 1800);
    }
  });
}

// =============================================
// BACK TO TOP
// =============================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.style.opacity = window.scrollY > 400 ? '1' : '0';
    backToTop.style.pointerEvents = window.scrollY > 400 ? 'all' : 'none';
  }
});

// =============================================
// EMBEDDED FALLBACK DATA
// (Used if skills.json can't be fetched locally)
// =============================================
const embeddedData = {
  skills: [
    { name: "JavaScript", level: 92, icon: "fab fa-js", color: "#f7df1e" },
    { name: "React.js", level: 88, icon: "fab fa-react", color: "#61dafb" },
    { name: "Node.js", level: 82, icon: "fab fa-node-js", color: "#68a063" },
    { name: "Python", level: 78, icon: "fab fa-python", color: "#3776ab" },
    { name: "HTML5", level: 95, icon: "fab fa-html5", color: "#e34f26" },
    { name: "CSS3", level: 90, icon: "fab fa-css3-alt", color: "#1572b6" },
    { name: "TypeScript", level: 80, icon: "fas fa-code", color: "#007acc" },
    { name: "Git", level: 85, icon: "fab fa-git-alt", color: "#f05032" },
    { name: "Docker", level: 70, icon: "fab fa-docker", color: "#2496ed" },
    { name: "AWS", level: 68, icon: "fab fa-aws", color: "#ff9900" },
    { name: "GraphQL", level: 75, icon: "fas fa-project-diagram", color: "#e10098" },
    { name: "MongoDB", level: 77, icon: "fas fa-database", color: "#47a248" }
  ],
  projects: [
    {
      id: 1, title: "NexusChat",
      description: "A real-time messaging platform with WebSocket support, E2E encryption, and multi-room chat functionality built with React and Node.js.",
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=80",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "#", demo: "#", featured: true
    },
    {
      id: 2, title: "AuraShop",
      description: "Full-stack e-commerce platform with Stripe integration, inventory management, and a dynamic product recommendation engine.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
      tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
      github: "#", demo: "#", featured: true
    },
    {
      id: 3, title: "PortfolioCMS",
      description: "A headless CMS with drag-and-drop page builder, SEO tools, and automated deployment pipeline to Netlify and Vercel.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      tags: ["Vue.js", "GraphQL", "AWS S3", "Lambda"],
      github: "#", demo: "#", featured: false
    },
    {
      id: 4, title: "AIVision",
      description: "Computer vision web app using TensorFlow.js for object detection and image classification directly in the browser.",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
      tags: ["TensorFlow.js", "Python", "Flask", "React"],
      github: "#", demo: "#", featured: false
    },
    {
      id: 5, title: "DevMetrics",
      description: "A developer analytics dashboard integrating GitHub, Jira, and CI/CD pipelines to visualize team productivity metrics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      tags: ["React", "D3.js", "Node.js", "Redis"],
      github: "#", demo: "#", featured: false
    },
    {
      id: 6, title: "CloudSync",
      description: "Cross-platform file synchronization tool with end-to-end encryption, conflict resolution, and offline-first architecture.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
      tags: ["Electron", "TypeScript", "AWS", "SQLite"],
      github: "#", demo: "#", featured: false
    }
  ],
  education: [
    {
      institution: "Stanford University", degree: "M.S. Computer Science",
      duration: "2018 – 2020", gpa: "3.9 / 4.0",
      description: "Specialization in Human-Computer Interaction and Distributed Systems. Published research on Progressive Web App performance optimization."
    },
    {
      institution: "UC Berkeley", degree: "B.S. Computer Science",
      duration: "2014 – 2018", gpa: "3.7 / 4.0",
      description: "Dean's List all semesters. Led the Web Development Club and organized the annual hackathon with 500+ participants."
    }
  ],
  experience: [
    {
      company: "TechNova Inc.", role: "Senior Frontend Developer",
      duration: "Jan 2023 – Present", location: "San Francisco, CA (Remote)",
      description: "Led frontend architecture for a SaaS platform serving 200K+ users. Reduced bundle size by 40% and improved Core Web Vitals scores to 95+.",
      tech: ["React", "TypeScript", "GraphQL", "AWS"]
    },
    {
      company: "Pixel Labs", role: "Full Stack Developer",
      duration: "Jun 2021 – Dec 2022", location: "New York, NY",
      description: "Built and maintained 12+ client projects from ideation to deployment. Introduced CI/CD pipeline reducing deployment time by 60%.",
      tech: ["Vue.js", "Node.js", "PostgreSQL", "Docker"]
    },
    {
      company: "DevCraft Studio", role: "Junior Developer",
      duration: "Jan 2020 – May 2021", location: "Austin, TX",
      description: "Developed responsive web applications and contributed to an internal component library used across 8 product teams.",
      tech: ["React", "SCSS", "REST APIs", "Git"]
    }
  ]
};

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTyped();
  loadSkills();

  // Set initial back-to-top visibility
  if (backToTop) {
    backToTop.style.opacity = '0';
    backToTop.style.transition = 'opacity 0.3s ease';
    backToTop.style.pointerEvents = 'none';
  }
});
