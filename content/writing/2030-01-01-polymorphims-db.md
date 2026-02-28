+++
path = "2030-01-01-polymorphims-db"
title = "Implementing Polymorphism in Databases"
description = "Learn the three main strategies for mapping object-oriented inheritance to relational database tables"
date = 2025-03-20
draft = true

[taxonomies]
tags = ['Databases', 'OOP', 'Design Patterns']

[extra]
static_thumbnail = "/images/2022-03-20/1.webp"
subtitle = ""
+++

When designing database schemas for object-oriented applications, one challenge is mapping inheritance hierarchies to relational tables. There are three main strategies for implementing polymorphism in databases, each with different trade-offs.

## The Three Mapping Strategies

### 1. Single Table Inheritance (STI)

All classes in the hierarchy are stored in a single table with all possible columns from all classes.

#### Structure

```sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    type VARCHAR(50),  -- Discriminator column
    name VARCHAR(100),
    price DECIMAL(10, 2),

    -- Fields specific to physical products
    weight DECIMAL(10, 2),
    dimensions VARCHAR(100),

    -- Fields specific to digital products
    file_size INT,
    download_url VARCHAR(255),

    -- Fields specific to service products
    duration_hours INT,
    provider VARCHAR(100)
);
```

#### Example Data

```
| id | type     | name           | price | weight | dimensions | file_size | download_url | duration_hours | provider   |
|----|----------|----------------|-------|--------|------------|-----------|--------------|----------------|------------|
| 1  | physical | Laptop         | 999   | 2.5    | 30x20x2    | NULL      | NULL         | NULL           | NULL       |
| 2  | digital  | E-book         | 19    | NULL   | NULL       | 5242880   | /files/book  | NULL           | NULL       |
| 3  | service  | Consulting     | 150   | NULL   | NULL       | NULL      | NULL         | 2              | John Doe   |
```

#### Pros

- **Fast queries**: No joins needed
- **Simple schema**: One table to manage
- **Easy to add new subtypes**: Just add columns

#### Cons

- **Wasted space**: Many NULL values (though modern databases optimize this)
- **Potential for data integrity issues**: No enforcement that fields are used correctly for each type
- **Table can become very wide**: Many columns if many subtypes exist

#### When to Use

- Few subtypes with similar attributes
- Performance is critical and you need to avoid joins
- Subtypes don't have many unique fields

### 2. Class Table Inheritance (CTI)

Each class has its own table, including the base class. Subclass tables only contain fields specific to them.

#### Structure

```sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE physical_products (
    id INT PRIMARY KEY,
    weight DECIMAL(10, 2),
    dimensions VARCHAR(100),
    FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE digital_products (
    id INT PRIMARY KEY,
    file_size INT,
    download_url VARCHAR(255),
    FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE service_products (
    id INT PRIMARY KEY,
    duration_hours INT,
    provider VARCHAR(100),
    FOREIGN KEY (id) REFERENCES products(id)
);
```

#### Example Data

```
-- products table
| id | name       | price |
|----|------------|-------|
| 1  | Laptop     | 999   |
| 2  | E-book     | 19    |
| 3  | Consulting | 150   |

-- physical_products table
| id | weight | dimensions |
|----|--------|------------|
| 1  | 2.5    | 30x20x2    |

-- digital_products table
| id | file_size | download_url |
|----|-----------|--------------|
| 2  | 5242880   | /files/book  |

-- service_products table
| id | duration_hours | provider |
|----|----------------|----------|
| 3  | 2              | John Doe |
```

#### Pros

- **No wasted space**: Only necessary columns in each table
- **Clear data organization**: Each table represents a specific type
- **Enforces referential integrity**: Foreign keys ensure data consistency

#### Cons

- **Requires joins**: Getting all data for a subtype requires joining tables
- **More complex queries**: Especially when querying across all types
- **Schema changes impact multiple tables**: Changing base class requires updating main table

#### When to Use

- Many subtypes with significantly different attributes
- Data integrity and normalization are priorities
- Performance of writes is more important than reads

### 3. Concrete Table Inheritance

Each concrete class has its own complete table with all attributes (base + specific).

#### Structure

```sql
CREATE TABLE physical_products (
    id INT PRIMARY KEY,
    name VARCHAR(100),       -- Base class field
    price DECIMAL(10, 2),    -- Base class field
    weight DECIMAL(10, 2),   -- Specific field
    dimensions VARCHAR(100)  -- Specific field
);

CREATE TABLE digital_products (
    id INT PRIMARY KEY,
    name VARCHAR(100),       -- Base class field
    price DECIMAL(10, 2),    -- Base class field
    file_size INT,           -- Specific field
    download_url VARCHAR(255)-- Specific field
);

CREATE TABLE service_products (
    id INT PRIMARY KEY,
    name VARCHAR(100),       -- Base class field
    price DECIMAL(10, 2),    -- Base class field
    duration_hours INT,      -- Specific field
    provider VARCHAR(100)    -- Specific field
);
```

#### Example Data

```
-- physical_products table
| id | name   | price | weight | dimensions |
|----|--------|-------|--------|------------|
| 1  | Laptop | 999   | 2.5    | 30x20x2    |

-- digital_products table
| id | name   | price | file_size | download_url |
|----|--------|-------|-----------|--------------|
| 2  | E-book | 19    | 5242880   | /files/book  |

-- service_products table
| id | name       | price | duration_hours | provider |
|----|------------|-------|----------------|----------|
| 3  | Consulting | 150   | 2              | John Doe |
```

#### Pros

- **No joins needed**: All data in one table
- **Simple queries**: Fast access to specific types
- **Independent tables**: Changes to one type don't affect others

#### Cons

- **Duplicated base fields**: Common attributes repeated across tables
- **Hard to query across types**: No easy way to get all products
- **Maintenance overhead**: Changing base class fields requires updating all tables

#### When to Use

- Subtypes are mostly independent
- You rarely query across all types
- Each subtype has distinct usage patterns

## Comparison Table

| Strategy                    | Storage Efficiency | Query Performance | Maintainability | Referential Integrity |
|-----------------------------|--------------------|-------------------|-----------------|----------------------|
| Single Table Inheritance    | Medium (NULLs)     | Fast (no joins)   | Easy            | Medium               |
| Class Table Inheritance     | High (no NULLs)    | Slow (joins)      | Complex         | High                 |
| Concrete Table Inheritance  | Low (duplication)  | Fast (no joins)   | Medium          | Low                  |

## Practical Example: E-commerce Products

For an e-commerce platform with physical, digital, and service products:

- **Use Single Table Inheritance** if products have mostly similar attributes and performance is critical
- **Use Class Table Inheritance** if products have many unique attributes and you prioritize data integrity
- **Use Concrete Table Inheritance** if each product type is managed independently (different teams, different workflows)

## Conclusion

The choice of inheritance mapping strategy depends on your specific requirements:

- **Single Table Inheritance**: Best for simple hierarchies with few differences
- **Class Table Inheritance**: Best for complex hierarchies requiring high data integrity
- **Concrete Table Inheritance**: Best when subtypes are independent

Most modern ORMs (Doctrine, Hibernate, etc.) support all three strategies, allowing you to choose based on your needs.