define(function (require) {
	var app = require('durandal/app'),
	    ko = require('knockout');
    //Note: This module exports an object.
    return {
    	name: ko.observable(),
		sayHello:function(){
			app.showMessage('Hello '+this.name() + '! Nice to meet you.','Greetings');
		}
    };
});