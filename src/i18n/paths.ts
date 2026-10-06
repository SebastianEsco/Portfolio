import { projectsSegment, type Lang } from './ui';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site path with the GitHub Pages base ("/Portfolio"). Always ends with "/" for pages. */
export function url(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function homeUrl(lang: Lang, hash = ''): string {
  return url(`/${lang}/${hash}`);
}

export function projectUrl(lang: Lang, slug: string): string {
  return url(`/${lang}/${projectsSegment[lang]}/${slug}/`);
}

/** Path to a file in /public, with the base prefix. */
export function asset(path: string): string {
  return url(path.startsWith('/') ? path : `/${path}`);
}
