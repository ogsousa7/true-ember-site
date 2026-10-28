# True Ember — site institucional

Site da **True Ember**, empresa de tecnologia que cria sites, sistemas e aplicativos sob medida.
Mostra os serviços, o jeito de trabalhar e o projeto mais recente: a **Pulso Academia**.

Feito com HTML, CSS e JavaScript puros (sem framework e sem build).

**Site no ar:** https://true-ember-site.netlify.app

**Projeto Pulso Academia no ar:** https://pulso-academia.onrender.com

## Estrutura

```
true-ember-site/
├── index.html        # página principal (só HTML)
├── obrigado.html     # página exibida depois do envio do formulário
├── css/
│   ├── style.css     # estilos do site
│   └── obrigado.css  # estilos da página "obrigado"
├── js/
│   └── main.js       # configuração, formulário, contatos e VLibras
├── assets/
│   ├── img/          # chama da marca e ícones
│   ├── pulso/        # telas do projeto Pulso Academia
│   └── video/        # vídeo do pitch e imagem de capa
├── favicon.ico
└── netlify.toml      # configuração do Netlify
```

## Personalizar

No começo do `js/main.js` fica o bloco `CONFIG`:

| Campo | O que é |
|---|---|
| `linkPulso` | Link do site da Pulso no Render. O botão "Abrir o site da Pulso" só aparece quando tiver link. |
| `email`, `instagram`, `whatsapp` | Contatos. Só aparecem no site os que forem preenchidos. |

As cores e fontes ficam no começo do `css/style.css`, na seção **1. Variáveis**.

## Rodar no computador

Abra o `index.html` no navegador, ou use a extensão **Live Server** do VS Code.
O formulário só envia de verdade quando o site está no Netlify; no computador ele mostra um aviso.

## Publicação

Hospedado no **Netlify**, ligado a este repositório: cada `git push` publica a versão nova.
As mensagens do formulário chegam no painel do Netlify, em **Forms**.

## Acessibilidade

Contraste mínimo WCAG AA, link "Pular para o conteúdo", navegação por teclado, textos alternativos,
respeito a "reduzir movimento" e tradução para Libras com o VLibras.

---
True Ember · Projeto acadêmico da Etec Heliópolis · 2026
