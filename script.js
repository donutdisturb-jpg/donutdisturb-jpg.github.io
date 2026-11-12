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