---
title: BurmeseNLP
description: An open-source toolkit for Burmese natural language processing — word segmentation, POS tagging, and the infrastructure a low-resource language needs before modeling can even start.
tech:
  - Python
  - PyTorch
  - Hugging Face Transformers
  - XLM-R
status: active
github: https://github.com/aungthuhein2005/BurmeseNLP
date: 2026-04-01
updated: 2026-05-30
tags:
  - nlp
  - low-resource-nlp
  - burmese-nlp
relatedNotes: []
featured: true
draft: false
---

## What I built

BurmeseNLP is an open-source toolkit that packages the basic NLP building blocks Burmese doesn't otherwise
have readily available: a word segmenter, a fine-tuned part-of-speech tagger, and utilities for handling
Burmese script correctly (normalization, syllable breaking, and the quirks of encoding Burmese text that
trip up tools built assuming whitespace-separated words).

## What I learned

The write-up in [What I Learned Building a Burmese NLP Toolkit](/articles/what-i-learned-building-burmesenlp)
goes into this in more depth, but the short version: most of the effort wasn't modeling, it was building the
data and tokenization infrastructure that languages like English get for free from the ecosystem around them.

## Technical challenges

- **Word segmentation without whitespace.** Burmese text has no spaces between words, so segmentation itself
  had to be solved before POS tagging could be meaningfully evaluated.
- **Subword tokenization coverage.** Pretrained multilingual tokenizers fragment Burmese script into smaller
  pieces than they do for higher-resource languages, which affects sequence length and possibly model quality
  — see [Open Questions](/open-questions) for what I still don't have a good answer for here.
- **Inconsistent labeled data.** Existing labeled datasets use different tagging conventions, which made
  combining them a linguistic decision, not just an engineering one.

## Experiments

The [Burmese POS Tagging experiment](/experiments/burmese-pos-tagging) documents fine-tuning XLM-R for POS
tagging on a small labeled dataset, comparing it against a from-scratch BiLSTM-CRF baseline and testing
whether pseudo-labeling on a larger noisy corpus helps.

## Lessons

Multilingual pretrained models are a strong default starting point for low-resource languages, even ones with
minimal representation in the pretraining data. But the details of *how* you connect labels to subword
tokens, and how much you trust noisy pseudo-labels, matter more than most hyperparameter choices.
