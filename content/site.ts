export const siteContent = {
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
  // Extracted from Core Services in PDF
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
    phone: '+961 1 396 000', email: 'info@saksouk.com',
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
    // TODO: populate only with client-confirmed product records and manufacturers.
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
  },
} as const;
