+++
path = "2023-11-27-phpstorm-tricks"
title = "PhpStorm tricks ✨"
description = "PhpStorm tricks: Customize the IDE with templates, plugins, shortcuts and more"
date = 2023-11-27

[taxonomies]
tags = ['PhpStorm', 'Intellij', 'Settings', 'Customize', 'IDE']

[extra]
static_thumbnail = "/images/2023-11-27/1.webp"
subtitle = "Customize the IDE with templates, plugins and more"
+++

PhpStorm is a powerful IDE that helps to boost your development, let's take a look to some hidden tricks to make
PhpStorm even better! ⚡️

![phpstorm logo](/images/2023-11-27/1.webp)

## Plugins

Plugins are a crucial part of the IDE.

If you are a Symfony user, probably you use plugins
like <a href="https://plugins.jetbrains.com/plugin/7219-symfony-support" target="_blank">Symfony Support</a>
and <a href="https://plugins.jetbrains.com/plugin/7303-twig" target="_blank">Twig</a>. In the other hand, if you are a Laravel one, I bet you use <a href="https://plugins.jetbrains.com/plugin/13441-laravel-idea" target="_blank">Laravel Idea</a>
and <a href="https://plugins.jetbrains.com/plugin/7569-blade" target="_blank">Blade</a>.
However, I recommend you <a href="https://plugins.jetbrains.com/plugin/7499-gittoolbox" target="_blank">GitToolBox</a>
or <a href="https://plugins.jetbrains.com/plugin/2162-string-manipulation" target="_blank">String Manipulation</a> in
case you never tried them.<br>
Another recommendation, in case you want to familiarize with the IDE shortcuts
is <a href="https://plugins.jetbrains.com/plugin/9792-key-promoter-x" target="_blank">Key Promoter X</a>.

Although, my favorite so far, which is also not very well-known
is <a href="https://plugins.jetbrains.com/plugin/7622-php-inspections-ea-extended-" target="_blank">PHP Inspections (EA
Extended)</a>. This plugin helps you with architecture related issues, regular expressions, non-optimal, duplicated and
suspicious "if" conditions, performance issues beyond others.<br>
You can check the full list of features on their
<a href="https://github.com/kalessil/phpinspectionsea" target="_blank">GitHub</a> page, this one is a **MUST**.

<div class="separator"></div>

## Code Style

PHP is a programming language where everybody can write the code as they wish, in order to unify the
industry, <span style="text-decoration: underline dotted" title="PHP Standard Recommendation">PSRs</span> was born.<br>
That is the reason we can find standards for `Loggering` (<a href="https://www.php-fig.org/psr/psr-3" target="_blank">PSR-3</a>),
`Event Dispatcher` (<a href="https://www.php-fig.org/psr/psr-14" target="_blank">PSR-14</a>),
and even for the `Clock` (<a href="https://www.php-fig.org/psr/psr-20" target="_blank">PSR-20</a>). You can check the
full list of all available PSRs <a href="https://www.php-fig.org/psr/" target="_blank">here</a>.

One of the most popular PSRs is concerning the `Code Style`, that is, it defines things like:

- Should I use tabs or spaces?
- Where should I place the brackets in a method? And in a conditional/loop?
- Are the parenthesis required when instantiating a class with empty constructor?

During the last years, due to the big and fast changes the language experienced, PSR-2 was quickly replaced by PSR-12.
However, the language continues evolving very fast, and to avoid creating a new PSR each year, a new standard called
<span style="text-decoration: underline dotted" title="PHP Evolving Recommendation">PER</span> was introduced.

To define PER standard by default, go to the following path and select **PER-CS**.

> Settings ➔ Editor ➔ Code Style ➔ PHP ➔ "Set from..." ➔ PER-CS

![phpstorm define per](/images/2023-11-27/2.webp)

<div class="separator"></div>

## Live Templates

Live Templates are snippets of code that are very used, and you can write them in a few characters.

PhpStorm brings some live templates, for example, if we type `prif`, the generated code will be:

```php source
private function ░()
{

}
```

There is a live template for all function combinations: `prif`, `prisf`, `prof`, `prosf`, `pubf` & `pubsf`.

It is possible to enhance the auto-completion with a default `: void` return type as follows.

![live templates in action](/images/2023-11-27/3.gif)

Go to `Editor ➔ Live Templates` and adjust each template with the _`$RETURN_TYPE$`_ variable.

```javascript
private function $NAME$($PARAMETERS$): $RETURN_TYPE$ {
    $END$
}
```

Finally, press on **Edit variables** and insert `"void"` _(with quotes)_ on **RETURN_TYPE** field.

![live template setup](/images/2023-11-27/4.webp)

<div class="separator"></div>

## File and Code Templates

The scaffolding you get when you create a new file in PhpStorm is also editable.

If you are into `strict_types` and `final` classes by default, you are in luck! 🎉

To change this, go to `Editor ➔ File and Code Templates` and update all `PHP` templates.

You can copy-paste the following code snippets into its own category  (_notice the spaces_).

<details>
  <summary><span style="cursor: pointer; font-weight: bold">PHP File</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">PHP Class</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};

#end
final class ${NAME} {

}
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">PHP Interface</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};

#end
interface ${NAME} {

}
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">PHP Trait</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};

#end
trait ${NAME} {

}
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">PHP Enum</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};

#end
enum ${NAME}#if (${BACKED_TYPE}) : ${BACKED_TYPE} #end{

}
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">PHP Test</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};
#end

#if (${TESTED_NAME} && ${NAMESPACE} && !${TESTED_NAMESPACE})
use ${TESTED_NAME};
#elseif (${TESTED_NAME} && ${TESTED_NAMESPACE} && ${NAMESPACE} != ${TESTED_NAMESPACE})
use ${TESTED_NAMESPACE}\\${TESTED_NAME};
#end

final class ${NAME} extends#if(${NAMESPACE}) \PHPUnit_Framework_TestCase #else PHPUnit_Framework_TestCase #end{

}
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">PHP Unit 6 Test</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};
#end

#if (${TESTED_NAME} && ${NAMESPACE} && !${TESTED_NAMESPACE})
use ${TESTED_NAME};
#elseif (${TESTED_NAME} && ${TESTED_NAMESPACE} && ${NAMESPACE} != ${TESTED_NAMESPACE})
use ${TESTED_NAMESPACE}\\${TESTED_NAME};
#end
use PHPUnit\Framework\TestCase;

final class ${NAME} extends TestCase {

}
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">PHPSpec Specification</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};
#end

#if (${TESTED_NAME} && ${NAMESPACE} && !${TESTED_NAMESPACE})
use ${TESTED_NAME};
#elseif (${TESTED_NAME} && ${TESTED_NAMESPACE} && ${NAMESPACE} != ${TESTED_NAMESPACE})
use ${TESTED_NAMESPACE}\\${TESTED_NAME};
#end
use PhpSpec\ObjectBehavior;

final class ${NAME} extends ObjectBehavior {

}
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">Codeception Unit Test</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};

#end
#if (${TESTED_NAME} && ${NAMESPACE} && !${TESTED_NAMESPACE})
use ${TESTED_NAME};
#elseif (${TESTED_NAME} && ${TESTED_NAMESPACE} && ${NAMESPACE} != ${TESTED_NAMESPACE})
use ${TESTED_NAMESPACE}\\${TESTED_NAME};
#end

final class ${NAME} extends \Codeception\Test\Unit {

}
```

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">Codeception Functional Test</span></summary>

```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};

#end
#if (${TESTED_NAME} && ${NAMESPACE} && !${TESTED_NAMESPACE})
use ${TESTED_NAME};
#elseif (${TESTED_NAME} && ${TESTED_NAMESPACE} && ${NAMESPACE} != ${TESTED_NAMESPACE})
use ${TESTED_NAMESPACE}\\${TESTED_NAME};
#end

final class ${NAME} {

}
```

</details>

<div class="separator"></div>

## Shortcuts

It is very important to learn the IDE shortcuts, that will bring you confidence and will help you to be more productive,
in case you don't know them, definitely you SHOULD.<br>
I would like to remind the plugin `Key Promoter X` that I mentioned before.

PhpStorm also brings a PDF file with the most important shortcuts, go to `Help ➔ Keyboard Shortcuts PDF` to download it.

List of most important shortcuts:

<details>
  <summary><span style="cursor: pointer; font-weight: bold">Windows/Linux</span></summary>

- `Ctrl + Shift + S` = Open Settings
- `Alt + 1` = Display/hide _Project_ bar
- `Alt (twice)` = Search in the whole project (class names, files, symbols, actions...)
- `Ctrl + N` = Search by class name (similar to `Alt (twice)` but only for class names)
- `Alt + →/←` = Move to left/right tab
- `Ctrl + G` = Go to line X:Y
- `Ctrl + B` = Navigate in/out (similar to `Ctrl + Click`)
- `Ctrl + Y` = Delete current line
- `Ctrl + C/V (without selection)` = Copy/Paste full line
- `Ctrl + Shift + V` = Paste with history
- `Ctrl + E` = Display recent files
- `Ctrl + Shift + E` = Display last 3 recent files
- `Ctrl + Shift + F` = Find in path (search words in the whole project)
- `Ctrl + Shift + L` = Reformat Code
- `Ctrl + Shift + ↑/↓` = Moves the current code block
- `Ctrl + Shift + M` = Go to start/end of current brackets
- `Ctrl + Shift + T` = Open test from specific class (and vice-versa)
- `Shift + Alt + Click` = Multiple cursor
- `Ctrl (twice keeping it pushed) + arrows` = Multiple cursor from adjacent lines
- `Ctrl + W` = Select gradually
- `Alt + J` = Select next occurrence similar to current one
- `Ctrl + Alt + F/M/C/V/P` = Refactor Function/Method/Constant/Variable/Parameter
- `Ctrl + Alt + N` = Inline refactor
- `Ctrl + Insert` = Contextual menu to override methods, generate getters, setters...
- `Ctrl + Shift + F10`: Run the scope where the caret is
- `Ctrl + Alt + Enter` = Jump to next line (adds ";" automatically if needed)

</details>

<details>
  <summary><span style="cursor: pointer; font-weight: bold">Mac</span></summary>

- `⌘ + ,` = Open Settings
- `⌘ + 1` = Display/hide project bar
- `⇧ (twice)` = Search in the whole project (class names, files, symbols, actions...)
- `⌘ + O` = Search by class name (similar to `⇧ (twice)` but only for class names)
- `⌃ + →/←` = Move to left/right tab
- `⌘ + L` = Go to line X:Y
- `⌘ + B` = Navigate in/out (similar to `Ctrl + Click`)
- `⌘ + ⌫` = Delete current line
- `⌘ + C/V (without selection)` = Copy/Paste full line
- `⌘ + ⇧ + V` = Paste with history
- `⌘ + E` = Display recent files
- `⌘ + ⇧ + E` = Display last 3 recent files
- `⌘ + ⇧ + F` = Find in path (search words in the whole project)
- `⌥ + ⌘ + L` = Reformat Code
- `⌘ + ⇧ + ↑/↓` = Moves the current code block
- `⌘ + ⇧ + T` = Open test from specific class (and vice-versa)
- `⌥ + ⌘ + ⇧ + Click` or = Multiple cursor
- `⌘ (twice keeping it pushed) + arrows` = Multiple cursor from adjacent lines
- `⌥ + ↑` = Select gradually
- `⌥ + ⌘ + F/M/C/V/P` = Refactor Function/Method/Constant/Variable/Parameter
- `⌥ + ⌘ + N` = Inline refactor
- `⌘ + N` = Contextual menu to override methods, generate getters, setters...
- `⇧ + ⌃ + R` = Run the scope where the caret is
- `⌘ + ⇧ + Enter` = Jump to next line (adds ";" automatically if needed)

> In case the shortcut `⌃ + →/←` changes between Desktops in Mac, you can disable it
> in `Settings ➔ Keyboard ➔ Keyboard Shortcuts... ➔ Mission Control`.

</details>

### Add Custom shortcuts

We just saw the `Ctrl + 1`/`⌘ + 1` shortcut displays/hides the project bar, it is also very handy to set
the shortcut `Ctrl + Alt + 1`/`⌘ + ⇧ + 1` to display and select in the project bar the current file.<br>
This way, we don't need to use the mouse at all, we can navigate between tabs with only the keyboard.

To set this new combination, in `Settings ➔ Keymap` search by `Select File in Project View` and `Add Keyboard Shortcut`.

It is also very handy to add shortcuts to `Split and Move Right` or `Split and Move Down` with `Ctrl + I/-`/`⌃ + I/-`.
