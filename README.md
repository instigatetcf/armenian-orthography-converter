# Armenian orthography converter

[![Bower](https://img.shields.io/bower/v/bootstrap.svg?style=flat-square)](https://github.com/instigatetcf/armenian-orthography-converter/)
[![License](https://img.shields.io/badge/license-GPLv3-blue.svg?style=flat-square)](https://github.com/instigatetcf/armenian-orthography-converter/blob/master/LICENSE)

## Set up

Use following command to load node packajes

    npm install

## Install

    bower install armenian-orthography-converter

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
