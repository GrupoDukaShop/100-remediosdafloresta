# Kit Sabedoria Natural — Site + Blog (Next.js)

Site completo em Next.js 14 (App Router) com:

- **Landing page** de vendas (`/`) — igual à versão em HTML que fizemos antes
- **Blog** (`/blog`) com:
  - 10 artigos de "Saúde Natural do dia a dia" (`/blog/saude-natural/...`)
  - **100 posts**, um para cada remédio do ebook "100 Remédios da Floresta", organizados em 10 categorias (`/blog/remedios/...`)
- Página **Sobre** (`/sobre`)
- Página **Política de Privacidade** (`/politica-de-privacidade`)

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Antes de publicar, troque:

1. **Link de checkout** — já configurado em `components/CheckoutLink.jsx`:
  ```
  https://pay.lowify.com.br/checkout?product_id=bc02m5
  ```

2. **Política de Privacidade** — o texto em `app/politica-de-privacidade/page.js`
   é um modelo de ponto de partida. Revise e adapte conforme sua operação.

## Como publicar no Vercel

1. Suba esta pasta para um repositório no GitHub (ou use `vercel` CLI direto)
2. Acesse [vercel.com](https://vercel.com), importe o repositório
3. O Vercel detecta Next.js automaticamente — não precisa configurar nada
4. Depois do primeiro deploy, conecte seu domínio próprio em Settings > Domains

## Como adicionar novos remédios/artigos no blog

Os posts vêm de arquivos JSON simples, sem precisar mexer em código:

- `data/remedios.json` — os 100 remédios (cada um com nome, planta, preparo, uso, aviso, categoria)
- `data/capitulos-remedios.json` — as 10 categorias
- `data/artigos-saude-natural.json` — os 10 artigos de saúde natural

Para adicionar um remédio novo, copie um bloco existente em `remedios.json` e
ajuste os campos — a página é gerada automaticamente. Para adicionar um
artigo novo, faça o mesmo em `artigos-saude-natural.json`.

## Estrutura de pastas

```
app/
  layout.js                 → layout global
  page.js                   → landing page (rota "/")
  globals.css                → todo o CSS do site
  blog/
    page.js                  → hub do blog
    saude-natural/
      page.js                 → lista de artigos
      [slug]/page.js           → artigo individual
    remedios/
      page.js                  → lista de categorias
      [capituloId]/page.js      → remédios de uma categoria
      [capituloId]/[slug]/page.js → remédio individual
  sobre/page.js
  politica-de-privacidade/page.js
components/
  LandingPage.jsx    → toda a página de vendas
  SiteHeader.jsx     → menu do topo (aparece em todas as páginas)
  SiteFooter.jsx     → rodapé (usado no blog e páginas institucionais)
data/
  remedios.json
  capitulos-remedios.json
  artigos-saude-natural.json
public/
  assets/            → imagens (capas, mockups, prévias)
```
