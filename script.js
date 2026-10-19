const CS = (() => {
  const CONFIG = {
    VIMEO_ID: '1237267495',
    WHATSAPP: '5547999220690',
    EMAIL: 'cicatrizsonorafilms@gmail.com',
  };

  const film = document.getElementById('film');
  const frame = document.getElementById('filmFrame');

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

  document.querySelectorAll('[data-open-film]').forEach((el) => {
    el.addEventListener('click', openFilm);
  });
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

  // Contato
  const wa = document.getElementById('waLink');
  if (wa) wa.href = `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent('Olá! Quero fazer um filme de memória com o Cicatriz Sonora.')}`;

  const cm = document.getElementById('ctaMail');
  if (cm) cm.href = `mailto:${CONFIG.EMAIL}`;

  // Rodapé: contatos e ano
  const fw = document.getElementById('footWa');
  const fm = document.getElementById('footMail');
  if (fw) fw.href = `https://wa.me/${CONFIG.WHATSAPP}`;
  if (fm) fm.href = `mailto:${CONFIG.EMAIL}`;
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  return { CONFIG, openFilm, closeFilm };
})();

window.CS = CS;
