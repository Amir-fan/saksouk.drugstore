'use client';

import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';
import { siteContent as content } from '@/content/site';

const ease = [0.22, 1, 0.36, 1] as const;

function BrandMark() {
  return <a className="brand" href="#home" aria-label="Saksouk home"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span className="brand-name">SAKSOUK<span>DRUGSTORE</span></span></a>;
}

function ArrowLink({ href, children, solid = false }: { href: string; children: React.ReactNode; solid?: boolean }) {
  return <a href={href} className={solid ? 'arrow-link arrow-link-solid' : 'arrow-link'}><span>{children}</span><ArrowUpRight size={15} strokeWidth={1.6} /></a>;
}

function Nav() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  return <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}><div className="nav-inner"><BrandMark /><nav className="nav-links" aria-label="Primary navigation">{content.navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><div className="nav-contact"><ArrowLink href="#contact">Business inquiry</ArrowLink></div><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button></div><motion.div id="mobile-menu" className="mobile-menu" initial={false} animate={{ clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }} transition={{ duration: .55, ease }} aria-hidden={!open}><div className="mobile-menu-inner">{content.navigation.map((item, index) => <a href={item.href} key={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</a>)}<p>{content.company.descriptor}<br />{content.company.location}</p></div></motion.div></header>;
}

function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return <span className="line-mask"><motion.span initial={reduce ? false : { y: '108%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .95, delay, ease }}>{children}</motion.span></span>;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: .8, delay, ease }}>{children}</motion.div>;
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{index}</span><p>{children}</p></div>;
}

function Hero() {
  const reduce = useReducedMotion(); const { scrollYProgress } = useScroll(); const heroY = useTransform(scrollYProgress, [0, .16], [0, reduce ? 0 : 70]);
  return <section className="hero section-grid" id="home"><div className="hero-wash" aria-hidden="true" /><div className="hero-content shell"><motion.div className="hero-copy" style={{ y: heroY }}><motion.p className="eyebrow" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7, ease }}><span />{content.hero.eyebrow}</motion.p><h1>{content.hero.headline.map((line, index) => <LineReveal key={line} delay={.16 + index * .11}>{line}</LineReveal>)}</h1><motion.div className="hero-support" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .62, duration: .8, ease }}><p>{content.hero.body}</p><div className="hero-actions"><ArrowLink href={content.hero.primaryCta.href} solid>{content.hero.primaryCta.label}</ArrowLink><ArrowLink href={content.hero.secondaryCta.href}>{content.hero.secondaryCta.label}</ArrowLink></div></motion.div></motion.div><motion.aside className="hero-aside" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: .9 }}><p className="aside-label">Core operations</p>{content.hero.pillars.map((pillar, index) => <div key={pillar}><span>0{index + 1}</span><strong>{pillar}</strong></div>)}</motion.aside><a href="#proof" className="scroll-cue"><ArrowDown size={15} /><span>Scroll to explore</span></a><div className="hero-coordinate" aria-hidden="true">35.0°N&nbsp;&nbsp;38.0°E</div></div></section>;
}

function Metrics() {
  return <section className="metrics section-grid" id="proof"><div className="shell"><Reveal className="metrics-head"><SectionLabel index="01">Company proof</SectionLabel><h2>Built around continuity.</h2><p>Confirmed company figures will live here—clear, verifiable and never inflated.</p></Reveal><div className="metric-row">{content.metrics.map((metric, index) => <Reveal className="metric" delay={index * .06} key={metric.label}><span className="metric-value">{metric.value}</span><div><strong>{metric.label}</strong><small>{metric.note}</small></div></Reveal>)}</div></div></section>;
}

function About() {
  return <section className="about section-grid" id="about"><div className="shell"><Reveal><SectionLabel index="02">{content.about.eyebrow}</SectionLabel></Reveal><div className="about-grid"><Reveal className="chapter-title"><h2>{content.about.title.map((line) => <span key={line}>{line}</span>)}</h2></Reveal><Reveal className="about-lead"><p>{content.about.lead}</p></Reveal><Reveal className="about-body" delay={.1}><span className="rule" /><p>{content.about.body}</p></Reveal></div></div></section>;
}

function Capabilities() {
  return <section className="capabilities section-grid" id="capabilities"><div className="shell"><Reveal className="cap-heading"><SectionLabel index="03">What we do</SectionLabel><h2>Capabilities</h2><p>Connected pharmaceutical operations, structured around dependable access and professional support.</p></Reveal><div className="cap-grid">{content.capabilities.map((item, index) => <Reveal key={item.index} delay={(index % 3) * .06}><article className="cap-card"><div className="cap-card-top"><span>{item.index}</span><ArrowUpRight size={18} strokeWidth={1.3} /></div><h3>{item.title}</h3><p className="cap-short">{item.short}</p><p className="cap-detail">{item.detail}</p><div className="cap-line" /></article></Reveal>)}</div></div></section>;
}

function Audiences() {
  return <section className="audiences section-grid"><div className="shell audience-layout"><div className="audience-intro"><Reveal><SectionLabel index="04">Our network</SectionLabel><h2>Who we<br />serve</h2><p>Purpose-built relationships across the pharmaceutical supply chain.</p></Reveal></div><div className="audience-list">{content.audiences.map((item, index) => <Reveal key={item.index} delay={index * .06}><article className="audience-panel"><div className="audience-number">{item.index}</div><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowRight size={20} strokeWidth={1.2} /></article></Reveal>)}</div></div></section>;
}

function Operations() {
  const imageRef = useRef<HTMLDivElement>(null); const reduce = useReducedMotion(); const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] }); const scale = useTransform(scrollYProgress, [0, .5, 1], [reduce ? 1 : 1.04, 1, reduce ? 1 : 1.02]);
  return <section className="operations section-grid"><div className="shell"><Reveal><SectionLabel index="05">{content.operations.eyebrow}</SectionLabel></Reveal><div className="operations-head"><Reveal className="chapter-title"><h2>{content.operations.title.map((line) => <span key={line}>{line}</span>)}</h2></Reveal><Reveal className="operations-copy"><p>{content.operations.body}</p></Reveal></div><div className="operations-visual" ref={imageRef}><motion.div className="operations-surface" style={{ scale }} aria-label="Reserved area for future Saksouk operations photography"><span className="visual-code">OP / 01</span><div className="visual-axis axis-a" /><div className="visual-axis axis-b" /><div className="visual-core"><i /><i /><i /><i /><i /></div><p>Operations photography<br />reserved</p></motion.div><ol>{content.operations.stages.map((stage, index) => <li key={stage}><span>0{index + 1}</span>{stage}</li>)}</ol></div></div></section>;
}

function Partners() {
  return <section className="partners section-grid" id="partners"><div className="shell"><Reveal className="partners-head"><SectionLabel index="06">Industry relationships</SectionLabel><h2>Our partners</h2><p>Manufacturer and partner identities will be added once the approved logo set is supplied.</p></Reveal><div className="logo-grid" aria-label="Partner logo placeholders">{Array.from({ length: 6 }).map((_, index) => <Reveal key={index} delay={(index % 3) * .05}><div className="logo-placeholder"><span>Partner {String(index + 1).padStart(2, '0')}</span><small>Logo pending</small></div></Reveal>)}</div></div></section>;
}

function Principles() {
  return <section className="principles section-grid"><div className="shell"><Reveal className="principles-title"><SectionLabel index="07">Why Saksouk</SectionLabel><h2>What dependable<br />supply requires.</h2></Reveal><div className="principle-list">{content.principles.map((item, index) => <Reveal key={item.index} delay={index * .05}><article><span>{item.index}</span><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}</div></div></section>;
}

function Contact() {
  return <><section className="contact section-grid" id="contact"><div className="contact-glow" /><div className="shell contact-inner"><Reveal><SectionLabel index="08">Business inquiry</SectionLabel><h2>{content.contact.title.map((line) => <span key={line}>{line}</span>)}</h2><div className="contact-bottom"><p>{content.contact.body}</p><ArrowLink href="mailto:info@saksouk.example" solid>Contact our team</ArrowLink></div></Reveal></div></section><footer className="footer section-grid"><div className="shell"><div className="footer-main"><BrandMark /><p>{content.company.descriptor}.<br />Based in {content.company.location}.</p><nav aria-label="Footer navigation">{content.navigation.slice(1).map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><div className="footer-contact"><small>Contact details</small><span>{content.contact.phone}</span><span>{content.contact.email}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Saksouk Drugstore</span><span>Content details pending client confirmation</span><a href="#home">Back to top <ArrowUpRight size={13} /></a></div></div></footer></>;
}

export function SaksoukSite() {
  const reduce = useReducedMotion(); const { scrollYProgress } = useScroll();
  useEffect(() => { if (reduce) return; const lenis = new Lenis({ duration: 1.05, smoothWheel: true }); let raf = 0; const frame = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(frame); }; raf = requestAnimationFrame(frame); return () => { cancelAnimationFrame(raf); lenis.destroy(); }; }, [reduce]);
  return <main><div className="scroll-progress" aria-hidden="true"><motion.div style={{ scaleX: scrollYProgress }} /></div><Nav /><Hero /><Metrics /><About /><Capabilities /><Audiences /><Operations /><Partners /><Principles /><Contact /></main>;
}
