+++
path = "2026-07-24-apply-git-patches-vendor-libraries"
title = "Apply Patches to Vendor Libraries using Composer"
description = "Learn how to patch PHP vendor packages with Composer patches instead of editing files in the vendor directory on PHP"
date = 2026-07-24

[taxonomies]
tags = ['PHP', 'Composer', 'dependencies', 'patches', 'vendor']

[extra]
static_thumbnail = "/images/2026-07-24/1.webp"
subtitle = ""
+++

![hamburg](/images/2026-07-24/1.webp)

When working with PHP packages, you'll occasionally encounter bugs or missing features in dependencies that you cannot modify directly, because they live in the `vendor/` directory, which is regenerated on every install.

However, there is a way to patch vendor files using Composer patches, not manual edits. This ensures your fixes are consistent, repeatable, and version-controlled.

## Why You Should Not Edit Vendor Files Directly

The `vendor/` directory is **managed entirely by Composer**, meaning:

- Any direct edits will be overwritten on the next `composer install` or `composer update`
- Other developers won't receive your changes
- CI/CD builds won't include your fixes
- Deployments become inconsistent

Instead, create patch files and instruct Composer to apply them automatically.

## Requirements

To apply patches, you'll need the **Composer Patches plugin**:

```bash
composer require cweagans/composer-patches:^2.0
```

This plugin lets you attach patch files to package versions in your composer.json.

## Step 1: Make Your Patch File

Composer installs packages from dist (a zip archive), so there is no Git history inside `vendor/` to diff against. Create one first:

```bash
cd vendor/vendor-name/package-name
git init
git add .
git commit -m "Original package"
```

Now make the change you want directly in the vendor files, and write the diff into a `patches/` directory in your project root:

```bash
git diff > ../../../patches/fix-bug.patch
```

If your change adds new files, stage them first so they end up in the diff:

```bash
git add -A
git diff --cached > ../../../patches/feature.patch
```

Using Git here is not incidental. Patches are applied with `patch -p1` from the package root, which strips exactly one leading path component, and `git diff` writes its paths with the `a/` and `b/` prefixes that `-p1` expects.

If you'd rather use plain `diff`, compare two copies of the package directory so the output carries that same leading component:

```bash
diff -ruN original/ modified/ > patches/feature.patch
```

What will **not** work is diffing a single file, because its paths have no leading directory for `-p1` to strip:

```bash
diff -u OriginalFile.php ModifiedFile.php > fix-bug.patch
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

## Step 4: Commit

You should commit the patch file and the changes to `composer.json` and `composer.lock`.

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

Start with the plugin's own diagnostics, which check for the most common misconfigurations:

```bash
composer patches-doctor
```

To see the full output of the patching process, run:

```bash
composer install -vvv
```

Common causes:

- Wrong line numbers because the package moved on since you wrote the patch
- You created the patch against an already-modified or outdated vendor copy
- The paths inside the patch don't line up with `-p1`, as described in Step 1

### The patch never runs at all

Since Composer 2.2, plugins only execute if they are explicitly allowed:

```json
{
  "config": {
    "allow-plugins": {
      "cweagans/composer-patches": true
    }
  }
}
```

`composer require` asks about this interactively and records your answer, so it usually just works on your machine. If that entry never gets committed, CI runs non-interactively, the plugin is skipped without complaint, and no patch is ever applied. This is the most common reason a patch works locally but not on the build server.

### Patch edited but changes not visible

Patches are applied when a package is installed, so editing a `.patch` file does nothing to a package already sitting in `vendor/`. Force a re-apply:

```bash
composer patches-repatch
```

If you changed which patches are defined rather than their contents, refresh the lock file first:

```bash
composer patches-relock
```

If the patch is applied and you still see the old behaviour, clear your framework caches before digging any further.

## Alternative: Use a Fork (When Patches Aren't Enough)

Patches work best for small, surgical changes. If your fix spans many files, or you need to keep it in step with upstream over time, fork the package instead.

Point Composer at your fork and require the branch your fix lives on:

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/yourname/package-name"
    }
  ],
  "require": {
    "vendor/package-name": "dev-my-fix"
  }
}
```

The `repositories` entry on its own changes nothing. Composer only resolves to the fork once the constraint in `require` points at a branch that exists there.

Keep in mind that a fork is a standing maintenance cost, as every upstream release becomes yours to merge. If all you need is a local copy to develop against, [path repositories](/2026-01-19-link-local-packages-using-composer/) are the lighter option.

Whichever route you take, open a pull request upstream. Once the fix is released, you get to delete the patch or the fork entirely.

## Summary

Composer patches keep vendor fixes reproducible: capture the change as a patch, register it in `composer.json`, and let Composer re-apply it on every install. The `vendor/` directory stays disposable, which is exactly what it is meant to be.

<div class="separator"></div>

## References

- [Composer Patches | cweagans](https://docs.cweagans.net/composer-patches/)
- [Defining patches | cweagans](https://docs.cweagans.net/composer-patches/usage/defining-patches/)
- [allow-plugins | Composer](https://getcomposer.org/doc/06-config.md#allow-plugins)
- [Loading a package from a VCS repository | Composer](https://getcomposer.org/doc/05-repositories.md#loading-a-package-from-a-vcs-repository)
