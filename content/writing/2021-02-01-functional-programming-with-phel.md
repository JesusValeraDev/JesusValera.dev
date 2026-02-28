+++
path = "2021-02-01-functional-programming-with-phel"
title = "Functional Programming with Phel 🐘"
description = "Functional Programming is a programming paradigm, it’s even older than Object-Oriented Programming, let's compare some snippets between FP and OOP"
date = 2021-02-01

[taxonomies]
tags = ['PHP', 'Functional Programming', 'Phel', 'Programming', 'Software']

[extra]
static_thumbnail = "/images/2021-02-01/1.webp"
subtitle = "When PHP meets FP 🚀🚀🚀🌚"
+++

![phel-purple](/images/2021-02-01/1.webp)

## What is Functional Programming?

Functional Programming ([FP](https://en.wikipedia.org/wiki/Functional_programming)) is a programming paradigm that was
created in the late 1950s. It’s even older than Object-Oriented
Programming ([OOP](https://en.wikipedia.org/wiki/Object-oriented_programming)).

The main concepts of this paradigm are:

- _Pure functions_: The concrete input will produce always the same output.
- _Recursion_: There are no loops. In order to get this approach, the functions can call themselves using recursivity.
- _Functions are First-Class_: A function is treated as a variable, which means you can pass functions as function
  arguments.
- _Variables are immutables_: A variable cannot change its value once it is declared, but it’s possible to create new
  ones.

## Imperative vs Declarative

Let’s start with the typical _factorial_ example to explain the differences between those two terms in the programming
world.

> The factorial is the product of all positive integers less than or equal to a given positive number.

```clojure
n! = n * (n - 1) * (n - 2) * ... * 1
```

Following this formula, we can assert that the factorial of 5 is:

```clojure
5! = 5 * 4 * 3 * 2 * 1
```

But if you noticed, the factorial of 5 is actually 5 times the factorial of 4.

```clojure
5! = 5 * 4!
```

And the factorial of 4 is 4 times the factorial of 3… and so on.

It’s a _recursive_ problem!

## Imperative programming

The developer describes the steps one-by-one to achieve the desired result.

```php source
function factorial(int $number): int {
    $factorial = 1;
    while ($number >= 1) {
        $factorial *= $number;
        $number--;
    }

    return $factorial;
}
```

We are overriding the `$factorial` variable in every single iteration.<br>
We focus on “**HOW**”.

## Declarative programming

The developer declares what the program does usually in small functions, with immutable variables, without side effects
using recursivity instead of loops if needed.

```clojure
(defn factorial
  [number]
  (if (<= number 1)
    1
    (* number (factorial (- number 1)))))
```

As you probably may guess, FP uses a declarative paradigm.<br>
We focus on “**WHAT**”.

## Conclusion

FP is not better or worse than OOP, they are different but complementary in order to solve the same problem.<br>
If you want to learn/practice with some FP, I definitely recommend you **Phel**.

You can read more information here: [Phel: the Lisp that compiles to PHP](https://chemaclass.com/blog/phel-first-release/).

[Version 0.1](https://github.com/phel-lang/phel-lang/tags) has been recently released, and I am sure you will have fun!
🎁

![phel-white](/images/2021-02-01/2.webp)

> ## [https://phel-lang.org/](https://phel-lang.org/)