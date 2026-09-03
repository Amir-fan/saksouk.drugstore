import '@fontsource-variable/archivo';
import '@fontsource-variable/inter';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExpertisePage } from '@/components/expertise-page';
import { AboutPage, NewsPage, PartnerPage, ProductCategoryPage, WorkWithUsPage } from '@/components/expanded-pages';
import { SaksoukSite } from '@/components/saksouk-site';
import { LanguageProvider } from '@/components/language-provider';
import '@/app/globals.css';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const route = window.location.pathname.replace(basePath, '') || '/';

let page: React.ReactNode = <SaksoukSite />;
let title = 'Saksouk Drugstore | Pharmaceutical Supply & Distribution';

if (route.startsWith('/products/medicine')) {
  page = <ProductCategoryPage kind="medicine" />;
  title = 'Human Medicines | Saksouk Drugstore';
} else if (route.startsWith('/products/cosmetics')) {
  page = <ProductCategoryPage kind="cosmetics" />;
  title = 'Cosmetics | Saksouk Drugstore';
} else if (route.startsWith('/products/supplements')) {
  page = <ProductCategoryPage kind="supplements" />;
  title = 'Nutritional Supplements | Saksouk Drugstore';
} else if (route.startsWith('/expertise')) {
  page = <ExpertisePage />;
  title = 'Expertise | Saksouk Drugstore';
} else if (route.startsWith('/about')) {
  page = <AboutPage />;
  title = 'About | Saksouk Drugstore';
} else if (route.startsWith('/news')) {
  page = <NewsPage />;
  title = 'News & Insights | Saksouk Drugstore';
} else if (route.startsWith('/careers')) {
  page = <WorkWithUsPage />;
  title = 'Work With Us | Saksouk Drugstore';
} else if (route.startsWith('/partners')) {
  page = <PartnerPage />;
  title = 'Partner With Us | Saksouk Drugstore';
}

document.title = title;

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      {page}
    </LanguageProvider>
  </React.StrictMode>,
);
