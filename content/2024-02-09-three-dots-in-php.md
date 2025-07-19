+++
title = "Three dots in PHP"
description = "first-class callable syntax, variadic function and argument unpacking"
date = 2024-02-09

[taxonomies]
tags = ['PHP', 'first-class', 'callables', 'variadic', 'varargs', 'argument unpacking', 'splat operator']

[extra]
static_thumbnail = "/images/2024-02-09/1.webp"
subtitle = "First-Class Callable Syntax, Variadic function & Argument unpacking"
+++

![hiroshima castle ruins](/images/2024-02-09/1.webp)

In this article, let's take a look at the three different meanings of the three consecutive dots in PHP.

1. First-class callable syntax
2. Variadic function
3. Argument unpacking

## First-class Callable Syntax _[since PHP 8.1]_

This syntax is used to create `Closure` objects (anonymous function) from `callable` (any expression that can be called in the PHP grammar).

That means, you could store a function or method in a variable and pass it around as a parameter.

```php source
$snakeCase = static fn($s): string => strtolower(preg_replace('/\B([A-Z])/', '_$1', $s));
$upperCase = strtoupper(...);

function helloWorldFrom(Closure $closure): void {
    echo $closure('HelloWorld');
}

helloWorldFrom($snakeCase); // => hello_world
helloWorldFrom($upperCase); // => HELLOWORLD
```

In the previous snippet, both `$snakeCase` and `$upperCase` are `Closure` objects.<br>
An anonymous function is always a `Closure` object, while the PHP native functions like `strtoupper` are `callable` expressions, which are transformed into a `Closure` object using the `...` operator.

> We can use the `...` operator to create a `Closure` object not only from functions but also from static/non-static methods from class instances.

## Variadic function

A variadic function doesn't have a fixed arity, that means, it can take an indeterminate number of arguments; in the end, the parameter will behave like an array.<br>
The variadic argument MUST be at the end of the parameter list.

```php source
function foo(string $string, int ...$numbers): void
{
    echo sprintf('%s [%s]', $string, implode(', ', $numbers));
}

foo('Foo'); // => Foo []
foo('Foo', 1); // => Foo [1]
foo('Foo', 1, 2); // => Foo [1, 2]
foo('Foo', 1, 2, 3, 4, 5); // => Foo [1, 2, 3, 4, 5]
```

It is also possible to explicitly the type of all parameters that the variadic function expects to receive. In case some argument doesn't match with the type that was defined in the function signature, it won't work.

## Argument unpacking via ...

Arrays and traversable objects can be unpacked into argument lists when calling functions by using the `...` operator. This is also known as the `splat operator` in other languages.

```php source
function add(int $a, int $b, int $c): void
{
    echo $a + $b + $c;
}

$numbers = [2, 3];

add(1, ...$numbers); // => 6
```

<div class="separator"></div>

It is important to realise that while `variadic function` and `argument unpacking` work both like a kind of array, the functionality of each one is practically the opposite.<br>
While the variadic function allows to receive multiple values and inside of it, it behaves like an array; the argument unpacking is about transforming an array into multiple variables.

The following snippet is a valid PHP code.

```php source
echo (fn(int ...$n) => array_sum($n))(...)(...[1, 2, 3]); // => 6
```

The same code but a bit more readable.

```php source
function add(int ...$n): void
{
    echo array_sum($n);
}

$numbers = [1, 2, 3];

$f = add(...);

$f(...$numbers); // => 6
```

In conclusion, the three dots in PHP are a powerful tool that allows us to work with functions and methods in a more flexible way.