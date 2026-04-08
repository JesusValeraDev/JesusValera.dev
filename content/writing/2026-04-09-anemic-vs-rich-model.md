+++
path = "2026-04-09-anemic-vs-rich-model"
title = "Anemic vs Rich Domain Model"
description = "anemic and rich domain models in PHP with practical examples"
date = 2026-04-09

[taxonomies]
tags = ['PHP', 'OOP', 'Design Patterns', 'DDD']

[extra]
static_thumbnail = "/images/2026-04-09/1.webp"
subtitle = "Where should business logic live?"
+++

![Potsdam windmill](/images/2026-04-09/1.webp)

When designing object-oriented applications, one of the first decisions is how to structure your domain models. Two contrasting approaches exist: the **Anemic Domain Model** and the **Rich Domain Model**.

## Anemic Domain Model

An anemic domain model is a model where objects contain only data (properties) with no behavior. Business logic lives in service classes that manipulate these data objects from the outside.

```php
final class User
{
    private string $email;
    private string $password;
    private bool $active;

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): void
    {
        $this->active = $active;
    }
}
```

The `User` class is a bag of getters and setters. It doesn't know what a valid email looks like, how passwords should be stored, or what "registering" means. All of that lives somewhere else:

```php
final class UserService
{
    public function register(User $user, string $email, string $password): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email');
        }

        $user->setEmail($email);
        $user->setPassword(password_hash($password, PASSWORD_DEFAULT));
        $user->setActive(true);
    }

    public function deactivate(User $user): void
    {
        $user->setActive(false);
    }
}
```

Nothing prevents other code from calling `$user->setEmail('not-an-email')` directly, bypassing validation entirely. The model can't protect its own invariants.

## Rich Domain Model

A rich domain model places business logic inside the domain objects themselves. The object encapsulates both data and the operations that can be performed on it.

```php
final readonly class Email
{
    public function __construct(
        public string $value,
    ) {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email');
        }
    }
}
```

```php
final class User
{
    private function __construct(
        private readonly Email $email,
        private readonly string $hashedPassword,
        private bool $active,
    ) {
    }

    public static function register(string $email, string $password): self
    {
        if (strlen($password) < 8) {
            throw new InvalidArgumentException('Password must be at least 8 characters');
        }

        return new self(
            new Email($email),
            password_hash($password, PASSWORD_DEFAULT),
            true,
        );
    }

    public function deactivate(): self
    {
        $copy = clone $this;
        $copy->active = false;

        return $copy;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function email(): string
    {
        return $this->email->value;
    }

    public function verifyPassword(string $password): bool
    {
        return password_verify($password, $this->hashedPassword);
    }
}
```

There is no way to create a `User` without going through `register()`, which enforces the rules. The `Email` value object rejects invalid values at construction time. `deactivate()` returns a new copy instead of mutating state.

The model protects itself.

## The antipattern debate

Martin Fowler called the anemic domain model an "[antipattern](https://martinfowler.com/bliki/AnemicDomainModel.html)" because it goes against a fundamental principle of OOP: combining data and behavior. If your objects are just data bags and your services do all the work, you're writing procedural code with extra steps.

Anemic models can be practical for simple CRUD applications where there's barely any business logic to encapsulate. A form that saves rows to a database doesn't need a rich domain.

But the moment you have rules like _"a user can't be deactivated twice"_, _"an email must be unique"_, or _"a discount can't exceed 50%"_, those rules belong in the model. Otherwise, they end up scattered across services, duplicated, and eventually contradicting each other.

For most applications with non-trivial logic, a rich domain model leads to code that is easier to test, harder to misuse, and simpler to reason about.
