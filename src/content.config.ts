import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_SLUGS, TAG_SLUGS, DIFFICULTIES, STATUSES } from './lib/taxonomy';

const categoryEnum = z.enum(CATEGORY_SLUGS);
const tagEnum = z.enum(TAG_SLUGS);

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: new URL('../content/notes', import.meta.url) }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: categoryEnum,
    topic: z.string(),
    difficulty: z.enum(DIFFICULTIES),
    status: z.enum(STATUSES),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(tagEnum).default([]),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: new URL('../content/experiments', import.meta.url) }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(STATUSES),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(tagEnum).default([]),
    relatedNotes: z.array(z.string()).default([]),
    relatedProject: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: new URL('../content/articles', import.meta.url) }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(tagEnum).default([]),
    relatedNotes: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: new URL('../content/projects', import.meta.url) }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    status: z.enum(['active', 'maintained', 'archived']),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(tagEnum).default([]),
    relatedNotes: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: new URL('../content/resources', import.meta.url) }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['book', 'course', 'documentation', 'paper', 'tool', 'dataset']),
    description: z.string(),
    link: z.string().url(),
    why: z.string(),
    tags: z.array(tagEnum).default([]),
  }),
});

const questions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: new URL('../content/questions', import.meta.url) }),
  schema: z.object({
    question: z.string(),
    status: z.enum(['open', 'researching', 'answered']),
    date: z.coerce.date(),
    relatedNotes: z.array(z.string()).default([]),
    tags: z.array(tagEnum).default([]),
  }),
});

export const collections = { notes, experiments, articles, projects, resources, questions };
