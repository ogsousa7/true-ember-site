/* =========================================================
   True Ember — tema claro e escuro
   Carregado no <head> (sem defer) para aplicar o tema antes de a página aparecer, sem "piscar".
   1. Escolhe o tema: o que a pessoa salvou ou, se nada foi salvo, o tema do sistema
   2. Acompanha o sistema enquanto a pessoa não escolher
   3. Botão do topo (só aparece com JavaScript ligado)
   ========================================================= */
(function () {
  const raiz = document.documentElement;
  const sistemaClaro = window.matchMedia('(prefers-color-scheme: light)');

  function salvo() {
    try { return localStorage.getItem('tema'); } catch (e) { return null; }
  }

  function aplicar(tema) {
    raiz.dataset.tema = tema;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = tema === 'claro' ? '#FFFFFF' : '#05070D';
    const botao = document.getElementById('botaoTema');
    if (botao) {
      const rotulo = tema === 'claro' ? 'Mudar para o tema escuro' : 'Mudar para o tema claro';
      botao.setAttribute('aria-label', rotulo);
      botao.title = rotulo;
    }
  }

  /* ---------- 1. Tema inicial ---------- */
  aplicar(salvo() || (sistemaClaro.matches ? 'claro' : 'escuro'));

  /* ---------- 2. Sistema mudou e a pessoa ainda não escolheu: acompanha ---------- */
  sistemaClaro.addEventListener('change', (e) => {
    if (!salvo()) aplicar(e.matches ? 'claro' : 'escuro');
  });

  /* ---------- 3. Botão: troca e salva a escolha ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('botaoTema');
    if (!botao) return;
    aplicar(raiz.dataset.tema);
    botao.hidden = false;
    botao.addEventListener('click', () => {
      const novo = raiz.dataset.tema === 'claro' ? 'escuro' : 'claro';
      try { localStorage.setItem('tema', novo); } catch (e) {}
      aplicar(novo);
    });
  });
})();
