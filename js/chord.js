"use strict";

if (window && window.require) {
    var util = require('util');
    var Pitch = require('./pitch');
}

var Chord = function () {};

Chord.parse = function (chord, tensions) {
    //console.log(util.format("Chord.parse chord=[%s] tensions=[%s]", chord, tensions));
    var r = new RegExp(/^(C|Db|D|Eb|E|F|Gb|G|Ab|A|Bb|B)(m{0,1})(7|M7)$/),
        m = chord.match(r),
        root = m[1],
	thirdSymbol = m[2] == "" ? "M" : m[2],
        third = Pitch.getPitch(root,thirdSymbol),
        fifth = Pitch.getPitch(root, "5"),
        seventh = Pitch.getPitch(root, m[3]),
        dic = {};

        dic[root] = "1"
        dic[third] = "3"
        dic[fifth] = "5"
        dic[seventh] = "7"

    if (tensions) {
        tensions.forEach(function (tension) {
            var t = Pitch.getPitch(root, tension);
            dic[t] = tension;
	});
    }

    // omit root when tension contains 9th
    if (tensions.indexOf("9") >= 0 || tensions.indexOf("b9") >= 0 || tensions.indexOf("#9") >= 0) {
        delete dic[root];
    }
    
    // omit 5th when tension contains 13th
    if (tensions.indexOf("13") >= 0 || tensions.indexOf("b13") >= 0 || tensions.indexOf("b5") >= 0) {
        delete dic[fifth];
    }	
    return dic;
};

if (window && window.module) {
    module.exports = Chord;
}