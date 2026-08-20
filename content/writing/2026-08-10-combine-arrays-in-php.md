+++
path = "combine-arrays-in-php"
title = "How to Combine Arrays in PHP: Complete Guide"
description = "Learn the differences between array_merge, array_merge_recursive, array_combine, the spread operator and the + operator in PHP with practical examples"
date = 2026-08-10
aliases = ['2026-08-10-combine-arrays-in-php']

[taxonomies]
tags = ['PHP', 'arrays', 'merge', 'spread']

[extra]
static_thumbnail = "/images/2026-08-10/1.webp"
subtitle = "A comprehensive guide to merging arrays in PHP"
+++

![park fountains](/images/2026-08-10/1.webp)

PHP provides multiple ways to combine arrays, each with different behaviors.

- `array_merge()`
- `array_merge_recursive()`
- `array_combine()`
- `+` operator
- Spread operator (`...`)

<div class="separator"></div>

## `array_merge()`

Combines one or more arrays. Numeric keys are reindexed, and string keys from later arrays overwrite earlier ones.

> • Merging simple lists<br>
> • Combining associative arrays where later values should win<br>
> • Appending arrays sequentially

### Lists with Numeric Keys

```php
$fruits1 = ['apple', 'banana'];
$fruits2 = ['orange', 'grape'];

$merged = array_merge($fruits1, $fruits2);
print_r($merged);

// Output:
Array
(
    [0] => apple
    [1] => banana
    [2] => orange
    [3] => grape
)
```

Numeric keys are **reindexed** starting from 0.

### Associative Arrays

```php
$arr1 = [
    'a' => 1,
    'b' => 2,
    'c' => 3,
];

$arr2 = [
    'd' => 4,
    'a' => 10,  // Overwrites 'a' from $arr1
    'e' => 5,
];

$merged = array_merge($arr1, $arr2);
print_r($merged);

// Output:
Array
(
    [a] => 10  // ← Last value wins
    [b] => 2
    [c] => 3
    [d] => 4
    [e] => 5
)
```

String keys from the **second array overwrite** values from the first.

`array_merge()` accepts any number of arrays, so prefer a single call over repeated calls. Building a result by [calling it inside a loop](/avoid-using-array_merge_within-a-loop/) reallocates the whole array on every iteration.

<div class="separator"></div>

## `array_merge_recursive()`

Similar to `array_merge()`, but when keys conflict, it creates an array containing both values instead of overwriting.

> • Merging configuration arrays with nested structures<br>
> • Combining data where you need to preserve all values<br>
> • Building multi-level arrays

### Merging with Duplicate Keys

```php
$arr1 = [
    'name' => 'Peter',
    'lastname' => 'Griffin',
];

$arr2 = [
    'name' => 'Lois',
    'lastname' => 'Griffin',
];

$arr3 = [
    'name' => 'Brian',
];

$recursive = array_merge_recursive($arr1, $arr2, $arr3);
print_r($recursive);

// Output:
Array
(
    [name] => Array
        (
            [0] => Peter
            [1] => Lois
            [2] => Brian
        )

    [lastname] => Array
        (
            [0] => Griffin
            [1] => Griffin
        )
)
```

**Note**: Duplicate keys are **converted to arrays** containing all values.

The recursion only applies to string keys. Numeric keys are always appended and never compared, exactly like `array_merge()`, and two values are only merged into a deeper structure when both of them are arrays:

```php
$recursive = array_merge_recursive(
    ['tags' => ['php'], 0 => 'first'],
    ['tags' => ['arrays'], 0 => 'second'],
);
print_r($recursive);

// Output:
Array
(
    [tags] => Array
        (
            [0] => php
            [1] => arrays  // ← nested arrays are merged
        )

    [0] => first
    [1] => second          // ← numeric key appended, not overwritten
)
```

### Compare with `array_merge()`

```php
$merge = array_merge($arr1, $arr2, $arr3);
print_r($merge);

// Output:
Array
(
    [name] => Brian       // ← Only last value kept
    [lastname] => Griffin // ← Only last value kept
)
```

With `array_merge()`, only the **last value wins**.

<div class="separator"></div>

## `array_combine()`

Creates an array by using one array for keys and another for values.

> • Creating associative arrays from two separate lists<br>
> • Mapping keys to values from database results<br>
> • Converting indexed arrays to key-value pairs

### Example

```php
$keys = ['name', 'age', 'city'];
$values = ['Alice', 25, 'Berlin'];

$combined = array_combine($keys, $values);
print_r($combined);

// Output:
Array
(
    [name] => Alice
    [age] => 25
    [city] => Berlin
)
```

**Requirements**:

- Both arrays must have the **same number of elements**
- The first array becomes **keys**, the second becomes **values**

A count mismatch is a hard failure, not a silent one. Since PHP 8.0 it throws a `ValueError`, so it needs a `try`/`catch` when the input sizes are not guaranteed:

```php
array_combine(['name', 'age'], ['Alice']);

// ValueError: array_combine(): Argument #1 ($keys) and argument #2 ($values)
// must have the same number of elements
```

Duplicate keys, on the other hand, fail silently and the last value wins:

```php
$combined = array_combine(['name', 'name'], ['Alice', 'Bob']);
print_r($combined);

// Output:
Array
(
    [name] => Bob  // ← 'Alice' is lost
)
```

<div class="separator"></div>

## The `+` Operator

Appends the right array to the left array, but **keeps the first occurrence** of duplicate keys.

> • Providing default values for configurations<br>
> • Merging arrays where the first values should win<br>
> • Adding optional parameters

### Using `+` for Defaults

```php
$userConfig = [
    'theme' => 'dark',
];

$defaultConfig = [
    'theme' => 'light',
    'language' => 'en',
    'timezone' => 'UTC',
];

$config = $userConfig + $defaultConfig;
print_r($config);

// Output:
Array
(
    [theme] => dark     // ← From $userConfig (first wins)
    [language] => en    // ← From $defaultConfig
    [timezone] => UTC   // ← From $defaultConfig
)
```

The `+` operator **preserves the first value** for duplicate keys.

### Compare with `array_merge()`

```php
$arr1 = [
    'a' => 1,
    'b' => 2,
    'c' => 3,
];

$arr2 = [
    'd' => 4,
    'a' => 10,
    'e' => 5,
];

// Using +
$withPlus = $arr1 + $arr2;
print_r($withPlus);

// Output:
Array
(
    [a] => 1  // ← First value kept
    [b] => 2
    [c] => 3
    [d] => 4
    [e] => 5
)

// Using array_merge()
$withMerge = array_merge($arr1, $arr2);
print_r($withMerge);

// Output:
Array
(
    [a] => 10  // ← Last value wins
    [b] => 2
    [c] => 3
    [d] => 4
    [e] => 5
)
```

### Careful with Lists

"First occurrence wins" applies to **keys**, not to positions in a list, and this is where `+` becomes dangerous. Because both lists share the offsets `0` and `1`, the right-hand elements are silently discarded:

```php
$fruits1 = ['apple', 'banana'];
$fruits2 = ['orange', 'grape'];

$combined = $fruits1 + $fruits2;
print_r($combined);

// Output:
Array
(
    [0] => apple
    [1] => banana
)
```

No warning, no error, and `orange` and `grape` are gone. Reach for `+` only with string keys, and use `array_merge()` or the spread operator for lists.

<div class="separator"></div>

## Spread Operator

Since PHP 7.4 the spread operator unpacks arrays inside an array literal, and since PHP 8.1 it also supports string keys. It follows the same rules as `array_merge()`, so the last value wins.

> • Merging lists inline without a function call<br>
> • Prepending or appending elements while merging<br>
> • Combining an arbitrary number of arrays in one expression

```php
$fruits1 = ['apple', 'banana'];
$fruits2 = ['orange', 'grape'];

$combined = [...$fruits1, 'lemon', ...$fruits2];
print_r($combined);

// Output:
Array
(
    [0] => apple
    [1] => banana
    [2] => lemon
    [3] => orange
    [4] => grape
)
```

With string keys, later arrays overwrite earlier ones:

```php
$config = [
    ...['theme' => 'light', 'language' => 'en'],
    ...['theme' => 'dark'],
];
print_r($config);

// Output:
Array
(
    [theme] => dark  // ← Last value wins
    [language] => en
)
```

The unpacking syntax is the same one used for variadic functions and argument unpacking, covered in [Three dots in PHP](/three-dots-in-php/).

<div class="separator"></div>

## Conclusion

Choosing the right array combination method depends on your specific needs:

- Use `array_merge()` for simple merging where the last value should win
- Use `array_merge_recursive()` when you need to preserve all values from duplicate keys
- Use `array_combine()` to create associative arrays from separate key and value arrays
- Use the `+` operator when you want to provide defaults or keep the first value for duplicate keys, and never on lists
- Use the spread operator for readable inline merging when you are on PHP 8.1 or newer

Understanding these differences helps you write more predictable and maintainable PHP code.
