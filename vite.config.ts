import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub project pages are served from this repository subpath.
  base: '/saksouk.drugstore/',
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        products: resolve(process.cwd(), 'products/index.html'),
        expertise: resolve(process.cwd(), 'expertise/index.html'),
      },
    },
  },
});
