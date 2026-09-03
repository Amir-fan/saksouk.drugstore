'use client';

import { PackageSearch, Search } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { ArrowLink, SiteFooter, SiteHeader } from '@/components/saksouk-site';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function ProductsPage() {
  const { content, lang } = useLanguage();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState('');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [letter, setLetter] = useState('All');
  const categoryKeys = ['Pharmaceutical', 'Healthcare', 'All'] as const;
  const category = categoryKeys[categoryIndex];
  const filtered = useMemo(() => content.products.items.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category;
    const queryMatch = `${item.name} ${item.manufacturer}`.toLowerCase().includes(query.toLowerCase());
    const letterMatch = letter === 'All' || item.name.startsWith(letter);
    return categoryMatch && queryMatch && letterMatch;
  }), [category, content.products.items, letter, query]);

  return <main><SiteHeader /><motion.section className="inner-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}><div className="container inner-hero-grid"><div><p className="section-label"><span />{content.products.eyebrow}</p><h1>{content.products.title.map((line, index) => <span key={index}>{line}</span>)}</h1></div><div className="inner-intro">{content.products.introduction.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></motion.section><motion.section className="catalogue-section" initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}><div className="container"><div className="catalogue-shell"><div className="catalogue-tabs" role="tablist" aria-label={lang === 'ar' ? 'فئات المنتجات' : 'Product categories'}>{content.products.categories.map((item, index) => <button role="tab" aria-selected={categoryIndex === index} className={categoryIndex === index ? 'active' : ''} onClick={() => setCategoryIndex(index)} key={index}>{item}</button>)}</div><div className="catalogue-tools"><label><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === 'ar' ? 'ابحث عن منتج أو شركة مصنعة' : 'Search product or manufacturer'} aria-label={lang === 'ar' ? 'البحث في المنتجات' : 'Search product or manufacturer'} /></label><div className="catalogue-note">{lang === 'ar' ? 'دليل المنتجات الاحترافي' : 'Professional product directory'}</div></div><div className="alphabet" aria-label={lang === 'ar' ? 'تصفية المنتجات حسب الحرف الأول' : 'Filter products by first letter'}><button className={letter === 'All' ? 'active' : ''} onClick={() => setLetter('All')}>{lang === 'ar' ? 'الكل' : 'All'}</button>{alphabet.map((item) => <button className={letter === item ? 'active' : ''} onClick={() => setLetter(item)} key={item}>{item}</button>)}</div>{filtered.length > 0 ? <div className="product-results">{filtered.map((item) => <article key={item.name}><h2>{item.name}</h2><p>{item.manufacturer}</p><span>{item.category}</span></article>)}</div> : <div className="catalogue-empty"><i><PackageSearch size={30} strokeWidth={1.5} /></i><div><h2>{lang === 'ar' ? 'الوصول إلى كتالوج المنتجات' : 'Product catalogue access'}</h2><p>{lang === 'ar' ? 'سيتم نشر سجلات منتجات سكسوك والشركات المصنعة المعتمدة هنا. للاستفسار عن التوفر الحالي أو منتج محدد، تواصل مباشرة مع الفريق.' : 'Saksouk’s confirmed product records and manufacturers will be published here. For current availability or a specific product inquiry, contact the team directly.'}</p></div><ArrowLink href="/#contact" primary>{lang === 'ar' ? 'اطلب معلومات عن المنتجات' : 'Request product information'}</ArrowLink></div>}</div></div></motion.section><SiteFooter /></main>;
}
