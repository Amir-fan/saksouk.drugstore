export const siteContent = {
  en: {
    company: { name: 'Saksouk Drugstore', location: 'Syria', descriptor: 'Pharmaceutical storage, supply & distribution' },
    navigation: [
      { label: 'Home', href: '/' },
      {
        label: 'Products & Expertise',
        href: '#',
        dropdown: [
          { label: 'Pharmaceutical', href: '/products#pharmaceutical' },
          { label: 'Cosmetic', href: '/products#cosmetic' },
          { label: 'Expertise', href: '/expertise' }
        ]
      },
      { label: 'About Us', href: '/#about' },
      { label: 'Get in touch', href: '/#contact' },
    ],
    hero: {
      eyebrow: 'Pharmaceutical supply · Syria',
      headline: ['The leader in delivering', 'valuable pharmaceutical services.'],
      body: 'Saksouk collaborates with local and international partners to develop, launch, and expand pharmaceutical businesses in Syria and the wider region.',
    },
    about: {
      eyebrow: 'About Us',
      title: ['Delivering essential pharmaceuticals,', 'efficiently and reliably.'],
      lead: 'SAKSOUK is one of the fastest-growing companies in Syria\'s healthcare sector.',
      body: 'We distribute and promote a wide range of high-quality generic medicines, in-licensed pharmaceutical products, and nutraceuticals. Driven by our mission to deliver essential healthcare products efficiently, we continuously enhance our capabilities to support better health outcomes.',
    },
    metrics: [
      { value: 3, label: 'Core supply stages', detail: 'Storage · Handling · Distribution' },
      { value: 3, label: 'Healthcare partner groups', detail: 'Pharmacies · Institutions · Industry' },
      { value: 4, label: 'Operating principles', detail: 'Reliability · Responsibility · Clarity · Trust' },
      { value: 1, label: 'Connected operation', detail: 'From product receipt to dispatch' },
    ],
    capabilities: [
      { title: 'Pharmaceutical Distribution', image: '/images/pharma-cold-chain-v3.jpg', alt: 'Pharmaceutical supply', description: 'Reliable supply chains for finished products, APIs, excipients & packaging materials.' },
      { title: 'Business & Product Development', image: '/images/pharma-automation-v3.jpg', alt: 'Business strategy', description: 'Helping companies launch new products and grow their footprint with strategic business development.' },
      { title: 'Regulatory Affairs', image: '/images/pharma-quality-v3.jpg', alt: 'Regulatory compliance', description: 'Simplifying regulatory processes with dossier preparation, local filings, and variation management.' },
    ],
    operations: {
      eyebrow: 'Operations', title: ['From storage', 'to delivery.'],
      body: 'Saksouk brings key stages of pharmaceutical supply together through organized storage, responsible handling and coordinated distribution.',
      items: [
        { title: 'Storage', text: 'Organized environments and careful product placement support dependable access.' },
        { title: 'Handling', text: 'A responsible approach across receipt, inventory coordination and dispatch.' },
        { title: 'Distribution', text: 'Coordinated movement that connects supply with pharmacies and healthcare organizations.' },
      ],
    },
    audiences: [
      { title: 'Local & Regional Manufacturers', text: 'Supporting pharmaceutical companies with distribution, raw material supply, and facility compliance.' },
      { title: 'International Companies', text: 'Enabling global partners to establish operations in Syria through local representation and market entry support.' },
      { title: 'Healthcare Distributors', text: 'Providing distributors and wholesalers with a broad range of high-quality generic medicines and nutraceuticals.' },
    ],
    partners: ['Ibn-Hayan', 'Medico', 'Almashreq', 'Elssad Pharma', 'Shifa', 'Kimi', 'Biomed', 'Mediotec'],
    principles: ['Excellence', 'Integrity', 'Leadership', 'Passion'],
    contact: {
      title: ["Let's keep healthcare", 'moving.'],
      body: 'For supply, distribution or partnership inquiries, get in touch with the Saksouk team.',
      phone: '+963 930 035 040', email: 'info@saksouk.com',
    },
    footer: {
      discover: [
        { label: 'About Us', href: '/#about' },
        { label: 'Partners', href: '/#partners' },
      ],
      whatWeDo: [
        { label: 'Pharmaceutical', href: '/products#pharmaceutical' },
        { label: 'Cosmetic', href: '/products#cosmetic' },
        { label: 'Expertise', href: '/expertise' },
      ],
      usefulLinks: [
        { label: 'News & Initiatives', href: '/news' },
        { label: 'Careers', href: '/careers' },
        { label: 'Get in touch', href: '/#contact' },
      ],
      address: 'Badaro, Sami El Solh Street, Jamil Kfoury Building\nP.O. Box: 11-9073 Riad El Solh\nPostal Code 1107 2280 Beirut-Lebanon',
    },
    products: {
      eyebrow: 'Products',
      title: ['A portfolio structured', 'around healthcare needs.'],
      introduction: [
        'Saksouk Drugstore supports pharmacies, healthcare institutions and health-sector partners with access to pharmaceutical and healthcare products.',
        'The online catalogue is designed to help professional customers find products by category, manufacturer and name. Product availability and commercial details are confirmed directly by the Saksouk team.',
      ],
      categories: ['Pharmaceutical', 'Healthcare', 'All'],
      items: [] as Array<{ name: string; category: 'Pharmaceutical' | 'Healthcare'; manufacturer: string }>,
    },
    expertise: {
      eyebrow: 'Expertise',
      title: ['Operational expertise,', 'connected across the business.'],
      introduction: 'Pharmaceutical distribution depends on more than product movement. Saksouk connects commercial, operational and organizational disciplines to support dependable service.',
      areas: [
        { key: 'business', title: 'Business Excellence', image: '/images/pharma-hero-v3.jpg', summary: 'Where direction meets disciplined execution.', body: ['We turn plans into practical action by improving processes, strengthening resilience and keeping teams aligned around dependable service.', 'Our approach values continuous learning, accountability and collaboration. Improvement is treated as an ongoing responsibility across the organization.', 'Risk-aware planning and business continuity support stability as needs, markets and operating conditions evolve.'] },
        { key: 'distribution', title: 'Distribution', image: '/images/pharma-cold-chain-v3.jpg', summary: 'Coordinated movement through the healthcare supply chain.', body: ['Distribution brings together product readiness, clear communication and organized dispatch.', 'Saksouk works to connect supply with pharmacies and healthcare organizations through responsive coordination and professional service.', 'Each stage is approached with the continuity of healthcare supply in mind.'] },
        { key: 'facilities', title: 'Facilities Management', image: '/images/pharma-automation-v3.jpg', summary: 'Organized environments that support responsible operations.', body: ['Facilities management supports the daily conditions required for orderly storage, handling and movement.', 'Clear workflows, planned maintenance and practical oversight help the wider operation work consistently.', 'Facility information and specific standards will be added when confirmed by Saksouk.'] },
        { key: 'finance', title: 'Finance', image: '/images/pharma-quality-v3.jpg', summary: 'Disciplined planning behind sustainable service.', body: ['Financial planning supports responsible purchasing, operational continuity and clear commercial relationships.', 'The function connects day-to-day decisions with long-term stability and measured growth.', 'Accurate coordination helps teams plan resources and serve customers responsibly.'] },
        { key: 'people', title: 'Human Resources', image: '/images/pharma-hero-v3.jpg', summary: 'People, capability and professional culture.', body: ['Professional service depends on capable people with clear responsibilities and shared standards.', 'Human resources supports development, communication and a culture of accountability.', 'The goal is a working environment where teams can contribute consistently and grow their expertise.'] },
        { key: 'digital', title: 'IT & Digital', image: '/images/pharma-automation-v3.jpg', summary: 'Information that helps operations stay connected.', body: ['Digital systems can support inventory visibility, internal coordination and more responsive customer service.', 'Saksouk’s digital capability will be described in greater detail as confirmed systems and services are supplied.', 'Technology is treated as an operational tool—not a claim in itself.'] },
        { key: 'legal', title: 'Legal & Compliance', image: '/images/pharma-quality-v3.jpg', summary: 'Responsible operations within applicable requirements.', body: ['Legal and compliance oversight supports responsible decision-making and professional relationships.', 'The function helps teams understand applicable requirements and maintain clear internal practices.', 'Specific certifications, standards and regulatory claims will only be published after client confirmation.'] },
      ],
    }
  },
  ar: {
    company: { name: 'مستودع سكسوك', location: 'سوريا', descriptor: 'تخزين، توريد وتوزيع الأدوية' },
    navigation: [
      { label: 'الرئيسية', href: '/' },
      {
        label: 'المنتجات والخبرات',
        href: '#',
        dropdown: [
          { label: 'الأدوية', href: '/products#pharmaceutical' },
          { label: 'مستحضرات التجميل', href: '/products#cosmetic' },
          { label: 'خبراتنا', href: '/expertise' }
        ]
      },
      { label: 'من نحن', href: '/#about' },
      { label: 'تواصل معنا', href: '/#contact' },
    ],
    hero: {
      eyebrow: 'الإمداد الدوائي · سوريا',
      headline: ['الروّاد في تقديم', 'خدمات دوائية قيّمة.'],
      body: 'تتعاون سكسوك مع شركاء محليين ودوليين لتطوير وإطلاق وتوسيع الأعمال الدوائية في سوريا والمنطقة.',
    },
    about: {
      eyebrow: 'من نحن',
      title: ['توفير الأدوية الأساسية', 'بكفاءة وموثوقية.'],
      lead: 'تُعد سكسوك واحدة من أسرع الشركات نمواً في قطاع الرعاية الصحية في سوريا.',
      body: 'نقوم بتوزيع وترويج مجموعة واسعة من الأدوية الجنيسة عالية الجودة، المنتجات الصيدلانية المرخصة، والمكملات الغذائية. وانطلاقاً من مهمتنا المتمثلة في تقديم منتجات الرعاية الصحية الأساسية بكفاءة، فإننا نعمل باستمرار على تعزيز قدراتنا لدعم نتائج صحية أفضل.',
    },
    metrics: [
      { value: 3, label: 'المراحل الأساسية للتوريد', detail: 'التخزين · المناولة · التوزيع' },
      { value: 3, label: 'فئات شركاء الرعاية الصحية', detail: 'الصيدليات · المؤسسات · الصناعة' },
      { value: 4, label: 'مبادئ العمل', detail: 'الموثوقية · المسؤولية · الوضوح · الثقة' },
      { value: 1, label: 'عملية متكاملة', detail: 'من استلام المنتج إلى إرساله' },
    ],
    capabilities: [
      { title: 'التوزيع الدوائي', image: '/images/pharma-cold-chain-v3.jpg', alt: 'الإمداد الدوائي', description: 'سلاسل توريد موثوقة للمنتجات النهائية، المواد الفعالة، السواغات ومواد التعبئة والتغليف.' },
      { title: 'تطوير الأعمال والمنتجات', image: '/images/pharma-automation-v3.jpg', alt: 'استراتيجية الأعمال', description: 'مساعدة الشركات في إطلاق منتجات جديدة وتوسيع نطاق حضورها من خلال تطوير استراتيجي للأعمال.' },
      { title: 'الشؤون التنظيمية', image: '/images/pharma-quality-v3.jpg', alt: 'الامتثال التنظيمي', description: 'تبسيط الإجراءات التنظيمية من خلال إعداد الملفات، التقديم المحلي، وإدارة التغييرات.' },
    ],
    operations: {
      eyebrow: 'العمليات', title: ['من التخزين', 'إلى التسليم.'],
      body: 'تجمع سكسوك بين المراحل الأساسية للإمداد الدوائي من خلال التخزين المنظم، المناولة المسؤولة، والتوزيع المنسق.',
      items: [
        { title: 'التخزين', text: 'بيئات منظمة وترتيب دقيق للمنتجات يضمن وصولاً موثوقاً وآمناً.' },
        { title: 'المناولة', text: 'نهج مسؤول يشمل الاستلام، تنسيق المخزون، والعمليات اللوجستية.' },
        { title: 'التوزيع', text: 'حركة منسقة تربط سلسلة التوريد بالصيدليات ومؤسسات الرعاية الصحية.' },
      ],
    },
    audiences: [
      { title: 'المصنعون المحليون والإقليميون', text: 'دعم شركات الأدوية من خلال التوزيع، توريد المواد الخام، والامتثال لمعايير المنشآت.' },
      { title: 'الشركات الدولية', text: 'تمكين الشركاء العالميين من تأسيس عملياتهم في سوريا عبر التمثيل المحلي ودعم دخول السوق.' },
      { title: 'موزعو الرعاية الصحية', text: 'تزويد الموزعين وتجار الجملة بمجموعة واسعة من الأدوية الجنيسة والمكملات الغذائية عالية الجودة.' },
    ],
    partners: ['ابن حيان', 'ميديكو', 'المشرق', 'السعد فارما', 'شفاء', 'كيمي', 'بيوميد', 'ميديوتيك'],
    principles: ['التميز', 'النزاهة', 'القيادة', 'الشغف'],
    contact: {
      title: ["لنُبقِ الرعاية الصحية", 'في تقدم مستمر.'],
      body: 'للاستفسارات المتعلقة بالتوريد، التوزيع أو الشراكات، يرجى التواصل مع فريق سكسوك.',
      phone: '+963 930 035 040', email: 'info@saksouk.com',
    },
    footer: {
      discover: [
        { label: 'من نحن', href: '/#about' },
        { label: 'شركاؤنا', href: '/#partners' },
      ],
      whatWeDo: [
        { label: 'الأدوية', href: '/products#pharmaceutical' },
        { label: 'مستحضرات التجميل', href: '/products#cosmetic' },
        { label: 'خبراتنا', href: '/expertise' },
      ],
      usefulLinks: [
        { label: 'الأخبار والمبادرات', href: '/news' },
        { label: 'الوظائف', href: '/careers' },
        { label: 'تواصل معنا', href: '/#contact' },
      ],
      address: 'بدارو، شارع سامي الصلح، بناية جميل خفوري\nص.ب: 11-9073 رياض الصلح\nالرمز البريدي 1107 2280 بيروت - لبنان',
    },
    products: {
      eyebrow: 'المنتجات',
      title: ['محفظة مصممة', 'لتلبية احتياجات الرعاية الصحية.'],
      introduction: [
        'تدعم مستودعات سكسوك الصيدليات، مؤسسات الرعاية الصحية، وشركاء القطاع الصحي من خلال توفير المنتجات الدوائية والرعاية الصحية.',
        'تم تصميم الكتالوج عبر الإنترنت لمساعدة العملاء المحترفين في العثور على المنتجات حسب الفئة، الشركة المصنعة، والاسم. يتم تأكيد توفر المنتجات والتفاصيل التجارية مباشرة من قبل فريق سكسوك.',
      ],
      categories: ['الأدوية', 'الرعاية الصحية', 'الكل'],
      items: [] as Array<{ name: string; category: 'Pharmaceutical' | 'Healthcare'; manufacturer: string }>,
    },
    expertise: {
      eyebrow: 'الخبرات',
      title: ['خبرة تشغيلية', 'متصلة عبر جميع قطاعات العمل.'],
      introduction: 'لا يقتصر التوزيع الدوائي على حركة المنتجات فقط. تربط سكسوك بين التخصصات التجارية، التشغيلية، والتنظيمية لدعم خدمة موثوقة ومستدامة.',
      areas: [
        { key: 'business', title: 'التميز في الأعمال', image: '/images/pharma-hero-v3.jpg', summary: 'حيث يلتقي التوجيه مع التنفيذ المنضبط.', body: ['نحول الخطط إلى إجراءات عملية من خلال تحسين العمليات، تعزيز المرونة، وإبقاء الفرق متوافقة لتقديم خدمة موثوقة.', 'يقدّر نهجنا التعلم المستمر، المساءلة، والتعاون. يتم التعامل مع التطوير كمسؤولية مستمرة عبر كافة أنحاء المنظمة.', 'التخطيط الواعي بالمخاطر واستمرارية الأعمال يدعمان الاستقرار مع تطور الاحتياجات، الأسواق، وظروف التشغيل.'] },
        { key: 'distribution', title: 'التوزيع', image: '/images/pharma-cold-chain-v3.jpg', summary: 'حركة منسقة عبر سلسلة توريد الرعاية الصحية.', body: ['يجمع التوزيع بين جاهزية المنتج، التواصل الواضح، والإرسال المنظم.', 'تعمل سكسوك على ربط الإمدادات بالصيدليات ومؤسسات الرعاية الصحية من خلال التنسيق المستجيب والخدمة الاحترافية.', 'يتم التعامل مع كل مرحلة واضعين في الاعتبار استمرارية الإمداد الدوائي.'] },
        { key: 'facilities', title: 'إدارة المنشآت', image: '/images/pharma-automation-v3.jpg', summary: 'بيئات منظمة تدعم العمليات المسؤولة.', body: ['تدعم إدارة المنشآت الظروف اليومية المطلوبة للتخزين، المناولة، والحركة المنظمة.', 'تساعد مسارات العمل الواضحة، الصيانة المجدولة، والإشراف العملي على جعل العمليات واسعة النطاق تعمل بشكل متسق.', 'سيتم إضافة معلومات المنشأة والمعايير المحددة عند تأكيدها من قبل سكسوك.'] },
        { key: 'finance', title: 'المالية', image: '/images/pharma-quality-v3.jpg', summary: 'تخطيط منضبط وراء خدمة مستدامة.', body: ['يدعم التخطيط المالي الشراء المسؤول، استمرارية العمليات، والعلاقات التجارية الواضحة.', 'تربط الإدارة بين القرارات اليومية والاستقرار طويل الأجل والنمو المدروس.', 'يساعد التنسيق الدقيق الفرق على تخطيط الموارد وخدمة العملاء بمسؤولية وموثوقية.'] },
        { key: 'people', title: 'الموارد البشرية', image: '/images/pharma-hero-v3.jpg', summary: 'الأفراد، القدرات والثقافة المهنية.', body: ['تعتمد الخدمة الاحترافية على أفراد مؤهلين بمسؤوليات واضحة ومعايير مشتركة.', 'تدعم الموارد البشرية التطوير، التواصل، وثقافة المساءلة.', 'الهدف هو خلق بيئة عمل تُمكّن الفرق من المساهمة باستمرار وتنمية خبراتهم.'] },
        { key: 'digital', title: 'تكنولوجيا المعلومات والرقمنة', image: '/images/pharma-automation-v3.jpg', summary: 'معلومات تساعد على إبقاء العمليات متصلة.', body: ['يمكن للأنظمة الرقمية أن تدعم رؤية المخزون، التنسيق الداخلي، وخدمة عملاء أكثر استجابة.', 'سيتم وصف القدرات الرقمية لشركة سكسوك بتفصيل أكبر بمجرد توفير الأنظمة والخدمات المعتمدة.', 'يتم التعامل مع التكنولوجيا كأداة تشغيلية - وليس كمجرد ادعاء في حد ذاته.'] },
        { key: 'legal', title: 'الشؤون القانونية والامتثال', image: '/images/pharma-quality-v3.jpg', summary: 'عمليات مسؤولة ضمن المتطلبات المعمول بها.', body: ['يدعم الإشراف القانوني والامتثال اتخاذ القرارات المسؤولة وبناء العلاقات المهنية.', 'تساعد الإدارة الفرق على فهم المتطلبات المعمول بها والحفاظ على ممارسات داخلية واضحة وموثوقة.', 'لن يتم نشر الشهادات، المعايير، والادعاءات التنظيمية المحددة إلا بعد تأكيد العميل.'] },
      ],
    }
  }
} as const;
