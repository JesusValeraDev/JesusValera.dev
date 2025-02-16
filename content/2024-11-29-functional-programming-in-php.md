+++
title = "New PHP 8.4 array functions"
description = "Imperative vs declarative and the new PHP 8.4 functions: array_find, array_find_key, array_all & array_any"
date = 2024-11-29

[taxonomies]
tags = ['PHP', 'array', 'sorting', 'Programming', 'Functional Programming', 'Functions']

[extra]
static_thumbnail = "/images/2024-11-29/1.webp"
subtitle = "array_find, array_find_key, array_all & array_any"
+++

The PHP 8.4 version includes four new array functions that will help to write more clear and concise code.

![interlaken-mountain](/images/2024-11-29/1.webp)

Let's take a look at the current PHP `array_*` methods and an small example about how to deal with each of them (similarly as I did in this JavaScript [post](/functional-programming-in-javascript)).

## Imperative vs Declarative

There are two ways of applying transformations to arrays in PHP.

- While in **imperative** way we tell step by step **how** to get,
- in the **declarative** we tell not how to do it, but **what** we want

**Example:** Having a list of numbers from 1 to 10, to filter odd numbers, we can do:

```php source
$numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

## Imperative
$result = [];
foreach ($numbers as $n) {
    if ($n % 2 === 1) {
        $result[] = $n;
    }
}

## Declarative
$result = array_filter($numbers, fn (int $n) => $n % 2 === 1);
```

As you can see, in the declarative way, we did not create any explicit loop or added any `if` statement, it was all done automatically under-the-hood, we just defined which condition should be applied to each element of the list.

There is no a better way, both imperative and declarative codes do the same, in some situations one way could fit better than the other, although, usually the declarative is shorter and cleaner.

## Declarative functions

Before PHP 8.4, we have numerous PHP functions, eg:

- <code><small><b>array_map</b>(?callable $callback, array $array, array ...$arrays): array</small></code> <a href="https://www.php.net/manual/en/function.array-map.php" target="no_blank">¶</a>
- <code><small><b>array_walk</b>(array|object &$array, callable $callback, mixed $arg = null): true</small></code> <a href="https://www.php.net/manual/en/function.array-walk.php" target="_blank">¶</a>
- <code><small><b>array_filter</b>(array $array, ?callable $callback = null, int $mode = 0): array</small></code> <a href="https://www.php.net/manual/en/function.array-filter.php" target="_blank">¶</a>
- <code><small><b>array_reduce</b>(array $array, callable $callback, mixed $initial = null): mixed</small></code> <a href="https://www.php.net/manual/en/function.array-reduce.php" target="_blank">¶</a>
- <code><small><b>array_key_exists</b>(string|int|float|bool|resource|null $key, array $array): bool</small></code> <a href="https://www.php.net/manual/en/function.array-key-exists.php" target="_blank">¶</a>
- <code><small><b>in_array</b>(mixed $needle, array $haystack, bool $strict = false): bool</small></code> <a href="https://www.php.net/manual/en/function.in-array.php" target="no_blank">¶</a>

Since PHP 8.4 we have the new following methods:

- <code><small><b>array_find</b>(array $array, callable $callback): mixed</small></code> <a href="https://www.php.net/manual/en/function.array-find.php" target="_blank">¶</a>
- <code><small><b>array_find_key</b>(array|object &$array, callable $callback, mixed $arg = null): true</small></code> <a href="https://www.php.net/manual/en/function.array-find-key.php" target="_blank">¶</a>
- <code><small><b>array_all</b>(array $array, ?callable $callback = null, int $mode = 0): array</small></code> <a href="https://www.php.net/manual/en/function.array-all.php" target="_blank">¶</a>
- <code><small><b>array_any</b>(array $array, callable $callback, mixed $initial = null): mixed</small></code> <a href="https://www.php.net/manual/en/function.array-any.php" target="_blank">¶</a>

The new four methods were discussed in this <a href="https://wiki.php.net/rfc/array_find" target="_blank"><abbr title="Request for comments">RFC</abbr></a>.

## New functions

### array_find 🔎

`array_find()` is useful to get the **value** of the first occurrence of a certain element in an array. It will return _NULL_ otherwise.

```php source
$countries = ['Spain', 'Germany', 'Portugal', 'France'];
$find = array_find($countries, fn(string $c) => str_contains($c, 'an'));
var_dump($find);

*** OUTPUT ***
string(7) "Germany"
```

### array_find_key 🔑

`array_find_key()` is useful to get the **key** of the first occurrence of a certain element in an array. It will return _NULL_ otherwise.

```php source
$countries = ['Spain', 'Germany', 'Portugal', 'France'];
$findKey = array_find_key($countries, fn(string $c) => str_contains($c, 'an'));
var_dump($findKey);

*** OUTPUT ***
int(1)
```

### array_all ☘️

`array_all()` is useful to know if **all** elements from an array meet a specific closure. This method will return _true_ or _false_.

```php source
$countries = ['Spain', 'Germany', 'Portugal', 'France'];
$allA = array_all($countries, fn(string $c) => str_contains($c, 'a'));
$allE = array_all($countries, fn(string $c) => str_contains($c, 'e'));
var_dump($allA);
var_dump($allE);

*** OUTPUT ***
bool(true)
bool(false)
```

### array_any 🧵

`array_any()` is useful to know if **any** element from an array meet a specific closure. This method will return _true_ or _false_.

```php source
$countries = ['Spain', 'Germany', 'Portugal', 'France'];
$anyA = array_any($countries, fn(string $c) => str_contains($c, 'a'));
$anyE = array_any($countries, fn(string $c) => str_contains($c, 'e'));
var_dump($anyA);
var_dump($anyE);

*** OUTPUT ***
bool(true)
bool(true)
```
