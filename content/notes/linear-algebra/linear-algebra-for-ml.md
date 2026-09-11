---
title: Linear Algebra for Machine Learning
description: The minimum linear algebra you actually need before ML starts making sense — vectors, matrices, dot products, and why "everything is a matrix multiplication."
category: linear-algebra
topic: vectors-and-matrices
difficulty: beginner
status: complete
date: 2026-07-20
updated: 2026-07-22
tags:
  - linear-algebra
  - mathematics
  - machine-learning
related:
  - gradient-descent
---

## TL;DR

Machine learning represents data as vectors and models as matrices. Almost every operation you'll meet —
a linear layer, an embedding lookup, an attention score — is some combination of dot products and matrix
multiplication.

## Why does it matter?

You can follow a lot of ML tutorials by pattern-matching code, but the moment you try to read a paper, debug
a shape mismatch, or implement something from scratch, you need to know what a matrix multiplication is
actually doing to the data. This note is the small set of ideas that unlocks most of it.

## Intuition

A vector is just a list of numbers — a point, or a direction, in space. A matrix is a transformation: something
that takes a vector in and produces a (possibly different-sized) vector out. "Multiplying by a matrix" means
"apply this transformation." A neural network layer is, at its core, one such transformation followed by a
nonlinearity.

The dot product of two vectors measures how much they point in the same direction — it's large and positive
when they're aligned, zero when they're perpendicular, and negative when they point opposite ways. This one
idea underlies cosine similarity, attention scores, and the forward pass of a linear layer.

## Mathematics

For vectors $\mathbf{a}, \mathbf{b} \in \mathbb{R}^n$, the dot product is:

$$
\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i
$$

A linear layer with weight matrix $W \in \mathbb{R}^{m \times n}$, bias $\mathbf{b} \in \mathbb{R}^m$, and
input $\mathbf{x} \in \mathbb{R}^n$ computes:

$$
\mathbf{y} = W\mathbf{x} + \mathbf{b}
$$

Each output element $y_i$ is a dot product between row $i$ of $W$ and the input vector, plus a bias term —
so a "layer" is just $m$ dot products computed at once.

## Example

```python
import numpy as np

x = np.array([1.0, 2.0, 3.0])          # input vector, shape (3,)
W = np.array([[0.2, 0.1, -0.3],        # weight matrix, shape (2, 3)
              [0.5, 0.0,  0.4]])
b = np.array([0.1, -0.2])              # bias, shape (2,)

y = W @ x + b
print(y)  # shape (2,) — two dot products plus bias
```

## Implementation

Writing a dot product and a matrix multiply by hand, without NumPy, makes the "sum of products" nature of
both operations concrete:

```python
def dot(a: list[float], b: list[float]) -> float:
    return sum(ai * bi for ai, bi in zip(a, b))

def matvec(W: list[list[float]], x: list[float]) -> list[float]:
    return [dot(row, x) for row in W]
```

`matvec` is exactly `y_i = dot(W[i], x)` for every row — a matrix-vector product is just one dot product per
output element.

## What I misunderstood

I used to think of matrix multiplication as a memorized mechanical rule ("row times column, sum it up") with
no real meaning. It clicked once I connected it to dot products specifically: each output value is a
measurement of how aligned the input is with a particular row of the matrix. In a trained neural network,
each row of a weight matrix is effectively a pattern the network is checking the input against.

## Key takeaways

- A vector is data; a matrix is a transformation (or a batch of dot products, depending on how you look at it).
- Dot products measure alignment — this same idea shows up in cosine similarity, attention, and every linear
  layer's forward pass.
- Shape mismatches in ML code are almost always linear algebra bugs: check the dimensions of what you're
  multiplying before checking anything else.

## Further reading

- [3Blue1Brown — Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra)
