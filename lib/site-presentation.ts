export const TRUSTED_PARTNER_LOGOS = [
  ...Array.from({ length: 5 }, (_, index) => ({
    logo: `/images/companies (${index + 1}).png`,
    name: `Partner company ${index + 1}`,
    nameAr: `الشركة الشريكة ${index + 1}`,
  })),
  ...Array.from({ length: 10 }, (_, index) => ({
    logo: `/images/companies (${index + 1}).jpeg`,
    name: `Partner company ${index + 6}`,
    nameAr: `الشركة الشريكة ${index + 6}`,
  })),
  {
    logo: '/images/brands/domina.webp',
    name: 'Domina Pharmaceuticals',
    nameAr: 'دومنا للصناعات الدوائية',
  },
  {
    logo: '/images/brands/golden-med-pharma.webp',
    name: 'Golden Med Pharma',
    nameAr: 'غولدن ميد فارما',
  },
] as const;

export type SocialChannelId = 'facebook' | 'instagram' | 'linkedin' | 'youtube';

type SocialChannel = {
  id: SocialChannelId;
  label: string;
  href: string | null;
};

export const SOCIAL_CHANNELS: readonly SocialChannel[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61576383062865',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/saksok_drugstore?dmpr=MWszMzZkcm82eGVqdw==',
  },
  { id: 'linkedin', label: 'LinkedIn', href: null },
  { id: 'youtube', label: 'YouTube', href: null },
];
