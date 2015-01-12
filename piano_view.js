"use strict";

var app = app || {};
var KeyView = Backbone.View.extend({
    
    tagName: 'div',

    initialize: function (options) {
	this.key = options.key;

	if (this.key.indexOf('b') > 0) {
	    this.$el.addClass('b');
	    this.height = 180;
	} else {
	    this.$el.addClass('w3');
	}
	this.render();
    },

    render: function () {
	var div = sprintf('<div style="width:500px;height:%spx;display:table-cell;text-align:center;vertical-align:bottom;margin:10px;">%s</div>',this.height,  this.key);
	this.$el.append(div);
	return this;
    }
});

var PianoView = Backbone.View.extend({
    
    el: '#piano_view',

    initialize: function () {
	var that = this,
	    i, key, keyView,
	    upperDivTypes = ["w2", "b", "w1", "b", "w2", "w2", "b", "w1","b", "w1","b", "w2"],
	    blackTones = ["Db", "Eb", "Gb", "Ab", "Bb"],
	    whiteTones = ["C", "D", "E", "F", "G", "A", "B"],
	    bCount = 0;

	app.pianoKeys = [];

	<!-- black keys -->
	for (i = 0; i < 2; i++) {
	    upperDivTypes.forEach(function (divType) {
		var div;
		if (divType == "b") {
		    key = blackTones[bCount % 5];
		    keyView = new KeyView({key: key});
		    app.pianoKeys.push(keyView);
		    that.$el.append(keyView.$el);
		    bCount++;
		} else {
		    div = sprintf('<div class="%s"></div', divType);
		    that.$el.append(div);
		}
	    });
	}
	that.$el.append('<div style="clear: both;"></div)');
	<!-- white keys -->
	for (i = 0; i < 14; i++) {
	    key = whiteTones[i % 7];
	    keyView = new KeyView({key: key});
	    app.pianoKeys.push(keyView);
	    that.$el.append(keyView.$el);
	}
	that.$el.append('<div style="clear: both;"></div)');
    }
});


var pv = new PianoView();
