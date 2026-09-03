'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Eye,
  Handshake,
  HeartPulse,
  Leaf,
  PackageSearch,
  Pill,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from './language-provider';
import { ArrowLink, SiteFooter, SiteHeader } from './saksouk-site';
import { expandedPages } from '../content/pages';
import { assetUrl, pageUrl, WHATSAPP_URL } from '../lib/site-paths';

const ease = [0.22, 1, 0.36, 1] as const;

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: readonly string[]; intro: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.section className="inner-hero editorial-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}>
      <div className="container inner-hero-grid">
        <div><p className="section-label"><span />{eyebrow}</p><h1>{title.map((line, index) => <span key={index}>{line}</span>)}</h1></div>
        <div className="inner-intro"><p>{intro}</p></div>
      </div>
    </motion.section>
  );
}

function PageCta({ variant = 'partner' }: { variant?: 'partner' | 'career' }) {
  const { lang } = useLanguage();
  const career = variant === 'career';
  return (
    <section className="page-cta section">
      <div className="container page-cta-panel">
        <img className="page-cta-image" style={{ objectPosition: career ? 'center' : 'center 60%' }} src={assetUrl(career ? '/images/business-team.png' : '/images/business-partnership.png')} alt={career ? (lang === 'ar' ? 'فريق سكسوك في بيئة عمل تعاونية' : 'Saksouk team in a collaborative workplace') : (lang === 'ar' ? 'مصافحة خلال اجتماع شراكة أعمال' : 'Business partners shaking hands during a meeting')} />
        <div className="page-cta-overlay" />
        <div>
          <p className="section-label"><span />{career ? (lang === 'ar' ? 'الخطوة التالية' : 'Your next step') : (lang === 'ar' ? 'لنبدأ' : 'Start a conversation')}</p>
          <h2>{career ? (lang === 'ar' ? 'هل ترى مكاناً لك في فريقنا؟' : 'Can you see your place on our team?') : (lang === 'ar' ? 'هل يمكننا بناء شيء أفضل معاً؟' : 'Could we build something better together?')}</h2>
        </div>
        <ArrowLink href={WHATSAPP_URL} primary>{career ? (lang === 'ar' ? 'عرّفنا بنفسك' : 'Introduce yourself') : (lang === 'ar' ? 'كن شريكاً لنا' : 'Become a partner')}</ArrowLink>
      </div>
    </section>
  );
}

const trustIcons = [Building2, Pill, ShieldCheck, Handshake];

export function AboutPage() {
  const { lang } = useLanguage();
  const page = expandedPages[lang].about;
  return (
    <main><SiteHeader /><PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <section className="story-section section"><div className="container story-grid"><div className="story-image"><img src={assetUrl('/images/business-strategy.png')} alt={lang === 'ar' ? 'فريق سكسوك يناقش استراتيجية الأعمال' : 'Saksouk team discussing business strategy'} /></div><div className="story-copy"><p className="section-label"><span />{lang === 'ar' ? 'من نحن' : 'Who we are'}</p><h2>{page.storyTitle}</h2>{page.story.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></section>
      <section className="vision-section section"><div className="container vision-grid"><article><i><Eye /></i><span>{page.vision.label}</span><h2>{page.vision.title}</h2><p>{page.vision.text}</p></article><article><i><Target /></i><span>{page.goal.label}</span><h2>{page.goal.title}</h2><p>{page.goal.text}</p></article></div></section>
      <section className="trust-section section"><div className="container"><div className="trust-heading"><p className="section-label"><span />{lang === 'ar' ? 'الثقة بالأرقام' : 'Trust in numbers'}</p><h2>{lang === 'ar' ? 'علاقات عملية، أثر حقيقي.' : 'Practical relationships. Real reach.'}</h2></div><div className="trust-grid">{page.stats.map((stat, index) => { const Icon = trustIcons[index]; return <article key={stat.label}><i><Icon /></i><strong>{stat.value}</strong><span>{stat.label}</span></article>; })}</div></div></section>
      <section className="team-section section"><div className="container team-panel"><div className="team-copy"><p className="section-label"><span />{lang === 'ar' ? 'فريقنا' : 'Our team'}</p><h2>{page.teamTitle}</h2><p>{page.teamText}</p><ArrowLink href="/careers" primary>{lang === 'ar' ? 'اعمل معنا' : 'Work with us'}</ArrowLink></div><div className="team-image"><img src={assetUrl('/images/business-team.png')} alt={lang === 'ar' ? 'فريق أعمال سكسوك يتعاون على خطة' : 'Saksouk business team collaborating on a plan'} /></div></div></section>
      <PageCta /><SiteFooter /></main>
  );
}

function NewsCards({ compact = false }: { compact?: boolean }) {
  const { lang } = useLanguage();
  const posts = expandedPages[lang].news.posts;
  return <div className={`news-grid ${compact ? 'news-grid-compact' : ''}`}>{posts.map((post) => <article className="news-card" key={post.href}><a className="news-cover" href={post.href} target="_blank" rel="noreferrer"><img src={assetUrl(post.image)} alt="" /><span>{post.category}</span></a><div className="news-card-copy"><div className="news-meta"><span>{post.date}</span><span>{post.source}</span></div><h2>{post.title}</h2><p>{post.excerpt}</p><a className="news-link" href={post.href} target="_blank" rel="noreferrer">{lang === 'ar' ? 'اقرأ من المصدر' : 'Read the source'} <ArrowUpRight size={16} /></a></div></article>)}</div>;
}

export function InsightsPreview() {
  const { lang } = useLanguage();
  return <section className="insights-preview section"><div className="container"><div className="preview-heading"><div><p className="section-label"><span />{lang === 'ar' ? 'رؤى صحية' : 'Health insights'}</p><h2>{lang === 'ar' ? 'قراءات حول الأدوية والصحة.' : 'Reading medicine and health.'}</h2></div><a href={pageUrl('/news')} className="text-link">{lang === 'ar' ? 'كل الأخبار والرؤى' : 'All news & insights'} <ArrowRight size={17} /></a></div><NewsCards compact /></div></section>;
}

export function NewsPage() {
  const { lang } = useLanguage();
  const page = expandedPages[lang].news;
  return <main><SiteHeader /><PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} /><section className="news-page section"><div className="container"><NewsCards /></div></section><PageCta /><SiteFooter /></main>;
}

const pathIcons = [Handshake, BriefcaseBusiness, ShieldCheck];

export function WorkWithUsPage() {
  const { lang } = useLanguage();
  const page = expandedPages[lang].work;
  return <main><SiteHeader /><PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} /><section className="work-visual-section"><div className="container"><div className="work-visual"><img src={assetUrl('/images/business-team.png')} alt={lang === 'ar' ? 'فريق مهني يتعاون في بيئة عمل حديثة' : 'Professional team collaborating in a modern workplace'} /></div></div></section><section className="work-paths section"><div className="container"><div className="feature-grid">{page.paths.map((path, index) => { const Icon = pathIcons[index]; return <article key={path.title}><i><Icon /></i><span>0{index + 1}</span><h2>{path.title}</h2><p>{path.text}</p></article>; })}</div></div></section><section className="process-section section"><div className="container process-panel"><div><p className="section-label"><span />{lang === 'ar' ? 'كيف تبدأ' : 'How it starts'}</p><h2>{lang === 'ar' ? 'خطوات بسيطة، محادثة واضحة.' : 'Simple steps. A clear conversation.'}</h2></div><ol>{page.process.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol></div></section><PageCta variant="career" /><SiteFooter /></main>;
}

const benefitIcons = [HeartPulse, Users, Target, Handshake];

export function PartnerPage() {
  const { lang } = useLanguage();
  const page = expandedPages[lang].partner;
  return <main><SiteHeader /><PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} /><section className="partner-page section"><div className="container partner-page-grid"><div className="partner-page-image"><img src={assetUrl('/images/business-partnership.png')} alt={lang === 'ar' ? 'شراكة أعمال مهنية طويلة الأمد' : 'Long-term professional business partnership'} /></div><div className="partner-benefits">{page.benefits.map((benefit, index) => { const Icon = benefitIcons[index]; return <article key={benefit.title}><i><Icon /></i><div><h2>{benefit.title}</h2><p>{benefit.text}</p></div></article>; })}</div></div></section><PageCta /><SiteFooter /></main>;
}

type ProductKind = keyof typeof expandedPages.en.products;
const productIcons = { medicine: Pill, cosmetics: Sparkles, supplements: Leaf };

function ProductCatalogue({ kind, category }: { kind: ProductKind; category: string }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [company, setCompany] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [letter, setLetter] = useState('all');
  const copy = lang === 'ar' ? {
    eyebrow: 'كتالوج المنتجات', title: `استكشف ${category}`, intro: 'استخدم البحث والفلاتر للوصول إلى المنتجات عند إضافتها إلى الكتالوج.',
    search: 'ابحث باسم المنتج', company: 'جميع الشركات', local: 'شركات محلية', international: 'شركات دولية',
    availability: 'كل حالات التوفر', available: 'متوفر', soon: 'قريباً', all: 'الكل',
    emptyTitle: 'سيتم إضافة المنتجات قريباً', emptyText: 'نعمل حالياً على تجهيز هذا الكتالوج. تواصل مع فريقنا للاستفسار عن المنتجات المتوفرة حالياً.', reset: 'إعادة ضبط الفلاتر', inquire: 'استفسر عن المنتجات',
  } : {
    eyebrow: 'Product catalogue', title: `Explore ${category}`, intro: 'Use search and filters to find products as they are added to the catalogue.',
    search: 'Search by product name', company: 'All companies', local: 'Local companies', international: 'International companies',
    availability: 'All availability', available: 'Available', soon: 'Coming soon', all: 'All',
    emptyTitle: 'Products will be added soon', emptyText: 'We are currently preparing this catalogue. Contact our team to ask about products available today.', reset: 'Reset filters', inquire: 'Ask about products',
  };
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const reset = () => { setQuery(''); setCompany('all'); setAvailability('all'); setLetter('all'); };
  return (
    <section className={`catalogue-section section catalogue-${kind}`}>
      <div className="container">
        <div className="catalogue-heading"><div><p className="section-label"><span />{copy.eyebrow}</p><h2>{copy.title}</h2></div><p>{copy.intro}</p></div>
        <div className="catalogue-shell">
          <div className="catalogue-toolbar">
            <label className="catalogue-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} aria-label={copy.search} /></label>
            <label className="catalogue-select"><SlidersHorizontal size={17} /><select value={company} onChange={(event) => setCompany(event.target.value)} aria-label={copy.company}><option value="all">{copy.company}</option><option value="local">{copy.local}</option><option value="international">{copy.international}</option></select></label>
            <label className="catalogue-select"><select value={availability} onChange={(event) => setAvailability(event.target.value)} aria-label={copy.availability}><option value="all">{copy.availability}</option><option value="available">{copy.available}</option><option value="soon">{copy.soon}</option></select></label>
          </div>
          <div className="catalogue-alphabet" aria-label={lang === 'ar' ? 'التصفية حسب الحرف' : 'Filter by letter'}><button className={letter === 'all' ? 'active' : ''} onClick={() => setLetter('all')}>{copy.all}</button>{alphabet.map((item) => <button key={item} className={letter === item ? 'active' : ''} onClick={() => setLetter(item)}>{item}</button>)}</div>
          <div className="catalogue-empty">
            <i><PackageSearch /></i><p className="section-label"><span />{category}</p><h3>{copy.emptyTitle}</h3><p>{copy.emptyText}</p>
            <div><button type="button" className="catalogue-reset" onClick={reset}><RotateCcw size={15} />{copy.reset}</button><ArrowLink href={WHATSAPP_URL} primary>{copy.inquire}</ArrowLink></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductCategoryPage({ kind }: { kind: ProductKind }) {
  const { lang } = useLanguage();
  const page = expandedPages[lang].products[kind];
  const Icon = productIcons[kind];
  return <main><SiteHeader /><PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} /><section className="product-family section"><div className="container product-family-panel"><div className="product-family-image"><img src={assetUrl(page.image)} alt={page.eyebrow} /></div><div className="product-family-copy"><i><Icon /></i><p className="section-label"><span />{lang === 'ar' ? 'ما الذي ندعمه' : 'What we support'}</p><h2>{lang === 'ar' ? 'خبرة عملية عبر دورة المنتج.' : 'Practical expertise across the product journey.'}</h2><ul>{page.points.map((point) => <li key={point}><Check size={17} /><span>{point}</span></li>)}</ul><ArrowLink href="/partners" primary>{lang === 'ar' ? 'ناقش فرصة شراكة' : 'Discuss a partnership'}</ArrowLink></div></div></section><ProductCatalogue kind={kind} category={page.eyebrow} /><PageCta /><SiteFooter /></main>;
}
