+++
path = "2030-01-01-combine-arrays-in-php"
title = "How to Combine Arrays in PHP: Complete Guide"
description = "Learn the differences between array_merge, array_merge_recursive, array_combine, and the + operator in PHP with practical examples"
date = 2025-01-01
draft = true

[taxonomies]
tags = ['PHP', 'arrays', 'merge']

[extra]
static_thumbnail = "/images/2025-03-20/1.webp"
subtitle = ""
+++

PHP provides multiple ways to combine arrays, each with different behaviors and use cases. Understanding the differences between `array_merge()`, `array_merge_recursive()`, `array_combine()`, and the `+` operator is essential for working with arrays effectively.

## Overview of Array Combination Methods

| Method                      | Reindexes Numeric Keys | Overwrites Duplicates | Merges Nested Arrays |
|-----------------------------|------------------------|-----------------------|----------------------|
| `array_merge()`             | Yes                    | Yes (last wins)       | No (overwrites)      |
| `array_merge_recursive()`   | Yes                    | No (creates arrays)   | Yes (merges)         |
| `array_combine()`           | N/A                    | N/A                   | N/A                  |
| `+` operator                | No (keeps first)       | No (keeps first)      | No (keeps first)     |

## 1. array_merge()

Combines one or more arrays. Numeric keys are reindexed, and string keys from later arrays overwrite earlier ones.

### Use Cases

- Merging simple lists
- Combining associative arrays where later values should win
- Appending arrays sequentially

### Example: Merging Lists with Numeric Keys

```php source
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

### Example: Merging Associative Arrays

```php source
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

## 2. array_merge_recursive()

Similar to `array_merge()`, but when keys conflict, it creates an array containing both values instead of overwriting.

### Use Cases

- Merging configuration arrays with nested structures
- Combining data where you need to preserve all values
- Building multi-level arrays

### Example: Merging with Duplicate Keys

```php source
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

### Compare with array_merge()

```php source
$merge = array_merge($arr1, $arr2, $arr3);
print_r($merge);

// Output:
Array
(
    [name] => Brian      // ← Only last value kept
    [lastname] => Griffin // ← Only last value kept
)
```

With `array_merge()`, only the **last value wins**.

## 3. array_combine()

Creates an array by using one array for keys and another for values.

### Use Cases

- Creating associative arrays from two separate lists
- Mapping keys to values from database results
- Converting indexed arrays to key-value pairs

### Example

```php source
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

## 4. The + Operator

Appends the right array to the left array, but **keeps the first occurrence** of duplicate keys.

### Use Cases

- Providing default values for configurations
- Merging arrays where the first values should win
- Adding optional parameters

### Example: Using + for Defaults

```php source
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

### Compare with array_merge()

```php source
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

## Summary: When to Use Which

| Method | Use When |
|--------|----------|
| `array_merge()` | You want to combine arrays and let later values overwrite earlier ones |
| `array_merge_recursive()` | You need to preserve all values from duplicate keys |
| `array_combine()` | You want to create a key-value map from two separate arrays |
| `+` operator | You want to provide defaults or keep the first occurrence of duplicate keys |

## Conclusion

Choosing the right array combination method depends on your specific needs:

- Use `array_merge()` for simple merging where the last value should win
- Use `array_merge_recursive()` when you need to preserve all values from duplicate keys
- Use `array_combine()` to create associative arrays from separate key and value arrays
- Use the `+` operator when you want to provide defaults or keep the first value for duplicate keys

Understanding these differences helps you write more predictable and maintainable PHP code.

