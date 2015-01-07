"use strict";

var app = app || {};

app.TabsView = Backbone.View.extend({

    el: "#tabs",

    initialize: function () {
	this.$el.tabs();
    }
});

app.RootSelector = Backbone.View.extend({

    initialize: function (options) {
	var that = this;
	this.el = options.el;
	Pitch.pitches.forEach(function (root, i) {
	    var input, label;
	    if (i == 0) {
		input = '<input type="radio" name="' + options.el + '" value="' + root +
		    '" id="select' + options.el + root + '" checked>';
	    } else {
		input = '<input type="radio" name="' + options.el + '" value="' + root +
		    '" id="select' + options.el + root + '">';
	    }
	    label = '<label for="select' + options.el + root + '">' + root + '</label>';
	    that.$el.append(input);
	    that.$el.append(label);
	});
    },
    
    val: function () {
	var dom = this.$el.children(":checked");
	var val = dom.val();
	return val;
    },

    events: {
	"change": "onChange"
    },

    onChange: function (ev) {
    }
});

app.ChordTypeSelector = Backbone.View.extend({

    el: "#chord_type",

    initialize: function () {
	var that = this,
	    types = ["M7", "7", "m7", "m7b5", "mM7", "dim"];
	types.forEach(function (type) {
	    var input, label;
	    input = '<input type="radio" name="chord_type" value="' + type
		+ '" id="select' + type + '">';
	    label = '<label for="select' + type + '">' + type + '</label>';
	    that.$el.append(input);
	    that.$el.append(label);
	});
	that.$el.find("input[value=M7]").click();
	app.tensionTypeSelector.activateTension("M7")
    },
    
    val: function () {
	var dom = this.$el.children(":checked");
	var val = dom.val();
	return val;
    },

    events: {
	"change": "onChange"
    },

    onChange: function (ev) {
	var val = this.val();
	app.tensionTypeSelector.activateTension(val)
    }
});

app.TensionTypeSelector = Backbone.View.extend({

    el: "#tension_type",

    val: function () {
	var dom = this.$el.children(":checked");
	var val = dom.val();
	return val;
    },

    events: {
	"change": "onChange"
    },

    activateTension: function (chordType) {
	var that = this,
	    tensions = [];  //"", "9", "9 13", "b9 b13", "#9 b13", "11"],
	switch (chordType) {
	case "M7":
	    tensions.push("9");
	    tensions.push("9 13");
	    break;
	case '7':
	    tensions.push("9");
	    tensions.push("9 13");
	    tensions.push("b9 b13");
	    tensions.push("#9 b13");
	    break;
	case 'm7':
	    tensions.push("9");
	    break;
	case 'm7b5':
	    tensions.push("11");
	    break;
	case 'mM7':
	    break;
	case 'dim':
	    break;
	}
	this.$el.children().remove();
	this.$el.append('<input type="radio" name="tension_type" value="" id="selectNone" checked>');
	this.$el.append('<label for="selectNone">-</label>');
	tensions.forEach(function (key) {
	    var tension = key,
		value = tension.split(' ').join(''),
		input = '<input type="radio" name="tension_type" value="' + tension + '" id="select'+ value + '" checked>',
		label = '<label for="select' + value + '">' + tension + '</label>';
	    that.$el.append(input);
	    that.$el.append(label);
	});
	this.$el.children().first().click();
    },

    onChange: function (ev) {
	var val = this.val();
	console.log(val);
	switch (val) {
	case "":
	    break;
	case "9":
	    break;
	case "9 13":
	    break;
	case "b9 b13":
	    break;
	case "#9 b13":
	    break;
	case "11":
	    break;
	default:
	    alert("Invalid chord type! [" + val + "]");
	}
    }
});

app.GoButton = Backbone.View.extend({

    el: "#go",

    events: {
	"click": "onClick"
    },

    onClick: function (ev) {
	var root = app.chordRootSelector.val(),
	    chordType = app.chordTypeSelector.val(),
	    tensionType = app.tensionTypeSelector.val(),
	    data = [],
	    tones,
	    pos,
	    tensions,
	    displayRoot;
	console.log(root + "," + chordType + "," + tensionType);

	// chord name
	$("#root_name").text(root);
	$("#chord_type_name").text(chordType);
	$("#tension_type_name").text(tensionType);

	// display root?
	displayRoot = Boolean($("#display_root").prop("checked"));
	
	tensions = tensionType.split(" ");
	tones = Chord.parse(root + chordType, tensions, displayRoot);
	pos = Fingerboard.getPosMap(tones);
    
	console.log(pos);

	// format pos
	Object.keys(pos).sort().forEach(function (key) {
	    var arr = pos[key];
	    arr.unshift(key + "弦");
	    data.push(arr);
	});
	app.fb.draw(data);
    }
});

app.ScaleTypeSelector = Backbone.View.extend({

    el: "#scale_type",

    initialize: function () {
	var that = this,
	    types = ["Major", "Natural Minor", "Harmonic Minor", "HMP5", "Melodic Minor", "Altered", "Symmetric Diminished Scale"];
	types.forEach(function (type) {
	    var input, label;
	    input = '<input type="radio" name="scale_type" value="' + type
		+ '" id="select' + type + '">';
	    label = '<label for="select' + type + '">' + type + '</label>';
	    that.$el.append(input);
	    that.$el.append(label);
	});
	that.$el.find("input[value=Major]").click();
    },
    
    val: function () {
	var dom = this.$el.children(":checked");
	var val = dom.val();
	return val;
    },

    events: {
	"change": "onChange"
    },

    onChange: function (ev) {
    }
});

app.ScaleGoButton = Backbone.View.extend({

    el: "#scale_go",

    events: {
	"click": "onClick"
    },

    onClick: function (ev) {
	var root = app.scaleRootSelector.val(),
	    tones,
	    type,
	    pos,
	    data = [];

	type = app.scaleTypeSelector.val();
	switch (type) {
	case "Major":
	    tones = Scale.major(root);
	    break;
	case "Natural Minor":
	    tones = Scale.naturalMinor(root);
	    break;
	case "Harmonic Minor":
	    tones = Scale.harmonicMinor(root);
	    break;
	case "HMP5":
	    tones = Scale.harmonicMinorPerfect5thBelow(root);
	    break;
	case "Melodic Minor":
	    tones = Scale.melodicMinor(root);
	    break;
	case "Altered":
	    tones = Scale.altered(root);
	    break;
	case "Symmetric Diminished Scale":
	    tones = Scale.symmetricDiminished(root);
	    break;
	default:
	    alert("Not supported [" + type + "]" );
	    return;
	}

	// format pos
	pos = Fingerboard.getPosMap(tones);

	Object.keys(pos).sort().forEach(function (key) {
	    var arr = pos[key];
	    arr.unshift(key + "弦");
	    data.push(arr);
	});
	app.scaleFb.draw(data);
    }
});

app.FletboardTable = Backbone.View.extend({

    initialize: function (options) {
	var columns = [],
	    i,
	    title;
	this.el = options.el;
	columns.push({"title": " ", "width": "20px"});
	for (i = 0; i < 13; i += 1) {
	    title = {
		"title": String(i),
		"width": "50px"
	    };
	    columns.push(title);
	}
	this.dt = $(this.el).DataTable({
	    "columns": columns,
	    "paging":   false,
	    "ordering": false,
	    "info":     false,
	    "bFilter": false,
	    "oLanguage": {
		"sZeroRecords": "",
		"sEmptyTable": ""
	    }
	});
    },

    draw: function (data) {
	var that = this;
	console.log(this.dt);
	this.dt.clear();
	data.forEach(function (d) {
	    that.dt.row.add(d);
	});
	this.dt.draw();
    }
});


app.init = function () {
    // chord view
    app.fb = new app.FletboardTable({el: "#chord_fletboard"});
    app.goButton = new app.GoButton();
    app.tensionTypeSelector = new app.TensionTypeSelector();
    app.chordTypeSelector = new app.ChordTypeSelector();
    app.chordRootSelector = new app.RootSelector({el: "#chord_root"});

    // scale view
    app.scaleFb = new app.FletboardTable({el: "#scale_fletboard"});
    app.scaleTypeSelector = new app.ScaleTypeSelector();
    app.scaleRootSelector = new app.RootSelector({el: "#scale_root"});
    app.goButton = new app.ScaleGoButton();
    
    // tabs
    app.tabsView = new app.TabsView();
};
