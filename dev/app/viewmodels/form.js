define(function (require) {
	var app = require('durandal/app'),
	    ko = require('knockout');
    //Note: This module exports an object.

    return {
    	name: ko.observable(),
		sayHello:function(){
			app.showMessage('Hello '+this.name() + '! Nice to meet you.','Greetings');
		},
		numberOfClicks : ko.observable(0),
		incrementClickCounter:function(){
			var previousCount = this.numberOfClicks();
			this.numberOfClicks(previousCount + 1);
		},
		resetClickCounter:function(){
			//alert(this.numberOfClicks());
			this.numberOfClicks(0);
		}
    };
});