+++
path = "avoid-using-array_merge_within-a-loop"
title = "Avoid using array_merge within a loop"
description = "Why calling array_merge() inside a PHP loop slows down quadratically, three faster alternatives, and how array_merge() and + treat keys."
date = 2025-07-04
updated = 2026-11-01
aliases = ['avoid-using-array-merge-within-a-loop', '2025-07-04-avoid-using-array_merge_within-a-loop']

[taxonomies]
tags = ['php', 'arrays', 'merge', 'array_merge', 'resources']

[extra]
static_thumbnail = "/images/2025-07-04/1.webp"
subtitle = ""
+++

![salto-del-usero-bullas](/images/2025-07-04/1.webp)

If you're a PHP developer, chances are you've encountered (or written) code like this:

```php
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

## Why it gets slow

`array_merge()` never appends to the array you pass in. It always builds a **new array**. Inside the loop, the first
argument is everything collected so far, so each iteration copies all of it again.

With 1,000 objects of 10 users each, the first call copies 10 elements, the second 20, and the last one 10,000. That's
about **5 million copies** for 10,000 users. Double the objects and the copies grow four times, to about 20 million.
That's **quadratic** growth.

> The spread operator has the same problem: `$userLists = [...$userLists, ...$users];` also builds a new array on every
> iteration. Spread is fine for merging a fixed handful of arrays once, like `[...$admins, ...$editors]`.

<div class="separator"></div>

## Collect first, merge once at the end

Instead of merging in every iteration, we collect all elements and merge them only once at the end.

```php
$userLists = [];
foreach ($this->someCall() as $someObject) {
    $userLists[] = $someObject->getUsers();
}
$userLists = array_merge(...$userLists);
```

The `...` unpacks the list into separate arguments, so this is a **single** `array_merge()` call (more on that syntax in
[Three dots in PHP](/three-dots-in-php/)).

### Pros and cons:

- Performs only one merge operation, so each user is copied once
- Holds all intermediate arrays in memory before merging
- Clean and modern syntax
- The collected list needs integer keys, because PHP reads string keys as **named arguments**:

```php
array_merge(...['admins' => ['Ana'], 'editors' => ['Bob']]);
// ArgumentCountError: array_merge() does not accept unknown named parameters
```

If you key the list by name, wrap it in `array_values()` before unpacking.

<div class="separator"></div>

## `array_push()` with the spread operator

`array_push()` changes the array **in place**, so only the new users are copied.

```php
$userLists = [];
foreach ($this->someCall() as $someObject) {
    array_push($userLists, ...$someObject->getUsers());
}
```

### Pros and cons:

- No intermediate list of arrays, and empty `getUsers()` results are fine
- Keys are dropped: users get positions 0, 1, 2...
- String keys in `getUsers()` throw the same named-argument `ArgumentCountError`

<div class="separator"></div>

## Manual nested loop

This method avoids all intermediate arrays and merges on the fly.

```php
$userLists = [];
foreach ($this->someCall() as $someObject) {
    foreach ($someObject->getUsers() as $user) {
        $userLists[] = $user;
    }
}
```

### Pros and cons:

- Works on all PHP versions
- No unpacking, so empty arrays and string keys need no special care
- Best memory performance for large datasets
- Can keep the keys if you need them: loop with `as $id => $user` and assign `$userLists[$id] = $user;`
- Slightly more verbose

<div class="separator"></div>

## How keys behave

`array_merge()` renumbers **numeric keys** from 0, numeric strings like `'20'` included, and lets a later array
overwrite **string keys**. The `+` operator keeps every key, and the **first** value wins. [How to combine arrays in
PHP](/combine-arrays-in-php/) has more examples of both.

```php
$admins = [10 => 'Ana', 20 => 'Bob'];
$editors = ['20' => 'Carl', 30 => 'Dan'];

print_r(array_merge($admins, $editors));
print_r($admins + $editors);

// Output:
Array
(
    [0] => Ana
    [1] => Bob
    [2] => Carl
    [3] => Dan
)
Array
(
    [10] => Ana
    [20] => Bob
    [30] => Dan
)
```

`array_merge()` lost the IDs, and `+` dropped Carl because ID 20 was taken. To keep IDs inside a loop, use
`$userLists += $someObject->getUsers();`. In my tests `+=` stayed fast, while `$userLists = $userLists + ...` slowed
down just like `array_merge()`.
