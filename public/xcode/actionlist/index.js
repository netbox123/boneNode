var	actionsArray = [];

function initWindows() {
	console.log("initWindows");
	var listCount = 0;
	// ------------ action ------------ //
	for(j=0; j < actionsArray.length; j++){
		$("#actionListTR").append("<tr><td width='22px'>"+actionsArray[j].id+"</td><td width='100px'>"+actionsArray[j].name+"</td><td width='35px'></td><td width='22px'><a href='#' onclick='actionClicked("+actionsArray[j].id+");'>run</a></td></tr>");
		listCount += 1;
	}
}

jQuery(function($){
	var socket = io.connect();
    SendFirst();   
    
    function SendFirst(){
    	socket.emit('getActions');
        var randomnumber=100+Math.floor(Math.random()*901)
        socket.emit('new user', 'WebClient' + randomnumber , function(data){
    	})	
    };
	
    window.SendDueSerial = function (serialText){
        socket.emit('senddueserial', serialText , function(data){})	
    };
	
	//  -- Receiving action list from server --
	socket.on('actions', function(data){
	actionsArray = [];
	for(i=0; i < data.length; i++){
		actionsArray.push(data[i]); 
	}
	console.log('actions: '+actionsArray.length );
	initWindows();
	});
	
	window.actionClicked = function (itemID) { 
        	console.log('actionClicked ' + itemID);
        	for(j=0; j < actionsArray.length; j++){
        		if (actionsArray[j].id==itemID){
        			console.log('actionClicked ' + actionsArray[j].events);
        			SendDueSerial(actionsArray[j].events);	
        		}
		}
	}

});

