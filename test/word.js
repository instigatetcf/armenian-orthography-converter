var mashtots = require(__dirname + '/../src/mashtots.js');
if(process.argv[2] == 'm'){
    mashtots.toMashtots(process.argv[3], true);
}
else if(process.argv[2] == 's'){
    mashtots.toSoviet(process.argv[3], true);
}