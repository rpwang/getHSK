define(['plugins/http', 'durandal/app', 'knockout','jquery'], function (http, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //should create read jsson instance here. Furthermore randomize hsk 
	var Property = function (ref, title) {
	        this.ref = ref;
	        this.title = title;
	    };
	
	   var propertyList = [
	        new Property("0", "HSK1"),
	        new Property("1", "HSK2"),
	        new Property("2", "HSK3"),
	        new Property("3", "HSK4")
	    ];
		var items = ko.observableArray(propertyList);
		var selectedProperty = ko.observable();
    return {
        displayName: 'learnHSK',
		selectedProperty: selectedProperty,
		items: items,
        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceeding
			function shuffleArray(array) {
				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
					}
				return array;
			}
		
			
			
			var obj_Json; 
			var str_url = "json/HSK1.json";
			$.ajax({
				type: "GET",
				url: str_url,
				async:false,
				dataType: 'json',
				success: function ( response ) {
					obj_Json = JSON.parse( JSON.stringify(response));
				}
			});
			
			var arr_Words = $.map(obj_Json, function (value, key) { return value; });
			arr_WordShuffled = shuffleArray(arr_Words);
			
           //return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
		},
		nextClick: function(){
			//console.log(wordArrayShuffled);
			var int_arrayLength = arr_WordShuffled.length;
			var int_randomNumber = Math.floor(Math.random()*(int_arrayLength));

			// pull random itemobject.hanzi from array
			var hanzi = JSON.stringify(arr_WordShuffled[int_randomNumber].hanzi)
			var han = hanzi.replace(/"/g,''); //"[apple,orange,pear]")
			
			var canvas = document.querySelector('canvas'), context = canvas.getContext('2d');
			canvas.width = 500; //document.width is obsolete
			canvas.height = 500; //document.height is obsolete
			
			if (han.length === 1){
				context.font = "300px arial";
				context.fillStyle = "#B32C2C";
				context.fillText(han,95, 350);
			}
			else if (han.length === 2){
				context.font = "240px arial";
				context.fillStyle = "#B32C2C";
				context.fillText(han,10, 350);
			}
			else if (han.length === 3){
				context.font = "160px arial";
				context.fillStyle = "#B32C2C";
				context.fillText(han,10, 350);
			}
			else{
				context.font = "120px arial";
				context.fillStyle = "#B32C2C";
				context.fillText(han,10, 350);
			}
			var pinyin = JSON.stringify(arr_WordShuffled[int_randomNumber].pinyin)
			var pin = pinyin.replace(/"/g,''); //"[apple,orange,pear]")
			$( "p.pinyin" ).html("<strong>Pinyin:</strong> "+pin );
			var english = JSON.stringify(arr_WordShuffled[int_randomNumber].yingyu)
			var en = english.replace(/"/g,''); //"[apple,orange,pear]")
			$( "p.english" ).html("<strong>English:</strong> "+en );
			var helan = JSON.stringify(arr_WordShuffled[int_randomNumber].helan)
			var nl = helan.replace(/"/g,''); //"[apple,orange,pear]")
			$( "p.dutch" ).html("<strong>Dutch:</strong> "+nl );
			arr_WordShuffled.splice(int_randomNumber, 1);	
		},
		showClick: function(){
			if ( $( "p" ).is( ":hidden" ) ) {
		    	$( "p" ).slideDown( "slow" );
			}
		},
		hideClick: function(){
			$( "p" ).slideUp( "fast");
		},
		popClick:function(){
			var obj_Json; 
			var str_url = "json/"+selectedProperty().title;
			console.log(str_url)
			$.ajax({
				type: "GET",
				url: str_url,
				async:false,
				dataType: 'json',
				success: function ( response ) {
					obj_Json = JSON.parse( JSON.stringify(response));
					console.log(obj_Json)
				}
			});
		}
    };
});