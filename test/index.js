'use strict';

var fs = require('fs');

var tester = require(__dirname + '/modules/tester.js');
var mongodb = require('mongodb');

var testNumber = process.argv[2];
var logLevel = process.argv[3] === 'log' ? 2 : 1;
var words;


if (typeof testNumber === 'string') {
    words = require(__dirname + '/data/test' + testNumber + '.js');
    tester.test(words, logLevel);
} else {
    fs.readdir(__dirname + '/data', function (err, list) {
        if (err) {
            return;
        }
        list.forEach(function (item) {
            console.log(item);
            words = require(__dirname + '/data/' + item);
            tester.test(words, logLevel);
        });
    });
}
