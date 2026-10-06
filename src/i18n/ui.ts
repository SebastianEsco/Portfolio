// All interface text in both languages. Project texts live in src/content/projects/*.yaml.
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const langs = Object.keys(languages) as Lang[];

// Used when the visitor's browser language is neither Spanish nor English.
export const fallbackLang: Lang = 'en';

export const ui = {
  es: {
    'meta.title': 'Sebastián Escobar · Desarrollador de Videojuegos y XR',
    'meta.description':
      'Portafolio de Sebastián Escobar, desarrollador de videojuegos y experiencias XR en Unity y Unreal Engine. Medellín, Colombia.',
    'nav.work': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'nav.cv': 'CV',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'nav.switchLang': 'Switch to English',
    'hero.role': 'Desarrollador de videojuegos y XR',
    'hero.location': 'Medellín, Colombia',
    'hero.scroll': 'Desliza',
    'about.label': 'Sobre mí',
    'about.title': 'Historias interactivas, hechas para sentirse.',
    'about.p1':
      'Soy Sebastián Escobar, creador digital enfocado en la narrativa interactiva. Mi camino empezó con la fascinación por cómo la tecnología puede despertar emociones y curiosidad.',
    'about.p2':
      'Me especializo en desarrollo con Unity y Unreal Engine, creando experiencias para PC, móviles, realidad virtual (VR) y realidad aumentada (AR). Me mueve la forma en que el diseño, el código y la imaginación se unen para crear interacciones con sentido.',
    'about.p3':
      'Más allá de lo técnico, me inspiran el arte, la arquitectura y las historias humanas detrás de la tecnología.',
    'about.photoAlt': 'Retrato de Sebastián Escobar',
    'work.label': 'Proyectos seleccionados',
    'work.title': 'Cosas que he construido',
    'work.view': 'Ver proyecto',
    'experience.label': 'Experiencia',
    'experience.title': 'Trayectoria',
    'education.label': 'Educación',
    'skills.label': 'Habilidades',
    'skills.engines': 'Motores',
    'skills.languages': 'Lenguajes',
    'skills.tools': 'Herramientas',
    'skills.xr': 'XR',
    'skills.spoken': 'Idiomas',
    'contact.label': 'Contacto',
    'contact.title': 'Construyamos algo.',
    'contact.text': '¿Tienes un proyecto, una vacante o una idea? Escríbeme.',
    'contact.cvEs': 'Descargar CV (Español)',
    'contact.cvEn': 'Download CV (English)',
    'footer.rights': 'Hecho en Medellín',
    'project.year': 'Año',
    'project.platform': 'Plataforma',
    'project.engine': 'Motor',
    'project.team': 'Equipo',
    'project.role': 'Rol',
    'project.duration': 'Duración',
    'project.trailer': 'Ver tráiler',
    'project.gallery': 'Galería',
    'project.next': 'Siguiente proyecto',
    'project.back': 'Todos los proyectos',
    'project.model.hint': 'Arrastra para girar · rueda para acercar',
    'project.model.hintTouch': 'Arrastra para girar',
    'lightbox.close': 'Cerrar',
    'lightbox.prev': 'Anterior',
    'lightbox.next': 'Siguiente',
  },
  en: {
    'meta.title': 'Sebastián Escobar · Game & XR Developer',
    'meta.description':
      'Portfolio of Sebastián Escobar, game and XR developer working in Unity and Unreal Engine. Medellín, Colombia.',
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.cv': 'CV',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.switchLang': 'Cambiar a español',
    'hero.role': 'Game & XR Developer',
    'hero.location': 'Medellín, Colombia',
    'hero.scroll': 'Scroll',
    'about.label': 'About',
    'about.title': 'Interactive stories, built to be felt.',
    'about.p1':
      "I'm Sebastián Escobar, a digital creator focused on interactive storytelling. My journey began with a fascination for how technology can evoke emotion and spark curiosity.",
    'about.p2':
      "I specialize in Unity and Unreal Engine development, building experiences for PC, mobile, virtual reality (VR) and augmented reality (AR). I'm driven by how design, code and imagination come together to create meaningful interactions.",
    'about.p3':
      "Beyond the technical, I'm deeply inspired by art, architecture and the human stories behind technology.",
    'about.photoAlt': 'Portrait of Sebastián Escobar',
    'work.label': 'Selected work',
    'work.title': "Things I've built",
    'work.view': 'View project',
    'experience.label': 'Experience',
    'experience.title': 'Path so far',
    'education.label': 'Education',
    'skills.label': 'Skills',
    'skills.engines': 'Engines',
    'skills.languages': 'Languages',
    'skills.tools': 'Tools',
    'skills.xr': 'XR',
    'skills.spoken': 'Spoken',
    'contact.label': 'Contact',
    'contact.title': "Let's build something.",
    'contact.text': 'Have a project, a role or an idea? Get in touch.',
    'contact.cvEs': 'Descargar CV (Español)',
    'contact.cvEn': 'Download CV (English)',
    'footer.rights': 'Made in Medellín',
    'project.year': 'Year',
    'project.platform': 'Platform',
    'project.engine': 'Engine',
    'project.team': 'Team',
    'project.role': 'Role',
    'project.duration': 'Duration',
    'project.trailer': 'Watch trailer',
    'project.gallery': 'Gallery',
    'project.next': 'Next project',
    'project.back': 'All projects',
    'project.model.hint': 'Drag to rotate · scroll to zoom',
    'project.model.hintTouch': 'Drag to rotate',
    'lightbox.close': 'Close',
    'lightbox.prev': 'Previous',
    'lightbox.next': 'Next',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.en[key];
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && value in languages;
}

/** Localized folder name for project pages: /es/proyectos/… and /en/projects/… */
export const projectsSegment: Record<Lang, string> = { es: 'proyectos', en: 'projects' };
