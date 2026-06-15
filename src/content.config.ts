import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Promos / recurring events. Markdown body is optional long copy.
// `active` gates public render; `verified` flags owner-confirmed accuracy.
const promos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/promos' }),
  schema: z.object({
    title: z.string(),
    schedule: z.string(), // human-readable cadence, e.g. "Every Saturday"
    summary: z.string(),
    badge: z
      .enum([
        'made-fresh',
        'farm-to-table',
        'good-people',
        'seasonal',
        'honest',
        'support-local',
      ])
      .optional(),
    active: z.boolean().default(false),
    verified: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { promos };
