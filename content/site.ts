export const siteContent = {
  company: { name: 'Saksouk Drugstore', location: 'Syria', descriptor: 'Pharmaceutical storage, supply & distribution' },
  navigation: [
    { label: 'Home', href: '/' }, { label: 'Products', href: '/products' },
    { label: 'Expertise', href: '/expertise' }, { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
  hero: {
    eyebrow: 'Pharmaceutical supply · Syria',
    headline: ['Pharmaceutical supply,', 'built on reliability.'],
    body: 'Saksouk Drugstore supports the healthcare supply chain through dependable pharmaceutical storage, supply and distribution.',
  },
  about: {
    eyebrow: 'About Saksouk',
    title: ['Reliable pharmaceutical supply', 'starts with responsible handling.'],
    lead: 'Saksouk Drugstore operates within the pharmaceutical supply chain, supporting healthcare providers with dependable access to medicines and healthcare products.',
    body: 'Our work is centered on responsible storage, careful handling, coordinated supply and professional relationships across the healthcare sector.',
  },
  // TODO: confirm final capability scope with the client.
  capabilities: [
    { title: 'Pharmaceutical Distribution', image: '/images/distribution.jpg', alt: 'Organized distribution warehouse aisle', description: 'Dependable movement of pharmaceutical products through the healthcare supply chain.' },
    { title: 'Medicine Storage', image: '/images/storage.jpg', alt: 'Large organized warehouse with storage shelves', description: 'Organized storage and responsible handling for pharmaceutical products.' },
    { title: 'Inventory & Supply Support', image: '/images/pharmaceutical.jpg', alt: 'Pharmaceutical products prepared for inventory and supply', description: 'Structured inventory coordination supporting pharmacies and healthcare organizations.' },
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
    { title: 'Pharmacies', text: 'Dependable access to pharmaceutical products backed by professional supply and distribution support.' },
    { title: 'Healthcare Institutions', text: 'Structured pharmaceutical supply for organizations that depend on consistency and responsible handling.' },
    { title: 'Industry Partners', text: 'Professional local support for pharmaceutical companies and suppliers.' },
  ],
  partners: [], // Hidden until client-approved partner logos are supplied.
  principles: ['Reliable Supply', 'Responsible Handling', 'Clear Communication', 'Long-Term Relationships'],
  contact: {
    title: ["Let's keep healthcare", 'moving.'],
    body: 'For supply, distribution or partnership inquiries, speak with the Saksouk team.',
    phone: 'Phone to be confirmed', email: 'Email to be confirmed',
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
      { key: 'business', title: 'Business Excellence', image: '/images/inventory.jpg', summary: 'Where direction meets disciplined execution.', body: ['We turn plans into practical action by improving processes, strengthening resilience and keeping teams aligned around dependable service.', 'Our approach values continuous learning, accountability and collaboration. Improvement is treated as an ongoing responsibility across the organization.', 'Risk-aware planning and business continuity support stability as needs, markets and operating conditions evolve.'] },
      { key: 'distribution', title: 'Distribution', image: '/images/distribution.jpg', summary: 'Coordinated movement through the healthcare supply chain.', body: ['Distribution brings together product readiness, clear communication and organized dispatch.', 'Saksouk works to connect supply with pharmacies and healthcare organizations through responsive coordination and professional service.', 'Each stage is approached with the continuity of healthcare supply in mind.'] },
      { key: 'facilities', title: 'Facilities Management', image: '/images/storage.jpg', summary: 'Organized environments that support responsible operations.', body: ['Facilities management supports the daily conditions required for orderly storage, handling and movement.', 'Clear workflows, planned maintenance and practical oversight help the wider operation work consistently.', 'Facility information and specific standards will be added when confirmed by Saksouk.'] },
      { key: 'finance', title: 'Finance', image: '/images/inventory.jpg', summary: 'Disciplined planning behind sustainable service.', body: ['Financial planning supports responsible purchasing, operational continuity and clear commercial relationships.', 'The function connects day-to-day decisions with long-term stability and measured growth.', 'Accurate coordination helps teams plan resources and serve customers responsibly.'] },
      { key: 'people', title: 'Human Resources', image: '/images/hero-warehouse.jpg', summary: 'People, capability and professional culture.', body: ['Professional service depends on capable people with clear responsibilities and shared standards.', 'Human resources supports development, communication and a culture of accountability.', 'The goal is a working environment where teams can contribute consistently and grow their expertise.'] },
      { key: 'digital', title: 'IT & Digital', image: '/images/pharmaceutical.jpg', summary: 'Information that helps operations stay connected.', body: ['Digital systems can support inventory visibility, internal coordination and more responsive customer service.', 'Saksouk’s digital capability will be described in greater detail as confirmed systems and services are supplied.', 'Technology is treated as an operational tool—not a claim in itself.'] },
      { key: 'legal', title: 'Legal & Compliance', image: '/images/storage.jpg', summary: 'Responsible operations within applicable requirements.', body: ['Legal and compliance oversight supports responsible decision-making and professional relationships.', 'The function helps teams understand applicable requirements and maintain clear internal practices.', 'Specific certifications, standards and regulatory claims will only be published after client confirmation.'] },
    ],
  },
} as const;
