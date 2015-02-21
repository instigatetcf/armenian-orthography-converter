var tester = require(__dirname + '/modules/tester.js');
var mongodb = require('mongodb');

var testNumber = process.argv[2] ? process.argv[2] : 1;
var logLevel = process.argv[3] === 'log' ? 2 : 1;
var words;


if(testNumber == 'all'){
    tester.startTest(logLevel);
    mongodb('mongodb://localhost:27017/mashtots',['dictionary'], function(err, db){
        var cursor = db.collection('dictionary').find();
        cursor.each(function(err, row) {
            if(row === null){
                tester.endTest();
                db.close();
                return;
            }
            tester.check(row);
        });
    });
}
else{
    words = require(__dirname + '/data/test' + testNumber +'.js');
    tester.test(words, logLevel);
}
