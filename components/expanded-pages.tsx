'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownAZ,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Eye,
  ExternalLink,
  FlaskConical,
  Handshake,
  HeartPulse,
  Leaf,
  ListFilter,
  PackageSearch,
  Pill,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from './language-provider';
import { ArrowLink, SiteFooter, SiteHeader } from './saksouk-site';
import { expandedPages } from '../content/pages';
import { buildMedicineOverviewFacts, type MedicineOverviewFactKey } from '../lib/medicine-guide-facts';
import {
  getAboutMilestones,
  getProductExperience,
  getWorkPrinciples,
  type SecondaryProductKind,
} from '../lib/secondary-page-experience';
import { assetUrl, pageUrl, WHATSAPP_URL } from '../lib/site-paths';

const ease = [0.22, 1, 0.36, 1] as const;

function displayTitle(value: string) {
  return value.replace(/\.+\s*$/u, '');
}

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: readonly string[]; intro: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.section className="inner-hero editorial-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}>
      <div className="container inner-hero-grid">
        <div><p className="section-label"><span />{eyebrow}</p><h1>{title.map((line, index) => <span key={index}>{displayTitle(line)}</span>)}</h1></div>
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
const milestoneIcons = [Building2, Pill, Handshake] as const;

export function AboutPage() {
  const { lang } = useLanguage();
  const page = expandedPages[lang].about;
  const reduce = useReducedMotion();
  const milestones = getAboutMilestones(lang);
  return (
    <main><SiteHeader />
      <motion.section className="about-editorial-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}>
        <div className="container">
          <div className="about-editorial-panel">
            <div className="about-editorial-copy">
              <p className="section-label"><span />{page.eyebrow}</p>
              <h1>{page.title.map((line) => <span key={line}>{displayTitle(line)}</span>)}</h1>
              <p>{page.intro}</p>
              <div className="about-editorial-actions">
                <ArrowLink href="#about-story" primary>{lang === 'ar' ? 'اكتشف قصتنا' : 'Discover our story'}</ArrowLink>
                <ArrowLink href="/partners">{lang === 'ar' ? 'تعاون معنا' : 'Partner with us'}</ArrowLink>
              </div>
              <div className="about-editorial-years">
                <div><strong>1950</strong><span>{lang === 'ar' ? 'بداية خبرة المجموعة' : 'Group experience begins'}</span></div>
                <div><strong>2000</strong><span>{lang === 'ar' ? 'انطلاق المستودع الدوائي' : 'Pharmaceutical warehouse established'}</span></div>
              </div>
            </div>
            <div className="about-editorial-visual">
              <img src={assetUrl('/images/business-strategy.png')} alt={lang === 'ar' ? 'فريق سكسوك يناقش استراتيجية الأعمال' : 'Saksouk team discussing business strategy'} />
              <div className="about-editorial-visual-shade" />
              <div className="about-editorial-caption"><Handshake size={20} /><div><span>{lang === 'ar' ? 'خبرة محلية' : 'Local capability'}</span><strong>{lang === 'ar' ? 'نبني حضوراً مستداماً لشركائنا' : 'Building sustainable market presence for partners'}</strong></div></div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="about-legacy section"><div className="container"><div className="about-legacy-heading"><p className="section-label"><span />{lang === 'ar' ? 'محطات رئيسية' : 'A business built over time'}</p><h2>{lang === 'ar' ? 'من خبرة متعددة القطاعات إلى تركيز دوائي واضح' : 'From broad business experience to focused pharmaceutical expertise'}</h2></div><div className="about-timeline">{milestones.map((milestone, index) => { const Icon = milestoneIcons[index]; return <article key={milestone.year}><div className="about-timeline-marker"><i><Icon size={19} /></i><span>{milestone.year}</span></div><h3>{milestone.title}</h3><p>{milestone.text}</p></article>; })}</div></div></section>

      <section className="story-section section" id="about-story"><div className="container story-grid"><div className="story-image"><img src={assetUrl('/images/pharma-automation-v3.jpg')} alt={lang === 'ar' ? 'منشأة دوائية حديثة تدعم عمليات التوزيع' : 'Modern pharmaceutical facility supporting distribution operations'} /></div><div className="story-copy"><p className="section-label"><span />{lang === 'ar' ? 'من نحن' : 'Who we are'}</p><h2>{displayTitle(page.storyTitle)}</h2>{page.story.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></section>
      <section className="vision-section section"><div className="container vision-grid"><article><i><Eye /></i><span>{page.vision.label}</span><h2>{displayTitle(page.vision.title)}</h2><p>{page.vision.text}</p></article><article><i><Target /></i><span>{page.goal.label}</span><h2>{displayTitle(page.goal.title)}</h2><p>{page.goal.text}</p></article></div></section>
      <section className="trust-section section"><div className="container"><div className="trust-heading"><p className="section-label"><span />{lang === 'ar' ? 'الثقة بالأرقام' : 'Trust in numbers'}</p><h2>{lang === 'ar' ? 'علاقات عملية، أثر حقيقي' : 'Practical relationships. Real reach'}</h2></div><div className="trust-grid">{page.stats.map((stat, index) => { const Icon = trustIcons[index]; return <article key={stat.label}><i><Icon /></i><strong>{stat.value}</strong><span>{stat.label}</span></article>; })}</div></div></section>
      <section className="team-section section"><div className="container team-panel"><div className="team-copy"><p className="section-label"><span />{lang === 'ar' ? 'فريقنا' : 'Our team'}</p><h2>{displayTitle(page.teamTitle)}</h2><p>{page.teamText}</p><ArrowLink href="/careers" primary>{lang === 'ar' ? 'اعمل معنا' : 'Work with us'}</ArrowLink></div><div className="team-image"><img src={assetUrl('/images/business-team.png')} alt={lang === 'ar' ? 'فريق أعمال سكسوك يتعاون على خطة' : 'Saksouk business team collaborating on a plan'} /></div></div></section>
      <PageCta /><SiteFooter /></main>
  );
}

type NewsPost = {
  readonly category: string;
  readonly date: string;
  readonly title: string;
  readonly excerpt: string;
  readonly image: string;
  readonly source: string;
  readonly href: string;
};

function NewsCards({ compact = false, posts }: { compact?: boolean; posts?: readonly NewsPost[] }) {
  const { lang } = useLanguage();
  const visiblePosts = posts ?? expandedPages[lang].news.posts;
  return <div className={`news-grid ${compact ? 'news-grid-compact' : ''}`}>{visiblePosts.map((post) => <article className="news-card" key={post.href}><a className="news-cover" href={post.href} target="_blank" rel="noreferrer"><img src={assetUrl(post.image)} alt="" /><span>{post.category}</span></a><div className="news-card-copy"><div className="news-meta"><span>{post.date}</span><span>{post.source}</span></div><h2>{post.title}</h2><p>{post.excerpt}</p><a className="news-link" href={post.href} target="_blank" rel="noreferrer">{lang === 'ar' ? 'اقرأ من المصدر' : 'Read the source'} <ArrowUpRight size={16} /></a></div></article>)}</div>;
}

export function InsightsPreview() {
  const { lang } = useLanguage();
  return <section className="insights-preview section"><div className="container"><div className="preview-heading"><div><p className="section-label"><span />{lang === 'ar' ? 'رؤى صحية' : 'Health insights'}</p><h2>{lang === 'ar' ? 'قراءات حول الأدوية والصحة' : 'Reading medicine and health'}</h2></div><a href={pageUrl('/news')} className="text-link">{lang === 'ar' ? 'كل الأخبار والرؤى' : 'All news & insights'} <ArrowRight size={17} /></a></div><NewsCards compact /></div></section>;
}

export function NewsPage() {
  const { lang } = useLanguage();
  const page = expandedPages[lang].news;
  const reduce = useReducedMotion();
  const featured = page.posts[0];
  return <main><SiteHeader />
    <motion.section className="newsroom-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}><div className="container"><div className="newsroom-panel"><div className="newsroom-copy"><p className="section-label"><span />{page.eyebrow}</p><h1>{page.title.map((line) => <span key={line}>{displayTitle(line)}</span>)}</h1><p>{page.intro}</p><a className="newsroom-feature-link" href={featured.href} target="_blank" rel="noreferrer"><span>{lang === 'ar' ? 'الموضوع الأبرز' : 'Featured briefing'}</span><strong>{featured.title}</strong><small>{featured.source} · {featured.date}</small><i><ArrowUpRight size={18} /></i></a></div><a className="newsroom-feature-visual" href={featured.href} target="_blank" rel="noreferrer"><img src={assetUrl(featured.image)} alt="" /><div /><span>{featured.category}</span><strong>{lang === 'ar' ? 'قراءة موثوقة حول الصحة والإمداد' : 'Authoritative reading on health and supply'}</strong></a></div></div></motion.section>
    <section className="news-page section"><div className="container"><div className="newsroom-index-heading"><div><p className="section-label"><span />{lang === 'ar' ? 'من غرفة الأخبار' : 'From the newsroom'}</p><h2>{lang === 'ar' ? 'قراءات مختارة، مصادر واضحة' : 'Selected reading. Clear sources'}</h2></div><p>{lang === 'ar' ? 'محتوى موجز يعتمد على مصادر صحية وتنظيمية موثوقة لمتابعة ما يهم قطاعنا.' : 'Concise coverage grounded in authoritative health and regulatory sources relevant to our sector.'}</p></div><NewsCards posts={page.posts.slice(1)} /></div></section><PageCta /><SiteFooter /></main>;
}

const pathIcons = [Handshake, BriefcaseBusiness, ShieldCheck];
const principleIcons = [Target, Users, ShieldCheck] as const;

export function WorkWithUsPage() {
  const { lang } = useLanguage();
  const page = expandedPages[lang].work;
  const reduce = useReducedMotion();
  const principles = getWorkPrinciples(lang);
  return <main><SiteHeader />
    <motion.section className="work-editorial-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}><div className="container"><div className="work-editorial-panel"><div className="work-editorial-copy"><p className="section-label"><span />{page.eyebrow}</p><h1>{page.title.map((line) => <span key={line}>{displayTitle(line)}</span>)}</h1><p>{page.intro}</p><div className="work-editorial-actions"><ArrowLink href="#work-paths" primary>{lang === 'ar' ? 'استكشف مجالات العمل' : 'Explore where you fit'}</ArrowLink><ArrowLink href={WHATSAPP_URL}>{lang === 'ar' ? 'تواصل معنا' : 'Introduce yourself'}</ArrowLink></div></div><div className="work-editorial-visual"><img src={assetUrl('/images/business-team.png')} alt={lang === 'ar' ? 'فريق مهني يتعاون في بيئة عمل حديثة' : 'Professional team collaborating in a modern workplace'} /><div className="work-editorial-shade" /><div className="work-editorial-quote"><span>{lang === 'ar' ? 'ننجح معاً' : 'Built together'}</span><strong>{lang === 'ar' ? 'تخصصات مختلفة، معيار مشترك، أثر ملموس' : 'Different disciplines. One shared standard. Meaningful impact'}</strong></div></div></div></div></motion.section>
    <section className="work-principles section"><div className="container"><div className="work-principles-heading"><p className="section-label"><span />{lang === 'ar' ? 'طريقة عملنا' : 'How we work'}</p><h2>{lang === 'ar' ? 'مساحة للخبرة، والمسؤولية، والنمو' : 'Room for expertise, responsibility and growth'}</h2></div><div className="work-principles-grid">{principles.map((principle, index) => { const Icon = principleIcons[index]; return <article key={principle.title}><i><Icon size={20} /></i><h3>{principle.title}</h3><p>{principle.text}</p></article>; })}</div></div></section>
    <section className="work-paths section" id="work-paths"><div className="container"><div className="work-paths-heading"><p className="section-label"><span />{lang === 'ar' ? 'مجالات الخبرة' : 'Where you can contribute'}</p><h2>{lang === 'ar' ? 'أدوار تربط المعرفة بالتنفيذ' : 'Roles that connect expertise to execution'}</h2></div><div className="feature-grid">{page.paths.map((path, index) => { const Icon = pathIcons[index]; return <article key={path.title}><i><Icon /></i><h2>{path.title}</h2><p>{path.text}</p></article>; })}</div></div></section><section className="process-section section"><div className="container process-panel"><div><p className="section-label"><span />{lang === 'ar' ? 'كيف تبدأ' : 'How it starts'}</p><h2>{lang === 'ar' ? 'خطوات بسيطة، محادثة واضحة' : 'Simple steps. A clear conversation'}</h2></div><ol>{page.process.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol></div></section><PageCta variant="career" /><SiteFooter /></main>;
}

const benefitIcons = [HeartPulse, Users, Target, Handshake];

export function PartnerPage() {
  const { lang } = useLanguage();
  const page = expandedPages[lang].partner;
  return <main><SiteHeader /><PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} /><section className="partner-page section"><div className="container partner-page-grid"><div className="partner-page-image"><img src={assetUrl('/images/business-partnership.png')} alt={lang === 'ar' ? 'شراكة أعمال مهنية طويلة الأمد' : 'Long-term professional business partnership'} /></div><div className="partner-benefits">{page.benefits.map((benefit, index) => { const Icon = benefitIcons[index]; return <article key={benefit.title}><i><Icon /></i><div><h2>{benefit.title}</h2><p>{benefit.text}</p></div></article>; })}</div></div></section><PageCta /><SiteFooter /></main>;
}

type ProductKind = keyof typeof expandedPages.en.products;
const productIcons = { medicine: Pill, cosmetics: Sparkles, supplements: Leaf };

const medicineFeatureIcons = [ShieldCheck, PackageSearch, HeartPulse, Handshake] as const;

const secondaryProductIcons = {
  cosmetics: [Sparkles, ShieldCheck, HeartPulse, Handshake],
  supplements: [Leaf, ShieldCheck, HeartPulse, PackageSearch],
} as const;

function ProductCategoryHero({
  kind,
  page,
}: {
  kind: SecondaryProductKind;
  page: { eyebrow: string; title: readonly string[]; intro: string; image: string; points: readonly string[] };
}) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const experience = getProductExperience(kind, lang);
  const CategoryIcon = productIcons[kind];
  const pointIcons = secondaryProductIcons[kind];

  return (
    <motion.section
      className={`product-category-hero product-category-hero-${kind}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8, ease }}
    >
      <div className="container">
        <div className="product-category-panel">
          <div className="product-category-main">
            <div className="product-category-copy">
              <div className="product-category-kicker"><i><CategoryIcon size={18} /></i><span>{page.eyebrow}</span></div>
              <h1>{page.title.map((line) => <span key={line}>{line.replace(/[.!؟]+\s*$/u, '')}</span>)}</h1>
              <p>{page.intro}</p>
              <div className="product-category-actions">
                <ArrowLink href={`#${kind}-catalogue`} primary>{experience.catalogueLabel}</ArrowLink>
                <ArrowLink href="/about">{experience.storyLabel}</ArrowLink>
              </div>
            </div>

            <div className="product-category-visual">
              <img src={assetUrl(page.image)} alt={experience.imageAlt} />
              <div className="product-category-visual-shade" />
              <div className="product-category-visual-card">
                <span>{experience.stageLabel}</span>
                <strong>{experience.stageTitle}</strong>
                <p>{experience.stageText}</p>
              </div>
              <div className="product-category-mark"><CategoryIcon size={23} /><span>{lang === 'ar' ? 'اختيار مهني' : 'Professionally selected'}</span></div>
            </div>
          </div>

          <div className="product-category-points">
            {experience.points.map((point, index) => {
              const Icon = pointIcons[index];
              return <article key={point}><i><Icon size={19} /></i><span>{point}</span></article>;
            })}
          </div>

          <div className="product-category-metrics">
            {experience.metrics.map((metric) => <article key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}
            <div className="product-category-note"><CategoryIcon size={22} /><span>{lang === 'ar' ? 'خبرة محلية. معايير واضحة. توزيع مسؤول.' : 'Local expertise. Clear standards. Responsible distribution.'}</span></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SyriaReachGraphic({ lang }: { lang: 'en' | 'ar' }) {
  return (
    <div className="medicine-reach-graphic">
      <div>
        <span>{lang === 'ar' ? 'نطاق التوزيع' : 'Distribution reach'}</span>
        <strong>{lang === 'ar' ? 'السوق السورية' : 'The Syrian market'}</strong>
      </div>
      <svg viewBox="0 0 260 190" aria-labelledby="syria-map-title">
        <title id="syria-map-title">{lang === 'ar' ? 'خريطة توضيحية لسوريا' : 'Illustrated map of Syria'}</title>
        <defs>
          <linearGradient id="syria-map-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8d78f0" />
            <stop offset="1" stopColor="#5543ca" />
          </linearGradient>
          <filter id="syria-map-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="9" stdDeviation="9" floodColor="#4839aa" floodOpacity=".2" />
          </filter>
        </defs>
        <path className="medicine-map-grid" d="M20 45H240M20 82H240M20 119H240M20 156H240M57 22V170M101 22V170M145 22V170M189 22V170M233 22V170" />
        <path className="medicine-map-shape" filter="url(#syria-map-shadow)" fill="url(#syria-map-gradient)" data-insee-code="99206" d="M21.1 157.1L25.4 151.1L21.3 139.4L30.3 132.4L26.6 130.3L27.4 128.2L33.7 124L41 124.8L38.7 121.1L49.1 113.6L46.5 106.9L39.7 104.1L43.7 100.7L39.4 98.9L37.8 100.7L28.2 100.1L24.7 91.9L27.9 83.7L26.5 77.1L20 72.2L23.9 67.2L22.5 64.2L28.5 61.8L34.4 65L35.7 61.1L41 59.8L41.5 52.8L51.1 52.8L46.7 45.3L50.3 34.9L61 37.1L64 41.1L77 40.7L102.7 32.5L111.1 34L119.2 38.9L136.3 39.9L153.6 37.4L184.8 26.7L210.3 27.5L227.8 24.5L234.5 20L239 22.5L240 27.9L222.4 41.2L207.2 44.2L203.6 49L202.3 57.8L206.2 64.9L206.5 70L201.1 82.3L201.2 95.8L193.3 107.5L184.2 109.6L120.9 138.3L56.2 169.9L42 168L35 163.6L31.3 163.9L27.3 158.7Z" />
        <path className="medicine-map-route" d="M50 50C78 55 98 72 122 82S161 103 199 99" />
        <circle className="medicine-map-node is-primary" cx="50" cy="50" r="8" />
        <circle className="medicine-map-node" cx="122" cy="82" r="5" />
        <circle className="medicine-map-node" cx="164" cy="104" r="5" />
        <circle className="medicine-map-node" cx="199" cy="99" r="5" />
      </svg>
    </div>
  );
}

function MedicineProductHero({ page }: { page: { eyebrow: string; title: readonly string[]; intro: string; image: string; points: readonly string[] } }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const stats = lang === 'ar'
    ? [
        { value: '2000', label: 'بداية نشاط المستودع الدوائي' },
        { value: '2,982', label: 'صيدلية ضمن نطاقنا' },
        { value: '03', label: 'عائلات منتجات أساسية' },
      ]
    : [
        { value: '2000', label: 'Pharmaceutical activity since' },
        { value: '2,982', label: 'Pharmacies in our reach' },
        { value: '03', label: 'Core product families' },
      ];

  return (
    <motion.section className="medicine-product-hero" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}>
      <div className="container">
        <div className="medicine-hero-panel">
          <div className="medicine-hero-main">
            <div className="medicine-hero-copy">
              <h1 aria-label={lang === 'ar' ? 'أدوية تدعم الرعاية الصحية اليومية' : 'Medicines that support everyday healthcare'}>
                {lang === 'ar' ? <><span>أدوية تدعم</span><span>الرعاية الصحية</span><span><em>اليومية</em></span></> : <><span>Medicines that</span><span>support <em>everyday</em></span><span>healthcare</span></>}
              </h1>
              <p className="medicine-hero-intro">{page.intro}</p>
              <div className="medicine-hero-actions">
                <ArrowLink href="#medicine-catalogue" primary>{lang === 'ar' ? 'استكشف المنتجات' : 'Explore our products'}</ArrowLink>
                <ArrowLink href="/about">{lang === 'ar' ? 'تعرف على قصتنا' : 'Our story'}</ArrowLink>
              </div>
            </div>
            <div className="medicine-hero-map-stage">
              <div className="medicine-map-stage-copy"><span>SY · 99206</span><strong>{lang === 'ar' ? 'وصول دوائي عبر السوق السورية' : 'Pharmaceutical reach across Syria'}</strong><p>{lang === 'ar' ? 'شبكة مترابطة تدعم الصيدليات وقنوات الرعاية الصحية' : 'A connected network supporting pharmacies and healthcare channels'}</p></div>
              <SyriaReachGraphic lang={lang} />
              <div className="medicine-map-stage-chip"><ShieldCheck size={17} /><span>{lang === 'ar' ? 'توزيع مسؤول' : 'Responsible distribution'}</span></div>
            </div>
          </div>

          <div className="medicine-feature-strip">
            {page.points.map((point, index) => {
              const Icon = medicineFeatureIcons[index];
              return <article key={point}><i><Icon size={20} /></i><span>{point}</span></article>;
            })}
          </div>

          <div className="medicine-reach-strip">
            <div className="medicine-reach-stats">
              {stats.map((stat) => <article key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></article>)}
            </div>
            <div className="medicine-reach-message"><span>{lang === 'ar' ? 'سلسلة إمداد موثوقة' : 'Dependable supply'}</span><strong>{lang === 'ar' ? 'من المستودع إلى قنوات الرعاية' : 'From warehouse to healthcare channels'}</strong></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

type CatalogProduct = {
  id: string;
  name: string;
  officialName?: string;
  company: { en: string; ar: string; slug: string; logo?: string };
  category: 'medicine' | 'cosmetics' | 'supplements';
  group: 'national' | 'cosmetics' | 'supplements';
  description?: string;
  composition?: string;
  indication?: string;
  image?: string;
  images?: string[];
};

type LocalizedGuideText = { en?: string; ar?: string };
type MedicineGuide = {
  status: 'manufacturer-verified' | 'catalogue-verified' | 'under-verification';
  manufacturer: { en: string; ar: string };
  activeIngredients?: LocalizedGuideText;
  strength?: LocalizedGuideText;
  dosageForm?: LocalizedGuideText;
  recognizedUse?: LocalizedGuideText;
  source?: {
    label: LocalizedGuideText;
    url?: string;
    type: 'official-manufacturer' | 'supplied-catalogue';
    accessed: string;
  };
};

function guideText(value: LocalizedGuideText | undefined, lang: 'en' | 'ar') {
  return value?.[lang] || value?.en || value?.ar || '';
}

const ARABIC_CHARACTER = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;
const LATIN_CHARACTER = /[A-Za-z]/;

function localizedProductText(value: string | undefined, lang: 'en' | 'ar') {
  const normalized = value?.replace(/\s+/g, ' ').trim() || '';
  if (!normalized || !ARABIC_CHARACTER.test(normalized) || !LATIN_CHARACTER.test(normalized)) return normalized;

  const firstArabicIndex = normalized.search(ARABIC_CHARACTER);
  const firstLatinIndex = normalized.search(LATIN_CHARACTER);
  const latinAfterArabic = normalized.slice(firstArabicIndex).search(LATIN_CHARACTER);
  const arabicEnd = latinAfterArabic > 0 ? firstArabicIndex + latinAfterArabic : normalized.length;
  const arabic = normalized.slice(firstArabicIndex, arabicEnd).replace(/[\s—–:،-]+$/g, '').trim();
  const englishEnd = firstLatinIndex < firstArabicIndex ? firstArabicIndex : normalized.length;
  const english = normalized.slice(firstLatinIndex, englishEnd).replace(/[\s—–:،-]+$/g, '').trim();
  return (lang === 'ar' ? arabic : english) || normalized;
}

function localizedProductName(product: CatalogProduct, lang: 'en' | 'ar') {
  const localized = localizedProductText(product.name, lang);
  if (lang === 'en' && ARABIC_CHARACTER.test(product.name) && !LATIN_CHARACTER.test(localized)) {
    return product.company.en;
  }
  if (lang === 'en' && product.name.search(ARABIC_CHARACTER) === 0 && localized.split(/\s+/).length <= 2) {
    return `${product.company.en} ${localized}`.trim();
  }
  return localized || product.name;
}

function localizedProductDetail(product: CatalogProduct, lang: 'en' | 'ar') {
  const name = localizedProductName(product, lang);
  const candidates = lang === 'ar'
    ? [product.description, product.indication, product.composition]
    : [product.description, product.composition, product.indication];

  return candidates
    .map((value) => localizedProductText(value, lang))
    .find((value) => value && value.toLocaleLowerCase() !== name.toLocaleLowerCase()) || '';
}

function MedicineGuidePanel({ product, guide, onClose }: { product: CatalogProduct; guide?: MedicineGuide; onClose: () => void }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDialogElement>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'composition' | 'usage' | 'safety'>('overview');
  const pending = !guide || guide.status === 'under-verification';
  const productName = localizedProductName(product, lang);
  const copy = lang === 'ar' ? {
    kicker: 'مساعد سكسوك الذكي', title: 'دليلك الذكي للمعلومات الأساسية عن المنتج.', close: 'إغلاق الدليل', powered: 'مدعوم بالذكاء',
    overview: 'نظرة عامة', compositionTab: 'التركيب', usageTab: 'الاستخدام والجرعة', safetyTab: 'السلامة والتنبيهات',
    summary: 'الملخص الذكي', summaryText: 'نظرة منظمة على المعلومات المتاحة عن هذا المنتج لتسهيل المراجعة السريعة.', availableDetails: 'تفاصيل الكتالوج المتاحة', pending: 'جارٍ تجهيز الملخص الذكي',
    active: 'المادة الفعالة / التركيب', strength: 'العيار', form: 'الشكل الصيدلاني', use: 'الاستخدام المدرج من الشركة', manufacturer: 'الشركة المصنّعة', source: 'المصدر', viewSource: 'عرض المصدر الرسمي',
    pendingTitle: 'نراجع بيانات هذا الصنف الآن.', pendingText: 'لن نعرض تركيبة متوقعة أو مستنتجة. ستظهر المادة الفعالة هنا فقط بعد مطابقة الصنف مع مصدر موثوق.',
    disclaimerTitle: 'تنبيه صحي', disclaimer: 'هذه معلومات تعريفية عن المنتج وليست وصفة أو نصيحة جرعات، ولا تغني عن استشارة الطبيب أو الصيدلي.',
  } : {
    kicker: 'SAKSOUK AI ASSISTANT', title: 'Your intelligent guide to key product information.', close: 'Close medicine guide', powered: 'AI-powered',
    overview: 'Product overview', compositionTab: 'Composition', usageTab: 'Usage & dosage', safetyTab: 'Safety & warnings',
    summary: 'AI summary', summaryText: 'A structured view of the available product information for a faster review.', availableDetails: 'Available catalogue details', pending: 'Preparing intelligence brief',
    active: 'Active ingredients / composition', strength: 'Strength', form: 'Dosage form', use: 'Manufacturer-listed use', manufacturer: 'Manufacturer', source: 'Source', viewSource: 'View official source',
    pendingTitle: 'We are reviewing this medicine.', pendingText: 'We never show a guessed or inferred composition. Active ingredients will appear here only after the product is matched to an authoritative source.',
    disclaimerTitle: 'Health notice', disclaimer: 'This is general product information, not a prescription or dosing advice. It does not replace a doctor or pharmacist.',
  };
  const activeIngredients = guideText(guide?.activeIngredients, lang) || localizedProductText(product.composition, lang);
  const strength = guideText(guide?.strength, lang);
  const dosageForm = guideText(guide?.dosageForm, lang);
  const recognizedUse = guideText(guide?.recognizedUse, lang) || localizedProductText(product.indication, lang);
  const productImage = product.image || product.images?.[0];
  const sourceLabel = guide?.source ? guideText(guide.source.label, lang) : '';
  const overviewFacts = buildMedicineOverviewFacts({
    recognizedUse,
    composition: activeIngredients,
    dosageForm,
    strength,
    manufacturer: product.company[lang],
    source: sourceLabel,
  });
  const factPresentation: Record<MedicineOverviewFactKey, { label: string; icon: LucideIcon }> = {
    use: { label: copy.use, icon: HeartPulse },
    composition: { label: copy.active, icon: FlaskConical },
    form: { label: copy.form, icon: Pill },
    strength: { label: copy.strength, icon: Sparkles },
    manufacturer: { label: copy.manufacturer, icon: Building2 },
    source: { label: copy.source, icon: PackageSearch },
  };
  const usageFacts = overviewFacts.filter((fact) => fact.key === 'use' || fact.key === 'form');
  const displayedUsageFacts = usageFacts.length > 0 ? usageFacts : overviewFacts;
  const tabs = [
    { id: 'overview' as const, label: copy.overview, icon: PackageSearch },
    { id: 'composition' as const, label: copy.compositionTab, icon: FlaskConical },
    { id: 'usage' as const, label: copy.usageTab, icon: HeartPulse },
    { id: 'safety' as const, label: copy.safetyTab, icon: ShieldCheck },
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKeyDown); previousFocus?.focus(); };
  }, [onClose]);

  return (
    <motion.div className="medicine-guide-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.dialog ref={panelRef} open className="medicine-guide-panel" aria-modal="true" aria-labelledby="medicine-guide-title" initial={reduce ? false : { opacity: 0, y: 30, scale: .975 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 22, scale: .985 }} transition={{ duration: .38, ease }}>
        <header className="medicine-guide-hero">
          <img className="medicine-guide-wave" src={assetUrl('/images/ai-violet-wave.png')} alt="" aria-hidden />
          <div className="medicine-guide-brandline"><span>SAKSOUK</span><i /><strong>{copy.kicker}</strong></div>
          <img className="medicine-guide-orb-image" src={assetUrl('/images/ai-healthcare-orb.png')} alt="" aria-hidden />
          <div className="medicine-guide-heading"><span>{copy.kicker}</span><h2 id="medicine-guide-title" dir="auto">{productName}</h2><p>{copy.title}</p></div>
          <span className="medicine-guide-powered"><Sparkles size={14} />{copy.powered}</span>
          <button ref={closeRef} className="medicine-guide-close" type="button" onClick={onClose} aria-label={copy.close}><X size={19} /></button>
        </header>
        <nav className="medicine-guide-tabs" aria-label={copy.kicker}>{tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={activeTab === id ? 'is-active' : ''} aria-pressed={activeTab === id} onClick={() => setActiveTab(id)}><Icon size={16} /><span>{label}</span></button>)}</nav>
        <div className="medicine-guide-body">
          <div className="medicine-guide-layout">
            <aside className="medicine-guide-product">
              <div className={`medicine-guide-product-image ${productImage ? '' : 'is-placeholder'}`}>{productImage ? <img src={assetUrl(productImage)} alt={productName} /> : <Pill size={58} aria-hidden />}</div>
              <div className="medicine-guide-product-name"><i><Pill size={16} /></i><div><strong dir="auto">{productName}</strong>{activeIngredients && <span dir="auto">{activeIngredients}</span>}</div></div>
              <dl>
                <div><dt>{copy.manufacturer}</dt><dd>{product.company[lang]}</dd></div>
                {dosageForm && <div><dt>{copy.form}</dt><dd dir="auto">{dosageForm}</dd></div>}
                {strength && <div><dt>{copy.strength}</dt><dd dir="auto">{strength}</dd></div>}
              </dl>
              {guide?.source && <div className="medicine-guide-source"><span>{copy.source}</span>{guide.source.url ? <a href={guide.source.url} target="_blank" rel="noreferrer">{copy.viewSource}<ExternalLink size={13} /></a> : <strong>{guideText(guide.source.label, lang)}</strong>}</div>}
            </aside>
            <motion.section className="medicine-guide-insight" key={activeTab} initial={reduce ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .28, ease }}>
              {pending ? <div className="medicine-guide-pending"><span><Clock3 /></span><div><small>{copy.pending}</small><h3>{copy.pendingTitle}</h3><p>{copy.pendingText}</p></div></div> : <>
                {activeTab === 'overview' && <><article className="medicine-guide-summary"><i><Sparkles size={19} /></i><div><h3>{copy.summary}</h3><p dir="auto">{recognizedUse || activeIngredients || copy.summaryText}</p></div></article><div className={`medicine-guide-facts fact-count-${overviewFacts.length}`}>{overviewFacts.map((fact) => { const presentation = factPresentation[fact.key]; const Icon = presentation.icon; return <article key={fact.key}><i><Icon size={17} /></i><div><span>{presentation.label}</span><p dir="auto">{fact.value}</p></div></article>; })}</div></>}
                {activeTab === 'composition' && <article className="medicine-guide-focus-card"><i><FlaskConical size={20} /></i><div><span>{activeIngredients ? copy.active : copy.availableDetails}</span><h3 dir="auto">{activeIngredients || `${copy.manufacturer}: ${product.company[lang]}`}</h3>{strength && <p dir="auto">{copy.strength}: {strength}</p>}</div></article>}
                {activeTab === 'usage' && <div className={`medicine-guide-facts is-two fact-count-${displayedUsageFacts.length}`}>{displayedUsageFacts.map((fact) => { const presentation = factPresentation[fact.key]; const Icon = presentation.icon; return <article key={fact.key}><i><Icon size={18} /></i><div><span>{presentation.label}</span><p dir="auto">{fact.value}</p></div></article>; })}</div>}
                {activeTab === 'safety' && <article className="medicine-guide-focus-card is-safety"><i><ShieldCheck size={20} /></i><div><span>{copy.disclaimerTitle}</span><h3>{copy.disclaimer}</h3></div></article>}
              </>}
              <aside className="medicine-guide-disclaimer"><ShieldCheck size={18} /><div><strong>{copy.disclaimerTitle}</strong><p>{copy.disclaimer}</p></div></aside>
            </motion.section>
          </div>
        </div>
      </motion.dialog>
    </motion.div>
  );
}

const PRODUCTS_PER_PAGE = 24;

type CatalogueOption = { value: string; label: string };

function CatalogueFilter({
  label,
  value,
  options,
  icon: Icon,
  onChange,
  menuClassName = '',
}: {
  label: string;
  value: string;
  options: CatalogueOption[];
  icon: LucideIcon;
  onChange: (value: string) => void;
  menuClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div className={`catalogue-filter ${open ? 'is-open' : ''}`} ref={filterRef}>
      <button type="button" className="catalogue-filter-trigger" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
        <span className="catalogue-filter-icon"><Icon size={17} /></span>
        <span className="catalogue-filter-copy"><small>{label}</small><strong>{selected.label}</strong></span>
        <ChevronDown className="catalogue-filter-chevron" size={16} />
      </button>
      <AnimatePresence>
        {open && <motion.fieldset className={`catalogue-filter-menu ${menuClassName}`} aria-label={label} initial={{ opacity: 0, y: 7, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: .98 }} transition={{ duration: .16 }}>
          {options.map((option) => <button type="button" aria-pressed={option.value === value} className={option.value === value ? 'is-selected' : ''} key={option.value} onClick={() => { onChange(option.value); setOpen(false); }}><span>{option.label}</span>{option.value === value && <Check size={15} />}</button>)}
        </motion.fieldset>}
      </AnimatePresence>
    </div>
  );
}

function catalogueUrl(kind: ProductKind, state: { brand?: string; product?: string } = {}) {
  const params = new URLSearchParams();
  if (state.brand) params.set('brand', state.brand);
  if (state.product) params.set('product', state.product);
  const query = params.toString();
  return `${pageUrl(`/products/${kind}`)}${query ? `?${query}` : ''}`;
}

function ProductCard({ product, kind, lang, copy, onOpen, onGuide }: { product: CatalogProduct; kind: ProductKind; lang: 'en' | 'ar'; copy: Record<string, string>; onOpen: (product: CatalogProduct) => void; onGuide: (product: CatalogProduct) => void }) {
  const Icon = productIcons[kind];
  const name = localizedProductName(product, lang);
  const detail = localizedProductDetail(product, lang);
  const inquiryUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(lang === 'ar' ? `مرحباً، أود الاستفسار عن الصنف: ${name}` : `Hello, I would like to ask about: ${name}`)}`;
  const href = catalogueUrl(kind, { brand: product.company.slug, product: product.id });
  return <article className={`catalogue-product-card ${product.image ? 'has-image' : 'no-image'}`}>
    <a className={`product-card-image ${product.image ? '' : 'placeholder'}`} href={href} onClick={(event) => { event.preventDefault(); onOpen(product); }} aria-label={`${copy.viewProduct}: ${name}`}><span className="product-image-canvas">{product.image ? <img src={assetUrl(product.image)} alt={name} loading="lazy" decoding="async" /> : <Icon aria-hidden />}</span></a>
    <div className="product-card-copy"><div className="product-card-meta"><span>{product.company[lang]}</span><em>{copy[kind]}</em></div><a className="product-card-title" href={href} onClick={(event) => { event.preventDefault(); onOpen(product); }}><h3 dir="auto">{name}</h3></a>{detail && detail !== name && <p className="product-card-description" dir="auto">{detail}</p>}<div className="product-card-actions">{kind === 'medicine' && <button type="button" className="medicine-ai-button" onClick={() => onGuide(product)}><span>SI</span><strong>{copy.aiGuide}</strong></button>}<a className="product-inquire" href={inquiryUrl} target="_blank" rel="noreferrer">{copy.inquire}<ArrowUpRight size={15} /></a></div></div>
  </article>;
}

function ProductDetail({ product, kind, lang, copy, guide, related, onCategory, onBrand, onOpen, onGuide }: { product: CatalogProduct; kind: ProductKind; lang: 'en' | 'ar'; copy: Record<string, string>; guide?: MedicineGuide; related: CatalogProduct[]; onCategory: () => void; onBrand: () => void; onOpen: (product: CatalogProduct) => void; onGuide: (product: CatalogProduct) => void }) {
  const Icon = productIcons[kind];
  const gallery = useMemo(() => Array.from(new Set([...(product.images || []), ...(product.image ? [product.image] : [])])), [product]);
  const [activeImage, setActiveImage] = useState(gallery[0] || '');
  const name = localizedProductName(product, lang);
  const inquiryUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(lang === 'ar' ? `مرحباً، أود الاستفسار عن الصنف: ${name}` : `Hello, I would like to ask about: ${name}`)}`;
  const guideComposition = guideText(guide?.activeIngredients, lang);
  const guideUse = guideText(guide?.recognizedUse, lang);
  const description = localizedProductDetail(product, lang);
  const composition = localizedProductText(product.composition, lang) || guideComposition;
  const indication = localizedProductText(product.indication, lang) || guideUse;
  return <div className="product-detail-view">
    <nav className="catalogue-breadcrumb" aria-label={copy.breadcrumb}><button type="button" onClick={onCategory}>{categoryLabel(kind, lang)}</button><ArrowRight size={13} /><button type="button" onClick={onBrand}>{product.company[lang]}</button><ArrowRight size={13} /><span dir="auto">{name}</span></nav>
    <div className="product-detail-grid">
      <div className="product-gallery">
        <div className={`product-gallery-stage ${activeImage ? '' : 'is-placeholder'}`}><span className="product-gallery-canvas">{activeImage ? <img src={assetUrl(activeImage)} alt={name} /> : <Icon size={70} aria-hidden />}</span></div>
        {gallery.length > 1 && <div className="product-gallery-thumbs">{gallery.map((image, index) => <button key={image} type="button" className={image === activeImage ? 'is-active' : ''} onClick={() => setActiveImage(image)} aria-label={`${copy.image} ${index + 1}`}><img src={assetUrl(image)} alt="" /></button>)}</div>}
      </div>
      <div className="product-detail-copy">
        <button type="button" className="product-brand-chip" onClick={onBrand}>{product.company.logo ? <img src={assetUrl(product.company.logo)} alt="" /> : <span>{product.company[lang].charAt(0)}</span>}<strong>{product.company[lang]}</strong><ArrowRight size={15} /></button>
        <p className="section-label"><span />{copy[kind]}</p><h2 dir="auto">{name}</h2>
        {description ? <p className="product-detail-description" dir="auto">{description}</p> : <p className="product-detail-description">{copy.catalogueDescription}</p>}
        <div className="product-fact-grid">
          {composition && <article><i><FlaskConical size={18} /></i><div><span>{copy.composition}</span><p dir="auto">{composition}</p></div></article>}
          {indication && <article><i><HeartPulse size={18} /></i><div><span>{copy.indication}</span><p dir="auto">{indication}</p></div></article>}
          <article><i><Building2 size={18} /></i><div><span>{copy.companyLabel}</span><p>{product.company[lang]}</p></div></article>
        </div>
        <div className="product-detail-actions"><a className="button primary" href={inquiryUrl} target="_blank" rel="noreferrer"><span>{copy.inquire}</span><i><ArrowUpRight size={16} /></i></a>{kind === 'medicine' && <button type="button" className="medicine-ai-button detail-ai-button" onClick={() => onGuide(product)}><span>SI</span><strong>{copy.aiGuide}</strong></button>}</div>
      </div>
    </div>
    {related.length > 0 && <div className="related-products"><div className="related-products-head"><div><p className="section-label"><span />{copy.moreFrom}</p><h3>{product.company[lang]}</h3></div><button type="button" onClick={onBrand}>{copy.viewBrand}<ArrowRight size={15} /></button></div><div className="catalogue-product-grid">{related.map((item) => <ProductCard key={item.id} product={item} kind={kind} lang={lang} copy={copy} onOpen={onOpen} onGuide={onGuide} />)}</div></div>}
  </div>;
}

function categoryLabel(kind: ProductKind, lang: 'en' | 'ar') {
  const labels = lang === 'ar' ? { medicine: 'الأدوية البشرية', cosmetics: 'مستحضرات التجميل', supplements: 'المكملات الغذائية' } : { medicine: 'Human medicines', cosmetics: 'Cosmetics', supplements: 'Food supplements' };
  return labels[kind];
}

function ProductCatalogue({ kind, category }: { kind: ProductKind; category: string }) {
  const { lang } = useLanguage();
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const [selectedBrand, setSelectedBrand] = useState(initialParams.get('brand') || '');
  const [selectedProductId, setSelectedProductId] = useState(initialParams.get('product') || '');
  const [query, setQuery] = useState('');
  const [company, setCompany] = useState('all');
  const [letter, setLetter] = useState('all');
  const [sort, setSort] = useState<'name' | 'company'>('name');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [medicineGuides, setMedicineGuides] = useState<Record<string, MedicineGuide>>({});
  const [selectedMedicine, setSelectedMedicine] = useState<CatalogProduct | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const copy: Record<string, string> = lang === 'ar' ? {
    eyebrow: 'كتالوج المنتجات', title: `استكشف ${category}`, intro: 'ابدأ بالشركة، ثم تصفّح منتجاتها وافتح صفحة كل منتج للاطلاع على الصور والمعلومات المتاحة.', brandsEyebrow: 'الشركات والعلامات', brandsTitle: 'تصفّح حسب الشركة', brandsIntro: 'كل شركة مرتبطة مباشرة بمنتجاتها ضمن هذه الفئة.', viewBrand: 'عرض منتجات الشركة',
    search: 'ابحث عن منتج أو مادة فعالة أو شركة', clearSearch: 'مسح البحث', searchAction: 'بحث في الكتالوج', companyLabel: 'العلامة / الشركة المصنّعة', company: 'جميع الشركات', initialLabel: 'الحرف الأول للمنتج', allLetters: 'كل الحروف', sortLabel: 'الترتيب', sort: 'حسب اسم المنتج', sortCompany: 'حسب الشركة', all: 'الكل', filterProducts: 'تصفية المنتجات', clearAll: 'مسح الكل', showFilters: 'إظهار الفلاتر', hideFilters: 'إخفاء الفلاتر',
    national: 'الشركات الوطنية', medicine: 'دواء بشري', cosmetics: 'مستحضر تجميل', supplements: 'مكمل غذائي', products: 'منتج', reset: 'إعادة ضبط الفلاتر', inquire: 'استفسر عن هذا المنتج', viewProduct: 'عرض المنتج',
    noResults: 'لا توجد نتائج مطابقة', noResultsText: 'جرّب تغيير عبارة البحث أو إزالة أحد الفلاتر.', emptyTitle: 'لم تتم إضافة منتجات لهذه الفئة', emptyText: 'لم تتضمن الملفات المرفقة قائمة مستقلة لهذه الفئة. تواصل مع فريقنا للاستفسار عن المنتجات المتوفرة.',
    previous: 'السابق', next: 'التالي', page: 'صفحة', of: 'من', composition: 'التركيب / المكونات', indication: 'الاستخدام المبيّن', loading: 'جارٍ تحميل المنتجات…', aiGuide: 'ذكاء سكسوك الدوائي', back: 'العودة إلى كل الشركات', breadcrumb: 'مسار المنتج', image: 'صورة المنتج', catalogueDescription: 'هذا المنتج مدرج ضمن كتالوج سكسوك المورّد. تواصل معنا للحصول على تفاصيل التوفر والمعلومات التجارية المحدثة.', moreFrom: 'منتجات أخرى من',
  } : {
    eyebrow: 'Product catalogue', title: `Explore ${category}`, intro: 'Start with a company, browse its range, then open any product for its supplied imagery and available information.', brandsEyebrow: 'Companies & brands', brandsTitle: 'Browse by company', brandsIntro: 'Every company is connected directly to its products in this category.', viewBrand: 'View company products',
    search: 'Search for a product, active ingredient, or brand', clearSearch: 'Clear search', searchAction: 'Search catalogue', companyLabel: 'Brand / Manufacturer', company: 'All companies', initialLabel: 'Product initial', allLetters: 'All letters', sortLabel: 'Sort by', sort: 'Product name', sortCompany: 'Company name', all: 'All', filterProducts: 'Filter products', clearAll: 'Clear all', showFilters: 'Show filters', hideFilters: 'Hide filters',
    national: 'National companies', medicine: 'Human medicine', cosmetics: 'Cosmetic', supplements: 'Food supplement', products: 'products', reset: 'Reset filters', inquire: 'Ask about this product', viewProduct: 'View product',
    noResults: 'No matching products', noResultsText: 'Try a different search term or clear one of the filters.', emptyTitle: 'No products were supplied for this category', emptyText: 'The provided files did not include a separate list for this category. Contact our team to ask what is currently available.',
    previous: 'Previous', next: 'Next', page: 'Page', of: 'of', composition: 'Composition / ingredients', indication: 'Listed use', loading: 'Loading products…', aiGuide: 'Saksouk Intelligence', back: 'Back to all companies', breadcrumb: 'Product path', image: 'Product image', catalogueDescription: 'This product is listed in the supplied Saksouk catalogue. Contact us for current availability and up-to-date commercial information.', moreFrom: 'More from',
  };
  useEffect(() => {
    const controller = new AbortController();
    fetch(assetUrl(`/data/products-${kind}.json`), { signal: controller.signal }).then((response) => { if (!response.ok) throw new Error(`Unable to load ${kind} products`); return response.json() as Promise<CatalogProduct[]>; }).then(setProducts).catch((error: unknown) => { if (!(error instanceof DOMException && error.name === 'AbortError')) setProducts([]); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [kind]);
  useEffect(() => {
    if (kind !== 'medicine') return;
    const controller = new AbortController();
    fetch(assetUrl('/data/medicine-guides.json'), { signal: controller.signal }).then((response) => response.ok ? response.json() as Promise<Record<string, MedicineGuide>> : {}).then(setMedicineGuides).catch((error: unknown) => { if (!(error instanceof DOMException && error.name === 'AbortError')) setMedicineGuides({}); });
    return () => controller.abort();
  }, [kind]);
  useEffect(() => {
    const onPopState = () => { const params = new URLSearchParams(window.location.search); setSelectedBrand(params.get('brand') || ''); setSelectedProductId(params.get('product') || ''); };
    window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const brands = useMemo(() => Array.from(products.reduce((map, product) => { const current = map.get(product.company.slug); if (current) current.count += 1; else map.set(product.company.slug, { ...product.company, count: 1, image: product.image }); return map; }, new Map<string, CatalogProduct['company'] & { count: number; image?: string }>()).values()).sort((a, b) => a[lang].localeCompare(b[lang], lang)), [lang, products]);
  const activeBrand = brands.find((brand) => brand.slug === selectedBrand);
  const selectedProduct = products.find((product) => product.id === selectedProductId);
  const alphabet = useMemo(() => Array.from(new Set(products.filter((product) => !selectedBrand || product.company.slug === selectedBrand).map((product) => localizedProductName(product, lang).trim().charAt(0).toLocaleUpperCase()).filter(Boolean))).sort((a, b) => a.localeCompare(b, lang)), [lang, products, selectedBrand]);
  const filteredProducts = useMemo(() => { const normalizedQuery = query.trim().toLocaleLowerCase(); return products.filter((product) => !selectedBrand || product.company.slug === selectedBrand).filter((product) => selectedBrand || company === 'all' || product.company.en === company).filter((product) => letter === 'all' || localizedProductName(product, lang).trim().charAt(0).toLocaleUpperCase() === letter).filter((product) => !normalizedQuery || [product.name, product.officialName, product.company.en, product.company.ar, product.description, product.composition, product.indication].filter(Boolean).some((value) => value!.toLocaleLowerCase().includes(normalizedQuery))).sort((a, b) => { const companyOrder = a.company[lang].localeCompare(b.company[lang], lang); const nameOrder = localizedProductName(a, lang).localeCompare(localizedProductName(b, lang), lang); return sort === 'company' ? companyOrder || nameOrder : nameOrder; }); }, [company, lang, letter, products, query, selectedBrand, sort]);
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const visibleProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
  const companyOptions = useMemo<CatalogueOption[]>(() => [{ value: 'all', label: copy.company }, ...brands.map((item) => ({ value: item.en, label: item[lang] }))], [brands, copy.company, lang]);
  const letterOptions = useMemo<CatalogueOption[]>(() => [{ value: 'all', label: copy.allLetters }, ...alphabet.map((item) => ({ value: item, label: item }))], [alphabet, copy.allLetters]);
  const sortOptions = useMemo<CatalogueOption[]>(() => [{ value: 'name', label: copy.sort }, { value: 'company', label: copy.sortCompany }], [copy.sort, copy.sortCompany]);
  const selectedCompany = companyOptions.find((option) => option.value === company)?.label;
  const hasActiveFilters = Boolean(query || (!selectedBrand && company !== 'all') || letter !== 'all' || sort !== 'name');
  const reset = () => { setQuery(''); setCompany('all'); setLetter('all'); setSort('name'); setPage(1); };
  const updateView = (state: { brand?: string; product?: string }) => { window.history.pushState({}, '', catalogueUrl(kind, state)); setSelectedBrand(state.brand || ''); setSelectedProductId(state.product || ''); reset(); requestAnimationFrame(() => document.querySelector('.catalogue-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })); };
  const openProduct = (product: CatalogProduct) => updateView({ brand: product.company.slug, product: product.id });
  const related = selectedProduct ? products.filter((product) => product.company.slug === selectedProduct.company.slug && product.id !== selectedProduct.id).slice(0, 4) : [];
  return <>
    <section className={`catalogue-section section catalogue-${kind}`}>
      <div className="container">
        {!selectedProduct && <div className="catalogue-heading"><div><p className="section-label"><span />{copy.eyebrow}</p><h2>{activeBrand ? activeBrand[lang] : copy.title}</h2></div><p>{activeBrand ? `${filteredProducts.length.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')} ${copy.products}` : copy.intro}</p></div>}
        {loading ? <div className="catalogue-shell"><div className="catalogue-loading"><span /><span /><span /><p>{copy.loading}</p></div></div> : products.length === 0 ? <div className="catalogue-shell"><div className="catalogue-empty"><i><PackageSearch /></i><p className="section-label"><span />{category}</p><h3>{copy.emptyTitle}</h3><p>{copy.emptyText}</p><div><ArrowLink href={WHATSAPP_URL} primary>{lang === 'ar' ? 'استفسر عن المنتجات' : 'Ask about products'}</ArrowLink></div></div></div> : selectedProduct ? <ProductDetail key={selectedProduct.id} product={selectedProduct} kind={kind} lang={lang} copy={copy} guide={medicineGuides[selectedProduct.id]} related={related} onCategory={() => updateView({})} onBrand={() => updateView({ brand: selectedProduct.company.slug })} onOpen={openProduct} onGuide={setSelectedMedicine} /> : <>
          {!activeBrand ? <section className="brand-directory"><div className="brand-directory-heading"><div><p className="section-label"><span />{copy.brandsEyebrow}</p><h3>{copy.brandsTitle}</h3></div><p>{copy.brandsIntro}</p></div><div className="brand-directory-grid">{brands.map((brand) => <a key={brand.slug} className="brand-directory-card" href={catalogueUrl(kind, { brand: brand.slug })} onClick={(event) => { event.preventDefault(); updateView({ brand: brand.slug }); }}><div className="brand-logo-frame">{brand.logo ? <img src={assetUrl(brand.logo)} alt={`${brand[lang]} logo`} /> : <strong>{brand[lang].split(' ').map((word) => word.charAt(0)).join('').slice(0, 2)}</strong>}</div><div><h4>{brand[lang]}</h4><p>{brand.count.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')} {copy.products}</p></div><span><ArrowRight size={17} /></span></a>)}</div></section> : <div className="brand-view-banner"><button type="button" onClick={() => updateView({})}><ArrowRight size={15} />{copy.back}</button><div>{activeBrand.logo ? <img src={assetUrl(activeBrand.logo)} alt={`${activeBrand[lang]} logo`} /> : <strong>{activeBrand[lang].charAt(0)}</strong>}<span>{copy.viewBrand}</span><h3>{activeBrand[lang]}</h3></div></div>}
          <div className="catalogue-shell">
            <form className="catalogue-search-band" onSubmit={(event) => { event.preventDefault(); setPage(1); }}><label className="catalogue-search catalogue-search-primary"><Search size={18} /><input type="search" autoComplete="off" enterKeyHint="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={copy.search} aria-label={copy.search} />{query && <button className="catalogue-search-clear" type="button" aria-label={copy.clearSearch} onClick={() => { setQuery(''); setPage(1); }}><X size={15} /></button>}<button className="catalogue-search-submit" type="submit" aria-label={copy.searchAction}><ArrowRight size={18} /></button></label></form>
            <div className="catalogue-workspace">
              <aside className={`catalogue-filter-sidebar ${filtersOpen ? 'is-open' : ''}`}>
                <div className="filter-sidebar-head"><strong><ListFilter size={16} />{copy.filterProducts}</strong><div><button className="filter-sidebar-clear" type="button" onClick={reset}>{copy.clearAll}</button><button className="mobile-filter-close" type="button" aria-label={copy.hideFilters} onClick={() => setFiltersOpen(false)}><X size={15} /></button></div></div>
                {!activeBrand && <section><h4>{copy.companyLabel}<ChevronDown size={15} /></h4><div className="filter-option-list">{companyOptions.map((option) => { const count = option.value === 'all' ? products.length : brands.find((brand) => brand.en === option.value)?.count || 0; const selected = company === option.value; return <button key={option.value} type="button" className={selected ? 'is-selected' : ''} aria-pressed={selected} onClick={() => { setCompany(option.value); setPage(1); }}><i>{selected && <Check size={12} />}</i><span>{option.label}</span><em>{count.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')}</em></button>; })}</div></section>}
                <section><h4>{copy.initialLabel}<ChevronDown size={15} /></h4><div className="filter-letter-grid">{letterOptions.map((option) => <button key={option.value} type="button" className={letter === option.value ? 'is-selected' : ''} aria-pressed={letter === option.value} onClick={() => { setLetter(option.value); setPage(1); }}>{option.value === 'all' ? copy.all : option.label}</button>)}</div></section>
              </aside>
              <div className="catalogue-results-pane">
                <div className="results-control-row"><button className="mobile-filter-toggle" type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((current) => !current)}><ListFilter size={16} />{filtersOpen ? copy.hideFilters : copy.showFilters}</button><div className="product-results-head"><div><strong>{filteredProducts.length.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')}</strong><span>{copy.products}</span><em>{copy[kind]}</em></div></div><div className="results-sort"><CatalogueFilter label={copy.sortLabel} value={sort} options={sortOptions} icon={SlidersHorizontal} onChange={(value) => { setSort(value as 'name' | 'company'); setPage(1); }} /></div></div>
                {hasActiveFilters && <div className="catalogue-active-filters"><div>{query && <button type="button" onClick={() => { setQuery(''); setPage(1); }}><Search size={13} /><span dir="auto">{query}</span><X size={13} /></button>}{!activeBrand && company !== 'all' && <button type="button" onClick={() => { setCompany('all'); setPage(1); }}><Building2 size={13} /><span>{selectedCompany}</span><X size={13} /></button>}{letter !== 'all' && <button type="button" onClick={() => { setLetter('all'); setPage(1); }}><ArrowDownAZ size={13} /><span>{letter}</span><X size={13} /></button>}{sort !== 'name' && <button type="button" onClick={() => { setSort('name'); setPage(1); }}><SlidersHorizontal size={13} /><span>{copy.sortCompany}</span><X size={13} /></button>}</div><button type="button" className="catalogue-reset-all" onClick={reset}><RotateCcw size={14} />{copy.reset}</button></div>}
                <div className="catalogue-results">{visibleProducts.length > 0 ? <div className="catalogue-product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} kind={kind} lang={lang} copy={copy} onOpen={openProduct} onGuide={setSelectedMedicine} />)}</div> : <div className="catalogue-no-results"><i><PackageSearch /></i><h3>{copy.noResults}</h3><p>{copy.noResultsText}</p><button type="button" className="catalogue-reset" onClick={reset}><RotateCcw size={15} />{copy.reset}</button></div>}{pageCount > 1 && <nav className="catalogue-pagination"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1}>{copy.previous}</button><span>{copy.page} <strong>{currentPage.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')}</strong> {copy.of} {pageCount.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')}</span><button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={currentPage === pageCount}>{copy.next}</button></nav>}</div>
              </div>
            </div>
          </div>
        </>}
      </div>
    </section>
    <AnimatePresence>{selectedMedicine && <MedicineGuidePanel product={selectedMedicine} guide={medicineGuides[selectedMedicine.id]} onClose={() => setSelectedMedicine(null)} />}</AnimatePresence>
  </>;
}

export function ProductCategoryPage({ kind }: { kind: ProductKind }) {
  const { lang } = useLanguage();
  const page = expandedPages[lang].products[kind];
  return <main><SiteHeader />{kind === 'medicine' ? <MedicineProductHero page={page} /> : <ProductCategoryHero kind={kind} page={page} />}<div id={`${kind}-catalogue`}><ProductCatalogue kind={kind} category={page.eyebrow} /></div><PageCta /><SiteFooter /></main>;
}
