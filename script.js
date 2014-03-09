$( document ).ready(function() {
	console.log( "ready!" );
	
	var canvas = document.querySelector('canvas'), context = canvas.getContext('2d');
	canvas.width = 500; //document.width is obsolete
	canvas.height = 500; //document.height is obsolete
	context.fillStyle = '#E4E4E4';
	//context.fillRect(0, 0, 500, 500);

	var ajaxtext = "";
	var ajaxobject;
	var dataURL = "HSK1.json";
	$.ajax({
		type: "GET",
		url: dataURL,
		async:false,
		dataType: 'json',
		success: function ( response ) {
			var object = JSON.parse( JSON.stringify(response));
			ajaxtext = JSON.stringify(object);
			ajaxobject = object;
	
		}
	});



	function shuffle(o){ //v1.0
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	function popJsonArray(array, property, value) {
	   $.each(array, function(index, result) {
	      if(result[property] == value) {
	          //Remove from array
	          array.splice(index, 1);
	      }    
	   });
	}

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
			}
		return array;
	}

	function pickItemFromJson(json_object){
		var keyArray = $.map(json_object, function (value, key) { return value; });
		//console.log(keyArray)
		var shuffle_keyArray = shuffleArray(keyArray)
		return shuffle_keyArray;
	}
	var shuffle_keyArray = pickItemFromJson(ajaxobject);

	function update(array){
		//reseting canvas rectangle
		context.fillStyle = '#E4E4E4';
		context.fillRect(0, 0, 500, 500);
		context.fill();
		
		//check length of array 
		var lengthArray = array.length;
		//Generating a random number in JavaScript raning between 0 and length of array
		var randomnumber=Math.floor(Math.random()*(lengthArray));
		
		// pull random itemobject.hanzi from array
		var hanzi = JSON.stringify(array[randomnumber].hanzi)
		var han = hanzi.replace(/"/g,''); //"[apple,orange,pear]")
		
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
		
		var pinyin = JSON.stringify(array[randomnumber].pinyin)
		var pin = pinyin.replace(/"/g,''); //"[apple,orange,pear]")
		$( "p.pinyin" ).html("<strong>Pinyin:</strong> "+pin );
		var english = JSON.stringify(array[randomnumber].yingyu)
		var en = english.replace(/"/g,''); //"[apple,orange,pear]")
		$( "p.english" ).html("<strong>English:</strong> "+en );
		var helan = JSON.stringify(array[randomnumber].helan)
		var nl = helan.replace(/"/g,''); //"[apple,orange,pear]")
		$( "p.dutch" ).html("<strong>Dutch:</strong> "+nl );
		array.splice(randomnumber, 1);
	}

	update(shuffle_keyArray);
	$( "button#next" ).click(function() {
		update(shuffle_keyArray)
		//remove
		//add	
	});
	$( "button#show" ).click(function() {
//		  $( "p.hide" ).first().show( "fast", function showNext() {
//		    $( this ).next( "p.hide" ).show( "fast", showNext );
//		  });
		
		if ( $( "p.hide" ).is( ":hidden" ) ) {
	    $( "p.hide" ).slideDown( "slow" );
	  } //else {
	    //$( "p.hide" ).hide();
	  //}
	});
	$( "button#hide" ).click(function() {
		$( "p.hide" ).slideUp( "slow");
	});
	
	


});