+++
path = "2024-07-01-git-rebase-onto"
title = "Git Rebase onto"
description = "How to solve Git conflicts or changing the branch history when rebasing onto a branch"
date = 2024-07-01

[taxonomies]
tags = ['Git', 'Rebase', 'Onto', 'Branch']

[extra]
static_thumbnail = "/images/2024-07-01/1.webp"
subtitle = "How to modify the commit history with git rebase onto"
+++

![tuendern](/images/2024-07-01/1.webp)

When you are working with Git, you may find yourself in a situation where you need to rebase your branch onto another branch.<br>
This can happen when you want to incorporate changes from one branch into another, but you want to keep the commit history clean and linear.

## What is `git rebase --onto`?

The `git rebase --onto` is a powerful command when you need more control over the rebase process.
It allows you to specify a different branch or commit to rebase your changes onto, which is not necessarily the upstream branch of the current branch.

The command takes three arguments:

1. The new base commit
2. The **exclusive** starting commit of the range to rebase
3. The **inclusive** ending commit of the range to rebase

### Syntax

```bash
git rebase --onto <new-base> <upstream> <branch>
```

## Rebasing a Subset of Commits

When you want to rebase a subset of commits from your branch onto another branch:

```bash
     A---B---C  (feature)
    /
---X---Y---Z  (master)
```

If you want to rebase `A` into `Z`, you can use the following command:

```bash
(feature)$ git rebase --onto master Z

-- also works --
(feature)$ git rebase --onto master master feature
```

This command will rebase the commits from `feature` branch onto the `master` branch, starting from commit `Z`.

```bash
             A'---B'---C'  (feature)
            /
---X---Y---Z  (master)
```

## Skipping Commits

When you want to skip a set of commits from your current branch:

```bash
             A---B---C---D  (feature)
            /
---X---Y---Z  (master)
```

If you want to skip `A` and `B` (start from **`C`** commit), and rebase the rest onto **`Z`**, you can use the following command:

```bash
(feature)$ git rebase --onto master B feature # exclusive selection - we pick B, not C
```

This skips commits `A` and `B` and applies the remaining commits onto the `master` branch.

```bash
             C'---D'  (feature)
            /
---X---Y---Z  (master)
```

## Rebasing to a different base

When you want to rebase a branch onto a completely different base that is not its current base.

```bash
     A---B---C  (feature1)
    /
---X---Y---Z  (master)
    \
     D---E (feature2)
```

If you want to rebase `feature2` onto `feature1`:

```bash
(feature1)$ git rebase --onto feature1 master feature2
```

This command will rebase `feature2` onto `feature1`.

```bash
     A---B---C---D'---E'  (feature1)
    /
---X---Y---Z  (master)
```

<div class="separator"></div>

## References

- [Git Rebase | Git](https://git-scm.com/docs/git-rebase)
- [Git rebase --onto an overview | Woman on Rails](https://womanonrails.com/git-rebase-onto)
