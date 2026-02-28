+++
path = "2030-01-01-require-include"
title = "PHP: require vs include - Understanding File Inclusion"
description = "Learn the differences between require, require_once, include, and include_once in PHP and when to use each"
date = 2026-01-01
draft = true

[taxonomies]
tags = ['PHP', 'Best Practices']

[extra]
static_thumbnail = "/images/2025-03-20/1.webp"
subtitle = ""
+++

PHP provides four different ways to include external files: `require`, `require_once`, `include`, and `include_once`. Understanding when to use each is essential for writing robust PHP applications.

## The Four File Inclusion Functions

### `require`

Includes and evaluates a specified file. If the file cannot be found, **PHP will throw a fatal error** and stop script execution.

```php source
require 'config.php';
```

**Use when:**
- The file is absolutely necessary for the application to run
- You want the script to stop if the file is missing
- Including critical files like database configurations or autoloaders

### `require_once`

Same as `require`, but PHP will check if the file has already been included. If it has, it won't include it again.

```php source
require_once 'database.php';
require_once 'database.php'; // This won't be loaded again
```

**Use when:**
- You need to prevent redeclaring classes, functions, or constants
- Including class definitions
- Loading configuration files that should only be loaded once

### `include`

Includes and evaluates a specified file. If the file cannot be found, **PHP will emit a warning** but continue executing the script.

```php source
include 'optional-banner.php';
```

**Use when:**
- The file is optional and the script can continue without it
- Including template parts that aren't critical
- Loading optional components or plugins

### `include_once`

Same as `include`, but PHP will check if the file has already been included. If it has, it won't include it again.

```php source
include_once 'utilities.php';
include_once 'utilities.php'; // This won't be loaded again
```

**Use when:**
- The file is optional but should only be included once
- Preventing duplicate function/class declarations for non-critical files

## Key Differences Summary

| Function        | Error on Failure | Includes Multiple Times | Use Case                            |
|-----------------|------------------|-------------------------|-------------------------------------|
| `require`       | Fatal Error      | Yes                     | Critical files                      |
| `require_once`  | Fatal Error      | No                      | Critical files (classes, configs)   |
| `include`       | Warning          | Yes                     | Optional files                      |
| `include_once`  | Warning          | No                      | Optional files (prevent duplicates) |

## Practical Examples

### Configuration File (Critical)

```php source
// index.php
require_once 'config.php'; // Fatal error if missing
```

### Class Definition (Critical, Load Once)

```php source
// User.php
class User {
    // class code
}

// index.php
require_once 'User.php'; // Fatal error if missing, load only once
```

### Optional Template Part

```php source
// header.php
include 'promotional-banner.php'; // Warning if missing, script continues
```

### Helper Functions (Optional, Load Once)

```php source
// utilities.php
function formatDate($date) {
    return date('Y-m-d', strtotime($date));
}

// page.php
include_once 'utilities.php'; // Warning if missing, load only once
```

## Performance Considerations

`require_once` and `include_once` have a small performance overhead because PHP must track which files have been included. For high-traffic applications, consider using an autoloader instead of manual includes.

## Modern Alternatives

With modern PHP development, file inclusion is often handled by:

- **Composer autoloader**: Automatically loads classes
- **Frameworks**: Handle file loading internally
- **PSR-4 autoloading**: Standard for class autoloading

Example with Composer:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  }
}
```

After running `composer dump-autoload`, classes are loaded automatically:

```php source
use App\Models\User;

$user = new User(); // Autoloaded, no manual require needed
```

## Best Practices

1. **Use `require_once` for critical files** (configs, class definitions)
2. **Use `include` for optional templates** that won't break the app
3. **Prefer autoloading over manual includes** in modern applications
4. **Avoid using `require` or `include` without `_once`** for files containing classes or functions to prevent redeclaration errors

## Conclusion

While `require`, `require_once`, `include`, and `include_once` are still valid, modern PHP development favors autoloading. However, understanding these functions remains important for legacy codebases and certain use cases like configuration files and templates.
