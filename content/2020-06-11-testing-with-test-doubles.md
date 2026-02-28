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

As I wrote in ["The importance of the Tests in our Software"](/the-importance-of-tests-in-our-software), there are
several types of tests. They are also known as Test Doubles instead of "Mocks".

### The five types of Test Doubles are:

![test types](/images/2020-06-11/2.webp)

- **Dummy**: A dummy is passed around but never actually used. It exists only to satisfy a parameter requirement. If your test inspects it, it stops being a dummy
- **Stub**: A stub provides predefined responses to calls made during the test. It doesn’t care how it’s used; it just returns canned data
- **Spy**: A spy records information about how it was used (for example, whether a method was called, with what arguments, and how many times). The test inspects the spy afterward
- **Mock**: A mock defines expectations up front about how it should be used and will fail automatically if those expectations aren’t met. The verification is built into the mock itself
- **Fake**: A fake is a working implementation of the interface, but simplified. It behaves realistically enough to run tests, but isn’t suitable for production (eg: in-memory database)

![bodo istvan](/images/2020-06-11/3.webp)

> The snippets are a pseudo-language based on a mix of PHP & Java.<br>
> The idea is to make it understandable to everyone familiar with OOP.

## Dummy
The dummies are objects that our SUT depends on, but they are never used. We don't care about them because they are
irrelevant to the test scope.

Let's imagine we have a service with a dependency that is irrelevant in the current test. We can perform something
similar to the following snippet:

```kotlin
final class Service
{
    public final String OUTPUT = 'something';

    public function format(dependency: Dependency?): String
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

Let's imagine our service depends on a user model, then the service does something, and finally, it returns the user's
UUID.
We can create a stub object with fake values to assert the service works as expected.

```kotlin
final class Service
{
    public function doSomething(user: UserModelInterface): Int
    {
        /* Do things */
        return user.uuid;
    }
}
```

To test this service, we can create a stub of the user and check if the response is what we were expecting.

```kotlin
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

```kotlin
interface LoggerInterface
{
    public function log(message: String): void;
}

final class LoggerSpy implements LoggerInterface
{
    public Array<String> messages = [];

    public function log(message: String): void
    {
        this.messages.add(message);
    }
}

final class UserNotifier
{
    public function __construct(
        private LoggerInterface logger,
    ) {}

    public function registerUser(user: UserModelInterface): void
    {
        this.logger.log("Notifying the user: {user.name()}");
        // ...
    }
}
```

The following would be the implementation of the spy in a test:

```kotlin
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

The key difference between a mock and a stub is that a mock **verifies behavior**: it sets expectations about how the
collaborator should be used (which methods are called, how many times, with what arguments) and the test **fails if
those expectations aren't met**.

Imagine we have a `PaymentService` that processes payments and must notify the user via email after a successful
payment. We want to verify that the notification is actually sent.

```kotlin
interface NotificationServiceInterface
{
    public function sendEmail(to: String, subject: String, body: String): void;
}

final class PaymentService
{
    public function __construct(
        private NotificationServiceInterface notifier,
    ) {}

    public function processPayment(user: User, amount: Float): void
    {
        // Process the payment...
        
        // Notify the user
        this.notifier.sendEmail(
            user.email(),
            "Payment Confirmed",
            "Your payment of {amount} has been processed."
        );
    }
}
```

In this test, we use a mock to **verify that `sendEmail()` is called exactly once** with the expected arguments.
If the method isn't called, or is called with wrong arguments, the test fails:

```kotlin
final class PaymentServiceTest extends TestCase
{
    public function testProcessPaymentSendsNotification(): void
    {
        User user = new User(email: 'jesus@example.com');

        MockNotificationService notifier = this.createMock(NotificationServiceInterface::class);
        notifier
            .expects(this.once()) // Expectation: must be called exactly once!
            .method('sendEmail')
            .with(
                'jesus@example.com',
                'Payment Confirmed',
                this.stringContains('100.00')
            );

        PaymentService service = new PaymentService(notifier);
        service.processPayment(user, 100.00);

        // No assertion needed! The mock itself verifies the expectation.
        // If sendEmail() wasn't called (or called incorrectly), the test fails.
    }
}
```

> Notice that unlike stubs (which just return fake data), mocks **verify interactions**. The `expects(this.once())`
> sets up an expectation that will be automatically verified when the test ends. This is powerful for testing
> side effects like sending emails, logging, or calling external services.

## Fake
A fake is a simpler implementation of real objects.

Fakes are used when we want to test an infrastructural class, in other words, fakes are for the classes which are beyond
our application limit (repositories or queues, for example).

As you can observe in the first picture (the diagram), a fake is not in the hierarchical line within the dummy, stub,
spy or mock. This is because a fake can behave like a dummy, stub, spy or mock for our concrete use case.

```kotlin
interface UserRepositoryInterface
{
    public function getUserById(uuid: String): User;
}
    
final class FakeUserRepository implements UserRepositoryInterface
{
    public function getUserById(uuid: String): UserModel
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
