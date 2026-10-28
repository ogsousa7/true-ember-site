/* =========================================================
   True Ember — scripts do site
   1. Configuração (link da Pulso e contatos)
   2. Botão "Abrir o site da Pulso"
   3. Canais de contato
   4. Formulário (Netlify Forms)
   5. VLibras (Libras)
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
