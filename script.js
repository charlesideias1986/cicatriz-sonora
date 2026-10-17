const CS = (() => {
  const CONFIG = {
    VIMEO_ID: '000000000',                 // ← trocar pelo ID real
    WHATSAPP: '5547999220690',
    EMAIL: 'contato@cicatrizsonora.com',
    BREVO_ACTION: '#',                     // ← action URL do form Brevo
  };

  const film = document.getElementById('film');
  const frame = document.getElementById('filmFrame');
  const play = document.getElementById('playHero');

  function openFilm() {
    frame.src = `https://player.vimeo.com/video/${CONFIG.VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
    film.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => film.dataset.open = 'true');
  }
  function closeFilm() {
    frame.src = '';
    film.dataset.open = 'false';
    film.dataset.ended = 'false';
    document.body.style.overflow = '';
    setTimeout(() => { film.hidden = true; }, 500);
  }

  if (play) play.addEventListener('click', openFilm);
  if (film) film.querySelector('.film__close').addEventListener('click', closeFilm);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !film.hidden) closeFilm(); });
  // "Fim do filme": mostra o CTA após 2s de reprodução parada no fim — heurística simples:
  // ao entrarem no overlay, revelamos o CTA após um tempo generoso como fallback.
  if (film) setTimeout(() => { film.dataset.ended = 'true'; }, 1000);

  // Reveal ao rolar
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  return { CONFIG, openFilm, closeFilm };
})();

window.CS = CS;
