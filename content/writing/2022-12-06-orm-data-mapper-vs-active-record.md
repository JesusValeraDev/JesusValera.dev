+++
path = "2022-12-06-orm-data-mapper-vs-active-record"
title = "ORM: Data Mapper vs Active Record"
description = "Overview between ORMs (Data Mapper vs Active Record) in PHP using Eloquent & Doctrine, which we will take a look at Repository Pattern and how it helps us."
date = 2022-12-06

[taxonomies]
tags = ["PHP", "Testing", "Orm", "Programming", "Refactoring"]

[extra]
static_thumbnail = "/images/2022-12-06/1.webp"
subtitle = "Which one is better and why?"
+++

![hiking in Grunewald](/images/2022-12-06/1.webp)

ORM stands for **Object-Relational Mapping**, that is, the technique that transforms Objects from OOP into rows in the
database and vice versa.

There are two patterns:

- **Active Record**: The record (entity) itself can actively change the DB
- **Data Mapper**: There is an external object that persists the entities

> I will skip everything related to the DB setup like the XML configuration files for the Data Mapper and the
_hasOne()_ / _hasMany()_ methods for the Active Record.

## Active Record

As I previously mentioned, the entity itself can be created, updated or deleted. In PHP for example, Eloquent is an
Active Record ORM developed by the Laravel community.

```php source
final class UserCreator
{
    public function create(UserInformation $userInfo): void
    {
        $address = Address::createFrom($userInfo->address());
        $address->save() # Address is stored in the database

        $user = User::createFrom($userInfo->user());
        $user->address = $address; // Set relationship
        $user->save(); # User is stored in the database
    }
}
```

# Data Mapper

In the data mapper, we need an external class that will update the DB. In PHP for example, Doctrine is the de facto Data
Mapper ORM for Symfony.

```php source
final class UserCreator
{
    public function __construct(
        private EntityManager $entityManager,
    ) {}

    public function create(UserInformation $userInfo): void
    {
        $address = Address::createFrom($userInfo->address());
        $user = User::createFrom($userInfo->user());
        $user->address = $address; # Set relationship

        # We persist all objects we want to update
        $this->entityManager->persist($address);
        $this->entityManager->persist($user);

        # Finally, flushing the entity manager will execute the SQLs
        $this->entityManager->flush();
    }
}
```

<div class="separator"></div>

So far, the code was very similar in both situations, you have to create a specific entity object, (for simplicity) we
used a `createFrom()` named-constructor in both snippets and we called `save()` or `persist()` and `flush()` depending
on the scenario.

Although, if you take a look at both snippets, you can see already the Data Mapper is using an external
dependency (`Entity Manager` object) which is odd and clearly, is harder if you decide to introduce some tests to
the `UserCreator` class, meanwhile in the `Active Record` class, the entities are saving themselves, so we don’t have
any dependency at a glance, but that is not completely true, the entity itself has knowledge of the DB, and it will be
difficult to write some tests if we use the `User` entity directly.

## Repository Pattern

The repository pattern is a design pattern that hides the database logic into a new class, exposing only the methods we
want to provide to the user.

In order to do this, we need to create an interface and a class that will implement the interface where we will drop all
logic.

```php source
# App/User/Domain
interface UserRepository
{
    public function save(UserInformation $userInfo): void;
}

~~~~

# App/User/Infrastructure
final class ActiveRecordUserRepository implements UserRepository
{
    public function save(UserInformation $userInfo): void
    {
        $address = Address::createFrom($userInfo->address());
        $address->save()

        $user = User::createFrom($userInfo->user());
        $user->address = $address;
        $user->save();
    }
}

final class DataMapperUserRepository implements UserRepository
{
    public function __construct(
        private EntityManager $entityManager,
    ) {}

    public function save(UserInformation $userInfo): void
    {
        $address = Address::createFrom($userInfo->address());
        $user = User::createFrom($userInfo->user());
        $user->address = $address;

        $this->entityManager->persist($address);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
```

So the last step is to define which class will be resolved when we inject our `UserRepository` interface, and finally,
our `UserCreator` will be like:

```php source
final class UserCreator
{
    public function __construct(
        private UserRepository $userRepository,
    ) {}

    public function create(UserInformation $userInfo): void
    {
        $this->userRepository->save($userInfo);
    }
}
```

Regarding tests, with the current `UserCreator` implementation, it would be really simple to add a unit test, but it
won’t make sense as the saving logic would be mocked, and the test would provide no value at all.<br>
A functional test where we check the user and the address was actually persisted in the database properly makes more
sense, but I will skip the test as it would add unnecessary complexity to the post 🙂
