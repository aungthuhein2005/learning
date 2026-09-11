import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

/**
 * Content authors write root-relative links like `/learn/dsa/binary-search`
 * without knowing the deployed base path. This rewrites `href`/`src` on
 * built HTML so Markdown/MDX content stays portable across base paths
 * (GitHub Pages project subpath vs. a custom domain at `/`).
 */
export function rehypeBaseLinks(base: string) {
  const prefix = base.replace(/\/$/, '');

  return function transformer(tree: Root) {
    if (!prefix) return;

    visit(tree, 'element', (node: Element) => {
      for (const attr of ['href', 'src'] as const) {
        const value = node.properties?.[attr];
        if (
          typeof value === 'string' &&
          value.startsWith('/') &&
          !value.startsWith('//') &&
          !value.startsWith(prefix + '/') &&
          value !== prefix
        ) {
          node.properties![attr] = prefix + value;
        }
      }
    });
  };
}
