+++
path = "2025-07-04-avoid-using-array_merge_within-a-loop"
title = "Avoid using array_merge within a loop"
description = "Why the PHP function array_merge() inside a loop is greedy for resources, and how to fix it"
date = 2025-07-04

[taxonomies]
tags = ['php', 'arrays', 'merge', 'array_merge', 'resources']

[extra]
static_thumbnail = "/images/2025-07-04/1.webp"
subtitle = ""
+++

![salto-del-usero-bullas](/images/2025-07-04/1.webp)

If you're a PHP developer, chances are you've encountered (or written) code like this:

```php source
$userLists = [];
foreach ($this->someCall() as $someObject) {
    $userLists = array_merge($userLists, $someObject->getUsers());
}
```

The goal here is to populate the `$userLists` array with users returned from some external source (in this case, from
`$someObject->getUsers()`). An instinct is to use `array_merge` inside the loop to combine arrays.

While this works, there's a performance caveat: `array_merge` creates a new array every time it's called, duplicating
all elements and discarding the previous one. This approach may be fine for small arrays, but the cost grows
significantly with larger datasets.

## Alternatives for better performance

### Spread operator (merge once at the end)

Instead of merging in every iteration, we collect all elements and merge them only once at the end.

```php source
$userLists = [];
foreach ($this->someCall() as $someObject) {
    $userLists[] = $someObject->getUsers();
}
$userLists = array_merge(...$userLists);
```

#### Pros and cons:

- Requires PHP 7.4+ (spread operator for arrays)
- If any `$someObject->getUsers()` returns an empty array, PHP emits a warning (you'll need to check or provide a
  default value)
- Holds all intermediate arrays in memory before merging
- Clean and modern syntax
- Performs only one merge operation - faster than repeated array_merge() in a loop

### Manual nested loop

This method avoids all intermediate arrays and merges on the fly.

```php source
$userLists = [];
foreach ($this->someCall() as $someObject) {
    foreach ($someObject->getUsers() as $user) {
        $userLists[] = $user;
    }
}
```

#### Pros and cons:

- Works on all PHP versions
- No risk of warning if `$someObject->getUsers()` returns an empty array (the inner loop is not executed)
- Best memory performance for large datasets
- Slightly more verbose
