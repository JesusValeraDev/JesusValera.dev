+++
title = "Declaring array structures in PHP"
description = "It is not possible in PHP to define explicitly the types of your arrays, but using PHPDoc + static analyzers (PHPStan or Psalm), we can do it. Here is how"
date = 2023-02-20

[taxonomies]
tags = ["Programming", "PHP", "Arrays", "Phpstan", "Psalm"]

[extra]
static_thumbnail = "/images/2023-02-20/1.webp"
subtitle = ""
+++

![statue-people-with-a-string-and-a-cat](/images/2023-02-20/1.webp)

Currently, it is not possible to define explicit array types like Java does.

```java
List<User> users = new ArrayList<>();
```

There have been some attempts to achieve that. **Nikita Popov** made one of the most recent ones in
this [pull request](https://github.com/PHPGenerics/php-generics-rfc/issues/45). Unfortunately, the conclusion was that
regarding the current PHP status, that is not doable (at least in the short/medium term), as it would require rewriting
an enormous amount of code, some of which is very critical.

Fortunately, tools like **PHPStan** or **Psalm** help us analyze the code statically. That means, they do not
execute but check the code for inconsistencies based on PHP comments.

There are three different ways to define the type of elements in a PHP array:

1. Legacy way: `User[]`
2. List Shape: `array<int, mixed>` & `list<mixed>`
3. Object Shape: `array{foo:?string, bar:array{name:string, value:mixed}}`

## The Legacy way

This is a legacy approach to define a list of elements of a specific type. The problem is that it becomes ambiguous,
and developers using this kind of list cannot know if keys are integers or strings. Also, while modern static analyzers
will infer `User[]` as `array<int, User>` by default, this inference may not always align with the actual runtime
behavior or your intent.<br>
Being explicit with `array<int, User>` or `list<User>` is still a better practice because:

- It's more explicit about intent
- Avoids any ambiguity about what keys are valid
- Makes the code more self-documenting

In the end, the more explicit, the better.

```php source
/** @var User[] $users */
$users = [ ... ];

# Are keys auto-incremental integers, random numbers, maybe strings... ?
$firstUser = $users[ ? ];

# Static analyzers won't complain if you use an incorrect key type 🤕
```

## List Shape

We use lists when we have an array of elements with the same type.<br>
We use **angled brackets** to declare the types of the key and the value: `array<TKey, TValue>`.

> 💡There is a very handy shortcut when the key is an auto-incremental integer: `list<T>`.<br>
> `list<T>` is an alias of `array<int<0, max>, T>`

```php source
/** @var array<string, User> $users */
$users = [
    'jesus' => new User('Jesus Valera'),
    'chema' => new User('Chema Valera'),
];

$userJesus = $users['jesus'];
$userChema = $users['chema'];

$users[0]; # ERROR: "Offset 0 does not exist on array<string, User>"

---

/** @var list<User> $users */
$users = [
    new User('Jesus Valera'),
    new User('Chema Valera'),
    // ...
];

$firstUser = $users[0];
$secondUser = $users[1];
```

## Object Shape

We use object shape when the array is not a collection of objects but a map which holds information.<br>
To do that, we use the **curly bracket syntax** and define the key name and the type, we can split by commas if there are multiple elements: `array{foo:int, bar:string}`.

```php source
/** @var array{id:int, birthdate:DateTimeImmutable} */
$additionalInfo = [ ... ];

$id = $additionalInfo['id']; # int
$birthdate = $additionalInfo['birthdate']; # DateTimeImmutable
```

---

Given the following 'object shape' array

```php source
['hello' => 'world', new stdClass(), false];
```

It will be addressed internally as follows:

```php source
array{'hello': string, 0: stdClass, 1: false}
```

> By default, numeric indices starting from 0 are auto-assigned to elements without explicit keys

<div class="separator"></div>

Example of a User class that holds two arrays: a list and an object shape.

```php source
final readonly class User
{
    /** @var list<Comment> */
    public array $comments;

    /** @var array{id:int, birthdate:DateTimeImmutable} */
    public array $additionalInfo;
}
```

There are multiple advantages when using these PHP comments, they not only provide better feedback on the array shape to the developers but IDEs will suggest auto-completion when iterating on individual elements!

<div class="separator"></div>

Of course, it's possible to represent any complex array structure using these PHPDoc annotations. Example:

```php source
/**
 * @var list<
 *   array{
 *     uuid?: string,
 *     content: array{name:string, foo:?stdClass},
 *   }
 * > $array
 */
$array = [
    0 => [
        'uuid' => '550e8400-e29b-41d4-a716-446655444000',
        'content' => [
            'name' => 'str',
            'foo' => null,
        ],
    ],
    1 => [
        'content' => [
            'name' => 'str',
            'foo' => new stdClass(),
        ],
    ],
    // ...
];
```

> We can use the PHP comments on arrays anywhere (class properties, function params, inline initialization…)

## Resources:

- [Psalm | Array Shapes](https://psalm.dev/docs/annotating_code/type_syntax/array_types/)
- [PHPStan | PHPDoc Types](https://phpstan.org/writing-php-code/phpdoc-types#array-shapes)
