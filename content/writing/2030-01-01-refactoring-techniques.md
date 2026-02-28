+++
path = "2030-01-01-refactoring-techniques"
title = "Refactoring Techniques in PHP"
description = "abcabcabcabcabca"
date = 2026-01-01
draft = true

[taxonomies]
tags = ['PHP', 'refactoring']

[extra]
static_thumbnail = "/images/2025-03-20/1.webp"
subtitle = ""
+++

In many cases, when we work with PHP code, we find that it’s overly complex, hard to read, or difficult to maintain.
Let’s explore a range of refactoring techniques (many of them inspired by Martin Fowler’s book: [_**Refactoring**_](https://martinfowler.com/books/refactoring.html)) to understand why they’re helpful and how they can help us improve the quality of our code.
Each technique will include a brief explanation, guidance on when to apply it, its potential risks and benefits, and a small before-and-after example written in PHP.

Later on, we will cover a practical example in which we need to use some of the following techniques.

Here is a list of some refactoring techniques commonly used in PHP development. Each one focuses on improving readability, maintainability, and design clarity:

1. **Extract Function** - Break down large functions into smaller, well-named ones
2. **Extract Class** - Split a large class into smaller, more cohesive classes
3. **Inline Function / Inline Variable** - Simplify the code by removing unnecessary indirection
4. **Move Method / Move Field** - Relocate methods or properties to the class where they logically belong
5. **Replace Conditional with Polymorphism** - Simplify complex conditionals by leveraging object-oriented principles
6. **Introduce Parameter Object** - Group related parameters into a single object
7. **Eliminate Duplication** - Remove repeated code to promote reuse and consistency
8. **Encapsulate Field** - Protect data integrity by providing controlled access through getters and setters
9. **Introduce Null Object** - Replace null references with a neutral, default object to simplify logic
10. **Replace Magic Number with Constant** - Use named constants to make code clearer and easier to maintain
11. **Guard Clauses (Early Returns)** - Use early returns to reduce nesting and clarify control flow
12. **Replace Method with Method Object** - Turn a complex method into a separate object for easier modification and testing
13. **Introduce Dependency Injection** - Improve flexibility and testability by externalizing dependencies
14. **Split Temporary Variable / Rename Variable** - Avoid variable reuse and use descriptive names to clarify intent
15. **Rename Variable / Method** - Improve readability by giving meaningful, self-explanatory names
16. **Replace Array with Object** - Use objects instead of associative arrays for clearer structure and behavior
17. **Simplify boolean expressions** - Refactor complex boolean logic into named functions or simpler expressions

## 1. Extract Function

- **What it is**: Move a coherent block of code that performs a specific task into a well-named function.
- **When to use**: When a function or method is too long, or it contains a block of code with its own responsibility.
- **Benefits**: Improves readability, promotes reuse, and makes testing easier.
- **Risks**: Extracting functions that rely on multiple local variables can lead to long parameter lists, which may reduce readability instead of improving it.

### Before

```php source
function processOrder(array $order): void
{
    // calculate total price with vat and discount
    $subtotal = 0;
    foreach ($order['items'] as $item) {
        $subtotal += $item['price'] * $item['quantity'];
    }

    $vat = $subtotal * 0.19;
    $discount = ($subtotal > 1000) ? 50 : 0;

    $total = $subtotal + $vat - $discount;

    // rest of the processing
}
```

### After

```php source
function processOrder(array $order): void
{
    $total = $this->calculateTotalWithVat($order['items']);

    // rest of the processing
}

function calculateTotalWithVat(array $items): float
{
    $subtotal = 0;
    foreach ($items as $item) {
        $subtotal += $item['price'] * $item['quantity'];
    }
    $vat = $subtotal * 0.19;
    $discount = ($subtotal > 1000) ? 50 : 0;

    return $subtotal + $vat - $discount;
}
```

## 2. Extract Class

- **What it is**: When a class has too many responsibilities, move part of its state and behavior into a new class.
- **When to use**: A class has multiple reasons to change (low cohesion). When a group of methods frequently use the same variables.
- **Benefits**: Better cohesion, clearer separation of responsibilities, and easier testing.
- **Risks**: Splitting too aggressively can lead to excessive small classes that make navigation harder, increasing coupling.

### Before

```php source
class User
{
    public function __construct(
        private string $id,
        private string $name,
        private array $address, // array with primitive data
    ) {}

    // other methods...

    public function calculateShippingCost(): float
    {
        // calculates using $this->address...
    }
}
```

### After

```php source
class User
{
    public function __construct(
        private string $id,
        private string $name,
        private Address $address,
    ) {}

    // other methods...

    public function calculateShippingCost(): Address
    {
        return $this->address->calculateShippingCost();
    }
}

class Address
{
    public function __construct(
        private string $street,
        private string $city,
        private int $postalCode,
    ) {}

    public function calculateShippingCost(): float
    {
        // shipping cost logic
    }
}
```

## 3. Inline Function / Inline Variable

- **What it is**: Remove a function or variable that no longer adds clarity, and replace its usage with the original expression or value.
- **When to use**: The function or variable is trivial, and its name doesn’t improve understanding.
- **Benefits**: Less indirection, fewer unnecessary files or functions.
- **Risks**: May reduce clarity if a meaningful name is lost.

### Before

```php source
if (isAdult($user->age)) {
    // ...
}

function isAdult(int $age): bool
{
    return $age >= 18;
}
```

### After

```php source
if ($user->age >= 18) {
    // ...
}
```

## 4. Move Method / Move Field

- **What it is**: If a method primarily uses data from another class, move it to that class. The same applies to fields.
- **When to use**: When a method or field depends more on another class than on the one it currently belongs to.
- **Benefits**: Improves the logical placement of behavior and reduces coupling.
- **Risks**: Can break encapsulation or create unwanted dependencies.

### Before

A method in `Order` that calculates a rate using the `User` class.

```php source
class Order
{
    private User $user;

    public function calculateUserDiscount(): float
    {
        return $this->user->getLevel() * 0.05;
    }
}
```

### After

The calculation logic is now inside the `User` class.

```php source
class Order
{
    private User $user;

    public function calculateUserDiscount(): float
    {
        return $this->user->calculateDiscount();
    }
}

class User
{
    private float $level;

    public function calculateDiscount(): float
    {
        return $this->level * 0.05;
    }
}
```

## 5. Replace Conditional with Polymorphism

- **What it is**: Replace large conditional statements (switch / if) that depend on type or behavior with a class hierarchy implementing the variations.
- **When to use**: When multiple branches of a conditional depend on a "type" or "mode."
- **Benefits**: Allows adding new variants without modifying the conditional; improves adherence to the Open/Closed Principle.
- **Risks**: Can introduce unnecessary complexity if there are only a few cases.

### Before

```php source
function calculateFinalPrice(Product $product): float
{
    if ($product->type === 'digital') {
        return $product->price;
    } elseif ($product->type === 'physical') {
        return $product->price + 5; // fixed shipping
    }
}
```

### After

```php source
abstract class Product
{
    protected float $price;

    abstract public function finalPrice(): float;
}

class DigitalProduct extends Product
{
    public function finalPrice(): float
    {
        return $this->price;
    }
}

class PhysicalProduct extends Product
{
    public function finalPrice(): float
    {
        return $this->price + 5;
    }
}
```

## 6. Introduce Parameter Object

- **What it is**: When several functions receive the same group of related parameters, combine them into a single object.
- **When to use**: Repeated long parameter lists, or parameters that represent a single conceptual entity.
- **Benefits**: Reduces the number of parameters, groups related data, and makes it easier to add behavior later.
- **Risks**: Creating parameter objects for trivial parameter sets can overcomplicate code and require extra classes with little benefit. Overuse may reduce clarity.

### Before

```php source
function findCustomers(string $city, string $state, int $zipCode): array
{
    // ...
}
```

### After

```php source
class AddressFilter
{
    public function __construct(
        public string $city,
        public string $state,
        public int $zipCode
    ) {
    }
}

function findCustomers(AddressFilter $filter): array
{
    // ...
}
```

## 7. Eliminate Duplication

- **What it is**: Identify duplicated code and extract it into a common function or service.
- **When to use**: When you notice repeated code patterns across functions or classes.
- **Benefits**: Reduces maintenance effort, avoids bugs from inconsistent changes, and improves readability.
- **Risks**: Over-generalizing can create functions that are hard to understand or maintain, and may introduce inappropriate coupling between unrelated parts of the code.

### Before

```php source
function sendRegistrationEmail(User $user): void
{
    $message = "Hello " . $user->name . ", thank you for your registration.";
    mail($user->email, "Welcome", $message);
}

function sendRecoveryEmail(User $user): void
{
    $message = "Hello " . $user->name . ", use this recovery code.";
    mail($user->email, "Recovery", $message);
}
```

### After

```php source
function sendEmail(User $user, string $subject, string $content): void
{
    $message = "Hello " . $user->name . ", " . $content;
    mail($user->email, $subject, $message);
}
```

## 8. Encapsulate Field

- **What it is**: Replace direct access to public fields with getters, setters, or read-only properties to protect invariants.
- **When to use**: For public fields used in multiple places or when you need control over changes.
- **Benefits**: Enables validation, enforces control, and allows changing internal implementation without affecting consumers.
- **Risks**: Can add boilerplate and unnecessary complexity if applied to simple or internal-only fields.

### Before

```php source
class Customer
{
    public string $email;
}

$customer->email = 'invalid-email'; // no validation. Code works
```

### After

```php source
class Customer
{
    public function __construct(
        public readonly string $email,
    ) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email');
        }
    }
}

new Customer('invalid-email'); // InvalidArgumentException
```

## 9. Introduce Null Object

- **What it is**: Instead of using null and multiple checks `(if ($x === null))`, create an "empty" implementation that conforms to the interface.
- **When to use**: When there are many null checks or alternative empty behaviors.
- **Benefits**: Simplifies code and eliminates random null checks.
- **Risks**: May hide missing data or mask errors if the “null object” is used inappropriately.

### Before

```php source
function showName(?User $user): string
{
    if ($user === null) {
        echo "Guest";
    } else {
        echo $user->getName();
    }
}
```

### After

```php source
interface UserInterface
{
    public function getName(): string;
}

class NullUser implements UserInterface
{
    public function getName(): string
    {
        return "Guest";
    }
}

function showName(UserInterface $user): string
{
    echo $user->getName();
}
```

## 10. Replace Magic Number with Constant

- **What it is**: Replace "magic" literal numbers with named constants.
- **When to use**: For repeated numbers or numbers whose meaning is not obvious.
- **Benefits**: Improves clarity and makes values easier to change.
- **Risks**: Overusing constants for trivial or obvious numbers can reduce readability.

### Before

```php source
$priceWithVat = $price * 1.19;
```

### After

```php source
const VAT = 0.19;

$priceWithVat = $price * (1 + VAT);
```

## 11. Guard Clauses (Early Returns)

- **What it is**: Replace nested conditional structures with early validations and returns at the beginning of the function.
- **When to use**: Functions with many nested branches.
- **Benefits**: Reduces nesting and makes the main flow of the function clearer.
- **Risks**: Overusing guard clauses in large functions can fragment the control flow. Multiple early returns can make it harder to trace side effects or exceptions, especially when combined with logging, resource management, or transactions.

### Before

```php source
function process(array $order): void
{
    if ($order !== null) {
        if ($order['items'] !== []) {
            if ($order['customer']['active']) {
                foreach ($order['items'] as $item) {
                    // some logic here
                }
            }
        }
    }
}
```

### After

```php source
function process(array $order): void
{
    if ($order === null) {
        return;
    }

    if (empty($order['items'])) {
        return;
    }

    if (!$order['customer']['active']) {
        return;
    }

    foreach ($order['items'] as $item) {
        // some logic here
    }
}
```

## 12. Replace Method with Method Object

- **What it is**: When a method is very large and has many local variables, convert it into a class whose execute() method performs the operation (the method object pattern).
- **When to use**: For long methods that are hard to test or maintain, especially with multiple temporary variables.
- **Benefits**: Improves organization, facilitates unit testing, and allows extraction of subtasks into smaller methods.
- **Risks**: Adds extra classes and complexity, which may be overkill for moderately sized methods.

### Before

```php source
class ReportCalculator
{
    public function generate(array $data)
    {
        // 200 lines with many temporaries and steps
    }
}
```

### After

```php source
class ReportGenerator
{
    private array $result;

    public function __construct(
        private array $data,
    ) {
    }

    public function execute(): array
    {
        $this->step1();
        $this->step2();

        return $this->result;
    }

    private function step1(): void
    {
        //...
    }

    private function step2(): void
    {
        //...
    }
}
```

## 13. Introduce Dependency Injection

- **What it is**: Instead of creating dependencies inside a class using new, receive them via the constructor.
- **When to use**: When you want to make testing easier and allow swapping implementations.
- **Benefits**: Improves testability, flexibility, and decoupling.
- **Risks**: Increase the number of constructor parameters and make class setup more complex if overused.

### Before

```php source
class Repository
{
    private DatabaseConnection $db;

    public function __construct()
    {
        $this->db = new DatabaseConnection();
    }
}
```

### After

```php source
class Repository
{
    public function __construct(
        private DatabaseConnectionInterface $db,
    ) {
    }
}
```

## 14. Split Temporary Variable

- **What it is**: Avoid reusing the same temporary variable for different purposes.
- **When to use**: When reused temporary variables create confusion.
- **Benefits**: Improves clarity and reduces errors.
- **Risks**: Can clutter the code with too many short-lived variables.

### Before

```php source
$value = $this->calculate();
$value = $value * 1.1; // now $value has a different meaning
```

### After

```php source
$baseValue = $this->calculate();
$valueWithVat = $baseValue * 1.1;
```

## 15. Rename Variable / Method

- **What it is**: Replace unclear names with descriptive ones.
- **When to use**: For generic names, vague abbreviations, or names that don’t reflect the purpose.
- **Benefits**: Makes code self-explanatory and reduces the need for comments.
- **Risks**: Renaming inconsistently can break references or confuse team members if not applied everywhere.

### Before

```php source
function c(User $u): bool
{
    // ...
}
```

### After

```php source
function checkUserPermissions(User $user): bool
{
    // ...
}
```

## 16. Replace Array with Object

- **What it is**: When passing associative arrays as data structures, convert them into objects with behavior.
- **When to use**: Frequent access to array keys or when behavior is associated with the data.
- **Benefits**: Clear typing, autocompletion, and encapsulation.
- **Risks**: Can add unnecessary complexity for simple data where arrays are sufficient.

### Before

```php source
$product = [
    'id' => 1,
    'price' => 9.99,
];

echo $product['price'];
```

### After

```php source
class Product
{
    public function __construct(
        private int $id,
        private float $price,
    ) {
    }

    public function getPrice(): float
    {
        return $this->price;
    }
}

echo $product->getPrice();
```

## 17. Simplify Boolean expressions

- **What it is**: Rewrite complex conditions into named functions or simpler combinations.
- **When to use**: When boolean expressions are difficult to read or reason about.
- **Benefits**: Improves readability and reduces logical errors.
- **Risks**: Over-abstraction can hide the original logic, making it harder to understand at a glance.

### Before

```php source
if (($user->isActive() && !$user->isSuspended())
    || ($user->hasAdminRights() && !$user->isSuspended())
) {
    // ...
}
```

### After

```php source
function canAccess(User $user): bool
{
    return ($user->isActive() || $user->hasAdminRights())
        && !$user->isSuspended();
}

if ($this->canAccess($user)) {
    // ...
}
```

## Practical Example (Chaining Multiple Refactorings)

Suppose we have a function that processes an order, calculates discounts, computes shipping, and sends an email. One possible refactoring path could be:

- Extract functions (calculate subtotal, calculate vat, prepare email).
- Encapsulate collections (items in an ItemsCollection object).
- Introduce a parameter object (an Order with an Address object).
- Move method (move shipping calculation to Address).
- Use dependency injection for the email service.
- Introduce unit tests for each piece.

This transforms hard-to-maintain code into a set of small, testable classes.

## Initial Code

Here’s the starting point: a single class with one function mixing multiple responsibilities.

```php source
class OrderProcessor
{
    public function process(array $order): void
    {
        // Calculate subtotal
        $subtotal = 0.0;
        foreach ($order['items'] as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }

        // Apply discount (if subtotal > 1000 => 50)
        $discount = ($subtotal > 1000.0) ? 50.0 : 0.0;

        // VAT 19%
        $vat = $subtotal * 0.19;

        // Calculate shipping (if city == 'Munich' then 4 else 5)
        $shipping = ($order['address']['city'] === 'Munich') ? 4.0 : 5.0;

        // Calculate total
        $total = $subtotal + $vat + $shipping - $discount;

        // Send email
        $message = "Hello {$order['customer']['name']}, your total is {$total}";
        mail($order['customer']['email'], 'Order Summary', $message);

        echo "Processed order {$order['id']} -> total: {$total}\n";
    }
}
```

### Problems

- Mixes calculations, business rules, and I/O (sending email).
- Hard to test: `mail()` and `echo` are side effects.
- Data is represented using primitive arrays.
- Rules are hard-coded (19% VAT, discounts, shipping rates).

## Extract Function: Extract Subtotal Calculation

- **Goal**: Reduce the size of the main function and isolate responsibilities.

```php source
public function process(array $order): void
{
    $subtotal = $this->calculateSubtotal($order['items']);
    
    // ...
}

private function calculateSubtotal(array $items): float
{
    $subtotal = 0.0;
    foreach ($items as $item) {
        $subtotal += $item['price'] * $item['quantity'];
    }

    return $subtotal;
}
```

## Replace Magic Number with Constant

- **Goal**: Create constants for VAT and discount thresholds.

```php source
private const VAT = 0.19;
private const DISCOUNT_THRESHOLD = 1000.0;
private const DISCOUNT_AMOUNT = 50.0;

public function process(array $order): void
{
    $subtotal = $this->calculateSubtotal($order['items']);
    $discount = $this->calculateOrderDiscount($subtotal);
    $vat = $this->calculateVat($subtotal);

    // ...
}

private function calculateSubtotal(array $items): float { ... }

private function calculateOrderDiscount(float $subtotal): float
{
    return ($subtotal > self::DISCOUNT_THRESHOLD) ? self::DISCOUNT_AMOUNT : 0.0;
}

private function calculateVat(float $subtotal): float
{
    return $subtotal * self::VAT;
}
```

## Introduce Parameter Object

- **Goal**: Instead of arrays, we now pass simple objects. This improves autocompletion, validation, and clarity.

```php source
class Item
{
    public function __construct(
        public string $sku,
        public float $price,
        public int $quantity,
    ) {
    }
}

class Address
{
    public function __construct(
        public string $city,
    ) {
    }
}

class Customer
{
    public function __construct(
        public string $name,
        public string $email,
    ) {
    }
}
```

## Encapsulate Collection

- **Goal**: Instead of using an array of `Item`, we create an `ItemsCollection`. The subtotal calculation can now be delegated to `ItemsCollection::total()`.

```php source
class ItemsCollection
{
    /**
    * @param list<Item> $items
    */
    public function __construct(
        private array $items = [],
    ) {
    }

    public function add(Item $item): void
    {
        $this->items[] = $item;
    }

    public function isEmpty(): bool
    {
        return count($this->items) === 0;
    }

    public function total(): float
    {
        $sum = 0.0;
        foreach ($this->items as $item) {
            $sum += $item->price * $item->quantity;
        }

        return $sum;
    }
}
```

## Extract Class

- **Goal**: Group related data in an `Order` (`id`, `items`, `address`, `customer`).

```php source
class Order
{
    public function __construct(
        public string $id,
        public ItemsCollection $items,
        public Address $address,
        public Customer $customer,
    ) {
    }
}
```

## Move Method

- **Goal**: Create a `ShippingCalculator` to separate shipping rules and make testing easier.

```php source
class ShippingCalculator
{
    public function calculate(Address $address): float
    {
        return $address->city === 'Munich' ? 4.0 : 5.0;
    }
}
```

## Introduce Dependency Injection

- **Goal**: Create an `EmailServiceInterface` and inject it into the `OrderProcessor` class, enabling testing.
- **Benefit**: Allows injecting a `FakeEmailService` in tests to verify behavior without sending real emails.

```php source
interface EmailServiceInterface
{
    public function send(string $to, string $subject, string $body): void;
}

class EmailService implements EmailServiceInterface
{
    public function send(string $to, string $subject, string $body): void
    {
        mail($to, $subject, $body);
    }
}
```

And the `OrderProcessor` class now looks like:

```php source
class OrderProcessor
{
    public function __construct(
        private ShippingCalculator $shippingCalculator,
        private EmailServiceInterface $emailService,
    ) {
    }

    public function process(Order $order): float
    {
        // ...
    }
}
```

## Final Code (with all refactors applied)

```php source
// Domain classes
class Item
{
    public function __construct(
        public string $sku,
        public float $price,
        public int $quantity,
    ) {
    }
}

class ItemsCollection
{
    /**
    * @param list<Item> $items
    */
    public function __construct(
        private array $items = [],
    ) {
    }

    public function add(Item $item): void
    {
        $this->items[] = $item;
    }

    public function isEmpty(): bool
    {
        return count($this->items) === 0;
    }

    public function total(): float
    {
        $sum = 0.0;
        foreach ($this->items as $item) {
            $sum += $item->price * $item->quantity;
        }

        return $sum;
    }
}

class Address
{
    public function __construct(
        public string $city,
    ) {
    }
}

class Customer
{
    public function __construct(
        public string $name,
        public string $email,
    ) {
    }
}

class Order
{
    public function __construct(
        public string $id,
        public ItemsCollection $items,
        public Address $address,
        public Customer $customer,
    ) {
    }
}

// Services
class ShippingCalculator
{
    public function calculate(Address $address): float
    {
        return $address->city === 'Munich' ? 4.0 : 5.0;
    }
}

interface EmailServiceInterface
{
    public function send(string $to, string $subject, string $body): void;
}

class EmailService implements EmailServiceInterface
{
    public function send(string $to, string $subject, string $body): void
    {
        mail($to, $subject, $body);
    }
}

// Processor
class OrderProcessor
{
    private const float VAT = 0.19;
    private const float DISCOUNT_THRESHOLD = 1000.0;
    private const float DISCOUNT_AMOUNT = 50.0;

    public function __construct(
        private ShippingCalculator $shippingCalculator,
        private EmailServiceInterface $emailService,
    ) {
    }

    public function process(Order $order): float
    {
        // Guard clause
        if ($order->items->isEmpty()) {
            return 0.0;
        }

        $subtotal = $order->items->total();
        $vat = $this->calculateVat($subtotal);
        $discount = $this->calculateOrderDiscount($subtotal);
        $shipping = $this->shippingCalculator->calculate($order->address);

        $total = $subtotal + $vat + $shipping - $discount;

        $message = "Hello {$order->customer->name}, your total is {$total}";
        $this->emailService->send($order->customer->email, 'Order Summary', $message);

        return $total;
    }

    private function calculateVat(float $subtotal): float
    {
        return $subtotal * self::VAT;
    }

    private function calculateOrderDiscount(float $subtotal): float
    {
        return ($subtotal > self::DISCOUNT_THRESHOLD) ? self::DISCOUNT_AMOUNT : 0.0;
    }
}
```

## Integration Tests with PHPUnit

These tests verify:

- Total calculation with and without discount.
- That the email service (mock) is called with the expected content.

```php source
final class OrderProcessorTest extends TestCase
{
    private OrderProcessor $processor;
    private EmailServiceInterface $emailSpy;

    public function setUp(): void
    {
        $this->emailSpy = $this->fakeEmail();
        $this->processor = new OrderProcessor(new ShippingCalculator(), $this->emailSpy);
    }

    private function fakeEmail(): EmailServiceInterface
    {
        return new class() implements EmailServiceInterface {
            public array $sent = [];

            public function send(string $to, string $subject, string $body): void
            {
                $this->sent[] = compact('to', 'subject', 'body');
            }
        };
    }

    public function test_calculates_total_without_discount_and_normal_shipping(): void
    {
        $items = new ItemsCollection([
            new Item('A', 100.0, 2), // 200
            new Item('B', 50.0, 1),  // 50 => subtotal 250
        ]);

        $address = new Address('Berlin');
        $customer = new Customer('Cosme', 'cosme@example.com');
        $order = new Order('p1', $items, $address, $customer);

        $total = $this->processor->process($order);

        // subtotal 250, vat = 47.5, shipping = 5, no discount => total = 302.5
        $this->assertEquals(302.5, $total);

        // Verify that an email was sent
        $this->assertCount(1, $this->emailSpy->sent);
        $this->assertEquals('cosme@example.com', $this->emailSpy->sent[0]['to']);
        $this->assertStringContainsString('your total is', $this->emailSpy->sent[0]['body']);
    }

    public function test_applies_discount_and_munich_shipping(): void
    {
        $items = new ItemsCollection([
            new Item('X', 600.0, 2), // 1200
        ]);

        $address = new Address('Munich');
        $customer = new Customer('Juan', 'juan@example.com');
        $order = new Order('p2', $items, $address, $customer);

        $total = $this->processor->process($order);

        // subtotal 1200, vat = 228, shipping = 4, discount = 50 => total = 1382
        $this->assertEquals(1382.0, $total);
        $this->assertCount(1, $this->emailSpy->sent);
        $this->assertEquals('juan@example.com', $this->emailSpy->sent[0]['to']);
    }

    public function test_empty_order_returns_zero_and_does_not_send_email(): void
    {
        $items = new ItemsCollection([]);
        $order = new Order('empty', $items, new Address('Berlin'), new Customer('Chema', 'chema@example.com'));

        $total = $this->processor->process($order);

        $this->assertEquals(0.0, $total);
        $this->assertCount(0, $this->emailSpy->sent);
    }
}
```

These tests demonstrate:

- Deterministic verification of total calculations.
- Ability to spy on the email service and confirm that the processor uses it correctly.

Before refactoring, this would have been difficult: `mail()` cannot be mocked without rewriting or patching global functions.

## Conclusion

We transformed a monolithic order processor into a clean, modular design with small, focused classes.

Key improvements:

- Arrays into domain objects for clarity and type safety.
- Encapsulated collections for cleaner operations.
- Dependency injection for testable, flexible services.

Automated tests verify correctness while making the code easier to maintain and extend.
