---
title: Burmese POS Tagging
description: Fine-tuning XLM-R for part-of-speech tagging on Burmese, a low-resource language with almost no labeled tagging data.
status: complete
date: 2026-05-18
updated: 2026-05-25
tags:
  - nlp
  - sequence-labeling
  - low-resource-nlp
  - burmese-nlp
relatedProject: burmesenlp
relatedNotes: []
---

## Question

Can a multilingual pretrained model (XLM-R) be fine-tuned for accurate part-of-speech tagging on Burmese,
given only a few thousand labeled sentences?

## Dataset

- A manually reviewed subset of Burmese sentences with word-level POS tags, following a UD-style
  (Universal Dependencies) tagset adapted for Burmese morphology.
- ~4,800 labeled sentences total — small by NLP standards, and typical for a low-resource language.
- Split 80/10/10 into train/dev/test, stratified so rare tags weren't concentrated entirely in one split.

## Method

- Base model: `xlm-roberta-base`, fine-tuned with a token classification head.
- Burmese text is not whitespace-segmented the way English is, so tokenization boundaries matter more than
  usual — I aligned word-level labels to XLM-R's SentencePiece subword tokens by labeling only the first
  subword of each word and masking the rest during loss computation.
- Standard fine-tuning setup: AdamW, learning rate `2e-5`, linear warmup, 10 epochs, batch size 16.
- Evaluated with token-level accuracy and macro-F1 (macro-F1 matters more here because tag frequency is very
  imbalanced — punctuation and common nouns dominate the raw count).

## Experiment

Three configurations were compared:

1. XLM-R fine-tuned directly on the 4,800 labeled sentences.
2. XLM-R first fine-tuned on a larger, noisier auto-tagged corpus (pseudo-labels from a simpler rule-based
   tagger), then fine-tuned again on the clean labeled set.
3. A from-scratch BiLSTM-CRF baseline trained only on the labeled set, for comparison against a model with no
   multilingual pretraining.

## Results

| Configuration                          | Token accuracy | Macro-F1 |
| --------------------------------------- | --------------- | -------- |
| BiLSTM-CRF (no pretraining)              | 84.1%            | 0.61     |
| XLM-R, direct fine-tuning                | 91.7%            | 0.78     |
| XLM-R, pseudo-label pretraining first    | 92.4%            | 0.80     |

XLM-R substantially outperformed the from-scratch baseline, confirming that multilingual pretraining
transfers useful structure even for a language with very little representation in XLM-R's pretraining data.
The pseudo-labeling step gave a small additional gain, but it was much smaller than expected.

## What failed

- An earlier attempt used **all** subword tokens for loss (not just the first subword per word), which
  inflated accuracy on frequent short tags but produced systematically wrong tags on multi-syllable words —
  the model learned to just repeat the previous subword's tag.
- A larger learning rate (`5e-5`) caused training loss to spike and never recover on two of five runs,
  which is a common enough failure mode with tiny fine-tuning datasets that I now default to a much lower
  rate and just accept slower convergence.
- Pseudo-labeling on the noisiest 20% of the auto-tagged corpus actively *hurt* macro-F1 on rare tags,
  presumably because the rule-based tagger's systematic errors got reinforced rather than smoothed out.

## What I learned

The subword-alignment detail — which tokens actually receive gradient signal — mattered more than any
hyperparameter I tuned. It's the kind of bug that doesn't crash anything and still produces a plausible-looking
number, which made it slow to catch. I also came away much more skeptical of "just add more (noisy) data" as
a default fix for low-resource NLP; the quality of the pseudo-labels mattered more than their quantity.

## Conclusion

Multilingual pretrained models like XLM-R are a strong starting point for Burmese POS tagging even with a
small labeled dataset, but subword-to-word label alignment needs to be handled carefully, and naively adding
pseudo-labeled data is not a free win — it can hurt exactly the rare tags you most need help with.
