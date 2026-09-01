'use client';

import { PackageSearch, Search } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { siteContent as content } from '@/content/site';
import { ArrowLink, SiteFooter, SiteHeader } from '@/components/saksouk-site';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function ProductsPage() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof content.products.categories)[number]>('Pharmaceutical');
  const [letter, setLetter] = useState('All');
  const filtered = useMemo(() => content.products.items.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category;
    const queryMatch = `${item.name} ${item.manufacturer}`.toLowerCase().includes(query.toLowerCase());
    const letterMatch = letter === 'All' || item.name.startsWith(letter);
    return categoryMatch && queryMatch && letterMatch;
  }), [category, letter, query]);

  return <main><SiteHeader /><motion.section className="inner-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}><div className="container inner-hero-grid"><div><p className="section-label"><span />{content.products.eyebrow}</p><h1>{content.products.title.map((line) => <span key={line}>{line}</span>)}</h1></div><div className="inner-intro">{content.products.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></motion.section><motion.section className="catalogue-section" initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}><div className="container"><div className="catalogue-shell"><div className="catalogue-tabs" role="tablist" aria-label="Product categories">{content.products.categories.map((item) => <button role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="catalogue-tools"><label><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product or manufacturer" aria-label="Search product or manufacturer" /></label><div className="catalogue-note">Professional product directory</div></div><div className="alphabet" aria-label="Filter products by first letter"><button className={letter === 'All' ? 'active' : ''} onClick={() => setLetter('All')}>All</button>{alphabet.map((item) => <button className={letter === item ? 'active' : ''} onClick={() => setLetter(item)} key={item}>{item}</button>)}</div>{filtered.length > 0 ? <div className="product-results">{filtered.map((item) => <article key={item.name}><h2>{item.name}</h2><p>{item.manufacturer}</p><span>{item.category}</span></article>)}</div> : <div className="catalogue-empty"><i><PackageSearch size={30} strokeWidth={1.5} /></i><div><h2>Product catalogue access</h2><p>Saksouk’s confirmed product records and manufacturers will be published here. For current availability or a specific product inquiry, contact the team directly.</p></div><ArrowLink href="/#contact" primary>Request product information</ArrowLink></div>}</div></div></motion.section><SiteFooter /></main>;
}
