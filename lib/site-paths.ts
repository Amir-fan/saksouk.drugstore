const externalProtocol = /^(?:https?:|mailto:|tel:)/i;

export const WHATSAPP_URL = 'https://wa.me/963930035040';

export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

export function pageUrl(path: string) {
  if (externalProtocol.test(path) || path.startsWith('#')) return path;

  const [pathname, hash] = path.split('#');
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const pagePath = cleanPath ? `${cleanPath}/` : '';
  return `${import.meta.env.BASE_URL}${pagePath}${hash ? `#${hash}` : ''}`;
}
