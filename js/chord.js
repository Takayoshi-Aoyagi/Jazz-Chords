"use strict";

if (window && window.require) {
    var util = require('util');
    var Pitch = require('./pitch');
}

var Chord = function () {};

Chord.parseDim = function (chord) {
    var r = new RegExp(/^(C|Db|D|Eb|E|F|Gb|G|Ab|A|Bb|B)dim$/),
        m = chord.match(r),
        root = m[1],
    dic = {};

    dic[root] = "1";
    dic[Pitch.getPitch(root, "m")] = "b3";
    dic[Pitch.getPitch(root, "b5")] = "b5";
    dic[Pitch.getPitch(root, "13")] = "6";
    return dic;
};

Chord.parseFlat5th = function (root, tensions) {
    var dic = {},
	flat3rd;
    dic[root] = "1";
    flat3rd = Pitch.getPitch(root, "m");
    dic[flat3rd] = "b3";
    dic[Pitch.getPitch(root, "b5")] = "b5";
    dic[Pitch.getPitch(root, "7")] = "7";
    if (tensions) {
	if (tensions.indexOf("11") >= 0) {
	    var eleven = Pitch.getPitch(root, "11");
	    dic[eleven] = "11";
	    delete dic[flat3rd];
	}
    }
    return dic;
};

Chord.parseChordName = function (chord) {
    var r = new RegExp(/^(C|Db|D|Eb|E|F|Gb|G|Ab|A|Bb|B)(m{0,1})(7|M7)(b5){0,1}$/),
        m = chord.match(r),
	obj = {};
    obj.rootSymbol = m[1],
    obj.thirdSymbol = m[2],
    obj.seventhSymbol = m[3],
    obj.flat5thSymbol = m[4];
    return obj;
};

Chord.parse = function (chord, tensions, displayRoot) {
    var chordTones,
	root,
	dic = {};

    if (chord.indexOf("dim") > 0) {
	return Chord.parseDim(chord, tensions);
    }

    chordTones = Chord.parseChordName(chord);

    root = chordTones.rootSymbol;
    if (chordTones.flat5thSymbol === "b5") {
	return Chord.parseFlat5th(root, tensions);
    }

    // Root
    dic[root] = "1";

    // 3rd
    var _3rdDegree = chordTones.thirdSymbol === "m" ? "b3" : "3"; // b3 or 3
    var _3rdPitch = Pitch.getPitch(root, _3rdDegree);
    dic[_3rdPitch] = _3rdDegree;

    // 5th
    var _5thSymbol = "5";
    var _5thPitch = Pitch.getPitch(root, _5thSymbol);
    dic[_5thPitch] = _5thSymbol;

    // 7th
    var _7thSymbol = chordTones.seventhSymbol === "M7" ? "M7" : "7";
    var _7thPitch = Pitch.getPitch(root, _7thSymbol);
    dic[_7thPitch] = _7thSymbol;

    if (tensions) {
        tensions.forEach(function (tension) {
            var t = Pitch.getPitch(root, tension);
            dic[t] = tension;
	});
    }

    // omit root when tension contains 9th
    if (tensions.indexOf("9") >= 0 || tensions.indexOf("b9") >= 0 || tensions.indexOf("#9") >= 0) {
	if (!displayRoot) {
            delete dic[root];
	}
    }
    
    // omit 5th when tension contains 13th
    if (tensions.indexOf("13") >= 0 || tensions.indexOf("b13") >= 0) {
        delete dic[_5thPitch];
    }

    // omit 5th when tension contains #11th
    if (tensions.indexOf("#11") >= 0) {
	delete dic[_5thPitch];
    }
    
    return dic;
};

if (window && window.module) {
    module.exports = Chord;
}
