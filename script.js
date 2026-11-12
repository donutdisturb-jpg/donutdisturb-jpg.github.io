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

// ========== CELLO AUDIO PLAYER ==========
const playBtn = document.getElementById('play-cello-btn');
const celloAudio = document.getElementById('cello-audio');
const waveArt = document.querySelector('.wave');

if (playBtn && celloAudio) {
  playBtn.addEventListener('click', () => {
    if (celloAudio.paused) {
      celloAudio.play();
      playBtn.innerHTML = '<span class="icon">⏸</span> Pause Snippet';
      waveArt.classList.add('playing');
    } else {
      celloAudio.pause();
      playBtn.innerHTML = '<span class="icon">▶</span> Listen to a Snippet';
      waveArt.classList.remove('playing');
    }
  });

  // Reset when audio finishes
  celloAudio.addEventListener('ended', () => {
    playBtn.innerHTML = '<span class="icon">▶</span> Listen to a Snippet';
    waveArt.classList.remove('playing');
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