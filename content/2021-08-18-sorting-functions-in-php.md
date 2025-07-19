+++
title = "Sorting functions in PHP"
description = "In PHP there are multiple ways to sort a collection, and sometimes it’s not clear which method we should use. Let's take a look at the alternatives."
date = 2021-08-18

[taxonomies]
tags = ['PHP', 'Programming', 'Sorting Algorithms', 'Oop', 'Functional Programming']

[extra]
static_thumbnail = "/images/2021-08-18/1.webp"
subtitle = "And the Spaceship Operator 🚀🚀🚀"
+++

![rock-mountain-santiago-compostela](/images/2021-08-18/1.webp)

When dealing with PHP, there are multiple ways to sort a collection of items, and sometimes it’s not clear which method we should use and why.

> What is the difference between _`sort()`_, _`arsort()`_ and _`uasort()`_?

Before explaining the repercussions of `a`, `r`, `k` and `u` + `sort()` function, we need to know the very basic concept of lists and maps.

## List

A list is an ordered collection.<br>
The order is sequential starting from 0 and increasing 1 by 1 for each item.<br>
It is also possible to have duplicated items in a list.<br>

```php source
$list = ['Croatia', 'Belgium', 'Austria', 'Belgium', 'Denmark'];
print_r($list);

Array
(
    [0] => Croatia
    [1] => Belgium
    [2] => Austria
    [3] => Belgium
    [4] => Denmark
)
```

## Map (also known as Dictionaries)

A map is an unordered collection.<br>
Each element is composed of a key and a value.<br>
It is not possible to have the same key more than once.<br>

```php source
$map = [
    'Croatia' => 0,
    'Belgium' => 1,
    'Austria' => 2,
    'Denmark' => 3,
    'Belgium' => 4,
];
print_r($map);

Array
(
    [Croatia] => 0
    [Belgium] => 4 // 'Belgium => 1' was overriden
    [Austria] => 2
    [Denmark] => 3
)
```

<div class="separator"></div>

It was important to do a quick overview of maps and lists, they are different kinds of collections, and because of that, each one has its own specific sorting methods.

The idea of those `a`, `r`, `k` & `u` + `sort()` is to work as modifiers as follows:

<div style="font-size: 1.3rem">
R = reverse ➝ sort in descencing order, lists & maps<br>
K = key ➝ sort by key, only for maps<br>
A = associative ➝ sort by value, only for maps<br>
U = user-defined ➝ defined by the user in a callback
</div>

## Sorting Lists 🧵

### sort() & rsort()

These methods sort lists in _ascending/descending_ order.

```php source
# sort: Sort list by *ascending* order.
$sort = ['Croatia', 'Belgium', 'Austria', 'Belgium'];
sort($sort);

Array
(
    [0] => Austria
    [1] => Belgium
    [2] => Belgium
    [3] => Croatia
)

---

# rsort: Sort list by *descending* order.
$rsort = ['Croatia', 'Belgium', 'Austria', 'Belgium'];
rsort($rsort);

Array
(
    [0] => Croatia
    [1] => Belgium
    [2] => Belgium
    [3] => Austria
)
```

## Sorting Maps 🗺️

### asort(), arsort(), ksort() & krsort()

These methods sort associative arrays by _key/value_ in _ascending/descending_ order.

```php source
# ksort: Sort map by *key* in *ascending* order.
$ksort = [100 => 'Croatia', 200 => 'Austria', 300 => 'Belgium'];
ksort($ksort);

Array
(
    [100] => Croatia
    [200] => Austria
    [300] => Belgium
)

---

# krsort: Sort map by *key* in *descending* order.
$krsort = [100 => 'Croatia', 200 => 'Austria', 300 => 'Belgium'];
krsort($krsort);

Array
(
    [300] => Belgium
    [200] => Austria
    [100] => Croatia
)

---

# asort: Sort map by *value* in *ascending* order.
$asort = [100 => 'Croatia', 200 => 'Austria', 300 => 'Belgium'];
asort($asort);

Array
(
    [200] => Austria
    [300] => Belgium
    [100] => Croatia
)

---

# arsort: Sort map by *value* in *descending* order.
$arsort = [100 => 'Croatia', 200 => 'Austria', 300 => 'Belgium'];
arsort($arsort);

Array
(
    [100] => Croatia
    [300] => Belgium
    [200] => Austria
)
```

## User-defined functions 👩‍💻

Until now everything was nice, but as you know, usually we have a collection of complex objects, and sometimes we want
to define our own sorting function, in these scenarios, the _asort()_ method simply doesn't work. Eg:

“Sorting a collection of `Product` by price in ascending order, and when more than one product has the same price, sort
them _alphabetically_ by the name”.

We need to find a more sophisticated approach. And this is only possible if we can define our own sorting method, in
this case, we can take advantage of using the `spaceship operator`! 🚀

Basically, this operator is syntactic sugar specialized for comparisons.

The first parameter is the array we want to sort and the second is a callback that returns an integer value.

```php source
/** @var callable(mixed,mixed):int $callable */
$callable = function (mixed $a, mixed $b): int { ... }

usort(&$array, $callable): bool
```

The values this callable must return are `-1`, `0` and `1` if the current item is less, equal or greater than the
previous one, to be sorted before or after in the collection.

```php source
function compare(int $a, int $b): int
{
    if ($a == $b) {
        return 0;
    }
    return ($a < $b) ? -1 : 1;
}

# Is the same than...

function compare(int $a, int $b): int
{
    return $a <=> $b;
}

# Is the same than...

fn (int $a, int $b): int => $a <=> $b;
```

### usort(), uksort() & uasort()

These methods sort by keys or values (preserving or resetting the keys) in a user-defined callback. Let’s see some
examples:

```php source
# usort: Sort list/map by callback from the values, keys are reset.
$usort = [100 => 'Croatia', 300 => 'Austria', 200 => 'Belgium'];
usort($usort, fn (string $a, string $b): int => $a <=> $b);

Array
(
    [0] => Austria
    [1] => Belgium
    [2] => Croatia
)

---

# uksort: Sort map by callback from the keys.
$uksort = [100 => 'Croatia', 300 => 'Austria', 200 => 'Belgium'];
uksort($uksort, fn (int $a, int $b): int => $a <=> $b);

Array
(
    [100] => Croatia
    [200] => Belgium
    [300] => Austria
)

---

# uasort: Sort map by callback from the values preserving the keys.
$uasort = [100 => 'Croatia', 300 => 'Austria', 200 => 'Belgium'];
uasort($uasort, fn (string $a, string $b): int => $a <=> $b);

Array
(
    [300] => Austria
    [200] => Belgium
    [100] => Croatia
)
```

For the sake of simplicity, I used the function: `fn ($a, $b) => $a <=> $b;` if the collection was holding complex
objects, it would be the same but comparing some property, it depends on your needs.

## 📑 Cheat Sheet

```php source
sort() - sort list in ascending order
rsort() - sort list in descending order

asort() - sort map by value in ascending order 
ksort() - sort map by key in ascending order
arsort() - sort map by value in descending order
krsort() - sort map by key in descending order

usort() - sort list or map by value in a user-defined callback, reset keys
uksort() - sort map by keys in a user-defined callback
uasort() - sort map by value in a user-defined callback
```

> &ast; Take into account that the array is passed by reference to the sorting function, which means you must initialize
> the array in a different line, and the sorting function will mutate the original array 👀

## Reference

- Array Sorting | [PHP Doc](https://www.php.net/manual/en/array.sorting.php)
- PHP Sorting Arrays | [W3Schools](https://www.w3schools.com/php/php_arrays_sort.asp)
- Difference between Set, List and Map in Java | [Java67](https://www.java67.com/2013/01/difference-between-set-list-and-map-in-java.html)