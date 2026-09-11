// Single source of truth for the /learn information architecture.
// Areas group categories for navigation; note URLs use the category
// slug directly (/learn/<category>/<note>), not the area slug.

export type AreaSlug =
  | 'computer-science'
  | 'ai-machine-learning'
  | 'mathematics'
  | 'data-engineering';

export interface CategoryDef {
  slug: string;
  label: string;
}

export interface AreaDef {
  slug: AreaSlug;
  label: string;
  description: string;
  categories: CategoryDef[];
}

export const AREAS: AreaDef[] = [
  {
    slug: 'computer-science',
    label: 'Computer Science',
    description: 'Data structures, algorithms, systems, and the engineering fundamentals.',
    categories: [
      { slug: 'dsa', label: 'Data Structures & Algorithms' },
      { slug: 'databases', label: 'Databases' },
      { slug: 'computer-networks', label: 'Computer Networks' },
      { slug: 'operating-systems', label: 'Operating Systems' },
      { slug: 'software-engineering', label: 'Software Engineering' },
    ],
  },
  {
    slug: 'ai-machine-learning',
    label: 'AI & Machine Learning',
    description: 'Machine learning, deep learning, NLP, and large language models.',
    categories: [
      { slug: 'machine-learning', label: 'Machine Learning' },
      { slug: 'deep-learning', label: 'Deep Learning' },
      { slug: 'nlp', label: 'Natural Language Processing' },
      { slug: 'llm', label: 'Large Language Models' },
      { slug: 'mlops', label: 'MLOps' },
    ],
  },
  {
    slug: 'mathematics',
    label: 'Mathematics',
    description: 'The math that underpins machine learning and computer science.',
    categories: [
      { slug: 'linear-algebra', label: 'Linear Algebra' },
      { slug: 'calculus', label: 'Calculus' },
      { slug: 'probability', label: 'Probability' },
      { slug: 'statistics', label: 'Statistics' },
    ],
  },
  {
    slug: 'data-engineering',
    label: 'Data Engineering',
    description: 'Big data systems, distributed processing, and data pipelines.',
    categories: [
      { slug: 'big-data', label: 'Big Data' },
      { slug: 'hadoop', label: 'Hadoop' },
      { slug: 'spark', label: 'Apache Spark' },
      { slug: 'distributed-systems', label: 'Distributed Systems' },
      { slug: 'data-pipelines', label: 'Data Pipelines' },
    ],
  },
];

export const CATEGORIES: CategoryDef[] = AREAS.flatMap((area) => area.categories);

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

export function getCategory(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAreaForCategory(categorySlug: string): AreaDef | undefined {
  return AREAS.find((area) => area.categories.some((c) => c.slug === categorySlug));
}

export function getArea(slug: string): AreaDef | undefined {
  return AREAS.find((a) => a.slug === slug);
}

// Controlled tag vocabulary. Add new tags here rather than inventing
// ad hoc variants (e.g. always `machine-learning`, never `ML`).
export const TAG_SLUGS = [
  'algorithms',
  'dsa',
  'database',
  'computer-networks',
  'operating-systems',
  'software-engineering',
  'machine-learning',
  'deep-learning',
  'nlp',
  'llm',
  'mlops',
  'transformers',
  'tokenization',
  'sequence-labeling',
  'low-resource-nlp',
  'burmese-nlp',
  'linear-algebra',
  'calculus',
  'probability',
  'statistics',
  'optimization',
  'big-data',
  'hadoop',
  'spark',
  'distributed-systems',
  'data-pipelines',
  'mapreduce',
  'python',
  'mathematics',
  'research',
] as [string, ...string[]];

export const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;
export const STATUSES = ['seedling', 'draft', 'in-progress', 'complete'] as const;
