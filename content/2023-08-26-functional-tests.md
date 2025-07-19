+++
title = "Functional Tests"
description = "Differences between Functional tests: unit, integration and system tests"
date = 2023-08-26

[taxonomies]
tags = ['Testing', 'Test types', 'Unit Testing', 'Programming']

[extra]
static_thumbnail = "/images/2023-08-26/1.webp"
subtitle = "Unit, Integration and System tests"
+++

![functional testing types](/images/2023-08-26/1.webp)

A test is an empirical assertion that demonstrates the behaviour of an expected functionality from some assertion.

Tests can be classified by using the "box" approach.

This approach divides the tests on how they interact with the system from the point of view of the
tester. There are two big approaches, the white and the black-box.

The `white-box` approach happens when the tester has access to the source code, in this scenario, the tester will focus
on testing all possible combinations to assert the test being written will cover the different code paths.

In the `black-box` approach, on the contrary, the system is opaque, what happens inside the application is "magic", in
this scenario, the tester can only send an input and expect some output, the tester is not worried about what happens
internally, but how the application reacts based on the sent input.

However, there is another classification for tests, which is a bit more specific, which are `functional`
and `non-functional` tests.

`Non-functional` tests refers to aspects that are not related to a specific function or user action. They can be divided
into `security`, `performance`, `usability` and `compatibility`.

`Functional` tests refers to activities that verify a specific action or function of the code. They can be divided into
`unit`, `integration` and `system` tests. From a tester point of view, we could consider the functional tests more
important as we will spend most of our time on these kind of test rather than non-functional, also, it is tremendous
important to master them to write cleaner code.

## Differences between functional tests

### Unit test

![given when then](/images/2023-08-26/2.webp)

A unit test is a verification between an input and an expected output, it is an isolated logic and decoupled from the
outside. We could consider a unit test as the public method from one API class. Usually, it is a good idea to use
interfaces to invert the dependencies in our application (~DIP: Dependency Inversion Principle).

Indeed, we can also depend on external dependencies using stubs or mocks.

The benefit of using unit test is that they took less time on execution, for that reason, they can be launched more
often. Also, they force you to write less coupled code, doing better software design.

So, a unit test is, therefore, the demonstration of an isolated functionality from the outside.

The unit tests give you:

- A simple way to test your code exhaustively and independently
- They command you to the portion of code that causes the problem

A test is not a unit test if…

- it performs queries to the database
- it connects in any way with the network
- it operates with a file system
- it cannot be launched in parallel with other unit tests
- you need to modify any file (config file for example) to be able to run it

They are also known as ‘white box testing’. We know the internal code from the method.

The tests are focused on the object state.

There are frameworks for automatizing this task, the most popular is the xUnit family: JUnit, PHPUnit…

### Integration test

The integration tests are similar to the units except that they are focused on proving the interaction between two or
more components together, they could be classes, modules, etc…

Further, this kind of tests can connect to the database, to the network, filesystem, etc.

The integration tests are slower than unit tests due to their complexity, besides, sometimes it’s needed to load
specific configuration in order to work properly.

These kinds of tests are dependent on the environment, I mean, if a test fails, the problem could be a different
configuration from one environment to another.

You can even create integration tests with PHPUnit, the `Unit` in the name is just a convention.

### System test

The system tests are called end-to-end (E2E) or browser testing.

These kinds of tests do not check the how, but the what, I mean, if that specific test executes some magic but the
expected result is whatever we want.

In other words, we do not care what the developer did, we care about the output as we were the client.

![functional test](/images/2023-08-26/3.webp)

For example, if we send a form with a wrong value, we expect to see an error message in a specific field, we do not care
about what regular expression is and why it failed.

Those tests are also known as “black-box testing”. We do not know the code we are testing. They focus on object
behaviour.

One of the best known is Selenium.
