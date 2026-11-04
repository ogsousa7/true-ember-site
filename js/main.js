/* =========================================================
   True Ember — scripts do site
   1. Configuração (link da Pulso e contatos)
   2. Botão "Abrir o site da Pulso"
   3. Canais de contato
   4. Formulário (Netlify Forms)
   5. VLibras (Libras)
   6. Animações ao rolar a página e seção ativa no menu
   ========================================================= */

/* ---------- 1. Configuração: troque aqui (o resto do site se ajusta sozinho) ---------- */
const CONFIG = {
  linkPulso: 'https://pulso-academia.onrender.com',
  email: '',       // ex.: 'contato@trueember.com.br'
  instagram: '',   // ex.: 'trueember' (sem @)
  whatsapp: '',    // ex.: '5511999999999' (só números, com DDI e DDD)
};

/* ---------- 2. Link do site da Pulso: o botão só aparece quando houver link ---------- */
(function () {
  const a = document.getElementById('linkPulso');
  if (CONFIG.linkPulso) { a.href = CONFIG.linkPulso; a.hidden = false; }
})();

/* ---------- 3. Canais de contato: só mostra os que foram preenchidos ---------- */
(function () {
  const lista = document.getElementById('canais');
  const itens = [];
  if (CONFIG.email) itens.push(['E-mail', CONFIG.email, null]);
  if (CONFIG.whatsapp) itens.push(['WhatsApp', '+' + CONFIG.whatsapp, 'https://wa.me/' + CONFIG.whatsapp]);
  if (CONFIG.instagram) itens.push(['Instagram', '@' + CONFIG.instagram, 'https://instagram.com/' + CONFIG.instagram]);
  lista.innerHTML = itens.map(([rotulo, texto, link]) =>
    `<li><b>${rotulo}</b>${link ? `<a href="${link}" target="_blank" rel="noopener">${texto}</a>` : `<span>${texto}</span>`}</li>`).join('');
})();

/* ---------- 4. Formulário: no Netlify envia de verdade (Netlify Forms); fora dele, mostra um aviso ---------- */
(function () {
  const form = document.getElementById('formContato');
  const aviso = document.getElementById('ctAviso');
  const noNetlify = /netlify\.app$/.test(location.hostname) || document.documentElement.dataset.netlify === 'sim';
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) return;
    if (noNetlify) return; // envio normal: o Netlify recebe e abre obrigado.html
    e.preventDefault();
    aviso.textContent = 'Esta é uma prévia: quando o site estiver no Netlify, a mensagem chega no painel de formulários.';
    aviso.classList.add('ok');
  });
})();

/* ---------- 5. VLibras (tradução para Libras, Governo Federal). Se não carregar, o site segue normal ---------- */
(function () {
  const s = document.createElement('script');
  s.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
  s.async = true;
  s.onload = () => { try { new window.VLibras.Widget('https://vlibras.gov.br/app'); } catch (e) {} };
  document.body.appendChild(s);
})();

/* ---------- 6. Animações: blocos aparecem ao rolar; o topo mostra a seção atual ---------- */
(function () {
  const topo = document.querySelector('.topo');
  const marcarRolagem = () => topo.classList.toggle('rolou', window.scrollY > 10);
  window.addEventListener('scroll', marcarRolagem, { passive: true });
  marcarRolagem();

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const aparecer = new IntersectionObserver((entradas) => {
    entradas.filter((e) => e.isIntersecting).forEach((e) => {
      e.target.classList.add('revelado');
      aparecer.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  // Itens lado a lado entram um depois do outro.
  document.querySelectorAll('.secao h2, .lead, .ficha, .entrega, .destaques li, .pitch, .servico, .etapas li, .valores li, .pessoa, .formulario')
    .forEach((el) => {
      const posicao = [...el.parentElement.children].indexOf(el);
      el.style.setProperty('--atraso', `${Math.min(posicao, 5) * 60}ms`);
      el.classList.add('revela');
      aparecer.observe(el);
    });

  const links = [...document.querySelectorAll('.topo nav a[href^="#"]')];
  const secaoAtual = new IntersectionObserver((entradas) => {
    entradas.filter((e) => e.isIntersecting).forEach((e) => {
      links.forEach((a) => a.classList.toggle('ativo', a.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => secaoAtual.observe(s));
})();

/* ---------- 7. Detalhes de produto: luz nos cartões e vitrine com profundidade ---------- */
(function () {
  if (!matchMedia('(hover: hover)').matches) return;

  // Luz que segue o mouse dentro dos cartões.
  document.querySelectorAll('.servico, .entrega, .ficha div, .pitch video, .dfd').forEach((el) => {
    if (el.tagName === 'VIDEO') return;
    el.classList.add('luz');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Vitrine: inclina até 4 graus seguindo o mouse; o celular sobe um pouco ao rolar.
  const abertura = document.querySelector('.abertura');
  const vitrine = document.querySelector('.vitrine');
  if (!abertura || !vitrine) return;
  let quadro = 0;
  abertura.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(quadro);
    quadro = requestAnimationFrame(() => {
      const r = vitrine.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      vitrine.style.setProperty('--ry', `${(dx * 6).toFixed(2)}deg`);
      vitrine.style.setProperty('--rx', `${(-dy * 4).toFixed(2)}deg`);
    });
  });
  abertura.addEventListener('pointerleave', () => { vitrine.style.setProperty('--ry', '0deg'); vitrine.style.setProperty('--rx', '0deg'); });
  window.addEventListener('scroll', () => {
    const sobe = Math.min(60, window.scrollY * 0.08);
    vitrine.style.setProperty('--sobe', `${-sobe}px`);
  }, { passive: true });
})();
