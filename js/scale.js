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
