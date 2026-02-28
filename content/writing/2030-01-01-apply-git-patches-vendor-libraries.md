+++
path = "2030-01-01-apply-git-patches-vendor-libraries"
title = "How to use local libraries in PHP composer"
description = ""
date = 2026-04-01
draft = true

[taxonomies]
tags = ["tags"]

[extra]
static_thumbnail = "/images/2020-01-01/1.webp"
subtitle = ""
+++

![](/images/2020-01-01/1.webp)

# How to Apply Patches to PHP Vendor Files Using Composer

When working with PHP packages, you’ll occasionally encounter bugs or missing features in dependencies that you cannot modify directly—because they live in the `vendor/` directory, which is regenerated on every install.  
**The correct way to patch vendor files is to use Composer patches**, not manual edits. This ensures your fixes are consistent, repeatable, and version-controlled.

In this guide, you'll learn step-by-step how to apply patches to vendor files using Composer.

---

## ## Why You Should Not Edit Vendor Files Directly

The `vendor/` directory is **managed entirely by Composer**, meaning:

- Any direct edits will be overwritten on the next `composer install` or `composer update`
- Other developers won’t receive your changes
- CI/CD builds won’t include your fixes
- Deployments become inconsistent

Instead, create patch files and instruct Composer to apply them automatically.

---

## ## Requirements

To apply patches, you’ll need the **Composer Patches plugin**:

```bash
composer require cweagans/composer-patches
```

This plugin lets you attach patch files to package versions in your composer.json.

## Step 1: Make Your Patch File

Go to the vendor package you want to modify:

```bash
cd vendor/vendor-name/package-name
```

Make the change you want directly in the vendor file (temporarily).

Create a patch file using diff:

```bash
diff -u OriginalFile.php ModifiedFile.php > fix-bug.patch
```

Or for a whole directory:

```bash
diff -ruN original/ modified/ > feature.patch
```

Move your patch file to a patches directory in your project, e.g.:

```bash
patches/
  fix-bug.patch
```

## Step 2: Register the Patch in composer.json

Add a "patches" section under "extra":

```json
{
  "extra": {
    "patches": {
      "vendor-name/package-name": {
        "Fix bug in package-name": "patches/fix-bug.patch"
      }
    }
  }
}
```

This tells Composer:

- which package should receive the patch
- which file is the patch
- a description (optional but recommended)

## Step 3: Apply the Patch with Composer

Run:

```bash
composer install
```

or

```bash
composer update vendor-name/package-name
```

The patches plugin will:

- Reinstall the package
- Apply your patch
- Confirm the patch was applied successfully in the Composer output

## Step 4: Commit Everything

You should commit:

✔ the patch file
✔ the changes to `composer.json` and `composer.lock`

Do **not** commit the patched vendor files—they are rebuilt by Composer.

## Example Folder Structure

```bash
project/
│
├── patches/
│   └── fix-bug.patch
│
├── composer.json
├── composer.lock
└── vendor/
```

## Troubleshooting

### Patch fails to apply

Run:
```bash
composer install -vvv
```

The verbose output will show exactly where the patch fails.

Common causes:

- Wrong line numbers due to version mismatch
- You created the patch against a modified or outdated vendor copy
- Patch includes file paths that don't match the actual vendor directory

### Patch applied but changes not visible

Clear any caches, especially in:

- Laravel
- Symfony
- Doctrine
- Twig

## Alternative: Use a Fork (When Patches Aren’t Enough)

If your changes are large or require multiple files, consider:

- Forking the package on GitHub
- Updating your composer.json to point to your fork:

```json
"repositories": [
  {
    "type": "vcs",
    "url": "https://github.com/yourname/package-name"
  }
]
```

## Summary

Applying patches through Composer is the safest and most maintainable way to modify vendor code. The workflow is:

1. Make and capture changes in a patch file
2. Add the patch to the composer.json
3. Let Composer apply it automatically
4. Commit only the patch and composer files

This ensures your changes are:

- Reproducible
- Version-controlled
- Safe across environments
