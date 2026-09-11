---
title: Gradient Descent
description: A simple explanation of gradient descent — how it uses derivatives to minimize a loss function, and why it doesn't directly "search" for the minimum.
category: machine-learning
topic: optimization
difficulty: intermediate
status: complete
date: 2026-09-10
updated: 2026-09-11
tags:
  - machine-learning
  - optimization
  - mathematics
related:
  - linear-algebra-for-ml
---

## TL;DR

Gradient descent minimizes a function by repeatedly taking small steps in the direction that decreases it
fastest — the negative gradient. In machine learning, that function is almost always a loss function, and
the thing being adjusted is the model's parameters.

## Why does it matter?

Almost every model you train — linear regression, logistic regression, neural networks — is fit by defining
a loss function and then minimizing it. Gradient descent (and its variants: SGD, momentum, Adam) is the
workhorse that does the minimizing. If you don't understand what it's actually doing, "the model isn't
converging" is very hard to debug.

## Intuition

Imagine standing on a hillside in thick fog, trying to get to the lowest point of a valley. You can't see the
whole landscape, but you can feel which direction is downhill from where you're standing. So you take a
step downhill, feel again, and repeat. Gradient descent does exactly this: it can't see the whole loss
surface, but it can compute the local slope (the gradient) and step against it.

## Mathematics

For a loss function $L(\theta)$ over parameters $\theta$, the update rule is:

$$
\theta_{t+1} = \theta_t - \eta \nabla L(\theta_t)
$$

where $\nabla L(\theta_t)$ is the gradient (vector of partial derivatives) of the loss with respect to the
parameters, and $\eta$ is the **learning rate** — how big a step to take.

For a single-variable example, if $L(\theta) = (\theta - 3)^2$, then $\nabla L(\theta) = 2(\theta - 3)$.
Starting at $\theta_0 = 0$ with $\eta = 0.1$:

$$
\theta_1 = 0 - 0.1 \cdot (2 \cdot (0 - 3)) = 0.6
$$

Each step moves $\theta$ closer to 3, the minimum, and the step size naturally shrinks as the gradient
shrinks near the minimum.

## Example

```python
import numpy as np

def loss(theta):
    return (theta - 3) ** 2

def grad(theta):
    return 2 * (theta - 3)

theta = 0.0
lr = 0.1

for step in range(20):
    theta -= lr * grad(theta)

print(theta)  # converges toward 3.0
```

## Implementation

The same idea applied to linear regression, minimizing mean squared error over a dataset:

```python
import numpy as np

def fit_linear_regression(X, y, lr=0.01, epochs=500):
    n, d = X.shape
    w = np.zeros(d)
    b = 0.0

    for _ in range(epochs):
        y_pred = X @ w + b
        error = y_pred - y

        grad_w = (2 / n) * X.T @ error
        grad_b = (2 / n) * np.sum(error)

        w -= lr * grad_w
        b -= lr * grad_b

    return w, b
```

Here the "loss surface" is the mean squared error as a function of the weights `w` and bias `b`, and
`grad_w` / `grad_b` are the partial derivatives of that loss with respect to each parameter.

## What I misunderstood

I initially thought gradient descent directly searches for the minimum — as if it somehow "knows" where the
lowest point is and moves toward it. After implementing it by hand, I realized it has no idea where the
minimum is. It only knows the local slope at its current position. That's why the learning rate matters so
much: too large, and it overshoots and can diverge; too small, and it crawls toward the minimum so slowly
it looks like it isn't learning at all. It's a local, greedy process, not a global search.

## Key takeaways

- Gradient descent moves against the gradient, not "toward the minimum" — it has no global view of the loss
  surface.
- The learning rate is the single most important hyperparameter to get roughly right before tuning anything
  else.
- For convex loss functions (like linear regression's MSE), gradient descent is guaranteed to converge to the
  global minimum with a small enough learning rate. For non-convex losses (most neural networks), it only
  guarantees a local minimum or saddle point.

## Further reading

- [Stanford CS229 Lecture Notes — Linear Regression](https://cs229.stanford.edu/)
