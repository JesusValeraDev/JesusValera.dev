+++
title = "Getting started with Open Source Software"
description = "Learn why and how to work in OSS"
date = 2020-07-02

[taxonomies]
tags = ['Collaboration', 'Git', 'Github', 'Open Source', 'Programming']

[extra]
static_thumbnail = "/images/2020-07-02/1.webp"
subtitle = "Being up-to-date and avoiding conflicts"
+++

![snow trail](/images/2020-07-02/1.webp)

Have you ever wondered how you could collaborate with open-source projects, but you didn't know how to start? It
couldn't be easier. Take a look:

- Fork the repository into your account

![fork project github ux](/images/2020-07-02/2.webp)

- Clone the forked project on your computer

```bash
git clone git@github.com/myself/forked.git
```

- Add the upstream to sync with the new changes to your project

![cloning project https](/images/2020-07-02/3.webp)


```bash
(master)$ git remote add upstream https://github.com/owner/repo.git
# If you run `git remote -v` you should see:
origin git@github.com:myself/forked.git (fetch)
origin git@github.com:myself/forked.git (push)
upstream git@github.com:owner/repo.git (fetch)
upstream git@github.com:owner/repo.git (push)
```

Get the last changes in your project (not necessary if you just forked the project).

```bash
(master)$ git fetch upstream master
(master)$ git merge upstream/master
```

- Create a new branch

```bash
(master)$ git checkout -b new-branch
```

Once you're done, let’s create a PR!

```bash
(new-branch)$ git add . # Add to git your changes
(new-branch)$ git commit -m ‘Type the commit message’
(new-branch)$ git push origin new-branch # Push in forked & origin
```

- If you get errors trying to push your last changes, add your SSH credentials

```bash
(master)$ git remote set-url origin git@github.com:myself/forked.git
```

### That's all!

> If your changes (_or someone else’s_) have been merged in the origin, you need to run **fetch upstream master** and 
> **git merge upstream/master** in master to be up-to-date!

![hungarian tori in snow](/images/2020-07-02/4.webp)

## To sum up

```bash
# Synchronize your local repository to the original one
# Need to run only once the first time
git remote add upstream git@github.com/owner/repo.git
# Get all changes from sync project into upstream branch
git fetch upstream master
# Merge upstream branch into your current branch
git merge upstream/master
```

<div class="separator"></div>

## Reference

- [Syncing a fork | GitHub doc](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
- [Learn Git commands | GitExplorer](https://gitexplorer.com/)
- [Git Tips | Oh Shit, Git!?!](https://ohshitgit.com/)