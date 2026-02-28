+++
path = "2022-10-21-how-does-the-service-container-work"
title = "How does the Service Container work?"
description = "What is a service container and how does it work? Let's answer these questions and create one from scratch"
date = 2022-10-21

[taxonomies]
tags = ['Service Container', 'Binding', 'Laravel', 'Symfony', 'Programming']

[extra]
static_thumbnail = "/images/2022-10-21/1.webp"
subtitle = ""
+++

![acropolis greece](/images/2022-10-21/1.webp)

A _Service Container_ is basically a class that behaves like a _box_, we can think of it as a _singleton_ object (but it
is not, it is simply an object that is instantiated by the framework while it is being bootstrapped), on which we can
declare all of our dependencies to be resolved automatically by the framework.

The role of a _Service Container_ is to define which classes (with their inner dependencies) should be resolved
automatically.

Usually, frameworks like Symfony or Laravel brings already a bunch of interfaces that will resolve automatically
specific classes. So, for `\Psr\Log\LoggerInterface` there is somewhere a class that implements this interface
like `Monolog` or any other.

Let's imagine we have a service whose dependency is a `UserRepository` (this dependency belongs to our use case, so it
is not defined in the framework), additionally, depending on the environment, we want to inject
a `PostgreSQLUserRepository` or a `InMemoryUserRespository` instance.

> This post will be based on the two most popular PHP frameworks (Symfony & Laravel), but the idea works for any other
> programming language/framework.

## Symfony

We can define our services as `php` or `yaml` file extension (you can define this configuration directly in
the `src/Kernel.php` file).

```php source
# config/services.php
namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return function(ContainerConfigurator $containerConfigurator) {
    $services = $containerConfigurator->services();

    $services->set(
        \App\Domain\UserRepository::class,
        \App\Infrastructure\PostgreSQLUserRepository::class
    );
};
```

Alternatively, we can define a different instance for the _testing_ environment:

```php source
# config/services_test.yml
namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return function(ContainerConfigurator $containerConfigurator) {
    $services = $containerConfigurator->services();

    $services->set(
        \App\Domain\UserRepository::class,
        \App\Infrastructure\InMemoryUserRespository::class
    );
};
```

## Laravel

In Laravel, however, you can do this in the `AppServiceProvider` class.

```php source
namespace App\Providers;

final class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        if (env('APP_ENV') === 'test') {
            $this->app->bind(
                App\Domain\UserRepository::class,
                App\Infra\InMemoryUserRespository::class
            );
        } else {
            $this->app->bind(
                App\Domain\UserRepository::class,
                App\Infra\PostgreSQLUserRepository::class
            );
        }
    }

    public function boot(): void
    {
        // ...
    }
}
```

### Injecting the dependencies in our services

So, from now on, the next time we try to inject our interface `UserRepository` as a dependency in the constructor of
another class, eg:

```php source
final class UserCreator
{
    public function __construct(
        private UserRepository $userRepository,
    ) {}

    // ...
}
```

The framework will handle it, checking firstly if we defined in our service provider the injected class and creating a
new instance of it. In case this class has any dependency, the framework will resolve them automatically recursively by
reflection until the class is ready, in case any dependency cannot be resolved or the dependency is a primitive, and we
didn't define the value, it will throw an exception.

<div class="separator"></div>

Let’s go deeper into the technical details, how could you create such a dependency resolver? This is how we did in
Gacela ([link](https://github.com/gacela-project/container/blob/d3f0714306cbe1e77707741a4146411d84539f2a/src/Container/DependencyResolver.php)),
and this is a simplified version of it:

```php source
final class DependencyResolver
{
    /** @var array<class-string,mixed> */
    private array $container;

    public function resolve(string $className): object
    {
        $reflectionClass = new ReflectionClass($className);
        $constructor = $reflectionClass->getConstructor();

        # If constructor is empty, we can do a `new $className()`
        if (null === $constructor) {
            return $reflectionClass->newInstance();
        }

        # If not empty, let's resolve the class dependencies
        $dependencies = [];
        foreach ($constructor->getParameters() as $parameter) {
            $paramName = $parameter->getType()?->getName();
            $dependencies[] = $this->container[$paramName]
                ?? $this->resolve($paramName); # 🌀 Recursion
        }

        # Finally, we store in the container the resolved class
        $class = $reflectionClass->newInstanceArgs($dependencies);
        $this->container[$className] = $class;

        return $class;
    }
}
```

This is the idea of what a framework does under the hood; ideally, we should use a cache layer.
Using reflection takes a lot of resources, and it is very slow; additionally, we are not taking into consideration
different scenarios like what to do depending on whether the resolved parameter is a primitive or even a callable.

![parthenon greece](/images/2022-10-21/2.webp)

## Reference:

- [Symfony — Service Container](https://symfony.com/doc/current/service_container.html)
- [Laravel — Service Container](https://laravel.com/docs/9.x/container#binding-primitives)
- [Gacela — Bindings](https://gacela-project.com/docs/bootstrap/#bindings)