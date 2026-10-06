import { ui, fallbackLang, type Lang, type UIKey, isLang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, , lang] = url.pathname.split('/');
  if (isLang(lang)) return lang;
  return fallbackLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey) {
    return ui[lang][key] || ui[fallbackLang][key];
  }
}
