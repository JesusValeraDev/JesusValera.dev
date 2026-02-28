+++
path = "2021-05-17-functional-programming-in-javascript"
title = "Functional Programming in JavaScript"
description = "Functional Programming is a paradigm where programs are constructed by applying and composing functions. Let's take a look at some functions we have on JS"
date = 2021-05-17

[taxonomies]
tags = ['JavaScript', 'Typescript', 'Programming', 'Functional Programming', 'Functions']

[extra]
static_thumbnail = "/images/2021-05-17/1.webp"
subtitle = "forEach, map, filter, reduce, find, findIndex, some & every"
+++

![rabbit](/images/2021-05-17/1.webp)

Functional Programming is a paradigm where programs are constructed by applying and composing functions. The Functional
Programming keys are:

- You treat functions as first-class citizens.
- You can pass them as arguments to other functions.
- A function can return another function.
- You can modify functions.

When a function is called with some given arguments, it will always return the same result, and cannot be affected by
any mutable state or other side effects.

And now, we are going to take a look at the most common JavaScript functions that allow us to write Functional
Programming: _forEach_, _map_, _filter_, _reduce_, _find_, _findIndex_, _some_ and _every_.

<div class="separator"></div>

## For Each 🧩

We use _forEach()_ when we like to iterate through an array of items.<br>
Using this method, you can get the item of the current element when iterating and/or the index.<br>
It is recommendable not to use it unless you are sure you want to modify the original array. This method is mutable. It
means it will modify the original array.

```javascript
const countries = ['Spain', 'Germany', 'Portugal', 'France']
countries.forEach(
    (country, index) => console.log(index, country.toUpperCase())
)

--OUTPUT--
0 "SPAIN"
1 "GERMANY"
2 "PORTUGAL"
3 "FRANCE"
```

## Map 🗺

We use _map()_ whenever we want to map the values into other values producing a new array.

```javascript
const countries = ['Spain', 'Germany', 'Portugal', 'France']
const mapped = countries.map((country) => country.toUpperCase())
console.log(mapped)

--OUTPUT--
["SPAIN", "GERMANY", "PORTUGAL", "FRANCE"]
```

## Filter ⌛️

We use _filter()_ when we want to pick just some specific elements regarding a filter. It returns a new array with the
filtered elements or empty if no matches.

```javascript
const countries = ['Spain', 'Germany', 'Portugal', 'France']
const filtered = countries.filter(
    (country) => country.includes('an')
)
console.log(filtered)

--OUTPUT--
["Germany", "France"]
```

## Reduce ⛏

We use _reduce()_ when we want to return a single value depending on a specific closure. This function can take an
initial value, which by default is empty (0 or "") as the second parameter.

```javascript
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let initialValue = 5
const sum = numbers.reduce(
    (accumulator, value) => accumulator + value,
    initialValue
)
console.log(sum)

--OUTPUT--
60
```

## find 🔎

We use _find()_ if we are interested in the first occurrence of a certain element in an array. It will return
_undefined_ otherwise.

```javascript
const countries = ['Spain', 'Germany', 'Portugal', 'France']
const find = countries.find((country) => country.includes('an'))
console.log(find)

--OUTPUT--
"Germany"
```

## find Index 🔑

We use _findIndex()_ if we would like the first occurrence of a certain element in an array, this method is pretty
similar to _find_ but it will return not the value but the index. In case there are no matches, the output would be -1.

```javascript
const countries = ['Spain', 'Germany', 'Portugal', 'France']
const findIndex = countries.findIndex(
    (country) => country.includes('an')
)
console.log(findIndex)

--OUTPUT--
1
```

## Some 🧵

We use _some()_ if we are interested to know if some element from an array meets a specific closure. If any of the items
satisfy the criteria the result will be _true_, else, it will be _false_.

```javascript
const countries = ['Spain', 'Germany', 'Portugal', 'France']
const isAn = countries.some((country) => country.includes('an'))
const isLand = countries.some((country) => country.includes('land'))
console.log(isAn)
console.log(isLand)

--OUTPUT--
true
false
```

## Every ☘️

We use _every()_ if we want to know if every element from an array meets a specific closure. This method is somehow
similar to some but the opposite. This method also returns _true_ or _false_.

```javascript
const countries = ['Spain', 'Germany', 'Portugal', 'France']
const isEveryA = countries.every((country) => country.includes('a'))
const isEveryE = countries.every((country) => country.includes('e'))
console.log(isEveryA)
console.log(isEveryE)

--OUTPUT--
true
false
```

<div class="separator"></div>

![burrow](/images/2021-05-17/2.webp)

These are the most common functions when dealing with Functional Programming, but there are many more (_fill_, _join_,
_sort_, etc). You can easily check the full list on the
[Mozilla Developer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)
🦊 site.
