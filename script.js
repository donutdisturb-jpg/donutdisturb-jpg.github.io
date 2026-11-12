const menu = document.querySelector('.menu');
const links = document.querySelector('.links');

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

const topButton = document.querySelector('.top');

window.addEventListener('scroll', () => {
  topButton.classList.toggle('show', window.scrollY > 450);
}, { passive: true });

topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('#year').textContent = new Date().getFullYear();
// ========== SCROLL REVEAL OBSERVER ==========
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
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