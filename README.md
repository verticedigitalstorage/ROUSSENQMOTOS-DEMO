# Roussenq Motos — protótipo comercial

Site estático em HTML, CSS e JavaScript. O catálogo e o painel demonstrativo usam `localStorage`; não há backend, autenticação ou banco de dados.

## Comandos

```bash
npm install
npm run dev
npm run build
```

Acesse `http://127.0.0.1:4173/`. O painel fica em `/#admin`.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: raiz do repositório

As informações configuráveis e os dados demonstrativos ficam no início de `dist/app.js`.
