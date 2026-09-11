---
title: Binary Search
description: A simple explanation of binary search, its O(log n) complexity, implementation, and the off-by-one mistakes that actually trip people up.
category: dsa
topic: searching
difficulty: beginner
status: complete
date: 2026-08-02
updated: 2026-08-04
tags:
  - dsa
  - algorithms
related: []
---

## TL;DR

Binary search finds a target in a **sorted** array by repeatedly cutting the search space in half. It runs in
`O(log n)` time instead of the `O(n)` a linear scan would take.

## Why does it matter?

Binary search is the first algorithm most people meet that isn't just "look at everything." It's the basic
pattern behind a huge amount of software: database indexes, `bisect` in Python's standard library, version
control bisection (`git bisect`), and any time you're searching over a space where you can cheaply answer
"is the target to the left or the right of here?"

## Intuition

Think of a phone book (or, more realistically, scrolling through a sorted spreadsheet column). You don't
start at row 1. You jump to the middle, check whether your target is before or after it, then repeat on
the half that matters. Every check eliminates half of what's left.

## Mathematics

If there are `n` elements, after one comparison at most `n / 2` remain, after two comparisons at most `n / 4`
remain, and so on. The number of comparisons needed to get down to 1 element is:

$$
\log_2(n)
$$

That's why binary search is described as `O(log n)` — the number of steps grows logarithmically with the
input size. Doubling the array size adds only one extra comparison.

## Example

Searching for `23` in `[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]`:

| Step | low | high | mid | value at mid | decision       |
| ---- | --- | ---- | --- | ------------- | -------------- |
| 1    | 0   | 9    | 4   | 16            | 23 > 16, go right |
| 2    | 5   | 9    | 7   | 56            | 23 < 56, go left  |
| 3    | 5   | 6    | 5   | 23            | found          |

## Implementation

```python
def binary_search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1  # not found
```

The two details that actually matter:

- The loop condition is `low <= high`, not `low < high` — otherwise you miss the case where the search
  space has exactly one element left.
- `mid = (low + high) // 2` can overflow in languages with fixed-width integers (not really a concern in
  Python, but it is in Java/C++). The safe version is `low + (high - low) // 2`.

## What I misunderstood

I originally wrote `high = mid` instead of `high = mid - 1` when the target was smaller. That works fine
most of the time, but on certain inputs it causes an infinite loop, because `mid` can stay pinned to the same
index forever when `low` and `high` are adjacent. The fix is to always shrink the search space by excluding
`mid` once you've ruled it out — `low = mid + 1` or `high = mid - 1`, never leave `mid` in bounds after you've
checked it.

## Key takeaways

- Binary search requires the input to be sorted. It's `O(log n)` only because sortedness lets you discard
  half the space on every step.
- The failure mode isn't "wrong answer," it's usually an infinite loop or an off-by-one — test the two- and
  three-element cases explicitly.
- The same idea generalizes to "binary search on the answer": if a yes/no condition is monotonic over a
  range, you can binary search for the boundary even when you're not searching an array at all.

## Further reading

- [`bisect` — Array bisection algorithm](https://docs.python.org/3/library/bisect.html) (Python docs)
