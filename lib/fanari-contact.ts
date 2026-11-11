export const FANARI_CONTACT = {
  website: 'https://fanarilabs.com',
  phoneDisplay: '+90 537 929 51 63',
  phoneHref: 'tel:+905379295163',
  email: 'fanarilabs@gmail.com',
  emailHref: 'mailto:fanarilabs@gmail.com',
} as const;

const fanariCopy = {
  en: {
    creditLead: 'Developed by',
    creditAction: 'Click to contact',
    dialogTitle: 'Fanari Labs contact details',
    tagline: 'Digital work made to be remembered',
    description: 'Custom websites, AI systems and automation designed around real business needs',
    websiteLabel: 'Website',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    closeLabel: 'Close contact details',
  },
  ar: {
    creditLead: 'تطوير',
    creditAction: 'اضغط للتواصل',
    dialogTitle: 'بيانات التواصل مع فناري لابس',
    tagline: 'عمل رقمي صُمم ليبقى في الذاكرة',
    description: 'مواقع مخصصة وأنظمة ذكاء اصطناعي وحلول أتمتة مبنية حول احتياجات الأعمال الحقيقية',
    websiteLabel: 'الموقع الإلكتروني',
    phoneLabel: 'الهاتف',
    emailLabel: 'البريد الإلكتروني',
    closeLabel: 'إغلاق بيانات التواصل',
  },
} as const;

export function getFanariCopy(lang: 'en' | 'ar') {
  return fanariCopy[lang];
}
