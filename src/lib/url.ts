// Astro does not rewrite literal href strings for the configured `base`,
// so any internal link built by hand must go through this helper.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
