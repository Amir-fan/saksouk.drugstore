'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownAZ,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
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

type CatalogProduct = {
  id: string;
  name: string;
  officialName?: string;
  company: { en: string; ar: string };
  category: 'medicine' | 'cosmetics';
  group: 'national' | 'cosmetics';
  description?: string;
  composition?: string;
  indication?: string;
  image?: string;
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

function MedicineGuidePanel({ product, guide, onClose }: { product: CatalogProduct; guide?: MedicineGuide; onClose: () => void }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const pending = !guide || guide.status === 'under-verification';
  const manufacturerVerified = guide?.status === 'manufacturer-verified';
  const copy = lang === 'ar' ? {
    kicker: 'SAKSOUK INTELLIGENCE', title: 'معلومة دوائية، موثّقة بوضوح.', close: 'إغلاق الدليل',
    verified: 'موثّق من الشركة المصنّعة', catalogue: 'موثّق من الكتالوج المورّد', pending: 'قيد التحقق العلمي',
    active: 'المادة الفعالة / التركيب', strength: 'العيار', form: 'الشكل الصيدلاني', use: 'الاستخدام المدرج من الشركة', manufacturer: 'الشركة المصنّعة', source: 'المصدر', viewSource: 'عرض المصدر الرسمي',
    curated: 'بيانات منسّقة من مصادر الشركة المصنّعة، وليست إجابة مولّدة لحظياً.',
    pendingTitle: 'نراجع بيانات هذا الصنف الآن.', pendingText: 'لن نعرض تركيبة متوقعة أو مستنتجة. ستظهر المادة الفعالة هنا فقط بعد مطابقة الصنف مع مصدر موثوق.',
    disclaimerTitle: 'تنبيه صحي', disclaimer: 'هذه معلومات تعريفية عن المنتج وليست وصفة أو نصيحة جرعات، ولا تغني عن استشارة الطبيب أو الصيدلي.',
  } : {
    kicker: 'SAKSOUK INTELLIGENCE', title: 'Medicine intelligence, clearly verified.', close: 'Close medicine guide',
    verified: 'Manufacturer verified', catalogue: 'Verified from supplied catalogue', pending: 'Scientific verification in progress',
    active: 'Active ingredients / composition', strength: 'Strength', form: 'Dosage form', use: 'Manufacturer-listed use', manufacturer: 'Manufacturer', source: 'Source', viewSource: 'View official source',
    curated: 'Curated manufacturer-source data—not a live generated answer.',
    pendingTitle: 'We are reviewing this medicine.', pendingText: 'We never show a guessed or inferred composition. Active ingredients will appear here only after the product is matched to an authoritative source.',
    disclaimerTitle: 'Health notice', disclaimer: 'This is general product information, not a prescription or dosing advice. It does not replace a doctor or pharmacist.',
  };
  const fields = [
    { key: 'active', label: copy.active, value: guideText(guide?.activeIngredients, lang), icon: FlaskConical, wide: true },
    { key: 'strength', label: copy.strength, value: guideText(guide?.strength, lang), icon: Sparkles },
    { key: 'form', label: copy.form, value: guideText(guide?.dosageForm, lang), icon: Pill },
    { key: 'use', label: copy.use, value: guideText(guide?.recognizedUse, lang), icon: HeartPulse, wide: true },
  ].filter((field) => field.value);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', closeOnEscape);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', closeOnEscape); };
  }, [onClose]);

  return (
    <motion.div className="medicine-guide-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.dialog open className="medicine-guide-panel" aria-modal="true" aria-labelledby="medicine-guide-title" initial={reduce ? false : { opacity: 0, y: 30, scale: .975 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 22, scale: .985 }} transition={{ duration: .38, ease }}>
        <header className="medicine-guide-hero">
          <div className="medicine-guide-orb" aria-hidden><Bot size={30} /><i /><i /></div>
          <div className="medicine-guide-heading"><span>{copy.kicker}</span><h2 id="medicine-guide-title" dir="auto">{product.name}</h2><p>{copy.title}</p></div>
          <button ref={closeRef} className="medicine-guide-close" type="button" onClick={onClose} aria-label={copy.close}><X size={19} /></button>
          <div className="medicine-guide-glow" aria-hidden />
        </header>
        <div className="medicine-guide-body">
          <div className={`medicine-guide-status status-${guide?.status || 'under-verification'}`}>
            {pending ? <Clock3 size={17} /> : <BadgeCheck size={17} />}
            <strong>{pending ? copy.pending : manufacturerVerified ? copy.verified : copy.catalogue}</strong>
            {!pending && <span>{copy.curated}</span>}
          </div>
          {pending ? <div className="medicine-guide-pending"><span><Clock3 /></span><div><h3>{copy.pendingTitle}</h3><p>{copy.pendingText}</p></div></div> : <div className="medicine-guide-grid">
            {fields.map((field, index) => { const Icon = field.icon; return <motion.article className={field.wide ? 'is-wide' : ''} key={field.key} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + index * .07, duration: .4, ease }}><i><Icon size={18} /></i><div><span>{field.label}</span><p dir="auto">{field.value}</p></div></motion.article>; })}
          </div>}
          <div className="medicine-guide-meta">
            <div><span>{copy.manufacturer}</span><strong>{product.company[lang]}</strong></div>
            {guide?.source && <div><span>{copy.source}</span>{guide.source.url ? <a href={guide.source.url} target="_blank" rel="noreferrer">{copy.viewSource}<ExternalLink size={14} /></a> : <strong>{guideText(guide.source.label, lang)}</strong>}</div>}
          </div>
          <aside className="medicine-guide-disclaimer"><ShieldCheck size={20} /><div><strong>{copy.disclaimerTitle}</strong><p>{copy.disclaimer}</p></div></aside>
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

function ProductCatalogue({ kind, category }: { kind: ProductKind; category: string }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [company, setCompany] = useState('all');
  const [letter, setLetter] = useState('all');
  const [sort, setSort] = useState<'name' | 'company'>('name');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [medicineGuides, setMedicineGuides] = useState<Record<string, MedicineGuide>>({});
  const [selectedMedicine, setSelectedMedicine] = useState<CatalogProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const copy = lang === 'ar' ? {
    eyebrow: 'كتالوج المنتجات', title: `استكشف ${category}`, intro: 'ابحث في الأصناف الواردة من الشركات، وصفِّ النتائج حسب الشركة أو الحرف الأول.',
    search: 'ابحث باسم المنتج أو الشركة', clearSearch: 'مسح البحث', companyLabel: 'الشركة', company: 'جميع الشركات', initialLabel: 'الحرف الأول', allLetters: 'كل الحروف', sortLabel: 'الترتيب', sort: 'حسب الاسم', sortCompany: 'حسب الشركة', all: 'الكل',
    national: 'الشركات الوطنية', cosmetics: 'الكوزمتك', products: 'صنف', reset: 'إعادة ضبط الفلاتر', inquire: 'استفسر عن هذا الصنف',
    noResults: 'لا توجد نتائج مطابقة', noResultsText: 'جرّب تغيير عبارة البحث أو إزالة أحد الفلاتر.',
    emptyTitle: 'لم تتم إضافة أصناف لهذه الفئة', emptyText: 'لم تتضمن الملفات المرفقة قائمة مستقلة لهذه الفئة. تواصل مع فريقنا للاستفسار عن الأصناف المتوفرة.',
    previous: 'السابق', next: 'التالي', page: 'صفحة', of: 'من', composition: 'التركيب', indication: 'الاستخدام', loading: 'جارٍ تحميل الأصناف…', aiGuide: 'دليل سكسوك الذكي',
  } : {
    eyebrow: 'Product catalogue', title: `Explore ${category}`, intro: 'Search the supplied product lists and filter the catalogue by company or initial letter.',
    search: 'Search by product or company', clearSearch: 'Clear search', companyLabel: 'Company', company: 'All companies', initialLabel: 'Initial', allLetters: 'All letters', sortLabel: 'Sort by', sort: 'Product name', sortCompany: 'Company name', all: 'All',
    national: 'National companies', cosmetics: 'Cosmetics', products: 'products', reset: 'Reset filters', inquire: 'Ask about this product',
    noResults: 'No matching products', noResultsText: 'Try a different search term or clear one of the filters.',
    emptyTitle: 'No products were supplied for this category', emptyText: 'The provided files did not include a separate list for this category. Contact our team to ask what is currently available.',
    previous: 'Previous', next: 'Next', page: 'Page', of: 'of', composition: 'Composition', indication: 'Use', loading: 'Loading products…', aiGuide: 'Saksouk AI Guide',
  };
  useEffect(() => {
    const controller = new AbortController();
    fetch(assetUrl(`/data/products-${kind}.json`), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${kind} products`);
        return response.json() as Promise<CatalogProduct[]>;
      })
      .then((data) => setProducts(data))
      .catch((error: unknown) => { if (!(error instanceof DOMException && error.name === 'AbortError')) setProducts([]); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [kind]);
  useEffect(() => {
    if (kind !== 'medicine') return;
    const controller = new AbortController();
    fetch(assetUrl('/data/medicine-guides.json'), { signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<Record<string, MedicineGuide>> : {})
      .then((data) => setMedicineGuides(data))
      .catch((error: unknown) => { if (!(error instanceof DOMException && error.name === 'AbortError')) setMedicineGuides({}); });
    return () => controller.abort();
  }, [kind]);
  const companies = useMemo(() => Array.from(new Map(products.map((product) => [product.company.en, product.company])).values()).sort((a, b) => a[lang].localeCompare(b[lang], lang)), [lang, products]);
  const alphabet = useMemo(() => Array.from(new Set(products.map((product) => product.name.trim().charAt(0).toLocaleUpperCase()).filter(Boolean))).sort((a, b) => a.localeCompare(b, lang)), [lang, products]);
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return products
      .filter((product) => company === 'all' || product.company.en === company)
      .filter((product) => letter === 'all' || product.name.trim().charAt(0).toLocaleUpperCase() === letter)
      .filter((product) => !normalizedQuery || [product.name, product.officialName, product.company.en, product.company.ar, product.description, product.composition, product.indication].filter(Boolean).some((value) => value!.toLocaleLowerCase().includes(normalizedQuery)))
      .sort((a, b) => sort === 'company' ? a.company[lang].localeCompare(b.company[lang], lang) || a.name.localeCompare(b.name, lang) : a.name.localeCompare(b.name, lang));
  }, [company, lang, letter, products, query, sort]);
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const visibleProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
  const reset = () => { setQuery(''); setCompany('all'); setLetter('all'); setSort('name'); setPage(1); };
  const companyOptions = useMemo<CatalogueOption[]>(() => [{ value: 'all', label: copy.company }, ...companies.map((item) => ({ value: item.en, label: item[lang] }))], [companies, copy.company, lang]);
  const letterOptions = useMemo<CatalogueOption[]>(() => [{ value: 'all', label: copy.allLetters }, ...alphabet.map((item) => ({ value: item, label: item }))], [alphabet, copy.allLetters]);
  const sortOptions = useMemo<CatalogueOption[]>(() => [{ value: 'name', label: copy.sort }, { value: 'company', label: copy.sortCompany }], [copy.sort, copy.sortCompany]);
  const selectedCompany = companyOptions.find((option) => option.value === company)?.label;
  const hasActiveFilters = Boolean(query || company !== 'all' || letter !== 'all' || sort !== 'name');
  return (<>
    <section className={`catalogue-section section catalogue-${kind}`}>
      <div className="container">
        <div className="catalogue-heading"><div><p className="section-label"><span />{copy.eyebrow}</p><h2>{copy.title}</h2></div><p>{copy.intro}</p></div>
        <div className="catalogue-shell">
          <div className="catalogue-toolbar">
            <label className="catalogue-search"><Search size={18} /><input type="search" autoComplete="off" enterKeyHint="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={copy.search} aria-label={copy.search} />{query && <button type="button" aria-label={copy.clearSearch} onClick={() => { setQuery(''); setPage(1); }}><X size={15} /></button>}</label>
            <div className="catalogue-filter-controls">
              <CatalogueFilter label={copy.companyLabel} value={company} options={companyOptions} icon={Building2} onChange={(value) => { setCompany(value); setPage(1); }} />
              <CatalogueFilter label={copy.initialLabel} value={letter} options={letterOptions} icon={ArrowDownAZ} onChange={(value) => { setLetter(value); setPage(1); }} menuClassName="catalogue-letter-menu" />
              <CatalogueFilter label={copy.sortLabel} value={sort} options={sortOptions} icon={SlidersHorizontal} onChange={(value) => { setSort(value as 'name' | 'company'); setPage(1); }} />
            </div>
          </div>
          {hasActiveFilters && <div className="catalogue-active-filters" aria-label={lang === 'ar' ? 'الفلاتر النشطة' : 'Active filters'}>
            <div>
              {query && <button type="button" onClick={() => { setQuery(''); setPage(1); }}><Search size={13} /><span dir="auto">{query}</span><X size={13} /></button>}
              {company !== 'all' && <button type="button" onClick={() => { setCompany('all'); setPage(1); }}><Building2 size={13} /><span>{selectedCompany}</span><X size={13} /></button>}
              {letter !== 'all' && <button type="button" onClick={() => { setLetter('all'); setPage(1); }}><ArrowDownAZ size={13} /><span>{letter}</span><X size={13} /></button>}
              {sort !== 'name' && <button type="button" onClick={() => { setSort('name'); setPage(1); }}><SlidersHorizontal size={13} /><span>{copy.sortCompany}</span><X size={13} /></button>}
            </div>
            <button type="button" className="catalogue-reset-all" onClick={reset}><RotateCcw size={14} />{copy.reset}</button>
          </div>}
          {loading ? <div className="catalogue-loading"><span /><span /><span /><p>{copy.loading}</p></div> : products.length === 0 ? <div className="catalogue-empty"><i><PackageSearch /></i><p className="section-label"><span />{category}</p><h3>{copy.emptyTitle}</h3><p>{copy.emptyText}</p><div><ArrowLink href={WHATSAPP_URL} primary>{lang === 'ar' ? 'استفسر عن الأصناف' : 'Ask about products'}</ArrowLink></div></div> : <div className="catalogue-results">
            <div className="product-results-head"><div><strong>{filteredProducts.length.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')}</strong><span>{copy.products}</span><em>{kind === 'medicine' ? copy.national : copy.cosmetics}</em></div></div>
            {visibleProducts.length > 0 ? <div className="catalogue-product-grid">{visibleProducts.map((product) => { const Icon = productIcons[kind]; const detail = lang === 'ar' ? (product.indication || product.composition || product.description) : (product.composition || product.indication || product.description); const inquiryUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(lang === 'ar' ? `مرحباً، أود الاستفسار عن الصنف: ${product.name}` : `Hello, I would like to ask about: ${product.name}`)}`; return <article className={`catalogue-product-card ${product.image ? 'has-image' : 'no-image'}`} key={product.id}>
              <div className={`product-card-image ${product.image ? '' : 'placeholder'}`}>{product.image ? <img src={assetUrl(product.image)} alt={product.name} loading="lazy" decoding="async" /> : <Icon aria-hidden />}</div>
              <div className="product-card-copy"><div className="product-card-meta"><span>{product.company[lang]}</span><em>{product.group === 'national' ? copy.national : copy.cosmetics}</em></div><h3 dir="auto">{product.name}</h3>{detail && <p dir="auto">{detail}</p>}<div className="product-card-actions">{kind === 'medicine' && <button type="button" className="medicine-ai-button" onClick={() => setSelectedMedicine(product)}><span><Bot size={14} /></span>{copy.aiGuide}<Sparkles size={12} /></button>}<a className="product-inquire" href={inquiryUrl} target="_blank" rel="noreferrer">{copy.inquire}<ArrowUpRight size={15} /></a></div></div>
            </article>; })}</div> : <div className="catalogue-no-results"><i><PackageSearch /></i><h3>{copy.noResults}</h3><p>{copy.noResultsText}</p><button type="button" className="catalogue-reset" onClick={reset}><RotateCcw size={15} />{copy.reset}</button></div>}
            {pageCount > 1 && <nav className="catalogue-pagination" aria-label={lang === 'ar' ? 'صفحات المنتجات' : 'Product pages'}><button type="button" onClick={() => { setPage((current) => Math.max(1, current - 1)); window.scrollTo({ top: (document.querySelector('.catalogue-results')?.getBoundingClientRect().top || 0) + window.scrollY - 110, behavior: 'smooth' }); }} disabled={currentPage === 1}>{copy.previous}</button><span>{copy.page} <strong>{currentPage.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')}</strong> {copy.of} {pageCount.toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US')}</span><button type="button" onClick={() => { setPage((current) => Math.min(pageCount, current + 1)); window.scrollTo({ top: (document.querySelector('.catalogue-results')?.getBoundingClientRect().top || 0) + window.scrollY - 110, behavior: 'smooth' }); }} disabled={currentPage === pageCount}>{copy.next}</button></nav>}
          </div>}
        </div>
      </div>
    </section>
    <AnimatePresence>{selectedMedicine && <MedicineGuidePanel product={selectedMedicine} guide={medicineGuides[selectedMedicine.id]} onClose={() => setSelectedMedicine(null)} />}</AnimatePresence>
  </>);
}

export function ProductCategoryPage({ kind }: { kind: ProductKind }) {
  const { lang } = useLanguage();
  const page = expandedPages[lang].products[kind];
  const Icon = productIcons[kind];
  return <main><SiteHeader /><PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} /><section className="product-family section"><div className="container product-family-panel"><div className="product-family-image"><img src={assetUrl(page.image)} alt={page.eyebrow} /></div><div className="product-family-copy"><i><Icon /></i><p className="section-label"><span />{lang === 'ar' ? 'ما الذي ندعمه' : 'What we support'}</p><h2>{lang === 'ar' ? 'خبرة عملية عبر دورة المنتج.' : 'Practical expertise across the product journey.'}</h2><ul>{page.points.map((point) => <li key={point}><Check size={17} /><span>{point}</span></li>)}</ul><ArrowLink href="/partners" primary>{lang === 'ar' ? 'ناقش فرصة شراكة' : 'Discuss a partnership'}</ArrowLink></div></div></section><ProductCatalogue kind={kind} category={page.eyebrow} /><PageCta /><SiteFooter /></main>;
}
