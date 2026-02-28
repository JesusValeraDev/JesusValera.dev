+++
path = "2023-08-26-functional-tests"
title = "Functional Tests"
description = "Differences between Functional tests: unit, integration and e2e tests"
date = 2023-08-26

[taxonomies]
tags = ['Testing', 'Test types', 'Unit Testing', 'Programming']

[extra]
static_thumbnail = "/images/2023-08-26/1.webp"
subtitle = "Unit, Integration and E2E tests"
+++

![functional testing types](/images/2023-08-26/1.webp)

A test is an empirical assertion that verifies whether a piece of functionality behaves as expected under specific conditions.

Tests can be classified using the "box" approach, which categorizes tests based on how they interact with the system from the tester's perspective. There are two main approaches: `white-box` and `black-box` testing.

The `white-box` approach occurs when the tester has access to the source code. In this scenario, the tester focuses on testing different code paths and internal structures to ensure comprehensive coverage.

In the `black-box` approach, the system's internal workings are hidden from the tester. Here, the tester can only provide input and observe output, focusing on whether the application behaves correctly from an external perspective, without concern for the internal implementation details.

However, there is another, more specific classification: `functional` and `non-functional` tests.

`Non-functional` tests refer to aspects that are not related to specific functions or user actions. They can be divided into `security`, `performance`, `usability`, and `compatibility` testing.

`Functional` tests refer to activities that verify specific actions or functions of the code. They can be divided into `unit`, `integration`, and `e2e` tests. From a tester's point of view, functional tests are more fundamental as we spend most of our time writing these types of tests rather than non-functional ones. Additionally, it is tremendously important to master them to write cleaner code.

## Differences between functional tests

### Unit test

![given when then](/images/2023-08-26/2.webp)

A unit test verifies the relationship between an input and an expected output for a single, isolated piece of logic that is decoupled from external dependencies. You can think of a unit test as testing one public method of a class. It's usually a good idea to use interfaces to invert dependencies in your application (following the Dependency Inversion Principle).

When unit tests need to interact with external dependencies, we use stubs or mocks instead of real implementations.

The benefit of unit tests is that they execute quickly, allowing them to be run more frequently. They also force you to write loosely coupled code, leading to better software design.

In essence, a unit test demonstrates that an isolated piece of functionality works correctly in isolation.

Unit tests provide you with:

- A simple way to test your code exhaustively and independently
- Quick feedback that points you directly to the problematic code section

A test is not a unit test if it

- performs queries to a database
- connects to the network in any way
- operates with the file system
- cannot be run in parallel with other unit tests
- requires you to modify configuration files to run

They are also known as ‘white box testing’. We know the internal code from the method.

These tests focus on verifying the object's behavior and state.

There are frameworks for automating unit testing, with the most popular being the xUnit family: JUnit, PHPUnit, NUnit, etc.

### Integration test

Integration tests are similar to unit tests except that they focus on verifying the interaction between two or more components working together, such as classes, modules, services, etc.

Unlike unit tests, integration tests can connect to databases, networks, file systems, and other external dependencies.

The integration tests are slower than unit tests due to their complexity, besides, sometimes it’s needed to load
specific configuration in order to work properly.

These tests are environment-dependent, meaning that if a test fails, the problem could be due to different configurations between environments.

You can even create integration tests with PHPUnit, the `Unit` in the name is just a convention.

### E2E test

The E2E tests (End-to-End) are also called system tests or browser testing.

These tests focus on what the application does rather than how it does it. In other words, they verify the expected behavior from the user's perspective, regardless of the internal implementation details.

E2E tests simulate real user interactions and validate that the entire system works correctly from start to finish.

![functional test](/images/2023-08-26/3.webp)

For example, if we submit a form with an invalid value, we expect to see an error message in a specific field. We don't care about the underlying validation logic or regular expressions—only that the user sees the appropriate feedback.

E2E tests are also known as “black-box testing”. We don't need to know the internal code structure. They focus on testing the application's behavior from the user's perspective.

Popular E2E testing tools include Selenium, Cypress, and Playwright.
