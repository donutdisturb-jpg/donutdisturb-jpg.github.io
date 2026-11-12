// ========== MOBILE MENU TOGGLE ==========
const menu = document.querySelector('.menu');
const links = document.querySelector('.links');

if (menu && links) {
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '×' : '☰';
  });

  document.querySelectorAll('.links a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = '☰';
    });
  });
}

// ========== ACTIVE NAVIGATION SCROLLSPY ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.links a[href^="#"]');

if (sections.length > 0 && navLinks.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ========== BACK TO TOP BUTTON ==========
const topButton = document.querySelector('.top');

if (topButton) {
  window.addEventListener('scroll', () => {
    topButton.classList.toggle('show', window.scrollY > 450);
  }, { passive: true });

  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== AUTOMATIC COPYRIGHT YEAR ==========
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========== AUDIO PLAYER & SCRUBBER LOGIC ==========
const playBtn = document.getElementById('play-cello-btn');
const celloAudio = document.getElementById('cello-audio');
const waveArt = document.querySelector('.wave');
const audioTrack = document.getElementById('audio-track');
const audioBar = document.getElementById('audio-bar');
const audioTime = document.getElementById('audio-time');

function formatTime(secs) {
  if (isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

if (playBtn && celloAudio) {
  playBtn.addEventListener('click', () => {
    if (celloAudio.paused) {
      celloAudio.play().then(() => {
        playBtn.innerHTML = '<span class="icon">⏸</span> Pause Snippet';
        if (waveArt) waveArt.classList.add('playing');
      }).catch(error => {
        console.error("Playback error:", error);
        alert("Audio playback failed. Please ensure 'assets/cello-snippet.mp3' exists in your assets folder.");
      });
    } else {
      celloAudio.pause();
      playBtn.innerHTML = '<span class="icon">▶</span> Listen to a Snippet';
      if (waveArt) waveArt.classList.remove('playing');
    }
  });

  celloAudio.addEventListener('ended', () => {
    playBtn.innerHTML = '<span class="icon">▶</span> Listen to a Snippet';
    if (waveArt) waveArt.classList.remove('playing');
  });

  if (audioBar && audioTime) {
    celloAudio.addEventListener('timeupdate', () => {
      const progress = (celloAudio.currentTime / celloAudio.duration) * 100;
      audioBar.style.width = `${progress}%`;
      audioTime.textContent = `${formatTime(celloAudio.currentTime)} / ${formatTime(celloAudio.duration)}`;
    });

    celloAudio.addEventListener('loadedmetadata', () => {
      audioTime.textContent = `0:00 / ${formatTime(celloAudio.duration)}`;
    });

    if (audioTrack) {
      audioTrack.addEventListener('click', (e) => {
        const rect = audioTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        if (celloAudio.duration) {
          celloAudio.currentTime = (clickX / width) * celloAudio.duration;
        }
      });
    }
  }
}

// ========== ONE-CLICK EMAIL COPY & TOAST NOTIFICATION ==========
function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

document.querySelectorAll('.copy-email-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'donutdisturbq1@gmail.com';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        showToast("✓ Copied email to clipboard!");
      }).catch(() => {
        showToast("Email: " + email);
      });
    } else {
      showToast("Email: " + email);
    }
  });
});

// ========== FORMSPREE AJAX CONTACT FORM ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const formSubmitBtn = document.getElementById('form-submit-btn');

if (contactForm && formStatus && formSubmitBtn) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);

    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Sending...';
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = "✓ Thank you! Your message has been sent successfully.";
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        const result = await response.json();
        if (result && result.errors) {
          formStatus.textContent = result.errors.map(err => err.message).join(", ");
        } else {
          formStatus.textContent = "Oops! There was a problem submitting your form.";
        }
        formStatus.className = 'form-status error';
      }
    } catch (error) {
      formStatus.textContent = "Oops! Network error. Please try again later or email directly.";
      formStatus.className = 'form-status error';
    } finally {
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = 'Send Message ↗';
    }
  });
}

// ========== BUTIK MODAL & TAB CONTROLLER ==========
const openModalBtn = document.getElementById('open-butik-modal');
const closeModalBtn = document.getElementById('close-butik-modal');
const butikModal = document.getElementById('butik-modal');

if (openModalBtn && closeModalBtn && butikModal) {
  const openModal = () => {
    butikModal.classList.add('active');
    butikModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    butikModal.classList.remove('active');
    butikModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);

  butikModal.addEventListener('click', (e) => {
    if (e.target === butikModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && butikModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Modal tab switching
const modalTabs = document.querySelectorAll('.modal-tab');
modalTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    modalTabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ========== INTERACTIVE TERMINAL LOGIC WITH EASTER EGGS ==========
const termInput = document.getElementById('terminal-input');
const termBody = document.getElementById('terminal-body');

if (termInput && termBody) {
  const commands = {
    help: "Available commands: <b style='color:var(--gold)'>about</b>, <b style='color:var(--gold)'>skills</b>, <b style='color:var(--gold)'>projects</b>, <b style='color:var(--gold)'>butik</b>, <b style='color:var(--gold)'>contact</b>, <b style='color:var(--gold)'>cello</b>, <b style='color:var(--gold)'>resume</b>, <b style='color:var(--gold)'>matrix</b>, <b style='color:var(--gold)'>clear</b>",
    about: "Marc Lyndon C. Ramos — 4th Year BS IT Student @ STI Batangas (Graduation 2027). Developer & Musician.",
    skills: "HTML/CSS/JS, Python, Java, C#, C++, MySQL, AWS, Git, Figma, Blender.",
    projects: "Featured Capstone: BUTIK (Web-Based Flower Arrangement System with AI Chatbot). Role: Assistant Programmer.",
    butik: "Opening BUTIK Live Demo... <a href='https://end-user-testing.web.app/' target='_blank' rel='noopener' style='color:var(--gold)'>https://end-user-testing.web.app/ ↗</a>",
    demo: "Opening BUTIK Live Demo... <a href='https://end-user-testing.web.app/' target='_blank' rel='noopener' style='color:var(--gold)'>https://end-user-testing.web.app/ ↗</a>",
    contact: "Email: donutdisturbq1@gmail.com | GitHub: donutdisturb-jpg",
    cello: "Principal Cellist & Instructor @ Ascente Music Academy.",
    resume: "Opening Résumé... <a href='assets/Marc-Lyndon-Ramos-Resume.pdf' target='_blank' rel='noopener' style='color:var(--gold)'>Download PDF ↗</a>",
    matrix: "<span style='color:#27c93f'>01001001 01010100 00100000 01010011 01010100 01010101 01000100 01000101 01001110 01010100 (IT STUDENT)</span>"
  };

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value.trim().toLowerCase();
      termInput.value = '';

      if (!val) return;

      if (val === 'clear') {
        termBody.innerHTML = '<p class="term-line"><span class="term-prompt">guest@mlr:~$</span> type \'help\' for commands</p>';
        return;
      }

      const userLine = document.createElement('p');
      userLine.className = 'term-line';
      userLine.innerHTML = `<span class="term-prompt">guest@mlr:~$</span> ${val}`;
      termBody.appendChild(userLine);

      const resLine = document.createElement('p');
      resLine.className = 'term-line term-response';
      resLine.innerHTML = commands[val] || `Command not found: '${val}'. Type <b style='color:var(--gold)'>help</b>.`;
      termBody.appendChild(resLine);

      termBody.scrollTop = termBody.scrollHeight;
    }
  });
}