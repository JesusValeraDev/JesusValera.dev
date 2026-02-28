+++
path = "2030-01-01-anemic-vs-rich-model"
title = "Anemic vs Rich Domain Model"
description = "Understanding the differences between anemic and rich domain models in object-oriented programming"
date = 2026-01-01
draft = true

[taxonomies]
tags = ['PHP', 'OOP', 'Design Patterns']

[extra]
static_thumbnail = "/images/2025-03-20/1.webp"
subtitle = ""
+++

# Anemic Domain Model vs Rich Domain Model

When designing object-oriented applications, one critical decision is how to structure your domain models. Two contrasting approaches are the **Anemic Domain Model** and the **Rich Domain Model**. Understanding their differences helps you write more maintainable and expressive code.

## What is an Anemic Domain Model?

An anemic domain model is a model where objects contain only data (properties) with little or no behavior (methods). Business logic is typically separated into service classes that manipulate these data objects.

### Characteristics

- Objects act as simple data containers (DTOs - Data Transfer Objects)
- Getters and setters for all properties
- Business logic lives in external service classes
- Models don't validate their own state

### Example

```php source
class User
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

// Business logic in a separate service
class UserService
{
    public function register(User $user, string $email, string $password): void
    {
        // Validation logic
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email');
        }

        // Business logic
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

## What is a Rich Domain Model?

A rich domain model places business logic and behavior directly within the domain objects. Objects encapsulate both their data and the operations that can be performed on that data.

### Characteristics

- Objects contain business logic
- Encapsulation of data and behavior
- Self-validating objects
- Methods represent domain operations
- Immutability where appropriate

### Example

```php source
class User
{
    private function __construct(
        private string $email,
        private string $hashedPassword,
        private bool $active,
    ) {
    }

    public static function register(string $email, string $password): self
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email');
        }

        if (strlen($password) < 8) {
            throw new InvalidArgumentException('Password must be at least 8 characters');
        }

        return new self(
            $email,
            password_hash($password, PASSWORD_DEFAULT),
            true
        );
    }

    public function deactivate(): self
    {
        return new self(
            $this->email,
            $this->hashedPassword,
            false
        );
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function verifyPassword(string $password): bool
    {
        return password_verify($password, $this->hashedPassword);
    }
}
```

## Key Differences

| Aspect                | Anemic Model          | Rich Model                   |
|-----------------------|-----------------------|------------------------------|
| Business Logic        | In service classes    | Within domain objects        |
| Validation            | External              | Self-validating              |
| Encapsulation         | Weak (public setters) | Strong (controlled access)   |
| Object Role           | Data container        | Behavior + Data              |
| Testability           | Test services         | Test domain objects directly |
| Domain Expressiveness | Low                   | High                         |

## When to Use Each Approach

### Use Anemic Model When

- Working with simple CRUD operations
- Building data-centric applications
- Using frameworks that expect DTOs
- Rapid prototyping or MVPs

### Use Rich Model When

- Building complex business applications
- Implementing Domain-Driven Design (DDD)
- Need strong business rule enforcement
- Prioritizing maintainability and expressiveness

## The Anti-Pattern Debate

Martin Fowler famously called the anemic domain model an "[anti-pattern](https://martinfowler.com/bliki/AnemicDomainModel.html)" because it violates the fundamental principle of object-oriented programming: combining data and behavior.

However, the anemic model can be pragmatic for simple applications where the overhead of rich models isn't justified.

## Conclusion

The choice between anemic and rich domain models depends on your application's complexity and requirements. Rich domain models offer better encapsulation and expressiveness for complex business logic, while anemic models can be simpler for data-centric applications.

For most business applications with non-trivial logic, a rich domain model is the better choice, leading to more maintainable and testable code.
