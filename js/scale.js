
"use strict";

var Scale = function () {};

Scale.ionian = function (root) {
    var degrees = [
	["R", 0],
	["9", 2],
	["3", 4],
	["11", 5],
	["5", 7],
	["13", 9],
	["M7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.dorian = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["b3", 3],
	["11", 5],
	["P5", 7],
	["13", 9],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.phrygian = function (root) {
    var degrees = [
	["1", 0],
	["b9", 1],
	["b3", 3],
	["11", 5],
	["P5", 7],
	["b13", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.lydian = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["3", 4],
	["#11", 6],
	["P5", 7],
	["13", 9],
	["M7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.mixolydian = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["3", 4],
	["11", 5],
	["P5", 7],
	["13", 9],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.aeolian = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["b3", 3],
	["11", 5],
	["P5", 7],
	["b13", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.locrian = function (root) {
    var degrees = [
	["1", 0],
	["b9", 1],
	["b3", 3],
	["11", 5],
	["b5", 6],
	["b13", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.melodicMinor = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["b3", 3],
	["11", 5],
	["P5", 7],
	["13", 9],
	["M7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.harmonicMinor = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["b3", 3],
	["11", 5],
	["P5", 7],
	["b13", 8],
	["M7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.harmonicMinorPerfect5thBelow = function (root) {
    var degrees = [
	["1", 0],
	["b9", 1],
	["3", 4],
	["11", 5],
	["P5", 7],
	["b13", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.altered = function (root) {
    var degrees = [
	["1", 0],
	["b9", 1],
	["#9", 3],
	["3", 4],
	["#11", 6],
	["b13", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.symmetricDiminished = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["b3", 3],
	["11", 5],
	["#11", 6],
	["b13", 8],
	["13", 9],
	["M7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.lydianb7th = function (root) {
    var degrees = [
	["R", 0],
	["9", 2],
	["3", 4],
	["#11", 6],
	["P5", 7],
	["13", 9],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.wholeTone = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["3", 4],
	["#11", 6],
	["b13", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.getData = function (root, degrees) {
    var dic = {};
    degrees.forEach(function (degree) {
	//var interval = degree[1];
	var degreeName = degree[0]
	var interval = Pitch.degreeAlias[degreeName];
	var pitch = Pitch.getPitchName(root, interval);
	dic[pitch] = degreeName;
    });
    console.log(dic)
    return dic;
};

if (window && window.module) {
    module.exports = Scale;
}
