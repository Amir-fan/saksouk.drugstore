import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub project pages are served from this repository subpath.
  base: '/saksouk.drugstore/',
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), '.'),
    },
  },
  build: {
    rolldownOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        medicine: resolve(process.cwd(), 'products/medicine/index.html'),
        cosmetics: resolve(process.cwd(), 'products/cosmetics/index.html'),
        supplements: resolve(process.cwd(), 'products/supplements/index.html'),
        expertise: resolve(process.cwd(), 'expertise/index.html'),
        about: resolve(process.cwd(), 'about/index.html'),
        news: resolve(process.cwd(), 'news/index.html'),
        careers: resolve(process.cwd(), 'careers/index.html'),
        partners: resolve(process.cwd(), 'partners/index.html'),
      },
    },
  },
});
