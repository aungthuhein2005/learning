---
title: What I Learned Building a Burmese NLP Toolkit
description: Notes from building BurmeseNLP — an open-source toolkit for a language with almost no NLP infrastructure, and what that actually requires.
date: 2026-05-30
updated: 2026-05-30
tags:
  - nlp
  - low-resource-nlp
  - burmese-nlp
relatedNotes: []
---

When I started BurmeseNLP, I assumed the hard part would be the modeling — fine-tuning a transformer, tuning
hyperparameters, the usual machine learning work. It turned out that was maybe a third of the actual effort.
The rest was infrastructure that simply doesn't exist yet for Burmese, and that most NLP tutorials never
mention because for English, Spanish, or Chinese, it's already been built by someone else, years ago, and
you just `pip install` it.

## Tokenization is not a solved problem here

Burmese is written without spaces between words. There's no `.split()` shortcut. Word segmentation itself is
a research problem, and the segmentation you choose affects every downstream task — POS tagging, NER,
translation. I ended up needing a working, even if imperfect, word segmenter before any of the "real" NLP
work could start, which was not what I expected to be spending the first month on.

Subword tokenizers (like the SentencePiece tokenizer inside XLM-R) sidestep explicit word segmentation, but
they bring their own problem: vocabulary coverage. A subword vocabulary trained mostly on high-resource
languages tends to fragment Burmese script into unusually small pieces, which makes sequences longer and
arguably harder for the model to learn from. I don't yet have a satisfying answer for how much this actually
hurts downstream accuracy — it's on my [open questions](/open-questions) list.

## There is very little labeled data, and what exists is inconsistent

For POS tagging specifically (see the [Burmese POS Tagging experiment](/experiments/burmese-pos-tagging)),
the labeled datasets that do exist use different tagsets, different segmentation conventions, and different
annotation guidelines. Combining them isn't just a matter of concatenating files — it's a matter of deciding
whose linguistic assumptions to trust, which is a much less comfortable decision than it sounds.

## Multilingual pretrained models help more than I expected

Given how little Burmese data goes into XLM-R's pretraining corpus, I expected fine-tuning it to barely beat
a from-scratch baseline. It didn't — it beat a from-scratch BiLSTM-CRF by a wide margin. That was genuinely
surprising, and it updated how much I trust "just fine-tune a big multilingual model" as a first move for a
low-resource language, even one that's poorly represented in pretraining.

## What actually made this worth doing

None of this is groundbreaking research — segmentation, tagging, and fine-tuning are all well-studied
problems for high-resource languages. But almost none of that tooling exists, packaged and usable, for
Burmese. The value of BurmeseNLP isn't novelty; it's that someone building an NLP application for Burmese
today has noticeably less to build from scratch than they did before. That's a low bar in absolute terms and
still felt like the right thing to spend time on.

If you're working on NLP for a language that doesn't have Wikipedia-scale resources, my honest advice is:
budget real time for data and tokenization infrastructure before you budget time for modeling. The modeling
part is, relatively speaking, the easy part.
