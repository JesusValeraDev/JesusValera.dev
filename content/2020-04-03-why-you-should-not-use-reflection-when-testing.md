+++
title = "Why you should not use Reflection when testing"
description = "Do our tests get fragile when we use reflection? Do we get coupled to our code when we use it? Which alternatives do we have instead? Is it a good practice?"
date = 2020-04-03
aliases = ['is-it-a-good-idea-to-use-reflection-while-testing']

[taxonomies]
tags = ['PHP', 'Testing', 'Reflections', 'Architectural Design', 'Programming']

[extra]
static_thumbnail = "/images/2020-04-03/1.webp"
subtitle = "with some code examples"
+++

![Kazimierz](/images/2020-04-03/1.webp)

## It causes bugs when refactoring due to the high coupling

When we use reflection, our tests get too fragile, we are allowing our tests to know so much information about the real
implementation.
We need to hardcode the method name, and we are coupling our test method to the production code.
Furthermore, we need to write a lot about boilerplate to test a simple method.

- **Question**: I need to get at least 80% of code coverage, how can I get it without the Reflection class?
- **Answer**: You should test ONLY your public methods, and depending on the variables we pass, we should reach all the
  possible paths.

So, we do not need to test the private methods per se; they are called indirectly from our public functions.

## Comparison between standard and Reflection tests

```php source
final class Addition
{
    public function simpleOperation(int $number1, int $number2): int
    {
        return $number1 + $number2;
    }
}

final class Operation
{
    public function addition(int $number1, int $number2): int
    {
        return (new Addition())->simpleOperation($number1, $number2);
    }
}

final class OperationTest
{
    // Without Reflection.
    public function testSimpleOperationWithoutReflection(): void
    {
        $operation = new Operation();
        $this->assertSame(4, $operation->addition(2, 2));
    }

    // With Reflection.
    public function testSimpleOperationWithReflection(): void
    {
        $addition = $this->createPartialMock(Addition::class, [
            'simpleOperation',
        ]);

        $result = 2 + 2;
        $addition
            ->expects($this->once())
            ->method('simpleOperation')
            ->willReturn($result);

        $operation = new \ReflectionClass(Operation::class);
        $reflection = $operation->invoke($addition);

        $this->assertSame($result, $reflection->addition());
    }
}
```

What would happen if we modified the `simpleOperation()` method from the Addition class to the following, and we run the
tests?

```php source
final class Addition
{
   public function simpleOperation(int $number1, int $number2): int
   {
       return $number1 - $number2;
   }
}
```

- **Question**: Will the ‘standard’ fail? What about the Reflection one?
- **Answer**: The standard will fail because we expect 4 as a result, but we got a 0.
  However, the reflection will pass, because we are not focusing on the real implementation, we are creating a false
  positive which can be dangerous.

## Dealing with some problems when not using Reflection

Let me show you a more realistic example (idea from 
[PHPTheRightWay](https://phptherightway.com/pages/Design-Patterns.html)):

```php source
final readonly class Vehicle
{
    public string $model;
    public int $price;

    public function __construct(string $model)
    {
        $this->model = $model;
        $this->price = random_int(1000, 3000);
    }
}
```

To test the vehicle’s model is easy, but what about the price?

```php source
public function testModel(): void
{
    $model = 'Seat';
    $vehicle = new Vehicle($model);

    $this->assertSame($model, $vehicle->model());
}

public function testPrice(): void
{
    $model = 'Seat';
    $vehicle = new Vehicle($model);

    $this->assertSame( ¿¿?? , $vehicle->price());
}
```

One possible solution could be using the Reflection class to be able to set explicitly the price like:

```php source
public function testGetPrice(): void
{
     /** @var Vehicle|MockObject $vehicle */
     $vehicle = $this->createPartialMock(Vehicle::class, []);

     $reflection = new \ReflectionProperty(Vehicle::class, 'price');
     $reflection->setAccessible(true);
     $price = 200;
     $reflection->setValue($vehicle, $price);

     $this->assertSame($price, $vehicle->price());
}
```

But our Vehicle class is final, so we cannot perform this test, also, we said we shouldn’t use the Reflection class, so,
probably we are doing something wrong in this class (TIP: you should make **final** your classes by default 😉).

- **Question**: So what is the problem here?
- **Answer**: The problem here is that we are performing an action inside the class (on the constructor) to which we do not
  have access from the outside.

One solution could be to inject the value in the constructor like:

```php source
final readonly class Vehicle
{
    public function __construct(
        public string $model,
        public int $price,
    ) {
    }
}
```

And when we want to create this class, we could pass the final price as:

```php source
$vehiclePrice = random_int(1000, 3000);
$vehicle = new Vehicle(‘Seat’, $vehiclePrice);
```

So, our price test could be like:

```php source
public function testPrice(): void
{
    $price = 200;
    $vehicle = new Vehicle('foo', $price);

    $this->assertSame($price, $vehicle->price());
}
```

To sum up, I don’t recommend using the Reflection class anywhere in your code unless you are very aware of what you are
doing, usually, there are alternative implementations to what you want to achieve without using it.

![stone figures](/images/2020-04-03/2.webp)

Additionally, defining our classes as `final` helps us to have a better design, not only because it forbid us the use of
Reflection, but also it prevents us from mocking our business logic, which is good.
