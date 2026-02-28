+++
path = "2030-01-01-php-git-pre-hooks"
title = "How to create Git prehooks in PHP"
description = ""
date = 2024-04-01
draft = true

[taxonomies]
tags = ["tags"]

[extra]
static_thumbnail = "/images/2020-01-01/1.webp"
subtitle = ""
+++

![](/images/2020-01-01/1.webp)

[//]: # (Sure, you can take a look at this repo for example: https://github.com/gacela-project/gacela/)

The key is in the `composer.json` file, you need to add inside `scripts` on `post-install-cmd` (L75) the executable file you want to run, in this example is something like:

```
{
  ...
  "scripts": {
    "post-install-cmd": "tools/git-hooks/init.sh", 
    ...
```


And then, in the root of your project create the folders `tools/git-hooks/` and `init.sh`, the `init.sh` what it does is basically create a syslimk of the files you want to copy inside `.git/hooks/pre-commit` folder.

When you have the setup, don't forget to run `composer install` to run the `post-install-cmd` script inside `composer.json`.

Other alternative could be to run directly the `init.sh` in the root of your application.
