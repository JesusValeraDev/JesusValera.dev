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

Currently, it is not possible to define explicit array types as other programming languages do as Java does.

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
2. List Shape: `array<int,mixed>` & `list<mixed>`
3. Object Shape: `array{0:int, foo:?string, bar:mixed}`

## The Legacy way

This is a fashioned way to define a list of elements from a certain type, the problem is it becomes ambiguous, and
clients that use this kind of list cannot know if keys are integers, floats or strings.
Also, static analyzers will not fail if you try to get an element by key with an incorrect type, in these scenarios, I
would suggest using `array<int,mixed>`.

In the end, the more explicit, the better.

```php source
/** @var User[] $users */
$users = [ ... ];

# Are keys auto-incremental integers, random numbers, maybe strings... ?
$firstUser = $users[ ? ];

# Static analyzers won't complain if you use an incorrect type 🤕
```

# List Shape

We use lists when we have an array of elements with the same type.<br>
We use the **diamond syntax** to declare the types of the key and the value: `array<int,mixed>`.

> 💡There is a very handy shortcut when the key is an auto-incremental integer: `list<mixed>`.

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
['hello', 'world', new stdClass, false];
```

It will be addressed internally as follows:

```php source
list{string, string, stdClass, false}
```

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

There are multiple advantages when using these PHP comments, not only provide better feedback on the array shape to the developers but IDEs will suggest auto-completion when iterating on individual elements!

<div class="separator"></div>

Of course, it is possible to represent any complex array structure in PHP with these PHP comments. Example:

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
        'uuid' => 'XXXX-XXX-XXX-XXXX',
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
