---
title: Test Post - with hyphen
author: Me
description: A test description
year: 2020
month: 9
day: 13
keywords:
  - math
  - science
  - tech
---

Some content with inline math: $x^2$

Some headers:

# H1
## H2
### H3
#### H4
##### H5
###### H6

Some display math[^footnote]:

[^footnote]: this is my footnote

$$
\begin{aligned} \JJ(1) = \ee_{0123}&,\quad \JJ(\ee_{0123}) = 1 \ \JJ(\ee_0) = \ee_{123}&,\quad \JJ(\ee_{123}) = \ee_0 \ \JJ(\ee_1) = \ee_{032}&,\quad \JJ(\ee_{032}) = \ee_1 \ \JJ(\ee_2) = \ee_{013}&,\quad \JJ(\ee_{013}) = \ee_2 \ \JJ(\ee_3) = \ee_{021}&,\quad \JJ(\ee_{021}) = \ee_3 \ \JJ(\ee_{01}) = \ee_{23}&,\quad \JJ(\ee_{23}) = \ee_{01} \ \JJ(\ee_{02}) = \ee_{31}&,\quad \JJ(\ee_{31}) = \ee_{02} \ \JJ(\ee_{03}) = \ee_{12}&,\quad \JJ(\ee_{12}) = \ee_{03} \end{aligned}
$$

Some Code Snippets^[inline footnote]

```cpp
// Plane x = 0
kln::plane p1{1.f, 0.f, 0.f, 0.f};

// Plane y = 0
kln::plane p2{0.f, 1.f, 0.f, 0.f};

// Plane 3z = 0
kln::plane p3{0.f, 0.f, 3.f, 0.f};

// Plane x + 3y - z = 0
kln::plane p4{1.f, 3.f, -1.f, 0.f};

// Equivalent to p4
kln::plane p5 = p1 + 3.f * p2 - p3 / 3.f;
```

Custom environment

```tip
Cool tip here
```

```warning
Be advised!
```

```danger
**Don't** do this
```
