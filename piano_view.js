"use strict";

var app = app || {};

app.KeyView = Backbone.View.extend({
    
    tagName: 'div',

    initialize: function (options) {
	this.key = options.key;

	if (this.key.indexOf('b') > 0) {
	    this.$el.addClass('b');
	    this.height = 90;
	} else {
	    this.$el.addClass('w3');
	    this.height = 70;
	}
	this.render();
    },

    render: function () {
	var div = sprintf('<div style="width:100px;height:%spx;display:table-cell;text-align:center;vertical-align:bottom;margin:10px;">%s</div>',this.height,  this.key);
	this.$el.append(div);
	return this;
    },

    hide: function () {
	this.$el.children().hide();
	this.degree = "";
    },

    setDegree: function (degree) {
	this.degree = degree;
	var child = this.$el.children().first();;
	child.text("");
	child.append(this.key + "<BR>(" + degree + ")");
    }
});

app.PianoView = Backbone.View.extend({
    
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
		    keyView = new app.KeyView({key: key});
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
	    keyView = new app.KeyView({key: key});
	    app.pianoKeys.push(keyView);
	    that.$el.append(keyView.$el);
	}
	that.$el.append('<div style="clear: both;"></div)');
    },

    update: function (tones) {
	var exists = Object.keys(tones);
	app.pianoKeys.forEach(function (keyView) {
	    var key = keyView.key;
	    if (exists.indexOf(key) < 0) {
		keyView.hide();
	    } else {
		var degree = tones[key];
		keyView.setDegree(degree);
	    }
	});
    },

    hide: function () {
	this.$el.hide();
    },

    show: function () {
	this.$el.show();
    }
});
