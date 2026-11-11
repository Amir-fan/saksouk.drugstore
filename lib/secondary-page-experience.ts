export type SiteLanguage = 'en' | 'ar';
export type SecondaryProductKind = 'cosmetics' | 'supplements';

type ProductMetric = {
  value: string;
  label: string;
};

type ProductExperience = {
  kind: SecondaryProductKind;
  stageLabel: string;
  stageTitle: string;
  stageText: string;
  points: readonly string[];
  metrics: readonly ProductMetric[];
  catalogueLabel: string;
  storyLabel: string;
  imageAlt: string;
};

type AboutMilestone = {
  year: string;
  title: string;
  text: string;
};

type WorkPrinciple = {
  title: string;
  text: string;
};

const productExperiences: Record<SiteLanguage, Record<SecondaryProductKind, ProductExperience>> = {
  en: {
    cosmetics: {
      kind: 'cosmetics',
      stageLabel: 'Professional care portfolio',
      stageTitle: 'Care selected for the pharmacy channel',
      stageText: 'Thoughtful products, clear positioning and distribution support shaped around professional care environments.',
      points: [
        'Dermocosmetic care',
        'Responsible selection',
        'Pharmacy-channel reach',
        'Partner-led growth',
      ],
      metrics: [
        { value: '01', label: 'Connected care portfolio' },
        { value: '2,982', label: 'Pharmacies in our reach' },
        { value: '24+', label: 'Years in pharmaceutical distribution' },
      ],
      catalogueLabel: 'Explore cosmetics',
      storyLabel: 'Our distribution story',
      imageAlt: 'Quality specialist reviewing a professional personal-care product',
    },
    supplements: {
      kind: 'supplements',
      stageLabel: 'Everyday wellbeing',
      stageTitle: 'Quality-led nutritional support',
      stageText: 'Selected vitamins, minerals and supplements supported by clear communication and responsible distribution.',
      points: [
        'Quality-conscious portfolio',
        'Clear product information',
        'Healthcare-channel reach',
        'Responsible distribution',
      ],
      metrics: [
        { value: '01', label: 'Focused wellness portfolio' },
        { value: '2,982', label: 'Pharmacies in our reach' },
        { value: '24+', label: 'Years in pharmaceutical distribution' },
      ],
      catalogueLabel: 'Explore supplements',
      storyLabel: 'Our distribution story',
      imageAlt: 'Nutritional supplements prepared for professional healthcare distribution',
    },
  },
  ar: {
    cosmetics: {
      kind: 'cosmetics',
      stageLabel: 'محفظة عناية احترافية',
      stageTitle: 'عناية مختارة لقنوات الصيدليات',
      stageText: 'منتجات مدروسة وتموضع واضح ودعم توزيعي مصمم لبيئات العناية الاحترافية.',
      points: [
        'العناية الجلدية التجميلية',
        'اختيار مسؤول',
        'وصول عبر قنوات الصيدليات',
        'نمو قائم على الشراكة',
      ],
      metrics: [
        { value: '01', label: 'محفظة عناية مترابطة' },
        { value: '2,982', label: 'صيدلية ضمن نطاقنا' },
        { value: '+24', label: 'عاماً في التوزيع الدوائي' },
      ],
      catalogueLabel: 'استكشف مستحضرات التجميل',
      storyLabel: 'قصتنا في التوزيع',
      imageAlt: 'مختصة جودة تراجع منتج عناية شخصية احترافي',
    },
    supplements: {
      kind: 'supplements',
      stageLabel: 'العافية اليومية',
      stageTitle: 'دعم غذائي قائم على الجودة',
      stageText: 'فيتامينات ومعادن ومكملات مختارة تدعمها معلومات واضحة وتوزيع مسؤول.',
      points: [
        'محفظة واعية بالجودة',
        'معلومات واضحة عن المنتجات',
        'وصول عبر قنوات الرعاية الصحية',
        'توزيع مسؤول',
      ],
      metrics: [
        { value: '01', label: 'محفظة مركزة للعافية' },
        { value: '2,982', label: 'صيدلية ضمن نطاقنا' },
        { value: '+24', label: 'عاماً في التوزيع الدوائي' },
      ],
      catalogueLabel: 'استكشف المكملات',
      storyLabel: 'قصتنا في التوزيع',
      imageAlt: 'مكملات غذائية مجهزة للتوزيع عبر قنوات الرعاية الصحية',
    },
  },
};

const aboutMilestones: Record<SiteLanguage, readonly AboutMilestone[]> = {
  en: [
    { year: '1950', title: 'The group begins', text: 'A family business foundation grows across trade, manufacturing, agriculture, construction and mobility.' },
    { year: '2000', title: 'Pharmaceutical activity starts', text: 'Saksouk Pharmaceutical Warehouse begins building specialist market, supplier and distribution knowledge.' },
    { year: 'Today', title: 'A platform for partnership', text: 'Local insight, infrastructure and experienced teams support brands entering or expanding in Syria.' },
  ],
  ar: [
    { year: '1950', title: 'انطلاقة المجموعة', text: 'تأسس نشاط عائلي تطور عبر التجارة والصناعة والزراعة والمقاولات وقطاع السيارات.' },
    { year: '2000', title: 'بداية النشاط الدوائي', text: 'بدأ مستودع سكسوك للأدوية ببناء خبرته المتخصصة في السوق والموردين والتوزيع.' },
    { year: 'اليوم', title: 'منصة للشراكات', text: 'تدعم المعرفة المحلية والبنية التحتية والفرق الخبيرة العلامات الراغبة في دخول السوق السورية أو التوسع فيها.' },
  ],
};

const workPrinciples: Record<SiteLanguage, readonly WorkPrinciple[]> = {
  en: [
    { title: 'Work with purpose', text: 'Connect daily decisions to safer, clearer and more dependable healthcare access.' },
    { title: 'Learn across disciplines', text: 'Commercial, operations and quality teams solve problems together and share practical knowledge.' },
    { title: 'Own the standard', text: 'Responsibility, clarity and follow-through shape how we work with colleagues and partners.' },
  ],
  ar: [
    { title: 'عمل له هدف', text: 'اربط القرارات اليومية بوصول صحي أكثر أماناً ووضوحاً وموثوقية.' },
    { title: 'تعلّم بين التخصصات', text: 'تعمل الفرق التجارية والتشغيلية وفرق الجودة معاً لحل المشكلات ومشاركة الخبرة العملية.' },
    { title: 'تحمّل مسؤولية المعيار', text: 'تحدد المسؤولية والوضوح والمتابعة أسلوب عملنا مع الزملاء والشركاء.' },
  ],
};

export function getProductExperience(kind: SecondaryProductKind, lang: SiteLanguage) {
  return productExperiences[lang][kind];
}

export function getAboutMilestones(lang: SiteLanguage) {
  return aboutMilestones[lang];
}

export function getWorkPrinciples(lang: SiteLanguage) {
  return workPrinciples[lang];
}
