+++
path = "2030-01-01-database-normalization"
title = "Database Normalization: A Practical Guide"
description = "Learn what database normalization is, why it matters, and how to apply normal forms to design better databases"
date = 2024-04-01
draft = true

[taxonomies]
tags = ["Databases", "SQL", "Design"]

[extra]
static_thumbnail = "/images/2020-01-01/1.webp"
subtitle = ""
+++

![](/images/2020-01-01/1.webp)

Database normalization is a systematic process of organizing data in a relational database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller ones and defining relationships between them.

## Why Normalize Databases?

Normalization helps achieve:

- **Reduced data redundancy**: Store data only once
- **Improved data integrity**: Prevent inconsistencies
- **Easier maintenance**: Update data in one place
- **Better query performance**: Smaller, focused tables
- **Logical data organization**: Clear relationships

## The Normal Forms

Normalization is achieved through a series of steps called **normal forms** (NF). Each form builds upon the previous one.

### First Normal Form (1NF)

**Rule**: Each column must contain atomic (indivisible) values, and each row must be unique.

#### Before 1NF (Violates atomicity)

```sql
CREATE TABLE orders (
    order_id INT,
    customer_name VARCHAR(100),
    products VARCHAR(255) -- ❌ Contains multiple values
);

-- Example data
| order_id | customer_name | products           |
|----------|---------------|--------------------|
| 1        | John Doe      | Apple, Banana      |
| 2        | Jane Smith    | Orange, Grape, Kiwi|
```

#### After 1NF (Atomic values)

```sql
CREATE TABLE orders (
    order_id INT,
    customer_name VARCHAR(100),
    product VARCHAR(100) -- ✅ Single atomic value
);

-- Example data
| order_id | customer_name | product |
|----------|---------------|---------|
| 1        | John Doe      | Apple   |
| 1        | John Doe      | Banana  |
| 2        | Jane Smith    | Orange  |
| 2        | Jane Smith    | Grape   |
| 2        | Jane Smith    | Kiwi    |
```

### Second Normal Form (2NF)

**Rule**: Must be in 1NF and all non-key attributes must depend on the entire primary key (no partial dependencies).

This applies to tables with composite keys.

#### Before 2NF (Partial dependency)

```sql
CREATE TABLE order_details (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),  -- ❌ Depends only on product_id
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Example data
| order_id | product_id | product_name | quantity |
|----------|------------|--------------|----------|
| 1        | 101        | Apple        | 5        |
| 1        | 102        | Banana       | 3        |
| 2        | 101        | Apple        | 2        |
```

`product_name` depends only on `product_id`, not the full key.

#### After 2NF (Remove partial dependencies)

```sql
CREATE TABLE orders (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100)
);

-- orders table
| order_id | product_id | quantity |
|----------|------------|----------|
| 1        | 101        | 5        |
| 1        | 102        | 3        |
| 2        | 101        | 2        |

-- products table
| product_id | product_name |
|------------|--------------|
| 101        | Apple        |
| 102        | Banana       |
```

### Third Normal Form (3NF)

**Rule**: Must be in 2NF and have no transitive dependencies (non-key attributes should not depend on other non-key attributes).

#### Before 3NF (Transitive dependency)

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100), -- ❌ Depends on department_id, not employee_id
    department_location VARCHAR(100) -- ❌ Depends on department_id
);

-- Example data
| employee_id | name       | department_id | department_name | department_location |
|-------------|------------|---------------|-----------------|---------------------|
| 1           | Alice      | 10            | Sales           | New York            |
| 2           | Bob        | 10            | Sales           | New York            |
| 3           | Charlie    | 20            | IT              | San Francisco       |
```

`department_name` and `department_location` depend on `department_id`, not directly on the primary key.

#### After 3NF (Remove transitive dependencies)

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100),
    department_location VARCHAR(100)
);

-- employees table
| employee_id | name    | department_id |
|-------------|---------|---------------|
| 1           | Alice   | 10            |
| 2           | Bob     | 10            |
| 3           | Charlie | 20            |

-- departments table
| department_id | department_name | department_location |
|---------------|-----------------|---------------------|
| 10            | Sales           | New York            |
| 20            | IT              | San Francisco       |
```

## Higher Normal Forms

There are higher normal forms (BCNF, 4NF, 5NF), but most applications only need to reach 3NF for practical purposes.

## When to Denormalize

While normalization is generally beneficial, sometimes **denormalization** (intentionally adding redundancy) improves performance:

- **Read-heavy applications**: Joining many tables can be slow
- **Data warehouses**: Optimized for analytical queries
- **Caching layers**: Faster access to frequently used data

## Practical Example: E-commerce Database

### Before Normalization

```sql
CREATE TABLE orders (
    order_id INT,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_address VARCHAR(255),
    product_name VARCHAR(100),
    product_price DECIMAL(10, 2),
    quantity INT
);
```

**Problems**:
- Customer data repeated for each order
- Product data repeated for each order line
- Hard to update customer or product information

### After Normalization (3NF)

```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

**Benefits**:
- No duplicate customer or product data
- Easy to update prices or customer information
- Clear relationships between entities

## Conclusion

Database normalization is a fundamental technique for designing efficient and maintainable databases. While reaching 3NF is sufficient for most applications, understanding when to denormalize for performance is equally important.

The key is finding the right balance between normalization (for data integrity) and denormalization (for performance).
