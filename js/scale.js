
"use strict";

var Scale = function () {};

Scale.major = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["3", 4],
	["11", 5],
	["5", 7],
	["13", 9],
	["7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.naturalMinor = function (root) {
    var degrees = [
	["1", 0],
	["9", 2],
	["b3", 3],
	["11", 5],
	["P5", 7],
	["b6", 8],
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
	["7", 11]
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
	["b6", 8],
	["7", 11]
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
	["b6", 8],
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
	["b9", 1],
	["b3", 3],
	["3", 4],
	["#11", 6],
	["P5", 7],
	["13", 9],
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
	["7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.lydian7th = function (root) {
    var degrees = [
	["1", 0],
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
	var pitch = Pitch.getPitchName(root, degree[1]);
	dic[pitch] = degree[0];
    });
    return dic;
};

if (window && window.module) {
    module.exports = Scale;
}
