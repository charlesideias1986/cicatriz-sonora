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

  // ---- Briefing multi-etapa ----
  const STEPS = [
    { id:'para_quem', label:'Pra quem é este filme?', type:'radio', name:'PARA_QUEM', opts:['uma pessoa','uma família','alguém que partiu','um casal','uma fase da vida'] },
    { id:'motivo',    label:'Por que agora?', type:'radio', name:'MOTIVO', opts:['aniversário marcante','bodas','memorial','formatura','só quero guardar antes que se perca'] },
    { id:'historia',  label:'O que te levou a querer este filme? Existe um momento ou história específica por trás?', type:'textarea', name:'HISTORIA' },
    { id:'pessoa',    label:'Me conta um pouco dela/dessa vida. O que ela ama, o que a define, o que ficou.', type:'textarea', name:'PESSOA' },
    { id:'lembranca', label:'Tem algum momento, fase ou lembrança que precisa aparecer de qualquer jeito?', type:'textarea', name:'LEMBRANCA' },
    { id:'sentimento',label:'Quando imagina o filme pronto, o que você quer que quem assiste sinta?', type:'textarea', name:'SENTIMENTO' },
    { id:'mensagem',  label:'Existe uma mensagem que você quer que fique clara depois que o filme termina?', type:'textarea', name:'MENSAGEM' },
    { id:'caminho',   label:'Caminho: história cronológica, ou algo mais emocional e interpretativo?', type:'radio', name:'CAMINHO', opts:['cronológica (de pequena até hoje)','emocional e interpretativo (imagens + música)','não sei — confio em você'] },
    { id:'musica',    label:'Existe uma música que significa algo pra vocês? Ou prefere deixar a curadoria comigo?', type:'text', name:'MUSICA' },
    { id:'material',  label:'Que material você tem?', type:'radio', name:'MATERIAL', opts:['fotos','vídeos','áudios','tudo','ainda não sei'] },
    { id:'nome',      label:'Seu nome', type:'text', name:'FIRSTNAME' },
    { id:'contato',   label:'Seu WhatsApp (com DDD)', type:'text', name:'SMS' },
    { id:'email',     label:'Seu e-mail', type:'text', name:'EMAIL' },
    { id:'frase',     label:'Antes de enviar: se você tivesse que resumir em uma frase o que gostaria que esse filme fosse pra vocês daqui a 10 ou 20 anos — o que diria?', type:'textarea', name:'FRASE_20_ANOS' },
  ];

  const form = document.getElementById('briefing');
  if (form) {
    const stepsEl = document.getElementById('briefingSteps');
    const bar = document.getElementById('briefingBar');
    const btnPrev = form.querySelector('.bq__prev');
    const btnNext = form.querySelector('.bq__next');
    const done = document.getElementById('briefingDone');
    let i = 0;

    // Monta as telas
    STEPS.forEach((s, idx) => {
      const div = document.createElement('div');
      div.className = 'bq__q' + (idx === 0 ? ' is-active' : '');
      let inner = `<label class="bq__label">${s.label}</label>`;
      if (s.type === 'radio') {
        inner += s.opts.map((o) =>
          `<label class="bq__opt"><input type="radio" name="${s.name}" value="${o}"><span>${o}</span></label>`).join('');
      } else if (s.type === 'textarea') {
        inner += `<textarea class="bq__area" name="${s.name}"></textarea>`;
      } else {
        inner += `<input class="bq__input" type="text" name="${s.name}">`;
      }
      div.innerHTML = inner;
      stepsEl.appendChild(div);
    });

    const screens = () => stepsEl.querySelectorAll('.bq__q');
    function render() {
      screens().forEach((el, k) => el.classList.toggle('is-active', k === i));
      bar.style.width = `${((i + 1) / STEPS.length) * 100}%`;
      btnPrev.hidden = i === 0;
      btnNext.textContent = (i === STEPS.length - 1) ? 'enviar' : 'continuar';
    }
    btnPrev.addEventListener('click', () => { if (i > 0) { i--; render(); } });
    btnNext.addEventListener('click', () => {
      if (i < STEPS.length - 1) { i++; render(); return; }
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        await fetch(CONFIG.BREVO_ACTION, { method:'POST', body:data, mode:'no-cors' });
      } catch (_) { /* no-cors: não há resposta legível; seguimos */ }
      form.hidden = true;
      done.hidden = false;
    });

    render();
  }

  // WhatsApp
  const wa = document.getElementById('waLink');
  if (wa) wa.href = `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent('Olá! Quero fazer um filme de memória com o Cicatriz Sonora.')}`;

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
