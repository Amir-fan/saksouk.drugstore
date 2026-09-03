'use client';

import { ArrowRight, ArrowUpRight, Check, MapPin, Menu, Minus, Phone, Plus, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { assetUrl, pageUrl } from '@/lib/site-paths';

const ease = [0.22, 1, 0.36, 1] as const;

function Brand() {
  return <a className="brand" href={pageUrl('/#home')} aria-label="Saksouk Drugstore home"><img src={assetUrl('/images/logo.png')} alt="Saksouk Drugstore" className="brand-logo" /></a>;
}

export function ArrowLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return <a href={pageUrl(href)} className={`button ${primary ? 'button-primary' : 'button-light'}`}><span>{children}</span><i><ArrowUpRight size={16} strokeWidth={1.8} /></i></a>;
}

function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const languages = [
    { value: 'en' as const, short: 'EN', label: 'English', flag: '🇬🇧' },
    { value: 'ar' as const, short: 'AR', label: 'العربية', flag: '🇸🇾' },
  ];
  const current = languages.find((language) => language.value === lang)!;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={`lang-selector ${open ? 'is-open' : ''}`} ref={ref}>
      <button className="lang-trigger-btn" onClick={() => setOpen(!open)} aria-label={lang === 'ar' ? 'اختيار اللغة' : 'Select language'} aria-haspopup="menu" aria-expanded={open}>
        <span className="language-flag" aria-hidden>{current.flag}</span>
        <span className="language-current">{current.short}</span>
        <ChevronDown className="language-chevron" size={14} aria-hidden />
      </button>
      <div className="language-menu" role="menu" aria-label={lang === 'ar' ? 'اللغات' : 'Languages'}>
        {languages.map((language) => (
          <button className={`lang-btn ${lang === language.value ? 'active' : ''}`} role="menuitemradio" aria-checked={lang === language.value} onClick={() => { setLang(language.value); setOpen(false); }} key={language.value}>
            <span className="language-flag" aria-hidden>{language.flag}</span>
            <span>{language.label}</span>
            <span className="language-code">{language.short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { content } = useLanguage();
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => { const handle = () => setScrolled(window.scrollY > 18); handle(); window.addEventListener('scroll', handle, { passive: true }); return () => window.removeEventListener('scroll', handle); }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  return <header className={`header ${scrolled ? 'header-scrolled' : ''}`}><motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} /><div className="nav-wrap"><Brand /><nav className="desktop-nav" aria-label="Primary navigation">{content.navigation.map((item) => {
    if ('dropdown' in item && item.dropdown) {
      return (
        <div className="nav-dropdown-wrapper" key={item.label}>
          <button className="nav-dropdown-trigger">{item.label} <ChevronDown size={14} /></button>
          <div className="nav-dropdown">
            {item.dropdown.map(sub => <a href={pageUrl(sub.href)} key={sub.label}>{sub.label}</a>)}
          </div>
        </div>
      );
    }
    return <a href={pageUrl(item.href)} key={item.label}>{item.label}</a>;
  })}</nav><div className="desktop-cta"><LanguageSelector /><ArrowLink href="/#contact" primary>{content.navigation.find(n => n.href.includes('contact'))?.label || 'Contact'}</ArrowLink></div><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div><AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} aria-label="Mobile navigation"><div className="mobile-language"><LanguageSelector /></div>{content.navigation.map((item) => {
    if ('dropdown' in item && item.dropdown) {
      return (
        <div key={item.label} className="mobile-nav-group">
          <span className="mobile-nav-label">{item.label}</span>
          {item.dropdown.map(sub => <a href={pageUrl(sub.href)} onClick={() => setOpen(false)} key={sub.label} className="mobile-nav-sub">{sub.label}</a>)}
        </div>
      );
    }
    return <a href={pageUrl(item.href)} onClick={() => setOpen(false)} key={item.label}>{item.label}<ArrowUpRight size={18} /></a>;
  })}</motion.nav>}</AnimatePresence></header>;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: .75, delay, ease }}>{children}</motion.div>;
}

function ImageReveal({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  return <motion.div ref={ref} className={`image-reveal ${className}`} initial={reduce ? false : { opacity: 0, clipPath: 'inset(0 0 18% 0 round 22px)', y: 24 }} whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 22px)', y: 0 }} viewport={{ once: true, margin: '-9%' }} transition={{ duration: .9, ease }}><motion.img src={assetUrl(src)} alt={alt} loading="lazy" decoding="async" style={{ y: reduce ? 0 : imageY }} initial={reduce ? false : { scale: 1.055 }} whileInView={{ scale: 1 }} whileHover={reduce ? undefined : { scale: 1.025 }} transition={{ duration: .85, ease }} /></motion.div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { lang } = useLanguage();
  return <motion.p className="section-label" initial={reduce ? false : { opacity: 0, x: lang === 'ar' ? 12 : -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6, ease }}><motion.span initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: .65, delay: .08, ease }} />{children}</motion.p>;
}

function ScrollHeading({ lines }: { lines: readonly string[] }) {
  const reduce = useReducedMotion();
  return <motion.h2 initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, margin: '-10%' }}>{lines.map((line, index) => <span className="heading-mask" key={index}><motion.span variants={{ hidden: { y: '112%' }, visible: { y: 0, transition: { duration: .85, delay: index * .09, ease } } }}>{line}</motion.span></span>)}</motion.h2>;
}

function ScrollText({ text, className = '' }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.p className={`scroll-text ${className}`} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, margin: '-6%' }}>{text.split(' ').map((word, index) => <motion.span key={index} variants={{ hidden: { opacity: .18, y: 5 }, visible: { opacity: 1, y: 0, transition: { duration: .42, delay: index * .018, ease } } }}>{word}</motion.span>)}</motion.p>;
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: .7 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frameId = 0;
    const start = performance.now();
    const duration = reduce ? 1 : 1250;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, reduce, value]);
  return <span ref={ref}>{String(display).padStart(2, '0')}</span>;
}

function Metrics() {
  const { content, lang } = useLanguage();
  return (
    <section className="metrics" aria-label="Saksouk key figures">
      <div className="container">
        <div className="metrics-strip">
          <div className="metrics-bg-img" aria-hidden />
          <div className="metrics-bg-overlay" aria-hidden />
          <div className="metrics-inner">
            <div className="metric-row">
              {content.metrics.map((metric, index) => (
                <Reveal key={metric.label} delay={index * .09} className="metric-item">
                  <div className="metric-value"><CountUp value={metric.value} /></div>
                  <p className="metric-label">{metric.label}</p>
                  <p className="metric-detail">{metric.detail}</p>
                </Reveal>
              ))}
            </div>
            <p className="metrics-footnote">{lang === 'ar' ? 'تعكس الأرقام نموذج الإمداد الدوائي المعتمد لدى سكسوك.' : 'Figures reflect Saksouk’s established pharmaceutical supply model.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const { content } = useLanguage();
  const reduce = useReducedMotion();
  return <section className="hero" id="home"><div className="hero-media"><motion.img src={assetUrl('/images/pharma-hero-v3.jpg')} alt="Modern pharmaceutical distribution center with automated medicine handling" fetchPriority="high" decoding="async" initial={reduce ? false : { scale: 1.045 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease }} /><div className="hero-overlay" /><div className="hero-content"><motion.p className="eyebrow" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .7 }}>{content.hero.eyebrow}</motion.p><h1>{content.hero.headline.map((line, index) => <span className="line-mask" key={index}><motion.span initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ delay: .18 + index * .09, duration: .9, ease }}>{line}</motion.span></span>)}</h1><motion.div className="hero-lower" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .75, ease }}><p>{content.hero.body}</p><div className="hero-actions"><ArrowLink href="#contact" primary>{content.navigation.find(n => n.href.includes('contact'))?.label || 'Contact'}</ArrowLink><ArrowLink href="#about">{content.navigation.find(n => n.href.includes('about'))?.label || 'About'}</ArrowLink></div></motion.div></div></div></section>;
}

function About() {
  const { content } = useLanguage();
  return <section className="about section" id="about"><div className="container"><div className="about-composition"><Reveal className="about-copy"><SectionLabel>{content.about.eyebrow}</SectionLabel><ScrollHeading lines={content.about.title} /><ScrollText text={content.about.lead} /><p>{content.about.body}</p><a href="#capabilities" className="text-link">{content.navigation.find(n => n.href.includes('product'))?.label || 'Explore'} <ArrowRight size={17} /></a></Reveal><div className="about-images"><ImageReveal className="about-image-large" src="/images/pharma-automation-v3.jpg" alt="Modern automated medicine picking station" /><ImageReveal className="about-image-small" src="/images/pharma-quality-v3.jpg" alt="Pharmaceutical batch verification with a barcode scanner" /></div></div></div></section>;
}

function Capabilities() {
  const { content, lang } = useLanguage();
  return <section className="capabilities section" id="capabilities"><div className="container"><Reveal className="section-heading centered"><SectionLabel>{lang === 'ar' ? 'ما نقوم به' : 'What we do'}</SectionLabel><ScrollHeading lines={[lang === 'ar' ? 'القدرات' : 'Capabilities']} /><p>{lang === 'ar' ? 'دعم تخزين وتوريد وتوزيع الأدوية.' : 'Pharmaceutical storage, supply and distribution support.'}</p></Reveal><div className="capability-grid">{content.capabilities.map((item, index) => <Reveal key={item.title} delay={index * .07}><motion.article className="capability-card" whileHover={{ y: -8 }} transition={{ duration: .35, ease }}><div className="capability-image"><motion.img src={assetUrl(item.image)} alt={item.alt} loading="lazy" decoding="async" whileHover={{ scale: 1.045 }} transition={{ duration: .6, ease }} /></div><div className="capability-content"><div><h3>{item.title}</h3><p>{item.description}</p></div><a href="#contact" aria-label={`Inquire about ${item.title}`}><ArrowUpRight size={19} /></a></div></motion.article></Reveal>)}</div></div></section>;
}

function Partners() {
  const { content, lang } = useLanguage();
  const PARTNER_LOGOS = [
    { src: '/images/companies (1).png',  alt: content.partners[0] || 'Partner' },
    { src: '/images/companies (2).png',  alt: content.partners[1] || 'Partner' },
    { src: '/images/companies (3).png',  alt: content.partners[5] || 'Partner' },
    { src: '/images/companies (4).png',  alt: 'Partner' },
    { src: '/images/companies (1).jpeg', alt: 'Partner' },
    { src: '/images/companies (2).jpeg', alt: 'Partner' },
    { src: '/images/companies (3).jpeg', alt: 'Partner' },
    { src: '/images/companies (4).jpeg', alt: 'Partner' },
    { src: '/images/companies (5).jpeg', alt: 'Partner' },
    { src: '/images/companies (6).jpeg', alt: 'Partner' },
    { src: '/images/companies (7).jpeg', alt: 'Partner' },
  ];
  const row = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  return (
    <section className="partners section" id="partners" aria-label="Our Partners">
      <div className="container">
        <Reveal className="partners-heading">
          <SectionLabel>{lang === 'ar' ? 'شركاء موثوقون' : 'Trusted Partners'}</SectionLabel>
          <h2>{lang === 'ar' ? 'شركات تثق في سكسوك.' : 'Companies that trust Saksouk.'}</h2>
          <p>{lang === 'ar' ? 'نتعاون مع العلامات التجارية الرائدة في مجال الأدوية والمكملات الغذائية عبر المنطقة.' : 'We collaborate with leading pharmaceutical, nutraceutical and wellness brands across the region.'}</p>
        </Reveal>
      </div>
      <div className="partners-track-wrap">
        <div className="partners-fade-left" aria-hidden />
        <div className="partners-fade-right" aria-hidden />
        <div className="partners-track">
          {row.map((logo, i) => (
            <div className="partner-card" key={i}>
              <img src={assetUrl(logo.src)} alt={logo.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Operations() {
  const { content } = useLanguage();
  const [active, setActive] = useState(0);
  return <section className="operations section"><div className="container operations-panel"><div className="operations-copy"><Reveal><SectionLabel>{content.operations.eyebrow}</SectionLabel><ScrollHeading lines={content.operations.title} /><ScrollText className="operations-intro" text={content.operations.body} /></Reveal><div className="operation-rows">{content.operations.items.map((item, index) => <motion.div className={`operation-row ${active === index ? 'active' : ''}`} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: index * .07, ease }} key={item.title}><button onClick={() => setActive(index)} aria-expanded={active === index}><span>{item.title}</span>{active === index ? <Minus size={18} /> : <Plus size={18} />}</button><AnimatePresence initial={false}>{active === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .35, ease }}>{item.text}</motion.p>}</AnimatePresence></motion.div>)}</div></div><div className="operations-images"><ImageReveal className="operations-main" src="/images/pharma-automation-v3.jpg" alt="Automated pharmaceutical picking and barcode scanning" /><ImageReveal className="operations-overlap" src="/images/pharma-quality-v3.jpg" alt="Close-up pharmaceutical batch quality verification" /></div></div></section>;
}

function Audiences() {
  const { content, lang } = useLanguage();
  return <section className="audiences section"><div className="container"><Reveal className="audience-heading"><SectionLabel>{lang === 'ar' ? 'عملائنا' : 'Who we serve'}</SectionLabel><ScrollHeading lines={[lang === 'ar' ? 'مبنية حول سلسلة' : 'Built around the', lang === 'ar' ? 'توريد الرعاية الصحية.' : 'healthcare supply chain.']} /></Reveal><div className="audience-layout"><ImageReveal className="audience-image" src="/images/pharma-cold-chain-v3.jpg" alt="Temperature-controlled pharmaceutical shipment prepared for dispatch" /><div className="audience-list">{content.audiences.map((audience, index) => <Reveal key={audience.title} delay={index * .06}><motion.article whileHover={{ x: lang === 'ar' ? -8 : 8 }} transition={{ duration: .3, ease }}><h3>{audience.title}</h3><p>{audience.text}</p><ArrowUpRight size={18} /></motion.article></Reveal>)}</div></div></div></section>;
}

function Principles() {
  const { content, lang } = useLanguage();
  return <section className="principles section"><div className="container principles-panel"><ImageReveal className="principles-image" src="/images/pharma-hero-v3.jpg" alt="Modern pharmaceutical distribution team and automated conveyor" /><div className="principles-copy"><Reveal><SectionLabel>{lang === 'ar' ? 'لماذا سكسوك' : 'Why Saksouk'}</SectionLabel><ScrollHeading lines={[lang === 'ar' ? 'الموثوقية جزء أساسي' : 'Dependability is', lang === 'ar' ? 'من إجراءاتنا.' : 'built into the process.']} /><p>{lang === 'ar' ? 'يتشكل الإمداد الدوائي الاحترافي من خلال طريقة التعامل مع كل مرحلة — من التنسيق الواضح إلى الخدمة المتسقة.' : 'Professional pharmaceutical supply is shaped by the way each stage is handled—from clear coordination to consistent service.'}</p></Reveal><ul>{content.principles.map((principle, index) => <Reveal key={principle} delay={index * .06}><motion.li whileHover={{ y: -4, borderColor: '#cfd2ff' }} transition={{ duration: .25 }}><i><Check size={15} strokeWidth={2} /></i>{principle}</motion.li></Reveal>)}</ul></div></div></section>;
}

function Contact() {
  const { content, lang } = useLanguage();
  return <section className="contact section" id="contact"><div className="container"><div className="contact-banner"><motion.img src={assetUrl('/images/pharma-cold-chain-v3.jpg')} alt="Pharmaceutical cold-chain dispatch operation" loading="lazy" decoding="async" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} /><div className="contact-overlay" /><Reveal className="contact-content"><SectionLabel>{lang === 'ar' ? 'استفسارات الأعمال' : 'Business inquiries'}</SectionLabel><ScrollHeading lines={content.contact.title} /><ScrollText text={content.contact.body} /><ArrowLink href={`mailto:${content.contact.email}`} primary>{lang === 'ar' ? 'تواصل مع فريقنا' : 'Contact our team'}</ArrowLink></Reveal></div></div></section>;
}

export function SiteFooter() {
  const { content, lang } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-grid-4">
            <nav aria-label="Discover Saksouk">
              <Brand />
              <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <small style={{ marginBottom: '0' }}>{lang === 'ar' ? 'اكتشف سكسوك' : 'DISCOVER SAKSOUK'}</small>
                {content.footer.discover.map(item => <a href={pageUrl(item.href)} key={item.label}>{item.label}</a>)}
              </div>
            </nav>
            <nav aria-label="What We Do">
              <small>{lang === 'ar' ? 'ما نقوم به' : 'WHAT WE DO'}</small>
              {content.footer.whatWeDo.map(item => <a href={pageUrl(item.href)} key={item.label}>{item.label}</a>)}
            </nav>
            <nav aria-label="Useful Links">
              <small>{lang === 'ar' ? 'روابط مفيدة' : 'USEFUL LINKS'}</small>
              {content.footer.usefulLinks.map(item => <a href={pageUrl(item.href)} key={item.label}>{item.label}</a>)}
            </nav>
            <div className="footer-contact-info">
              <small>{lang === 'ar' ? 'تواصل معنا' : 'CONTACT US'}</small>
              <div className="contact-row">
                <Phone size={16} strokeWidth={2} />
                <span>
                  <span dir="ltr">{content.contact.phone}</span>
                  <span style={{ display: 'block', color: '#858da4', fontSize: '12px', marginTop: '4px' }}>{lang === 'ar' ? 'الهاتف وواتساب' : 'Phone & WhatsApp'}</span>
                </span>
              </div>
              <div className="contact-row">
                <MapPin size={16} strokeWidth={2} />
                <span style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>{content.footer.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-mega">
          <h2>SAKSOUK</h2>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Saksouk Drugstore</span>
          <span>{lang === 'ar' ? 'سيتم تأكيد تفاصيل الشركة' : 'Company details to be confirmed'}</span>
          <a href={pageUrl('/#home')}>{lang === 'ar' ? 'العودة للأعلى' : 'Back to top'} <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </footer>
  );
}

export function SaksoukSite() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1, smoothWheel: true });
    let frameId = 0;
    const frame = (time: number) => { lenis.raf(time); frameId = requestAnimationFrame(frame); };
    frameId = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(frameId); lenis.destroy(); };
  }, [reduce]);

  return (
    <main>
      <SiteHeader />
      <Hero />
      <About />
      <Metrics />
      <Capabilities />
      <Partners />
      <Operations />
      <Audiences />
      <Principles />
      <Contact />
      <SiteFooter />
    </main>
  );
}
