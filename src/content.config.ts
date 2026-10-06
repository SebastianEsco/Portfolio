import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    platform: z.string(),
    engine: z.string(),
    role: z.string(),
    duration: z.string().optional(),
    teamSize: z.string().optional(),
    featured: z.boolean().default(false),
    coverImage: z.string(),
    previewVideo: z.string().optional(),
    youtubeId: z.string().optional(),
    themeColor: z.string().optional(),
    award: z.string().optional(),
    galleryImages: z.array(z.string()).optional(),
    model3d: z.object({
      path: z.string(),
      caption: z.string().optional(),
    }).optional(),
  })
});

export const collections = {
  'projects': projectsCollection,
};
