+++
title = "How to create a global .gitignore file"
description = "There is a way to not commit unnecessary files with a global .gitignore file. Here you will learn how to create this configuration in your git globally."
date = 2023-04-25

[taxonomies]
tags = ['Git', 'Programming', 'Gitignore', 'Github', 'Version Control']

[extra]
static_thumbnail = "/images/2023-04-25/1.webp"
subtitle = "and forget to ignore the same files over and over again! ⚡️"
+++

![externsteine](/images/2023-04-25/1.webp)

Sometimes while we're creating a pull request, we realise we're committing some unnecessary config files, like the
settings from your IDE, some cache files or even auto-generated files like the `.DS_Store`.

Fortunately, there is a way to ignore all these files in your system and don't bother to add them anymore to every
project in the specific `.gitignore`.

The first step is to create the global `.gitignore` file we're going to use.

```bash
touch ~/.gitignore
```

Depending on your SO, the IDE, the programming language, etc that you use, the content of this file could vary, but the
idea is to place it here all these files you want to omit.

```bash
*~
.DS_Store
.idea
*.cache
```

Finally, let's add this file to your `git` as follows:

```bash
git config --global core.excludesFile ~/.gitignore
```

You can confirm your file was added by running the previous command without specifying the path.
You should see the file location, if so, it should be done 🐙

```bash
git config --global core.excludesFile

/Users/Jesus/.gitignore # Output 👀
```

> If you aren't working alone on a project, consider that maybe other people aren't ignoring the duplicate files
> globally as you do, so for this, it is worth adding these lines not only on your global but in the `.gitignore` from
> that project.

Happy programming! 🤓