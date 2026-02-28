+++
path = "2026-01-19-link-local-packages-using-composer"
title = "Link Local Packages using Composer"
description = "Learn how to link and use local PHP packages in your projects using Composer's path repositories"
date = 2026-01-19

[taxonomies]
tags = ['PHP', 'Composer', 'dependencies', 'development', 'packages']

[extra]
static_thumbnail = "/images/2026-01-19/1.webp"
subtitle = ""
+++

![Elbphilharmonie Hamburg](/images/2026-01-19/1.webp)

When you're developing a PHP package or library, you often need to test it within another project before publishing it to Packagist.

Instead of constantly publishing new versions or using complicated workarounds, Composer provides a clean solution: **path repositories**.

## What are Path Repositories?

Path repositories allow you to use a local directory as a source for a Composer package. When configured, Composer creates a symlink from your `vendor` directory to the local package, meaning any changes you make are immediately reflected in your project.

This is particularly useful when:

- You're developing a library and want to test it in a real application
- You need to make changes to a vendor package and test them immediately
- You're working on multiple interdependent packages simultaneously
- You want to contribute to an open-source package and test your changes

## Basic Configuration

Let's say you have the following directory structure:

```bash
workspace/
├── my-project/
│   └── composer.json
└── my-local-package/
    └── composer.json
```

To link `my-local-package` to your project, add a `repositories` section to your `composer.json` file:

```json
{
  "repositories": [
    {
      "type": "path",
      "url": "../my-local-package"
    }
  ],
  "require": {
    "vendor/my-local-package": "dev-main"
  }
}
```

The `url` points to the root directory of your local package (where its `composer.json` is located). You can use either absolute paths or relative paths from your project root.

Take into account that the package name in the `require` section must match the directory name in your path.

In the example above, `my-local-package` appears in both `url: "../my-local-package"` and `require: "vendor/my-local-package"`. Composer uses this to link the correct local directory to your project.

## Version Constraints

When working with local packages, you can use different version constraints in your `require` section.

Using `*` tells Composer to accept any version from the local path, which is convenient during development:

```json
{
  "require": {
    "vendor/package": "*"
  }
}
```

Alternatively, you can be more specific and require a particular branch:

```json
{
  "require": {
    "vendor/package": "dev-main"
  }
}
```

This requires the `main` branch of your local package.

## Multiple Local Packages

You can configure multiple path repositories at once:

```json
{
  "repositories": [
    {
      "type": "path",
      "url": "../package-one"
    },
    {
      "type": "path",
      "url": "../package-two"
    },
    {
      "type": "path",
      "url": "/absolute/path/to/package-three"
    }
  ],
  "require": {
    "vendor/package-one": "*",
    "vendor/package-two": "*",
    "vendor/package-three": "*"
  }
}
```

## Installing the Package

Once you've configured your `composer.json`, install the package:

```bash
composer install
```

Or if the package is already required but you're adding the path repository:

```bash
composer update vendor/package-name
```

You should see output indicating Composer is symlinking from the local path:

```bash
  - Installing vendor/package-name (dev-main): Symlinking from ../my-local-package
```

## Removing Path Repositories for Production

Path repositories are intended for **local development**. Before deploying or sharing your code, you should:

1. Remove the `repositories` section from `composer.json`
2. Update the version constraint to a proper semantic version
3. Run `composer update` to pull from Packagist instead

<div class="separator"></div>

## References

- [Composer Repositories | Composer](https://getcomposer.org/doc/05-repositories.md#path)
- [Loading a package from a VCS repository | Composer](https://getcomposer.org/doc/05-repositories.md#loading-a-package-from-a-vcs-repository)
