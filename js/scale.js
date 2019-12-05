let Scale;

(function () {
    
    "use strict";

    function getData (root, degrees) {
	const dic = {};
	degrees.forEach(function (degreeName) {
	    const interval = Pitch.degreeAlias[degreeName];
	    const pitch = Pitch.getPitchName(root, interval);
	    dic[pitch] = degreeName;
	});
	console.log(dic)
	return dic;
    };


    class _Scale {

	static ionian(root) {
	    return getData(root, ["R", "9", "3", "11", "5", "13", "M7"]);
	};

	static dorian(root) {
	    return getData(root, ["R", "9", "b3", "11", "5", "13", "b7"]);
	};

	static phrygian(root) {
	    return getData(root, ["R", "b9", "b3", "11", "5", "b13", "b7"]);
	};

	static lydian(root) {
	    return getData(root, ["R", "9", "3", "#11", "5", "13", "M7"]);
	};

	static mixolydian(root) {
	    return getData(root, ["R", "9", "3", "11", "5", "13", "b7"]);
	};

	static aeolian(root) {
	    return getData(root, ["R", "9", "b3", "11", "5", "b13", "b7"]);
	};

	static locrian(root) {
	    return getData(root, ["R", "b9", "b3", "11", "b5", "b13", "b7"]);
	};

	static melodicMinor(root) {
	    return getData(root, ["R", "9", "b3", "11", "5", "13", "M7"]);
	};

	static harmonicMinor(root) {
	    return getData(root, ["R", "9", "b3", "11", "5", "b13", "M7"]);
	};

	static harmonicMinorPerfect5thBelow(root) {
	    return getData(root, ["R", "b9", "3", "11", "5", "b13", "b7"]);
	};

	static altered(root) {
	    return getData(root, ["R", "b9", "#9", "3", "#11", "b13", "b7"]);
	};

	static symmetricDiminished(root) {
	    return getData(root, ["R", "b9", "#9", "3", "#11", "5", "13", "7"]);
	};

	static lydianb7th(root) {
	    return getData(root, ["R", "9", "3", "#11", "5", "13", "b7"]);
	};

	static wholeTone(root) {
	    return getData(root, ["R", "9", "3", "#11", "b13", "b7"]);
	};
    }

    if (window && window.module) {
	module.exports = _Scale;
	console.log("export")
    } else {
	Scale = _Scale;
    }

}());

