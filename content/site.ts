export const siteContent = {
  company: { name: 'Saksouk Drugstore', shortName: 'Saksouk', location: 'Syria', descriptor: 'Pharmaceutical storage, supply & distribution' },
  navigation: [
    { label: 'Home', href: '#home' }, { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#capabilities' }, { label: 'Partners', href: '#partners' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Pharmaceutical supply · Syria',
    headline: ['Pharmaceutical supply,', 'built on reliability.'],
    body: 'Saksouk Drugstore supports the healthcare supply chain through dependable pharmaceutical storage, supply and distribution.',
    primaryCta: { label: 'Discover Saksouk', href: '#about' }, secondaryCta: { label: 'Contact our team', href: '#contact' },
    pillars: ['Storage', 'Supply', 'Distribution'],
  },
  // TODO: replace each placeholder with client-confirmed data before publication.
  metrics: [
    { value: '—', label: 'Years of operation', note: 'Client data pending' },
    { value: '—', label: 'Portfolio scale', note: 'Client data pending' },
    { value: '—', label: 'Industry partners', note: 'Client data pending' },
    { value: '—', label: 'Pharmacies & institutions', note: 'Client data pending' },
  ],
  about: {
    eyebrow: 'Who we are', title: ['Reliable supply', 'supports reliable care.'],
    lead: 'Saksouk Drugstore operates within the pharmaceutical supply chain, supporting healthcare providers with dependable access to medicines and healthcare products.',
    body: 'Our work is grounded in responsible storage, careful handling, coordinated distribution and professional relationships across the healthcare sector.',
  },
  // TODO: confirm final service scope with the client.
  capabilities: [
    { index: '01', title: 'Pharmaceutical Distribution', short: 'Dependable movement through the healthcare supply chain.', detail: 'Structured distribution support designed around consistency, communication and responsible handling.' },
    { index: '02', title: 'Medicine Storage', short: 'Organized storage for pharmaceutical products.', detail: 'A disciplined operational approach that puts product care and continuity at the center.' },
    { index: '03', title: 'Inventory Handling', short: 'Clear oversight from receipt to dispatch.', detail: 'Practical inventory coordination that helps healthcare customers plan with greater confidence.' },
    { index: '04', title: 'Pharmacy Supply', short: 'Professional supply relationships for pharmacies.', detail: 'Responsive support centered on dependable access and straightforward service.' },
    { index: '05', title: 'Institutional Supply', short: 'Structured support for healthcare organizations.', detail: 'A responsible supply approach for organizations that depend on consistency.' },
    { index: '06', title: 'Partner Support', short: 'Local operating relationships built for continuity.', detail: 'Clear coordination for suppliers and pharmaceutical partners working in the market.' },
  ],
  // TODO: confirm each audience with the client.
  audiences: [
    { index: '01', title: 'Pharmacies', text: 'Dependable access to pharmaceutical products backed by professional supply and distribution support.' },
    { index: '02', title: 'Healthcare Institutions', text: 'Structured pharmaceutical supply for organizations that depend on consistency and responsible handling.' },
    { index: '03', title: 'Industry Partners', text: 'A local operating relationship for pharmaceutical companies and suppliers seeking dependable market support.' },
  ],
  operations: { eyebrow: 'Operations', title: ['From storage', 'to delivery.'], body: 'Pharmaceutical distribution depends on connected, disciplined operations. Saksouk brings the essential stages together with care and professional oversight.', stages: ['Storage', 'Handling', 'Inventory', 'Distribution', 'Continuity'] },
  productCategories: [], // Intentionally hidden until real categories are supplied.
  partners: [], // TODO: add client-supplied manufacturer and partner logos.
  principles: [
    { index: '01', title: 'Reliability', text: 'Consistent support for the people and organizations that depend on supply.' },
    { index: '02', title: 'Responsibility', text: 'A careful, professional approach to every stage of pharmaceutical handling.' },
    { index: '03', title: 'Continuity', text: 'Operations shaped around dependable access and long-term relationships.' },
    { index: '04', title: 'Professional service', text: 'Clear communication and responsive support across the supply chain.' },
  ],
  contact: { email: 'Email to be confirmed', phone: 'Phone to be confirmed', location: 'Syria', title: ['Let’s move healthcare', 'forward, reliably.'], body: 'For partnership, supply or business inquiries, contact the Saksouk team.' },
} as const;
