# Learning Lab

**Learning Computer Science in public.**

A public knowledge base documenting Aung Thu Hein's learning journey through Computer Science, AI/ML,
Mathematics, and Data Engineering — notes while learning, experiments actually run, and longer articles
once an idea is worth writing up properly.

This is not a blog and not a traditional portfolio. It's organized by topic, not by date. See
[`/about`](https://aungthuhein2005.github.io/learning/about) and [`/now`](https://aungthuhein2005.github.io/learning/now)
once deployed.

## Stack

- **[Astro](https://astro.build)** (static output) with the Content Layer API
- **MDX** for content that needs custom components; plain Markdown everywhere else
- **TypeScript** (strict)
- **Tailwind CSS v4** for styling
- **KaTeX** (via `remark-math` / `rehype-katex`) for math rendering
- **Shiki** (Astro's built-in, dual light/dark themes) for code highlighting
- **[Pagefind](https://pagefind.app)** for static, client-side search (no server, no database)

Content lives in `content/` at the repo root, completely separate from `src/` (presentation). You can
redesign the site later without touching a single note.

## Repository structure

```
learning/
├── content/                 # ← the actual knowledge base (source of truth)
│   ├── notes/<category>/    #   e.g. content/notes/dsa/binary-search.md
│   ├── experiments/
│   ├── articles/
│   ├── projects/
│   ├── resources/
│   └── questions/           #   "Open Questions"
├── src/
│   ├── content.config.ts    # zod schemas + collection loaders
│   ├── lib/                 # taxonomy, content helpers, URL helper
│   ├── layouts/             # BaseLayout, NoteLayout (3-col), DocLayout
│   ├── components/          # Header, Sidebar, TableOfContents, Tag, etc.
│   └── pages/                # routes (see "URL structure" below)
├── public/                  # favicon, robots.txt
├── astro.config.ts
└── .github/workflows/deploy.yml
```

## URL structure

Notes are addressed by category, not by the broader "area" grouping used only for navigation:

```
/learn                              — overview of the 4 areas
/learn/<area>                       — e.g. /learn/ai-machine-learning (nav grouping)
/learn/<category>                   — e.g. /learn/machine-learning (notes live here)
/learn/<category>/<note-slug>       — e.g. /learn/machine-learning/gradient-descent
/experiments/<slug>
/articles/<slug>
/projects/<slug>
/resources
/tags, /tags/<tag>
/open-questions
/activity                           — timeline generated from content dates
/now, /about, /search
```

The area → category taxonomy (which categories belong to which of the four learning areas) is defined
once, in [`src/lib/taxonomy.ts`](src/lib/taxonomy.ts).

## Adding content

All content is Markdown/MDX with frontmatter validated by `src/content.config.ts`. Adding a file to the
right `content/` folder is enough — pages are generated automatically at build time.

### Add a note

Create a file under `content/notes/<category>/<slug>.md`, where `<category>` is one of the category slugs
in `src/lib/taxonomy.ts` (`dsa`, `machine-learning`, `linear-algebra`, `big-data`, etc.):

```md
---
title: Binary Search
description: A one-sentence description used in cards, SEO, and RSS-style listings.
category: dsa
topic: searching
difficulty: beginner # beginner | intermediate | advanced
status: complete # seedling | draft | in-progress | complete
date: 2026-09-11
updated: 2026-09-11 # optional — omit until you actually revise it
tags:
  - dsa
  - algorithms
related:
  - some-other-note-slug # bare slug, no category prefix
---

## TL;DR

...
```

Only `title`, `description`, `category`, `topic`, `difficulty`, `status`, and `date` are required. The
body's section headings (TL;DR, Why does it matter?, Intuition, Mathematics, Example, Implementation,
What I misunderstood, Key takeaways, Further reading) are a template, not a requirement — skip whatever
doesn't apply. **Don't add a manual "Related notes" heading** — that's rendered automatically from the
`related` frontmatter field.

Tags must come from the controlled vocabulary in `TAG_SLUGS` in `src/lib/taxonomy.ts` — add new canonical
tags there rather than inventing near-duplicates (`machine-learning`, not `ML` or `machinelearning`).

### Add an article

Create `content/articles/<slug>.md`:

```md
---
title: What I Learned Building a Burmese NLP Toolkit
description: One sentence.
date: 2026-09-11
tags: [nlp, low-resource-nlp]
relatedNotes: [] # optional bare note slugs
---

Articles are more personal/narrative than notes — no fixed section structure required.
```

### Add an experiment

Create `content/experiments/<slug>.md` with `status`, `date`, `tags`, and optionally `relatedNotes` /
`relatedProject`. The suggested body structure is: Question, Dataset, Method, Experiment, Results, What
failed, What I learned, Conclusion.

### Add a project

Create `content/projects/<slug>.md` with `title`, `description`, `tech`, `status`
(`active`/`maintained`/`archived`), `github`, optional `live`, `date`, and `featured` (shows it on the
homepage). Write "What I built / What I learned / Technical challenges / Experiments / Lessons," not a
copy of the project's README — and link to relevant `/learn` notes where it makes sense.

### Add a resource or an open question

`content/resources/<slug>.md` (`type`, `link`, `why`) and `content/questions/<slug>.md`
(`question`, `status: open|researching|answered`) follow the same pattern — see existing files for
examples.

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`. Note: search (Pagefind) only works after a production build — the
`/search` page shows a friendly message in dev mode instead of erroring.

```bash
npm run build     # production build to ./dist (also runs Pagefind via the postbuild hook)
npm run preview   # serve the production build locally, at the configured base path
npm run check     # TypeScript + template diagnostics (astro check)
```

## Deploying to GitHub Pages

1. Push this repository to GitHub as [`aungthuhein2005/learning`](https://github.com/aungthuhein2005/learning)
   (already reflected in `astro.config.ts` and `public/robots.txt` — update those two files if you ever
   rename the repo or account).
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. Update [`astro.config.ts`](astro.config.ts):
   - `site` → `https://<your-username>.github.io`
   - `base` → `/<your-repo-name>` (or `'/'` if deploying to a custom domain or a `<username>.github.io`
     user/org site, where there's no subpath)
4. Update `public/robots.txt`'s `Sitemap:` line and the footer/about links in
   [`src/components/Footer.astro`](src/components/Footer.astro) and
   [`src/pages/about.astro`](src/pages/about.astro) to match your real GitHub/LinkedIn/Medium URLs.
5. Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys
   automatically.

**Note on `base`:** because GitHub Pages project sites are served from a subpath, every internal link
needs that subpath prefix. Component-authored links use the `withBase()` helper
([`src/lib/url.ts`](src/lib/url.ts)); links written by hand inside Markdown/MDX content are rewritten
automatically at build time by a small rehype plugin
([`src/lib/rehype-base-links.ts`](src/lib/rehype-base-links.ts)) — so just write normal root-relative
links like `/learn/dsa/binary-search` in your notes and they'll resolve correctly regardless of `base`.

## License

- **Code** (`src/`, config, tooling): [MIT](LICENSE)
- **Written content** (`content/`): [CC BY 4.0](LICENSE-CONTENT.md)

Don't commit copyrighted lecture slides, textbook excerpts, or unlicensed images.

## What's next (V2 ideas)

See the end of the project write-up for a longer list, but roughly: an RSS feed, generated OG images per
page, a proper learning-path/roadmap view (the content architecture already supports this — see
`src/lib/taxonomy.ts`), giscus-based comments on articles only, and reading-time/word-count based on the
compiled `Content` output rather than the raw Markdown source.
