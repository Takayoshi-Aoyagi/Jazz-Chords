"use strcit";

var Utils = function () {};

Utils.pad = function (str, num) {
    var ret = "",
	i,
	len = str.length,
	numPad = num - len;
    if (numPad <= 0) {
	return str;
    }
    for (i = 0; i < numPad; i += 1) {
	ret += " ";
    }
    ret += str;
    return ret;
};

if (window && window.module) {
    module.exports = Utils;
}
