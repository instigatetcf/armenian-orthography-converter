var mashtots = require(__dirname + '/../src/mashtots.js');
if (process.argv[2] === 'm') {
    mashtots.sovietToMashtots(process.argv[3], true);
} else if (process.argv[2] === 's') {
    mashtots.mashtotsToSoviet(process.argv[3], true);
}
