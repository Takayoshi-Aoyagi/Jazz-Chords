"use strict";

var app = app || {};

app.ChordTypeSelector = Backbone.View.extend({

    el: "#chord_type",

    val: function () {
	return this.$el.val();
    },

    events: {
	"change": "onChange"
    },

    onChange: function (ev) {
	var val = this.val();
	console.log(val);
	switch (val) {
	case "M7":
	    break;
	case "7":
	    break;
	case "m7":
	    break;
	case "mM7":
	    break;
	case "dim":
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
	var root = $("#root").val(),
	    chordType = app.chordTypeSelector.val(),
	    tensionType = $("#tension_type").val(),
	    data = [],
	    tones,
	    pos,
	    tensions;
	console.log(root + "," + chordType + "," + tensionType);
	tensions = tensionType.split(" ");
	tones = Chord.parse(root + chordType, tensions);
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
	    }
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
    app.chordTypeSelector = new app.ChordTypeSelector();
}
