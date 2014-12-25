"use strict"

var Pitch = function () {};

Pitch.pitches = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

Pitch.degreeAlias = {
    "m": 3,
    "b3": 3,
    "3": 4,
    "M": 4,
    "b5": 6,
    "5": 7,
    "7": 10,
    //"b7": 10,
    "M7": 11,
    "9": 2,
    "b9": 1,
    "#9": 3,
    "11": 5,
    "#11": 6,
    "13": 9,
    "b13": 8
};

Pitch.getPitchNumberByName = function (pitch_name) {
    return Pitch.pitches.indexOf(pitch_name);
};

Pitch.getPitch = function (root, degreeString) {
    var rootIndex = Pitch.getPitchNumberByName(root),
        degree = Pitch.degreeAlias[degreeString],
        index = (rootIndex + degree) % 12;
    return Pitch.pitches[index];
};

Pitch.getPitchName = function (root, degree) {
    var rootIndex = Pitch.getPitchNumberByName(root),
	index = (rootIndex + degree) % 12;
    return Pitch.pitches[index];
};

if (window && window.module) {
    module.exports = Pitch;
}
