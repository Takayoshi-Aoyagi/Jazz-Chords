"use strict";

var PianoView = Backbone.View.extend({
    
    el: '#piano_view',

    initialize: function () {
	var that = this,
	    i,
	    upperDivTypes = ["w2", "b", "w1", "b", "w2", "w2", "b", "w1","b", "w1","b", "w2"],
	    blackTones = ["Db", "Eb", "Gb", "Ab", "Bb"],
	    whiteTones = ["C", "D", "E", "F", "G", "A", "B"],
	    bCount = 0;
	for (i =0; i < 2; i++) {
	    upperDivTypes.forEach(function (divType) {
		var div;
		if (divType == "b") {
		    div = sprintf('<div class="%s"><div style="width:500px;height:180px;display:table-cell;text-align:center;vertical-align:bottom;margin:10px;">%s</div></div>',
				  divType, blackTones[bCount % 5]);
		    bCount++;
		} else {
		    div = sprintf('<div class="%s"></div', divType);
		}
		that.$el.append(div);
	    });
	}
	that.$el.append('<div style="clear: both;"></div)');
	for (i = 0; i < 14; i++) {
	    that.$el.append(sprintf('<div class="w3"><div style="width:500px;height:120px;display:table-cell;text-align:center;vertical-align:bottom;margin:10px;">%s</div></div',
				    whiteTones[i % 7]));
	}
	that.$el.append('<div style="clear: both;"></div)');
    }
});


var pv = new PianoView();
