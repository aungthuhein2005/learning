---
title: K-Nearest Neighbors (KNN)
description: A simple, widely used technique for classification and regression that predicts by looking at the K closest labeled points.
category: machine-learning
topic: classification
difficulty: beginner
status: complete
date: 2026-09-16
tags:
  - machine-learning
  - algorithms
  - python
related: []
---

## TL;DR

KNN is a simple and widely used machine learning technique for classification and regression tasks. It
makes predictions by looking at the K closest labeled points to a new data point and going with whatever
the majority of them are.

## Intuition

First you pick a value for K and find the K nearest points to whatever you're trying to classify. For
example, if K = 3, you look at the three nearest neighbors and then go with whichever class is the majority
among them.

Say you're classifying a type of flower and K = 3. If two of the nearest three neighbors are roses and one
is a lily, KNN classifies the result as a rose, because rose is the majority among the nearest three.

To do this, KNN follows three main steps:

1. **Choose the K value.** The right K depends on your data. If the data is noisy, K should be higher;
   otherwise, lower.
2. **Define a distance metric.** The most common choice is Euclidean distance, used to find the nearest
   neighbors.
3. **Find the nearest K points and vote.** Using that distance formula, find the K nearest neighbors and let
   them decide the class by majority.

## Mathematics

The Euclidean distance formula is the same distance formula from high school math for finding the distance
between two points on a graph. For two points in 2D:

$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

As the number of dimensions (features) increases, the formula generalizes to:

$$
d(p, q) = \sqrt{\sum_{i=1}^{n} (q_i - p_i)^2}
$$

— the sum of the squared differences across every dimension, square-rooted.

## Example

A small dataset of apples and oranges, described by weight and skin texture, used to predict the class of
a new point:

| Weight | Texture | Class  |
| ------ | ------- | ------ |
| 135    | 1.2     | Apple  |
| 150    | 1.1     | Apple  |
| 165    | 8.5     | Orange |
| 180    | 7.8     | Orange |

Given a new point like `[150, 1.5]`, KNN finds the K closest rows by Euclidean distance over
`(weight, texture)` and votes on the class among them.

## Implementation

```python
def euclidean_distance(point1, point2):
    x1, y1 = point1
    x2, y2 = point2
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5

def knn_predict(training_data, test_point, k):
    distances = []
    for data_point in training_data:
        distance = euclidean_distance(data_point[:-1], test_point)
        distances.append((distance, data_point[-1]))
    distances.sort(key=lambda x: x[0])
    k_nearest_neighbors = distances[:k]
    predictions = [neighbor[1] for neighbor in k_nearest_neighbors]
    return max(set(predictions), key=predictions.count)

training_data = [  # weight, texture, class
    [135, 1.2, 'Apple'],
    [140, 1.5, 'Apple'],
    [145, 2.0, 'Apple'],
    [150, 1.1, 'Apple'],
    [165, 8.5, 'Orange'],
    [175, 9.0, 'Orange'],
    [180, 7.8, 'Orange'],
    [185, 8.2, 'Orange'],
    [138, 1.3, 'Apple'],
    [142, 1.6, 'Apple'],
    [147, 1.9, 'Apple'],
    [152, 1.4, 'Apple'],
    [155, 2.1, 'Apple'],
    [160, 1.7, 'Apple'],
    [170, 8.7, 'Orange'],
    [172, 9.1, 'Orange'],
    [178, 7.9, 'Orange'],
    [182, 8.4, 'Orange'],
    [188, 8.0, 'Orange'],
    [190, 9.2, 'Orange'],
]

test_point = [150, 1.5]
k = 3

if __name__ == "__main__":
    prediction = knn_predict(training_data, test_point, k)
    print(f"The predicted class for the test point {test_point} is: {prediction}")
```

Output:

```
The predicted class for the test point [150, 1.5] is: Apple
```

## Key takeaways

- KNN is simple and easy to implement, and works well when you don't have a huge amount of data.
- It's a lazy learner — there's no real "training" step, just storing the data and computing distances at
  prediction time. That's exactly why it doesn't scale well: every prediction has to compare against the
  whole training set.
- Choosing K matters — too low and it's sensitive to noise, too high and it starts blurring together classes
  that should be distinct.

## Further reading

- [K-Nearest Neighbors (GeeksforGeeks)](https://www.geeksforgeeks.org/machine-learning/k-nearest-neighbours/)
