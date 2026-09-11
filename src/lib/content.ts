import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublished<C extends 'notes' | 'experiments' | 'articles' | 'projects'>(
  collection: C
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection);
  return entries.filter((entry) => !(entry.data as { draft?: boolean }).draft) as CollectionEntry<C>[];
}

export function byDateDesc<T extends { data: { date: Date } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export interface ActivityItem {
  kind: 'note' | 'experiment' | 'article' | 'project';
  title: string;
  href: string;
  date: Date;
  action: 'Added' | 'Updated';
}

export async function getActivityLog(): Promise<ActivityItem[]> {
  const [notes, experiments, articles, projects] = await Promise.all([
    getPublished('notes'),
    getPublished('experiments'),
    getPublished('articles'),
    getPublished('projects'),
  ]);

  const items: ActivityItem[] = [];

  for (const note of notes) {
    items.push({
      kind: 'note',
      title: note.data.title,
      href: `/learn/${note.data.category}/${note.id.split('/').pop()}`,
      date: note.data.updated ?? note.data.date,
      action: note.data.updated ? 'Updated' : 'Added',
    });
  }
  for (const exp of experiments) {
    items.push({
      kind: 'experiment',
      title: exp.data.title,
      href: `/experiments/${exp.id}`,
      date: exp.data.updated ?? exp.data.date,
      action: exp.data.updated ? 'Updated' : 'Added',
    });
  }
  for (const article of articles) {
    items.push({
      kind: 'article',
      title: article.data.title,
      href: `/articles/${article.id}`,
      date: article.data.updated ?? article.data.date,
      action: article.data.updated ? 'Updated' : 'Added',
    });
  }
  for (const project of projects) {
    items.push({
      kind: 'project',
      title: project.data.title,
      href: `/projects/${project.id}`,
      date: project.data.updated ?? project.data.date,
      action: project.data.updated ? 'Updated' : 'Added',
    });
  }

  return items.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export function groupActivityByMonth(items: ActivityItem[]): Map<string, ActivityItem[]> {
  const groups = new Map<string, ActivityItem[]>();
  for (const item of items) {
    const key = formatMonthYear(item.date);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return groups;
}

/** Resolve a note's `related` slugs (bare note ids) to their entries, ignoring misses. */
export async function getRelatedNotes(slugs: string[]): Promise<CollectionEntry<'notes'>[]> {
  if (slugs.length === 0) return [];
  const all = await getPublished('notes');
  const bySlug = new Map(all.map((n) => [n.id.split('/').pop()!, n]));
  return slugs.map((s) => bySlug.get(s)).filter((n): n is CollectionEntry<'notes'> => Boolean(n));
}

export function noteHref(note: CollectionEntry<'notes'>): string {
  return `/learn/${note.data.category}/${note.id.split('/').pop()}`;
}
