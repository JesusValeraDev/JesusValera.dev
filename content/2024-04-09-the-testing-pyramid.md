+++
title = "The testing pyramid"
description = "A post about the testing pyramid and its importance in the software development. The importance of the unit tests, integration tests and UI tests."
date = 2024-04-09

[taxonomies]
tags = ['Programming', 'Test', 'Cohn', 'Pyramid', 'Unit', 'Integration']

[extra]
static_thumbnail = "/images/2024-04-09/1.webp"
subtitle = "How to structure your test suite 🗼"
+++

The Testing Pyramid (also known as _Cohn Pyramid_) is a concept that visualizes the ideal distribution of different
types of tests within a testing strategy. It resembles a pyramid with three layers: **Unit** at the base, followed by
**Service** in the middle, and finally, **User Interface** tests on top.

![cohn-pyramid](/images/2024-04-09/1.webp)

### Unit Tests

Ideally between **50-60%** of all tests in our system should belong to this category. They are fast, focused, and
inexpensive to maintain.

- Are small, focused tests that validate the behavior of individual components or units of code in isolation
- Help ensure that each function, method, or class behaves correctly under various conditions

### Service Tests

A range of **20-40%** is a good number of tests that should belong to this category. They are broader in scope than unit
tests and may involve testing across multiple layers of the application, such as testing database interactions or API
endpoints.

- Verify interactions between different components or modules of the system
- Unlike unit tests, which isolate specific units of code, service tests examine how these units work together
- Help identify issues that may arise when different components interact with each other

### UI Tests

About **0-10%** of all tests should belong to this category. They are the slowest and most brittle tests to write and
maintain, but they provide the highest level of confidence by simulating real user scenarios.

- These tests interact with the application as a user would, often through 3rd party applications like Selenium or
  Cypress
- Validate the flow of the application and help ensure that all components work together seamlessly in a production-like
  environment
- They are much slower to write and execute than an integration tests and are more likely to break due to changes in
  the application

## Conclusion

The Testing Pyramid promotes a balanced testing strategy where the majority of tests are fast, focused, and inexpensive
to maintain (Unit tests), while fewer tests are allocated to higher layers (Service and UI tests). This approach ensures
efficient test coverage while minimizing the time and effort required for testing, ultimately leading to faster feedback
cycles and more robust software.

<div class="separator"></div>

Remember which kind of project you are - you won't have the same testing strategy approach whether the project you are
working on is legacy or greenfield. Depending on it, those values may vary.

In legacy projects coupled with third-party libraries (like the database), sometimes it is tough to write unit tests.
The recommendation is to follow the inverse order, I mean, to not break the current functionality, due to the fragility,
it might be worth writing first a Service or UI tests, and having this
security net, you can then refactorize the code and finally write the unit tests. Writing these more general tests will
also bring you experience in how everything interacts in the application domain.
