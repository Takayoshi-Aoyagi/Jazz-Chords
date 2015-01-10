"use strict";

var Scale = function () {};

Scale.major = function (root) {
    var degrees = [
	["1", 0],
	["2", 2],
	["3", 4],
	["4", 5],
	["5", 7],
	["6", 9],
	["7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.naturalMinor = function (root) {
    var degrees = [
	["1", 0],
	["2", 2],
	["b3", 3],
	["4", 5],
	["5", 7],
	["b6", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.melodicMinor = function (root) {
    var degrees = [
	["1", 0],
	["2", 2],
	["b3", 3],
	["4", 5],
	["5", 7],
	["6", 9],
	["7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.harmonicMinor = function (root) {
    var degrees = [
	["1", 0],
	["2", 2],
	["b3", 3],
	["4", 5],
	["5", 7],
	["b6", 8],
	["b7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.harmonicMinorPerfect5thBelow = function (root) {
    var degrees = [
	["1", 0],
	["b2", 1],
	["3", 4],
	["4", 5],
	["5", 7],
	["b6", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.altered = function (root) {
    var degrees = [
	["1", 0],
	["b2", 1],
	["b3", 3],
	["3", 4],
	["b5", 6],
	["b6", 8],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.symmetricDiminished = function (root) {
    var degrees = [
	["1", 0],
	["b2", 1],
	["b3", 3],
	["3", 4],
	["b5", 6],
	["5", 7],
	["6", 9],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.lydian = function (root) {
    var degrees = [
	["1", 0],
	["2", 2],
	["3", 4],
	["#4", 6],
	["5", 7],
	["6", 9],
	["7", 11]
    ];
    return Scale.getData(root, degrees);
};

Scale.lydian7th = function (root) {
    var degrees = [
	["1", 0],
	["2", 2],
	["3", 4],
	["#4", 6],
	["5", 7],
	["6", 9],
	["b7", 10]
    ];
    return Scale.getData(root, degrees);
};

Scale.wholeTone = function (root) {
    var degrees = [
	["1", 0],
	["2", 2],
	["3", 4],
	["#4", 6],
	["#5", 8],
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
