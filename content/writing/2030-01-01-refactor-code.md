+++
path = "2030-01-01-refactor-code"
title = "Refactor code. Part 1"
description = "Description Refactor Code. Part 1"
date = 2025-03-20
draft = true

[taxonomies]
tags = ['Refactoring']

[extra]
static_thumbnail = "/images/2025-03-20/1.webp"
subtitle = ""
+++

```php
<?php

const USER_URL = 'https://randomuser.me/api/?inc=gender,name,email,location&results=5&seed=a9b25cd955e2037h';

# Parse CSV file
$getcurrentworkingDirectory = __DIR__;

// fields: ID, gender, Name ,country, postcode, email, Birthdate
$csv_provider = array_map('str_getcsv', file($getcurrentworkingDirectory . '/../users.csv'));
$csvProviders = [];
array_walk($csvProviders, function (&$a) use ($csv_provider) {
    $a = array_combine($csv_provider[0], $a);
});
array_shift($csv_provider); # Remove header column

# Parse URL content
$url = USER_URL;
$web_provider = json_decode(file_get_contents($url))->results;
$pr = [];
array_walk($pr, function (&$a) use ($web_provider) {
    $a = array_combine($web_provider[0], $a);
});

$b = [];
$c = [];
$i = 100000000000;
foreach ($web_provider as $item) {
    $i++;
    if ($item instanceof stdClass) {
        $b[] = [
            $i, // id
            $item->gender, // gender
            $item->name->first . ' ' . $item->name->last, // first name
            $item->location->country,
            $item->location->postcode,
            $item->email,
            (new Datetime('now'))->format('Y') - '30', /* birhtday */
            rand(0, 1) // is VIP when > 0.5
        ];
    }
}

/**
 * @param $providers [ id -> number,
 *                   email -> string
 *                   first_name -> string
 *                   last_name -> string ] array
 */
$providers = array_merge($csv_provider, $b); # merge arrays

# Print users
echo "*********************************************************************************" . PHP_EOL;
echo "* ID\t\t* COUNTRY\t* NAME\t\t* EMAIL\t\t\t\t*" . PHP_EOL;
echo "*********************************************************************************" . PHP_EOL;
foreach ($providers as $item) {
    echo sprintf("* %s\t* %s\t* %s\t* %s\t*", $item[0], $item[3], $item[2], $item[5]) . PHP_EOL;
}
echo "*********************************************************************************" . PHP_EOL;
echo count($providers) . ' users in total!' . PHP_EOL;
```
