+++
path = "how-to-create-a-global-gitignore-file"
title = "How to create a global .gitignore file"
description = "There is a way to not commit unnecessary files with a global .gitignore file. Here you will learn how to create this configuration in your git globally."
date = 2023-04-25
updated = 2026-11-01
aliases = ['2023-04-25-how-to-create-a-global-gitignore-file']

[taxonomies]
tags = ['Git', 'Programming', 'Gitignore', 'Github', 'Version Control']

[extra]
static_thumbnail = "/images/2023-04-25/1.webp"
subtitle = "and forget to ignore the same files over and over again! ⚡️"
+++

![externsteine](/images/2023-04-25/1.webp)

Sometimes while we're creating a pull request, we realise we're committing some unnecessary config files, like the
settings from your IDE, some cache files or even auto-generated files like the `.DS_Store`.

Fortunately, there is a way to ignore all these files in your system and stop adding them to the `.gitignore` of
every project.

## Where Git looks for the global file

You have two options: use the location Git already knows about, or create your own file and tell Git where it is.
Pick one: once `core.excludesFile` is set, Git stops reading `~/.config/git/ignore`.

### The default: `~/.config/git/ignore`

Git reads `~/.config/git/ignore` out of the box, with no configuration at all. The file usually doesn't exist yet, so
create it:

```bash
mkdir -p ~/.config/git
touch ~/.config/git/ignore
```

Any pattern you write there applies to every repository on your machine.

### Your own file: `core.excludesFile`

If you prefer a file like `~/.gitignore` in your home folder, create it first:

```bash
touch ~/.gitignore
```

Then tell Git where it is:

```bash
git config --global core.excludesFile ~/.gitignore
```

You can confirm your file was added by running the previous command without specifying the path.
You should see the file location. If so, it should be done 🐙

```bash
git config --global core.excludesFile

/Users/Jesus/.gitignore # Output 👀
```

## What to put in it

Depending on your OS, IDE, the programming language and so on, the content of this file could vary. The idea is to list
here all the files you want to omit, whichever of the two locations you picked.

```bash
*~
.DS_Store
.idea
*.cache
```

> If you aren't working alone on a project, consider that maybe other people aren't ignoring the duplicate files
> globally as you do, so for this, it is worth adding these lines not only on your global but in the `.gitignore` from
> that project.

Happy programming! 🤓
