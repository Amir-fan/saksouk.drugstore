# Saksouk Drugstore

Responsive pharmaceutical supply and distribution website built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3000/` with dedicated pages at `/products/` and `/expertise/`.

## Production build

```bash
npm run build
npm run preview
```

The production build is configured for the GitHub Pages project path `/saksouk.drugstore/`. Pushes to `main` deploy the generated `dist` directory through the included GitHub Actions workflow.
