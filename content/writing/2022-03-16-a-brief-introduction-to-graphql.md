+++
path = "2022-03-16-a-brief-introduction-to-graphql"
title = "A brief introduction to GraphQL"
description = "A RESTful API is a de-facto standard to allow communication between applications, although, recently GraphQL comes up. Let's see how GraphQL works"
date = 2022-03-16

[taxonomies]
tags = ['GraphQL', 'Rest', 'Https', 'API', 'Facebook']

[extra]
static_thumbnail = "/images/2022-03-16/1.webp"
subtitle = ""
+++

![atomium graphql](/images/2022-03-16/1.webp)

A _RESTful API_ is a de-facto standard to allow communication between applications, although, recently _GraphQL_ comes
up.

From the user-client perspective, _GraphQL_ is similar to _RESTful_, they work as an entry point between different
applications, but _GraphQL_ is slightly different, and because of this, this technology has a reason to be.

## GraphQL vs RESTful API

_GraphQL_ and _RESTful_ have the same foundation. They use the HTTP methods, and they have the idea of resource, but, in
_REST_, each endpoint is a single resource, while in _GraphQL_ there is only a single resource.<br>
_GraphQL_ is not about resource state management, but about separating read operations (queries) from write operations 
(mutations). This is known as
the [Command Query Separation pattern](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation).<br>
In _REST_, the server determines the shape and size of a resource, in _GraphQL_ depends on the user's needs.

## How to manage a GraphQL schema?

A schema contains objects, every object has different parameters, and those parameters can be properties or even
sub-objects.

Usually, if you want to filter an object(s) from a specific Type, you can apply a filter into brackets, the output is
always a JSON response.

### Queries

The queries are the _GET_ requests. That means you can only **fetch** data.

![graphql- uery](/images/2022-03-16/2.webp)

### Mutations

The mutations are the _POST_, _PUT_, _PATCH_, and _DELETE_ HTTP methods. That means you can **mutate** the data model,
and persist it in the database by creating, updating or removing elements.

![graphql mutation](/images/2022-03-16/3.webp)

> In a mutation, the _addOffer()_ is the instruction you will perform into the system, though the body of the mutation
> is the response you want to receive.

<div class="separator"></div>

To write queries and mutations effectively, you need to understand the database architecture and relations between
elements. Beyond that, GraphQL works similarly to REST, just with different syntax.

![graphql logo](/images/2022-03-16/4.webp)

The [GraphQL documentation](https://graphql.org/) covers more advanced topics like `enums`, `interfaces`, entity
management, and schema design. Worth checking out if you're building a GraphQL API from scratch.
