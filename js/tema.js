/* =========================================================
   True Ember — preferências de acessibilidade
   Carregado no <head> (sem defer) para aplicar tudo antes de a página aparecer, sem "piscar".
   1. Tema claro/escuro: o que a pessoa salvou ou, se nada foi salvo, o tema do sistema
   2. Tamanho do texto e contraste reforçado
   3. Botões do topo e painel de acessibilidade (só aparecem com JavaScript ligado)
   ========================================================= */
(function () {
  const raiz = document.documentElement;
  const sistemaClaro = window.matchMedia('(prefers-color-scheme: light)');

  function ler(chave) {
    try { return localStorage.getItem(chave); } catch (e) { return null; }
  }
  function salvar(chave, valor) {
    try { valor ? localStorage.setItem(chave, valor) : localStorage.removeItem(chave); } catch (e) {}
  }

  /* ---------- 1. Tema ---------- */
  function aplicarTema(tema) {
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
  aplicarTema(ler('tema') || (sistemaClaro.matches ? 'claro' : 'escuro'));

  // Sistema mudou e a pessoa ainda não escolheu: acompanha.
  sistemaClaro.addEventListener('change', (e) => {
    if (!ler('tema')) aplicarTema(e.matches ? 'claro' : 'escuro');
  });

  /* ---------- 2. Texto e contraste ---------- */
  function aplicarTexto(tamanho) {
    if (tamanho === 'normal') delete raiz.dataset.texto;
    else raiz.dataset.texto = tamanho;
  }
  function aplicarContraste(alto) {
    if (alto) raiz.dataset.contraste = 'alto';
    else delete raiz.dataset.contraste;
  }
  aplicarTexto(ler('texto') || 'normal');
  aplicarContraste(ler('contraste') === 'alto');

  /* ---------- 3. Botões e painel ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const botaoTema = document.getElementById('botaoTema');
    if (botaoTema) {
      aplicarTema(raiz.dataset.tema);
      botaoTema.hidden = false;
      botaoTema.addEventListener('click', () => {
        const novo = raiz.dataset.tema === 'claro' ? 'escuro' : 'claro';
        salvar('tema', novo);
        aplicarTema(novo);
      });
    }

    const botaoPainel = document.getElementById('botaoAcessibilidade');
    const painel = document.getElementById('painelAcessibilidade');
    if (!botaoPainel || !painel) return;
    botaoPainel.hidden = false;
    botaoPainel.addEventListener('click', () => painel.showModal());
    // Toque fora da janela ou no "Fechar".
    painel.addEventListener('click', (e) => {
      if (e.target === painel || e.target.closest('[data-fechar]')) painel.close();
    });

    const botoesTexto = painel.querySelectorAll('[data-texto]');
    const marcarTexto = () => botoesTexto.forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.texto === (raiz.dataset.texto || 'normal'));
    });
    botoesTexto.forEach((b) => b.addEventListener('click', () => {
      aplicarTexto(b.dataset.texto);
      salvar('texto', b.dataset.texto === 'normal' ? null : b.dataset.texto);
      marcarTexto();
    }));
    marcarTexto();

    const contraste = document.getElementById('botaoContraste');
    contraste.setAttribute('aria-checked', raiz.dataset.contraste === 'alto');
    contraste.addEventListener('click', () => {
      const ligado = contraste.getAttribute('aria-checked') !== 'true';
      contraste.setAttribute('aria-checked', ligado);
      aplicarContraste(ligado);
      salvar('contraste', ligado ? 'alto' : null);
    });
  });
})();
