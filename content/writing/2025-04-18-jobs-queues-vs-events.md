+++
path = "jobs-queues-vs-events"
title = "Jobs (Queues) vs. Events"
description = "Jobs run heavy work in the background or on a schedule; events announce that something happened so other code can react. When to use each, with examples."
date = 2025-04-18
updated = 2026-11-01
aliases = ['2025-04-18-jobs-queues-vs-events']

[taxonomies]
tags = ['programming', 'job', 'event', 'queue', 'async', 'laravel']

[extra]
static_thumbnail = "/images/2025-04-18/1.webp"
subtitle = "When to use each one?"
+++

![cave](/images/2025-04-18/1.webp)

When a heavy task needs to run outside the main request-response flow, or multiple actions need to occur when something
happens, you have two main options: jobs and events. They serve different purposes.

## Jobs

A job is a task that **runs in the background**, either on a schedule or triggered outside the main request-response
cycle. Jobs handle resource-intensive, time-consuming, or non-urgent processes.

Use cases:
- Scheduled tasks (cron jobs)
- Processing that doesn't need to run immediately
- Large file operations (PDFs, images)
- Syncing with third-party services

**Example**: A system that generates and emails financial reports every night at midnight. No user action triggers it.
It runs on a schedule.

## Events

An event is a **signal that something has happened** in your application. Events can be triggered by users or by the
system. An event doesn't do anything by itself: **one or more listeners react to it**.

Events decouple your logic. Instead of hardcoding all actions inside one method, you fire an event and let other parts
of the system respond independently.

Use cases:
- Broadcasting when a specific action occurs (like `UserRegistered`)
- Triggering multiple follow-up actions
- Separating concerns between modules

**Example**: When a user registers, a `UserRegistered` event fires. Different listeners can send a welcome email, create
an audit log, and notify an admin. Each one works independently.

<div class="separator"></div>

You can combine both patterns. An event fires when a user performs an action, and one of the listeners queues a job to
run in the background, like sending a welcome email asynchronously.

**Jobs** are like an alarm clock that rings at the same time every day, whether you're awake or not. **Events** are like
a doorbell: it rings when pressed, and everyone inside hears it.

## When to use each

**Use a job when you need to:**
- Perform heavy or background tasks
- Execute one-off tasks with no notification requirement
- Retry failed operations
- Run scheduled processes

**Use an event when you need to:**
- Trigger multiple reactions from one action
- Broadcast that something happened
- Decouple business logic across modules

<div class="separator"></div>

## Jobs in Laravel

The rest of the post shows both patterns in **Laravel**. Other frameworks use different names for the same ideas.

### A queued job

`php artisan make:job SendFinancialReports` creates the class. Implementing `ShouldQueue` is what sends it to the
queue instead of running it on the spot.

```php
<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendFinancialReports implements ShouldQueue
{
    use Queueable;

    public function handle(): void
    {
        // Build each PDF and email it...
    }
}
```

Dispatch it from anywhere, and a worker process picks it up:

```php
SendFinancialReports::dispatch();
```

```bash
php artisan queue:work
```

### Scheduling a job

The nightly reports from the first example are scheduled in `routes/console.php`. `daily()` runs at midnight.

```php
use App\Jobs\SendFinancialReports;
use Illuminate\Support\Facades\Schedule;

Schedule::job(new SendFinancialReports)->daily();
```

> The scheduler needs one cron entry on the server that runs `php artisan schedule:run` every minute.

### Retries, backoff and failures

`$tries` sets how many attempts a job gets, and `$backoff` how many seconds to wait between them. An array gives each
retry its own delay: here 60 seconds before the second attempt and 300 before the third. Once the last attempt fails,
Laravel calls `failed()`.

```php
use Throwable;

class SendFinancialReports implements ShouldQueue
{
    use Queueable;

    public $tries = 3;

    public $backoff = [60, 300];

    public function failed(?Throwable $exception): void
    {
        // Tell the team the reports didn't go out...
    }
}
```

### A job can run twice

A retry starts `handle()` from the top. If the job emailed half the reports before it crashed, the retry emails those
again. A worker that dies halfway causes the same thing, since the queue hands the job out again after a timeout.

So write jobs that are safe to repeat (**idempotent**): check what is already done before doing it.

```php
public function handle(): void
{
    Report::whereNull('sent_at')->eachById(function (Report $report) {
        // Build the PDF and email it...
        $report->update(['sent_at' => now()]);
    });
}
```

A retry now skips the reports already marked as sent and repeats at most the one it was working on.

## Events in Laravel

### An event and a listener

An event is a plain class that carries the data. Listeners in `app/Listeners` are discovered by the type hint on
`handle()`, so there's nothing to register.

```php
<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserRegistered
{
    use Dispatchable, SerializesModels;

    public function __construct(public User $user) {}
}
```

```php
<?php

namespace App\Listeners;

use App\Events\UserRegistered;

class CreateAuditLog
{
    public function handle(UserRegistered $event): void
    {
        // Store an audit entry for $event->user...
    }
}
```

Fire it after creating the user:

```php
UserRegistered::dispatch($user);
```

### Queued listeners

Add `ShouldQueue` to a listener and Laravel wraps it in a job for you. That's the shortcut for "one of the listeners
queues a job" from earlier. Queued listeners accept `$tries`, `$backoff` and `failed()` too, and `failed()` also
receives the event.

```php
<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Mail\WelcomeMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendWelcomeEmail implements ShouldQueue
{
    use InteractsWithQueue;

    public $tries = 3;

    public function handle(UserRegistered $event): void
    {
        Mail::to($event->user)->send(new WelcomeMail($event->user));
    }

    public function failed(UserRegistered $event, Throwable $exception): void
    {
        // Log it, or retry by hand later...
    }
}
```

### Sync or queued?

A **sync listener** runs inside the request. The user waits for it, and if it throws, the request fails and the
listeners after it never run. In exchange, there's nothing extra to deploy and it's easy to debug.

A **queued listener** lets the response go out right away, and its failures are retried without the user noticing. The
cost is a worker you have to keep running, and timing: the listener runs later, with the user re-fetched from the
database. If you fire the event inside a database transaction, the listener may even run before the commit. Implement
`ShouldQueueAfterCommit` instead of `ShouldQueue` to make it wait.

> A good rule of thumb: keep a listener sync when it's fast and must succeed together with the action. Queue it when
> it's slow or talks to another service, like sending an email.

Happy queueing! 📬
