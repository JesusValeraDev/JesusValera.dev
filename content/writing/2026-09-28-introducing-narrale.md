+++
path = "introducing-narrale"
title = "Narrale: A Quiet Workspace for Novelists"
description = "Meet Narrale, a writing workspace for novelists, and the design question behind it: how much AI belongs in a tool for writers?"
date = 2026-09-28
aliases = ['2026-09-28-introducing-narrale']

[taxonomies]
tags = ['Narrale', 'Writing', 'AI', 'Product Design']

[extra]
static_thumbnail = "/images/2026-09-28/1.webp"
image = "images/2026-09-28/1.webp"
image_width = 1810
image_height = 880
subtitle = "Why I built it, and where AI belongs in a writing app"
+++

![Narrale logo: an open book with an amber quill](/images/2026-09-28/1.webp)

Open almost any writing app today and the first thing it offers is to write for you. A blank page, a blinking cursor,
and a button promising to make both go away.

For a novelist, that is the one part you don't want to hand over. The sentences *are* the job. What you actually need
help with is everything around them: remembering that Clara is afraid of deep water, that chapter 12 happens at dusk and
chapter 13 in daylight, that you already used "glassy" twice on this page, and that the willow her grandmother talked
about was supposed to come back in the ending.

That gap is why I built **[Narrale](https://narrale.com)**.

<div class="separator"></div>

## What is Narrale?

Narrale is a writing workspace for novelists. It keeps your story, your world and your focus in one place:

- **Distraction-free drafting**: a clean canvas, careful typography, autosave and a focus mode
- **Story Bible**: characters, places and plot threads, written by you or extracted from your chapters
- **Planning canvas**: sticky notes and connections, plus a chronology of when things happen in the story, not when the
  reader meets them
- **Editorial lenses**: review a chapter for prose, pacing, characters, grammar or tone
- **Story intelligence**: continuity checks, plot arcs and relationship maps, to catch the timeline slip before your
  readers do

It also covers the essentials: version history, notes in the margin, collaboration, multiple languages and export to
different formats. And it keeps working when your connection doesn't.

The *why* is simple. A novel is long, and the writer carries all of it in their head. Most of us end up juggling a word
processor, a spreadsheet of characters, a corkboard and a notes app, and the story slowly leaks between them. Narrale is
my attempt to put it back together.

Here is a quick tour:

<video controls preload="metadata" playsinline poster="/images/2026-09-28/2.webp" style="display: block; width: 100%; height: auto; border-radius: 0.375rem; margin: 1rem 0;">
  <source src="/images/2026-09-28/narrale.mp4" type="video/mp4">
  Your browser can't play this video. You can see Narrale in action at <a href="https://narrale.com">narrale.com</a>.
</video>

<div class="separator"></div>

## Where does AI belong in a writing app?

The hardest question in building Narrale wasn't technical. It was this one.

Narrale's design has a north star, written down as *"The Silent Workspace"*: the drafting surface is aggressively
minimal. No colors, no alignment buttons, no tables, by design. The story is treated as a sacred object.

At the same time, the product grew a lot of AI: five editorial lenses, five story-tracking analyzers, Story Bible
extraction, planning extraction, autocomplete, and suggestions you can apply with one click.

Those two instincts pull in opposite directions. Every AI feature wants a home on screen: a panel, a toggle, a squiggle,
a popover. Put them all on the page and the quiet workspace turns into a cockpit. So there are really two products
hiding in one:

1. **A calm writing surface** that happens to have AI on the side.
2. **An AI story-intelligence platform**, where AI is the headline and lives in the foreground, including inside the
   page you are writing.

I lean towards the first one, and the line I keep drawing looks like this:

- **AI reads more than it writes.** Most of what it does is analysis: extracting characters, tracking continuity,
  reviewing a chapter. It works *on* your text, not instead of it.
- **Analysis has its own rooms.** Narrale has three phases in the top bar: Planning, Drafting and Editorial. The heavy
  AI lives in its own spaces, like Planning, Editorial and Story Intelligence, not layered on top of your draft.
- **In the draft, AI waits its turn.** Autocomplete runs when you ask for it (Cmd/Ctrl+Enter), unless you switch on inline
  suggestions. Nothing becomes a permanent panel.
- **Nothing changes the manuscript without a click.** When a lens spots *"and the the light was still good"*, the fix is
  a button you press, not an edit that just happens.
- **Your manuscript is not training data.** Narrale doesn't train models on your writing, and you keep every right in
  what you write.

The blank page stays yours. Narrale just keeps track of everything around it.

<div class="separator"></div>

Narrale is live at **[narrale.com](https://narrale.com)**. Every story starts free: the Drafter plan costs nothing, and
paid plans come with a 14-day free trial.

If you write fiction, or know someone who does, I would love to hear what you think:
[drop me a line](mailto:me@jesusvalerareales.dev).
