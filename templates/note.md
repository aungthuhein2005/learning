<!--
Template for a new note. Copy this file to:
  content/notes/<category>/<slug>.md

<category> must be one of the slugs below (see src/lib/taxonomy.ts):
  dsa, databases, computer-networks, operating-systems, software-engineering,
  machine-learning, deep-learning, nlp, llm, mlops,
  linear-algebra, calculus, probability, statistics,
  big-data, hadoop, spark, distributed-systems, data-pipelines

Delete this comment block and any body sections you don't need before publishing.
-->
---
title: Note Title
description: One sentence — shown in cards, search results, and SEO/OG meta.
category: dsa # must match one of the slugs listed above
topic: short-topic-slug # freeform, e.g. "searching", "optimization"
difficulty: beginner # beginner | intermediate | advanced
status: draft # seedling | draft | in-progress | complete
date: 2026-01-01 # YYYY-MM-DD, when first published
# updated: 2026-01-05 # optional — add only once you actually revise it
tags:
  - dsa # must come from TAG_SLUGS in src/lib/taxonomy.ts — add new
  - algorithms # canonical tags there rather than inventing near-duplicates
# related:
#   - some-other-note-slug # optional — bare note slug, no category prefix
#   - another-note-slug # renders an automatic "Related notes" list; don't
#                        # write a manual "## Related notes" heading below
---

## TL;DR

One or two sentences — the takeaway if someone reads nothing else.

## Why does it matter?

The context: what this connects to, why it's worth knowing, where it shows up in practice.

## Intuition

The plain-language mental model, before any formalism.

## Mathematics

The formal definition/derivation, if there is one. Use `$inline math$` and:

$$
\text{display math like this}
$$

## Example

A small, concrete worked example.

## Implementation

```python
# A minimal, runnable code example.
```

## What I misunderstood

Honest, first-person: what you initially got wrong and what corrected it. This is
what makes the site a learning journal instead of a textbook — keep it genuine,
skip it if there's nothing real to say yet.

## Key takeaways

- The two or three things worth remembering.
- Written as statements, not questions.

## Further reading

- [Link title](https://example.com) — why it's worth reading.
