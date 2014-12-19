"use strict";

if (window && window.require) {
    var util = require("util");
    var Pitch = require("./pitch");
    var Utils = require("./utils");
}

var Fingerboard = function () {};

Fingerboard.NUM_FLETS = 15;

Fingerboard.getPos = function () {
    var pos = {},
	openPitchs = ["E", "B", "G", "D", "A", "E"];

    openPitchs.forEach(function (openPitch, stringIndex) {
        var pitchIndex = Pitch.getPitchNumberByName(openPitch),
            arr = [],
	    i,
	    pitchString;
        for (i = 0; i < Fingerboard.NUM_FLETS + 1; i += 1) {
            pitchString = Pitch.getPitchName(openPitch, i);
            arr.push(pitchString);
	}
        pos[stringIndex + 1] = arr;
    });
    return pos;
};

Fingerboard.getPosMap = function (includes) {
    //console.log(util.format("includes=[%s]", JSON.stringify(includes)));
    var pos = Fingerboard.getPos();
    if (includes) {
        Object.keys(pos).forEach(function (key) {
            var arr = pos[key];
	    arr.forEach(function (pitch, i) {
		if (Object.keys(includes).indexOf(pitch) < 0) {
                    arr[i] = "";
                } else {
                    arr[i] = Utils.pad(pitch, 2) + " (" + Utils.pad(includes[pitch], 3) + ")";
		}
	    });
	});
    }
    return pos;
};

Fingerboard.dump = function (pos) {
    var flets = [],
	i,
	str;
    for (i = 0; i < Fingerboard.NUM_FLETS + 1; i+= 1) {
	str = "    " + Utils.pad(String(i), 2) + "    ";
	flets.push(str);
    }
    console.log("      " + flets.join(""));
    Object.keys(pos).sort().forEach(function (key) {
	var pitches = pos[key];
	console.log(util.format('%s弦: |%s|',key, pitches.join("|")));
    });
};

if (window && window.module) {
    module.exports = Fingerboard;
}
