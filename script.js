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

// ========== AUDIO PLAYER LOGIC ==========
const playBtn = document.getElementById('play-cello-btn');
const celloAudio = document.getElementById('cello-audio');
const waveArt = document.querySelector('.wave');

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
}

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

// ========== BUTIK MODAL CONTROLLER ==========
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

// ========== INTERACTIVE TERMINAL LOGIC ==========
const termInput = document.getElementById('terminal-input');
const termBody = document.getElementById('terminal-body');

if (termInput && termBody) {
  const commands = {
    help: "Available commands: <b style='color:var(--gold)'>about</b>, <b style='color:var(--gold)'>skills</b>, <b style='color:var(--gold)'>contact</b>, <b style='color:var(--gold)'>cello</b>, <b style='color:var(--gold)'>clear</b>",
    about: "Marc Lyndon C. Ramos — 4th Year BS IT Student @ STI Batangas (Graduation 2027). Developer & Musician.",
    skills: "HTML/CSS/JS, Python, Java, C#, C++, MySQL, AWS, Git, Figma, Blender.",
    contact: "Email: donutdisturbq1@gmail.com | GitHub: donutdisturb-jpg",
    cello: "Principal Cellist & Instructor @ Ascente Music Academy."
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