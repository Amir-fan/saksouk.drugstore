'use client';

import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Menu, Minus, Plus, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import { siteContent as content } from '@/content/site';
import { assetUrl, pageUrl } from '@/lib/site-paths';

const ease = [0.22, 1, 0.36, 1] as const;

function Brand() {
  return <a className="brand" href={pageUrl('/#home')} aria-label="Saksouk Drugstore home"><span className="brand-symbol"><i /><i /><i /></span><span>SAKSOUK<small>DRUGSTORE</small></span></a>;
}

export function ArrowLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return <a href={pageUrl(href)} className={`button ${primary ? 'button-primary' : 'button-light'}`}><span>{children}</span><i><ArrowUpRight size={16} strokeWidth={1.8} /></i></a>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const handle = () => setScrolled(window.scrollY > 18); handle(); window.addEventListener('scroll', handle, { passive: true }); return () => window.removeEventListener('scroll', handle); }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  return <header className={`header ${scrolled ? 'header-scrolled' : ''}`}><div className="nav-wrap"><Brand /><nav className="desktop-nav" aria-label="Primary navigation">{content.navigation.map((item) => <a href={pageUrl(item.href)} key={item.href}>{item.label}</a>)}</nav><div className="desktop-cta"><ArrowLink href="/#contact" primary>Business inquiry</ArrowLink></div><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div><AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} aria-label="Mobile navigation">{content.navigation.map((item) => <a href={pageUrl(item.href)} onClick={() => setOpen(false)} key={item.href}>{item.label}<ArrowUpRight size={18} /></a>)}</motion.nav>}</AnimatePresence></header>;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: .75, delay, ease }}>{children}</motion.div>;
}

function ImageReveal({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={`image-reveal ${className}`} initial={reduce ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: .85, ease }}><motion.img src={assetUrl(src)} alt={alt} loading="lazy" decoding="async" whileHover={reduce ? undefined : { scale: 1.02 }} transition={{ duration: .55, ease }} /></motion.div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span />{children}</p>;
}

function Hero() {
  const reduce = useReducedMotion();
  return <section className="hero" id="home"><div className="hero-media"><motion.img src={assetUrl('/images/hero-warehouse.jpg')} alt="Organized warehouse shelving and palletized goods" fetchPriority="high" decoding="async" initial={reduce ? false : { scale: 1.045 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease }} /><div className="hero-overlay" /><div className="hero-content"><motion.p className="eyebrow" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .7 }}>Pharmaceutical supply · Syria</motion.p><h1>{content.hero.headline.map((line, index) => <span className="line-mask" key={line}><motion.span initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ delay: .18 + index * .09, duration: .9, ease }}>{line}</motion.span></span>)}</h1><motion.div className="hero-lower" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .75, ease }}><p>{content.hero.body}</p><div className="hero-actions"><ArrowLink href="#contact" primary>Contact our team</ArrowLink><ArrowLink href="#about">Discover Saksouk</ArrowLink></div></motion.div></div><div className="hero-tag"><span>Storage</span><i /><span>Supply</span><i /><span>Distribution</span></div><a className="hero-scroll" href="#about" aria-label="Scroll to about"><ArrowDownRight size={18} /></a></div></section>;
}

function About() {
  return <section className="about section" id="about"><div className="container"><Reveal className="about-heading"><SectionLabel>{content.about.eyebrow}</SectionLabel><h2>{content.about.title.map((line) => <span key={line}>{line}</span>)}</h2></Reveal><div className="about-composition"><ImageReveal className="about-image-small" src="/images/distribution.jpg" alt="Organized warehouse aisle" /><ImageReveal className="about-image-large" src="/images/storage.jpg" alt="Organized warehouse storage facility" /><Reveal className="about-copy"><p>{content.about.lead}</p><p>{content.about.body}</p><a href="#capabilities" className="text-link">Explore our capabilities <ArrowRight size={17} /></a></Reveal></div></div></section>;
}

function Capabilities() {
  return <section className="capabilities section" id="capabilities"><div className="container"><Reveal className="section-heading centered"><SectionLabel>What we do</SectionLabel><h2>Capabilities</h2><p>Pharmaceutical storage, supply and distribution support.</p></Reveal><div className="capability-grid">{content.capabilities.map((item, index) => <Reveal key={item.title} delay={index * .07}><article className="capability-card"><div className="capability-image"><img src={assetUrl(item.image)} alt={item.alt} loading="lazy" decoding="async" /></div><div className="capability-content"><div><h3>{item.title}</h3><p>{item.description}</p></div><a href="#contact" aria-label={`Inquire about ${item.title}`}><ArrowUpRight size={19} /></a></div></article></Reveal>)}</div></div></section>;
}

function Operations() {
  const [active, setActive] = useState(0);
  return <section className="operations section"><div className="container operations-panel"><div className="operations-copy"><Reveal><SectionLabel>{content.operations.eyebrow}</SectionLabel><h2>{content.operations.title.map((line) => <span key={line}>{line}</span>)}</h2><p className="operations-intro">{content.operations.body}</p></Reveal><div className="operation-rows">{content.operations.items.map((item, index) => <div className={`operation-row ${active === index ? 'active' : ''}`} key={item.title}><button onClick={() => setActive(index)} aria-expanded={active === index}><span>{item.title}</span>{active === index ? <Minus size={18} /> : <Plus size={18} />}</button><AnimatePresence initial={false}>{active === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .35, ease }}>{item.text}</motion.p>}</AnimatePresence></div>)}</div></div><div className="operations-images"><ImageReveal className="operations-main" src="/images/storage.jpg" alt="Wide view of an organized distribution warehouse" /><ImageReveal className="operations-overlap" src="/images/pharmaceutical.jpg" alt="Pharmaceutical blister packs and medicines" /></div></div></section>;
}

function Audiences() {
  return <section className="audiences section"><div className="container"><Reveal className="audience-heading"><SectionLabel>Who we serve</SectionLabel><h2>Built around the<br />healthcare supply chain.</h2></Reveal><div className="audience-layout"><ImageReveal className="audience-image" src="/images/inventory.jpg" alt="Aerial view of an organized logistics facility and loading area" /><div className="audience-list">{content.audiences.map((audience, index) => <Reveal key={audience.title} delay={index * .06}><article><h3>{audience.title}</h3><p>{audience.text}</p><ArrowUpRight size={18} /></article></Reveal>)}</div></div></div></section>;
}

function Principles() {
  return <section className="principles section"><div className="container principles-panel"><ImageReveal className="principles-image" src="/images/hero-warehouse.jpg" alt="Warehouse shelving prepared for reliable supply" /><div className="principles-copy"><Reveal><SectionLabel>Why Saksouk</SectionLabel><h2>Dependability is<br />built into the process.</h2><p>Professional pharmaceutical supply is shaped by the way each stage is handled—from clear coordination to consistent service.</p></Reveal><ul>{content.principles.map((principle, index) => <Reveal key={principle} delay={index * .05}><li><i><Check size={15} strokeWidth={2} /></i>{principle}</li></Reveal>)}</ul></div></div></section>;
}

function Contact() {
  return <section className="contact section" id="contact"><div className="container"><div className="contact-banner"><img src={assetUrl('/images/distribution.jpg')} alt="Warehouse aisle supporting pharmaceutical distribution" loading="lazy" decoding="async" /><div className="contact-overlay" /><Reveal className="contact-content"><SectionLabel>Business inquiries</SectionLabel><h2>{content.contact.title.map((line) => <span key={line}>{line}</span>)}</h2><p>{content.contact.body}</p><ArrowLink href="mailto:info@saksouk.example" primary>Contact our team</ArrowLink></Reveal></div></div></section>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="container"><div className="footer-top"><Brand /><p>{content.company.descriptor}.<br />{content.company.location}.</p><nav aria-label="Footer navigation">{content.navigation.slice(1).map((item) => <a href={pageUrl(item.href)} key={item.href}>{item.label}</a>)}</nav><div className="footer-contact"><small>Contact</small><span>{content.contact.phone}</span><span>{content.contact.email}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Saksouk Drugstore</span><span>Company details to be confirmed</span><a href={pageUrl('/#home')}>Back to top <ArrowUpRight size={13} /></a></div></div></footer>;
}

export function SaksoukSite() {
  const reduce = useReducedMotion();
  useEffect(() => { if (reduce) return; const lenis = new Lenis({ duration: 1, smoothWheel: true }); let frameId = 0; const frame = (time: number) => { lenis.raf(time); frameId = requestAnimationFrame(frame); }; frameId = requestAnimationFrame(frame); return () => { cancelAnimationFrame(frameId); lenis.destroy(); }; }, [reduce]);
  return <main><SiteHeader /><Hero /><About /><Capabilities /><Operations /><Audiences /><Principles /><Contact /><SiteFooter /></main>;
}
