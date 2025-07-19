+++
title = "Testing with Test Doubles?"
description = "Example of the types of Test Doubles: dummy, stub, spy, mock and fake"
date = 2020-06-11

[taxonomies]
tags = ['PHP', 'Testing', 'Mocking', 'Test Doubles', 'Stub']

[extra]
static_thumbnail = "/images/2020-06-11/1.webp"
subtitle = "Dummy, Stub, Spy, Mock or Fake"
+++

![parliament budapest](/images/2020-06-11/1.webp)

## Test Doubles

A Test Double is an object that can stand-in for a real object in a test, similar to how a stunt double stands in for an
actor in a movie.

As I wrote in [“The importance of the Tests in our Software”](/the-importance-of-tests-in-our-software), there are
several types of tests. They are also known as Test Doubles instead of “Mocks”.

### The five types of Test Doubles are:

![test types](/images/2020-06-11/2.webp)

- **Dummy**: It is used as a placeholder when an argument needs to be filled in.
- **Stub**: It provides fake data to the SUT (System Under Test).
- **Spy**: It records information about how the class is being used.
- **Mock**: It defines an expectation of how it will be used. It will cause failure if the expectation isn’t met.
- **Fake**: It is an actual implementation of the contract but is unsuitable for production.

![bodo istvan](/images/2020-06-11/3.webp)

> The snippets are a pseudo-language based on a mix of PHP & Java.<br>
> The idea is to make it understandable to everyone familiar with OOP.

## Dummy
The dummies are objects that our SUT depends on, but they are never used. We don’t care about them because they are
irrelevant to the test scope.

Let’s imagine we have a service with a dependency that is irrelevant in the current test. We can perform something
similar to the following snippet:

```java
final class Service
{
    public final String OUTPUT = 'something';

    public function format(?Dependency dependency): String
    {
        // 'dependency' won't interfere in the expected result.
        return self::OUTPUT;
    }

}

final class ServiceTest extends TestCase
{
    public function testFormat(): void
    {
        // Notice as the parameter is irrelevant.
        String result = (new Service()).format(null);
        self.assertSame(Service::OUTPUT, result);
    }
}
```

## Stub
A stub is an object which returns fake data.

Let’s imagine our service depends on a user model, then the service does something, and finally, it returns the user’s
UUID.
We can create a stub object with fake values to assert the service works as expected.

```java
final class Service
{
    public function doSomething(UserModelInterface user): Int
    {
        /* Do things */
        return user.uuid;
    }
}
```

To test this service, we can create a stub of the user and check if the response is what we were expecting.

```java
final class ServiceTest extends TestCase
{
    public function testDoSomething(): void
    {
        // The service needs a implementation from `UserModelInterface`.
        String uuid = (new Service()).doSomething(new UserStub());
        self.assertStringContainsString('0000-000-000-00001', uuid);
    }
}

interface UserModelInterface
{
    public function getUuid(): String;
}

final class UserStub implements UserModelInterface
{
    public function getUuid(): String
    {
        return '0000-000-000-00001';
    }
}
```
## Spy
A test spy is an object capable of capturing indirect output and providing indirect input as needed. The indirect output
is something we cannot directly observe.

_We can achieve that by extending the original class and saving the function params as class arguments._

In the following snippet, we can know exactly how many times the log() method has been called, as well as the content of
the messages.
The point of this spy is to have much more knowledge of the internal object state in exchange for deeper coupling, which
could be problematic in the future because it makes our tests more fragile.

```java
interface LoggerInterface
{
    public function log(String message): void;
}

final class LoggerSpy implements LoggerInterface
{
    public Array<String> messages = [];

    public function log(String message): void
    {
        this.messages.add(message);
    }
}

final class UserNotifier
{
    public function __construct(
        private LoggerInterface logger,
    ) {}

    public function registerUser(UserModelInterface user): void
    {
        this.logger.log("Notifying the user: {user.name()}");
        // ...
    }
}
```

The following would be the implementation of the spy in a test:

```java
final class UserNotifierTest extends TestCase
{
    public function testLogMessage(): void
    {
        LoggerSpy logger = new LoggerSpy();
        UserNotifier notifier = new UserNotifier(logger);
    
        User user = new User(name: 'Jesus');
        notifier.registerUser(user);
    
        self.assertStringContainsString(
            "Notifying the user: Jesus",
            logger.messages.firt()
        );
    }
}
```

## Mock
A mock is an object that is **capable of controlling both indirect input and output**, and it has a mechanism for
automatic **assertion of expectations and results**.

Imagine the ShoppingCart class calls the database and performs big and complex functions. For this reason, we cannot
unit test this class correctly due to the coupling.

```java
final class ShoppingService
{
    public function calculateAmount(Lines lines): Float
    {
        Float amount = 0;

        /** Complex code to test, we need a mock for this class */
        Array<Line> linesTransformed = ShoppingCart::transform(lines);
        foreach (Line line : linesTransformed) {
            amount += line.price();
        }

        return amount;
    }
}
```

In this kind of situations, mocking is the best option if we cannot modify this class easily (maybe the class is used in
different parts), and it could take too long to refactorize.

My favourite solution for this is “[extract method refactoring](https://refactoring.guru/extract-method)”:

```java
class ShoppingService // Not final anymore because of the mock!!
{
    public function calculateAmount(Lines lines): Float
    {
        Float amount = 0;

        /** Complex code to test, we need a mock for this class */
        Array<Line> linesTransformed = this.getShoppingCart(lines);
        foreach (Line line : linesTransformed) {
            amount += line.price();
        }

        return amount;
    }

    /**
     * Protected to have access in the mock object.
     *
     * @codeCoverageIgnore
     */
    protected function getShoppingCart(Lines lines): Array
    {
        return ShoppingCart::transform(lines);
    }
}
```

And this is the mock:

```java
final class LoggerTest extends TestCase
{
    public function testMovieBudgetFactory(): void
    {
        MockShoppingService service = this.createMock(ShoppingService::class);
        service
            .method('getShoppingCart') // Overriding the method.
            .willReturn([100, 200, 300]);

        Lines stubLines = new Lines(null);
        Float totalAmount = service.calculateAmount(stubLines);

        self.assertEquals(600, totalAmount);
    }
}
```

> This methodology is very handy when we want to refactor a class step-by-step, but we could go further and extract that
> logic in a new class, then when the class `ShoppingService` is created, just injecting the dependency via constructor
> would help us to separate the logic.

## Fake
A fake is a simpler implementation of real objects.

Fakes are used when we want to test an infrastructural class, in other words, fakes are for the classes which are beyond
our application limit (repositories or queues, for example).

As you can observe in the first picture (the diagram), a fake is not in the hierarchical line within the dummy, stub,
spy or mock. This is because a fake can behave like a dummy, stub, spy or mock for our concrete use case.

```java
interface UserRepositoryInterface
{
    public function getUserById(String uuid): User;
}
    
final class FakeUserRepository implements UserRepositoryInterface
{
    public function getUserById(String uuid): UserModel
    {
        return new User(uuid, 'Jesus', "['ADMIN_ROLE']");
    }
}
```

So, when we use this fake repository, we will receive a stub User.

### Final thoughts
We must know the scope of the code we are going to test to get coupled as less as possible.
That means if we have to pick a test double, first, we must know if the test is within our boundaries or not, if not, a
fake is the best option, otherwise, my recommendation is to pick the corresponding test with the least knowledge as
possible: dummy, stub, spy or mock (in that order).

<div class="separator"></div>

## References

- [Best practices — Testing | Chemaclass Github](https://github.com/Chemaclass/php-best-practices/blob/master/technical-skills/testing.md)
- [A better PHP testing experience | Matthias Noback](https://matthiasnoback.nl/2014/07/test-doubles/)
- [All about Mocking with PHPUnit | TutsPlus](https://code.tutsplus.com/tutorials/all-about-mocking-with-phpunit--net-27252)
- [The Little Mocker | Clean Coder](https://blog.cleancoder.com/uncle-bob/2014/05/14/TheLittleMocker.html)
- [Testing on the Toilet | Google Testing Blog](https://testing.googleblog.com/2013/07/testing-on-toilet-know-your-test-doubles.html)
- [TestDouble | Martin Fowler](https://martinfowler.com/bliki/TestDouble.html)
- [GivenWhenThen | Martin Fowler](https://martinfowler.com/bliki/GivenWhenThen.html)
