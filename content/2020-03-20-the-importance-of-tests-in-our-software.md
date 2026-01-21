+++
title = "The importance of tests in our software"
description = "A list of reasons that support the importance of writing tests in software development."
date = 2020-03-20

[taxonomies]
tags = ['Testing', 'Programming', 'Scalability', 'Modularity', 'Refactoring', 'Quality']

[extra]
static_thumbnail = "/images/2020-03-20/1.webp"
subtitle = ""
+++

Writing tests is one of the most effective ways to ensure your software works as intended. Tests verify that each part
of your program functions correctly under different conditions, acting as a safety net that catches issues before they
reach production.

![programming comic joke](/images/2020-03-20/1.webp)


### Verification and Early Detection

Tests **verify correctness and catch bugs before they reach production**. The cost of fixing a bug increases
exponentially as it moves through the development lifecycle - a bug caught during development takes minutes to fix,
while the same bug in production can take days and could have a potential cost.

```php source
public function test_applies_discount_correctly(): void
{
    $result = $calculator->calculateDiscount(100, 20);

    self::assertSame(80, $result);
}
```

This simple test catches calculation errors, edge cases, and regressions immediately. Without it, bugs slip through to
QA or production where they're exponentially more expensive to fix.

### Safe Refactoring

Tests give you **confidence to improve code structure without breaking functionality**. Without tests, refactoring is
risky and developers avoid it, leading to code degradation over time.

```php source
// You can safely refactor this:
return $price - ($price * $percentage / 100);

// To this:
return $price * (100 - $percentage) / 100;

// Tests ensure the behavior remains identical
```

When your test suite passes, you know the refactoring didn't introduce bugs. This enables continuous improvement of the
codebase.

### Better Design and Documentation

Writing testable code forces you to **break code into smaller, independent components** with clear responsibilities.
Tests also serve as executable documentation showing how the code should be used.

```php source
public function test_order_workflow(): void
{
    $order = new Order($items);
    $order->applyDiscount(20);
    $order->addShipping(10);

    self::assertSame(90, $order->total());
}
```

This test documents the expected workflow and demonstrates the API. Anyone reading it understands how to use the `Order`
class without digging through implementation details.

## Common Mistakes When Writing Tests

### Testing Implementation Details

One of the most common mistakes is testing how something works instead of what it does. **Tests should verify behavior,
not implementation**. If you refactor the internal logic without changing the public API, your tests shouldn't break.

```php source
// BAD - Testing implementation details
public function test_uses_percentage_calculation(): void
{
    $calculator = $this->createPartialMock(PriceCalculator::class, ['getPercentageValue']);
    $calculator->expects($this->once())->method('getPercentageValue');

    $calculator->calculateDiscount(100, 20);
    // This test breaks when you refactor the internal logic
}

// GOOD - Testing behavior
public function test_applies_discount_correctly(): void
{
    $calculator = new PriceCalculator();

    $result = $calculator->calculateDiscount(100, 20);

    self::assertSame(80, $result);
    // This test only cares about the result, not how it's calculated
}
```

The first test will break if you change the internal implementation, even if the behavior remains correct. The second
test only verifies the outcome, making it more maintainable.

### Creating Brittle Tests

Tests that break whenever you make minor changes are worse than no tests at all. They slow down development and
eventually get ignored or deleted. Common causes include:

- Hardcoding values that should be dynamic
- Testing private methods directly
- Over-mocking dependencies
- Asserting on exact string matches instead of patterns

### Not Testing the Right Things

Some developers chase code coverage metrics without thinking about what they're actually testing. **You don't need to
test framework code, simple getters/setters, or language features**. Focus on business logic, edge cases, and error
handling.

<div class="separator"></div>

Tests are not just about finding bugs. They're about designing better software, maintaining confidence in your codebase,
and reducing the cost of change over time. The initial investment in writing tests pays off in the long run through
fewer production incidents, easier maintenance, and faster development cycles.
