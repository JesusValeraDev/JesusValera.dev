+++
path = "a-brief-introduction-to-graphql"
title = "A brief introduction to GraphQL"
description = "How GraphQL differs from REST: one endpoint, a schema in SDL, queries and mutations with their JSON, and trade-offs like caching, N+1 and depth limits."
date = 2022-03-16
updated = 2026-11-01
aliases = ['2022-03-16-a-brief-introduction-to-graphql']

[taxonomies]
tags = ['GraphQL', 'Rest', 'Https', 'API', 'Facebook']

[extra]
static_thumbnail = "/images/2022-03-16/1.webp"
subtitle = ""
+++

![atomium graphql](/images/2022-03-16/1.webp)

A _RESTful API_ is a de-facto standard to allow communication between applications, although _GraphQL_ has become a
popular alternative. Facebook built it for its mobile apps and open-sourced it in 2015.

From the user-client perspective, _GraphQL_ is similar to _RESTful_, they work as an entry point between different
applications, but _GraphQL_ is slightly different, and because of this, this technology has a reason to be.

## GraphQL vs RESTful API

_GraphQL_ and _RESTful_ have the same foundation. They both run over HTTP, and they have the idea of resource, but, in
_REST_, each endpoint is a single resource, while in _GraphQL_ there is only a single endpoint.<br>
_GraphQL_ is not about resource state management, but about separating read operations (queries) from write operations 
(mutations). This is known as
the [Command Query Separation pattern](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation).<br>
In _REST_, the server determines the shape and size of a resource, in _GraphQL_ depends on the user's needs.

### One endpoint: `POST /graphql`

A REST API exposes one URL per resource (`GET /offers/10`, `GET /providers/31`, `POST /offers`...). A GraphQL API
usually exposes a single URL, and the request body says what you want:

```bash
curl -X POST http://localhost:4000/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query": "query offerQuery($id: ID!) { offer(id: $id) { name type } }", "variables": {"id": "10"}}'
```

```json
{"data":{"offer":{"name":"Product A","type":"Drink"}}}
```

`$id` is a **variable**: the query text stays the same and only the values change. When something fails, the response
carries an `errors` key next to `data`.

### Over-fetching and under-fetching

Imagine a screen that shows an offer and the name of its provider. With REST, `GET /offers/10` returns the whole
resource:

```json
{
  "id": 10,
  "name": "Product A",
  "type": "Drink",
  "price": 250,
  "provider_id": 31
}
```

You get fields you don't need, like `price` (**over-fetching**), and you still lack the provider's name, so you need
a second call to `GET /providers/31` (**under-fetching**). With GraphQL, a single query asks for exactly those fields.

## How to manage a GraphQL schema?

A schema contains objects, every object has different parameters, and those parameters can be properties or even
sub-objects. You write it in the **Schema Definition Language (SDL)**:

```graphql
type Provider {
  id: ID!
  name: String!
  offers: [Offer!]!
}

type Offer {
  id: ID!
  name: String!
  type: String!
  price: Int!
  provider: Provider!
}

type Query {
  offer(id: ID!): Offer
  offers(type: String): [Offer!]!
}

type Mutation {
  addOffer(name: String!, type: String!, providerId: ID!): Offer!
}
```

`!` means the field can't be null, and `[Offer!]!` is a list of offers. `Query` and `Mutation` are the entry points:
every request starts from one of their fields.

If you want to filter an object(s) from a specific Type, you pass **arguments** in parentheses, like `offer(id: "10")`
or `offers(type: "Drink")`. The output is a JSON response.

### Queries

Queries play the role of _GET_ requests. That means you can only **fetch** data.

```graphql
query offerQuery {
  offer(id: "10") {
    name
    type
    provider {
      id
      name
    }
  }
}
```

The response has the same shape as the query:

```json
{
  "data": {
    "offer": {
      "name": "Product A",
      "type": "Drink",
      "provider": {
        "id": "31",
        "name": "Provider A"
      }
    }
  }
}
```

### Mutations

Mutations play the role of _POST_, _PUT_, _PATCH_, and _DELETE_. That means you can **mutate** the data model, and
persist it in the database by creating, updating or removing elements.

```graphql
mutation newOfferMutation {
  addOffer(name: "Product B", type: "Food", providerId: "32") {
    id
    name
    type
    provider {
      id
      name
    }
  }
}
```

```json
{
  "data": {
    "addOffer": {
      "id": "11",
      "name": "Product B",
      "type": "Food",
      "provider": {
        "id": "32",
        "name": "Provider B"
      }
    }
  }
}
```

> In a mutation, the _addOffer()_ is the instruction you will perform into the system, though the body of the mutation
> is the response you want to receive.

Both queries and mutations travel as a `POST` to the same endpoint (some servers also accept queries over `GET`).
The keyword at the start tells the server which one it is.

<div class="separator"></div>

## The trade-offs

### HTTP caching is harder

With REST, `GET /offers/10` is a URL that browsers, CDNs and reverse proxies can cache with standard headers. With
GraphQL, requests are usually a `POST` to the same URL, and shared caches don't store `POST` responses in practice.
Caching moves to the client (Apollo Client and Relay keep a normalized cache) or to the server.

### The N+1 problem

Every field has a **resolver**, a function that loads its value. Ask for a list of offers with their provider:

```graphql
{
  offers {
    name
    provider {
      name
    }
  }
}
```

A naive server runs one query for the offers, and then one query per offer to load its provider:

```sql
SELECT * FROM offers
SELECT * FROM providers WHERE id = 31
SELECT * FROM providers WHERE id = 32
SELECT * FROM providers WHERE id = 33
```

The fix is **batching**: collect the provider IDs first and load them in a single
`SELECT * FROM providers WHERE id IN (31, 32, 33)`. [DataLoader](https://github.com/graphql/dataloader) does this in
JavaScript, and [graphql-php](https://webonyx.github.io/graphql-php/data-fetching/) offers `GraphQL\Deferred` for the
same job.

### Limit query depth and complexity

Clients can write any query the schema allows. As `Provider` has `offers` and `Offer` has `provider`, a request can
nest as deep as it likes, and every level multiplies the rows your server loads:

```graphql
{
  offers {
    provider {
      offers {
        provider {
          offers {
            name
          }
        }
      }
    }
  }
}
```

Set a **maximum depth** and a **complexity budget** before you go to production. In graphql-php:

```php
use GraphQL\Validator\DocumentValidator;
use GraphQL\Validator\Rules\QueryComplexity;
use GraphQL\Validator\Rules\QueryDepth;

DocumentValidator::addRule(new QueryDepth(3));
DocumentValidator::addRule(new QueryComplexity(100));
```

The query above is now rejected with `Max query depth should be 3 but got 4.`

## When REST is the better fit

GraphQL shines when several clients (web, iOS, Android) need different shapes of the same data. REST is usually the
better choice when:

- The API is simple CRUD and every client needs the same data.
- You rely on HTTP caching and CDNs, like a public catalog or a content site.
- You serve files: uploads and downloads fit plain HTTP better.
- The team can't invest in the extra tooling (batching, limits, schema reviews).

<div class="separator"></div>

To write queries and mutations effectively, you need to understand the schema and the relations between types. The
good news is that the schema documents itself: tools like GraphiQL read it through **introspection** and autocomplete
your queries.

![graphql logo](/images/2022-03-16/4.webp)

The [GraphQL documentation](https://graphql.org/) covers more advanced topics like `enums`, `interfaces`, entity
management, and schema design. Worth checking out if you're building a GraphQL API from scratch.
