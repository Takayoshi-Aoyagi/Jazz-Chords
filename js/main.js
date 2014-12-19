"use strict";

//var process = require('process');
var util = require('util');
var Chord = require('./chord');
var Fingerboard = require('./fingerboard');

var args = process.argv,
    chordName = args[2],
    tensions = undefined,
    tones,
    pos;

if (args.length > 2) {
    tensions = args.slice(3);
}

tones = Chord.parse(chordName, tensions);

console.log(util.format("%s %s", chordName, tensions.join(" ")));
console.log("");
Object.keys(tones).forEach(function (key) {
    var value = tones[key];
    console.log("\t" + value + "\t" + key);
});
console.log("");
pos = Fingerboard.getPosMap(tones);
Fingerboard.dump(pos);


