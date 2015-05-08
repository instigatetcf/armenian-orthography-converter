# Armenian orthography converter

[![Bower version](https://badge.fury.io/bo/amazeui.svg)](http://badge.fury.io/bo/amazeui)

## Set up

Grub the source and run in console

    npm install

## Run tests

Use following command to run all tests

    node test/index.js

Use following command to run single test

    node test/index.js #

Where # is number of dictionary. Possible values are 1 - 5.

Example:

    node test/index.js 4

Use following command to run check none world and see all convert stack.

    node test/word.js type word

Type can be **s** for Soviet orthography and **m** for traditional orthography.

Example:

    node test/word.js s միեւնոյն

## Grunt tasks

Use following command to check code quality

    grunt tslit

Use following command to build project (it will create dest/mashtots.min.js file)

    grunt build
