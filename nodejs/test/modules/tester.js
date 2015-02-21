var mashtots = require(__dirname + '/../../mashtots.js');

var correct;
var incorrect;
var all;
var logLevel = 1;
var startTime;
var time;

function startTest(log){
    startTime = new Date().getTime();
    correct = 0;
    incorrect = 0;
    all = 0;
    if(typeof(log) != 'undefined'){
        logLevel = log;
    }
    if(logLevel >= 2){
        console.log('Սովետական\t\t\t\t\tԱւանդական');
    }
}

function endTest(){
    time = new Date().getTime() - startTime;
    if(logLevel >= 1){
        console.log('correct: ' + correct + '(' + Math.round(correct*100/all) + '%)' +
                    ' incorrent: ' + incorrect + '(' + Math.round(incorrect*100/all) + '%)' +
                    ' all: ' + all + 
                    ' time: ' + time + 'ms\n');
    }
    return time;
}

function check(word){
    var sovietWord, mashtotsWord, isSovietWord, isMashtotsWord,
        isCorrect,
        logString, tabsCount;
    tabsCount = 6;
    sovietWord = mashtots.toSoviet(word.traditional);
    mashtotsWord = mashtots.toMashtots(word.modern);

    isSovietWord = (sovietWord === word.modern);
    isMashtotsWord = (mashtotsWord === word.traditional);

    isCorrect = isSovietWord && isMashtotsWord;
    if(isCorrect){
        correct++;
    }
    else{
        incorrect++;
    }
    all++;

    if(logLevel >= 2  && !isCorrect){
        logString = sovietWord;
        logString+= isSovietWord ? ' == ': ' != ';
        logString+= word.modern;

        tabsCount-= Math.floor(logString.length/8);

        while(tabsCount-- > 0){
            logString+= '\t';
        }

        logString+= mashtotsWord;
        logString+= isMashtotsWord ? ' == ': ' != ';
        logString+= word.traditional;

        console.error(logString);
    }
}

function test(words, log){
    startTest(log);

    words.forEach(function(word){
        check(word);
    });
    
    return endTest();
}

function getTime(){
    return time;
}

module.exports.startTest = startTest;
module.exports.endTest = endTest;
module.exports.check = check;
module.exports.test = test;
module.exports.getTime = getTime;