import type { Metadata } from 'next';
import '@fontsource-variable/archivo';
import '@fontsource-variable/inter';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saksouk Drugstore | Pharmaceutical Supply & Distribution',
  description: 'Dependable pharmaceutical storage, supply and distribution in Syria.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
