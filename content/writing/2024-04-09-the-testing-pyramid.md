+++
path = "2024-04-09-the-testing-pyramid"
title = "The testing pyramid"
description = "A post about the testing pyramid and its importance in the software development. The importance of the unit tests, integration tests and UI tests."
date = 2024-04-09

[taxonomies]
tags = ['Programming', 'Test', 'Cohn', 'Pyramid', 'Unit', 'Integration']

[extra]
static_thumbnail = "/images/2024-04-09/1.webp"
subtitle = "How to structure your test suite 🗼"
+++

The Testing Pyramid (also known as _Cohn Pyramid_) visualizes the ideal distribution of different types of tests. It has
three layers: **Unit** at the base, **Integration** in the middle, and **E2E** tests on top.

The pyramid shape matters. As you move up, tests become slower, more expensive, and more brittle. But they also provide
more confidence that the system works as a whole. The key is balancing speed and cost at the bottom with confidence at
the top.

![cohn-pyramid](/images/2024-04-09/1.webp)

## Unit Tests (50-60%)

Unit tests are small, focused tests that validate individual components in isolation. They're fast to run and cheap to
maintain.

They verify that each function, method, or class behaves correctly under different conditions. Because they run in
milliseconds, you can run them constantly during development.

```php source
public function test_calculate_discount(): void
{
    $calculator = new PriceCalculator();

    $result = $calculator->calculateDiscount(100, 20);

    self::assertSame(80, $result);
}
```

Unit tests should form the foundation of your test suite. They're the fastest feedback loop - run them on every save.
They also force better design by making you write testable code with clear dependencies.

The majority of your edge cases, error handling, and boundary conditions should be covered at this level. Testing a
division by zero? Unit test. Testing negative numbers? Unit test. Don't push these scenarios up to slower test layers.

## Integration Tests (20-40%)

Integration tests verify interactions between different components or modules. They're broader than unit tests and may
involve multiple layers of the application, such as database interactions or API endpoints.

These tests catch integration issues - problems that appear when components that work individually fail when combined.

```php source
public function test_create_order_persists_to_database(): void
{
    $orderService = new OrderService($this->database);

    $order = $orderService->createOrder($items, $userId);

    $persisted = $this->database->findOrder($order->id);
    self::assertEquals($order->total, $persisted->total);
}
```

Integration tests are slower because they involve real dependencies - databases, file systems, external services. They
catch issues like incorrect SQL queries, serialization problems, or misconfigured connections.

Don't test every possible scenario at this level. Test the happy path, major error cases, and critical workflows. Leave
the edge cases to unit tests.

## E2E Tests (0-10%)

End-to-end tests interact with the application as a user would, typically using tools like Selenium or Cypress. They're
the slowest and most brittle tests, but they validate complete user flows from start to finish.

```javascript
test('user can complete checkout', async ({ page }) => {
    await page.goto('/products');
    await page.click('text=Add to Cart');
    await page.click('text=Checkout');
    await page.fill('#card-number', '4242424242424242');
    await page.click('text=Pay');

    await expect(page.locator('text=Order confirmed')).toBeVisible();
});
```

E2E tests are expensive to write and maintain. They break when CSS classes change, when animations slow down rendering,
or when network latency increases. A single E2E test can take 10-30 seconds to run, compared to milliseconds for unit
tests.

Use them only for critical user journeys. Authentication flow? Yes. Checkout process? Yes. Every possible form
validation error? No - test those at the unit level.

## The Anti-Pattern: Inverted Pyramid

Some teams end up with an inverted pyramid - mostly E2E tests, few unit tests. This happens when developers skip unit
testing and rely on E2E tests to catch everything.

The result of that are slow test suites that take 30+ minutes to run, frequent false positives from flaky tests, and
difficulties with debugging because failures don't point to specific components.

If your test suite takes more than a few minutes to run, you probably have too many integration or E2E tests.

<div class="separator"></div>

These percentages vary depending on your project. Legacy codebases coupled with third-party libraries often make unit
tests difficult to write.

For legacy projects, invert the pyramid temporarily. Start with Integration or E2E tests to prevent breaking existing
functionality. Once you have this safety net, refactor the code and add unit tests. The broader tests give you
confidence to make changes, while also teaching you how the system works.

Eventually, migrate toward the proper pyramid. As you refactor and decouple the code, add unit tests and remove the
broader tests that become redundant.

The goal is still a fast, maintainable test suite dominated by unit tests.
