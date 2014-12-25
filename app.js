"use strict";

var app = app || {};

app.RootSelector = Backbone.View.extend({

    el: "#root",

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
	this.$el.find("input[value=M7]").click();
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
	    tensions = [];  //"", "9", "9 13", "b9 b13", "#9 b13", "b5"],
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
	    tensions.push("b5");
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
	case "b5":
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
	var root = app.rootSelector.val(),
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

app.FletboardTable = Backbone.View.extend({

    el: "#fletboard",

    initialize: function () {
	var columns = [],
	    i,
	    title;
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

function init () {
    app.fb = new app.FletboardTable();
    app.goButton = new app.GoButton();
    app.tensionTypeSelector = new app.TensionTypeSelector();
    app.chordTypeSelector = new app.ChordTypeSelector();
    app.rootSelector = new app.RootSelector();
}
