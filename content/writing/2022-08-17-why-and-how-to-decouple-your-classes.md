+++
path = "2022-08-17-why-and-how-to-decouple-your-classes"
title = "Why and How to decouple your classes"
description = "Some frameworks embrace you to using their own helpers, but this has some negative impact on your code and we will take a look at it in this post."
date = 2022-08-17

[taxonomies]
tags = ['PHP', 'Solid', 'Decoupling', 'Dependency Inversion', 'OOP']

[extra]
static_thumbnail = "/images/2022-08-17/1.webp"
subtitle = "with a real decoupling example"
+++

![caravaca-fuentes-marques-1](/images/2022-08-17/1.webp)

There are some ways to couple your code, some frameworks like Laravel embrace you to do using their own _façades_ or
even using _ORM_ as _ActiveRecord_, but this is also possible using PHP native methods like `time()` beyond others.

Unfortunately, in the long run, if you don't invert the dependencies, the code will get messy faster/easier, hurting
your application. To avoid this, you must write tests. Writing tests help you realize how coupled is your business logic
to infrastructure code.

## Examples of classes that should be decoupled

### Belongs to the Programming language itself like

- I/O functions like `fopen()`, `file_exists()`, `file_put_contents()`…
- Network related like `curl_init()`, `http_response_code()`, `setcookie()`…
- Relative to time like `date()`, `time()`, `microtime()`…
- System like `getenv()`, `exec()`, `system()`…

### Belongs to the infrastructure code like

- Framework classes like Laravel Façades
- Database (Active Record or raw queries instead of `Repository` pattern)
- Third-party services like `Monolog`, `Mandrill`, `Salesforce`…

## Decoupling a real example

For the next example, let’s try to use a Laravel facade and a PHP function.

Imagine we have the following service, and we really want to invert the dependencies. As you can see, we have the
`trans()` facade and the `date()` PHP function.

```php source
namespace App\Application;

final class WelcomeService
{
    /**
     * Output: "hello {$name} @ {Y-m-d}"
     */
    public function welcome(string $name): string
    {
        return trans('messages.welcome', [
            'name' => $name,
            'date' => date('Y-m-d'),
        ]);
    }
}
```

The first thing we should do is to move the `trans()` Laravel function logic to a different place, in order to do that,
we have to invert the dependencies introducing a new interface as follows:

```php source
namespace App\Domain;

interface Translator
{
   public function trans(string $message, string ...$placeholders): string;
}
```

And place in a new class (which belongs to infrastructure layer) the original Laravel implementation.

```php source
namespace App\Infrastructure;

final class LaravelTranslator implements Translator
{
   public function trans(string $message, string ...$placeholders)
   {
      return trans($message, ...$placeholders);
   }
}
```

From now on, we are able to switch the translator implementation between Laravel or a third-party one by implementing
the `Translator` interface.

We can inject the new `LaravelTranslator` service in our `WelcomeService` defining in the service container
which implementation we want to resolve when the framework faces the `Translator` in the constructor.

```php source
namespace App\Application;

final class WelcomeService
{
    public function __construct(
        private Translator $translator,
    ) {}

    public function welcome(string $name): void
    {
        return $this->translator->trans(
            'messages.welcome',
            ['name' => $name, 'date' => date('Y-m-d')],
       );
    }
}
```

The next step is to do the same but with the `date()` method.

```php source
namespace App\Domain;

interface Date
{
   function toString(): string;
}
```

And the PHP implementation:

```php source
namespace App\Infrastructure;

final class SystemDate implements Date
{
    public function toString(): string
    {
        return date('Y-m-d');
    }
}
```

Let’s do the same as we did previously, but this time we can inject our own `SystemDate` implementation through the
`Date` interface.

```php source
namespace App\Application;

final class WelcomeService
{
    public function __construct(
        private Translator $translator,
        private Date $date,
    ) {}

    public function welcome(string $name): void
    {
        return $this->translator->trans(
            'messages.welcome',
            ['name' => $name, 'date' => $this->date->toString()],
       );
    }
}
```

Finally, we can create a test for the `WelcomeService` injecting the required dependencies.

```php source
final class WelcomeServiceTest extends TestCase
{
    public function test_welcome(): void
    {
        $translate = new LaravelTranslator(); // Real implmentation

        $date = $this->createStub(Date::class); // Fake implementation
        $date->method('toString')->willReturn('2022-02-22');

        $name = 'World';

        $service = new WelcomeService($translate, $date);
        $response = $service->welcome($name);

        self::assertSame('hello World @ 2022-02-22', $response);
    }
}
```

> Ideally we should write the test first, later the real implementation

## Conclusion

Decoupling your classes is a good practice that will help you to maintain your codebase in the long run.<br>
It will also help you not only to switch between different implementations of the same interface in case you decided to
change the framework or the third-party service but also to test your code in a more efficient way.

![caravaca-fuentes-marques-2](/images/2022-08-17/2.webp)