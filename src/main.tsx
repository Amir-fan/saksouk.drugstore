import '@fontsource-variable/archivo';
import '@fontsource-variable/inter';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExpertisePage } from '@/components/expertise-page';
import { ProductsPage } from '@/components/products-page';
import { SaksoukSite } from '@/components/saksouk-site';
import '@/app/globals.css';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const route = window.location.pathname.replace(basePath, '') || '/';

let page: React.ReactNode = <SaksoukSite />;
let title = 'Saksouk Drugstore | Pharmaceutical Supply & Distribution';

if (route.startsWith('/products')) {
  page = <ProductsPage />;
  title = 'Products | Saksouk Drugstore';
} else if (route.startsWith('/expertise')) {
  page = <ExpertisePage />;
  title = 'Expertise | Saksouk Drugstore';
}

document.title = title;

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{page}</React.StrictMode>,
);
