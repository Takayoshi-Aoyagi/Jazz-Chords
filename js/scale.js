
"use strict";

var Scale = function () {};

Scale.ionian = function (root) {
    return Scale.getData(root, ["R", "9", "3", "11", "5", "13", "M7"]);
};

Scale.dorian = function (root) {
    return Scale.getData(root, ["R", "9", "b3", "11", "5", "13", "b7"]);
};

Scale.phrygian = function (root) {
    return Scale.getData(root, ["R", "b9", "b3", "11", "5", "b13", "b7"]);
};

Scale.lydian = function (root) {
    return Scale.getData(root, ["R", "9", "3", "#11", "5", "13", "M7"]);
};

Scale.mixolydian = function (root) {
    return Scale.getData(root, ["R", "9", "3", "11", "5", "13", "b7"]);
};

Scale.aeolian = function (root) {
    return Scale.getData(root, ["R", "9", "b3", "11", "5", "b13", "b7"]);
};

Scale.locrian = function (root) {
    return Scale.getData(root, ["R", "b9", "b3", "11", "b5", "b13", "b7"]);
};

Scale.melodicMinor = function (root) {
    return Scale.getData(root, ["R", "9", "b3", "11", "5", "13", "M7"]);
};

Scale.harmonicMinor = function (root) {
    return Scale.getData(root, ["R", "9", "b3", "11", "5", "b13", "M7"]);
};

Scale.harmonicMinorPerfect5thBelow = function (root) {
    return Scale.getData(root, ["R", "b9", "3", "11", "5", "b13", "b7"]);
};

Scale.altered = function (root) {
    return Scale.getData(root, ["R", "b9", "#9", "3", "#11", "b13", "b7"]);
};

Scale.symmetricDiminished = function (root) {
    return Scale.getData(root, ["R", "9", "b3", "11", "#11", "b13", "13", "M7"]);
};

Scale.lydianb7th = function (root) {
    return Scale.getData(root, ["R", "9", "3", "#11", "5", "13", "b7"]);
};

Scale.wholeTone = function (root) {
    return Scale.getData(root, ["R", "9", "3", "#11", "b13", "b7"]);
};

Scale.getData = function (root, degrees) {
    var dic = {};
    degrees.forEach(function (degreeName) {
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
