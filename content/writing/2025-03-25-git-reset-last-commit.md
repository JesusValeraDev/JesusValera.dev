+++
path = "2025-03-25-git-reset-last-commit"
title = "Git: Reset last commit"
description = "differences between git reset & git revert"
date = 2025-03-25

[taxonomies]
tags = ['git', 'git reset', 'git revert', 'commit']

[extra]
static_thumbnail = "/images/2025-03-25/1.webp"
subtitle = "git reset --soft, git reset --hard & git revert"
+++

When working with Git, it is possible that you committed some code by mistake.
You can use `git revert` or `git reset` commands to have a cleaner Git history.

![artenara landscape](/images/2025-03-25/1.webp)

## Git revert

If you want to **undo a commit without losing the history but creating a new commit** undoing what you did, consider using `git revert`:

```bash
git revert HEAD~1
```

This command is a safer option in shared repositories.

## Git reset

The `git reset` command moves the `HEAD` pointer to a previous point, removing intermediate commits.

### Git reset soft

After running this command, the **changes from the last commit will still be staged**.

```bash
git reset --soft HEAD~1
```

Use cases:
- You made a commit but realized you need to modify something before finalizing it
- You want to combine multiple commits into one before pushing


### Git reset hard

After running this command, the **changes from the last commit will be removed**.

```bash
git reset --hard HEAD~1
```

Use cases:
- You want to remove some commits and return to a clean state completely
- You accidentally committed something and need to reset without keeping any modifications

#### Git push origin

What if you pushed some commits into a remote branch and needed to push your latest changes regardless?

In that case, you can force the push using the flag `-f`. This command will override the history, which means the previous commits will be removed.

```bash
git push origin {branch} -f
```
<div class="separator"></div>

## Conclusion

Understanding when to use `git reset --soft` and `git reset --hard` is crucial for managing commits effectively.<br>
Use `--soft` when you need to adjust your commits without losing changes and `--hard` when you need a complete reset. Always double-check before using `--hard` to avoid unintended data loss!

If you have doubts, or you are working in a branch with other people, it is preferable to use `git revert` instead.
