var	devicesArray 	= [];
var	devicesValArray	= [];
var	pageItemsArray 	= [];
var 	bootlog 	= "";


function initWindows() {
	console.log("initWindows");
	var listCount = 0;
	// ------------ pageItems ------------ //
	for(j=0; j < pageItemsArray.length; j++){
		
		
	 	if (pageItemsArray[j].type == 10) {
			$("#page").append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[j].id+"' onclick='LampClicked("+pageItemsArray[j].id+");' style='cursor:pointer;background:url(images/checkbox_off.png);position:absolute;left:"+pageItemsArray[j].xpos+"px;top:"+pageItemsArray[j].ypos+"px;width:14px;height:14px;'><div id='lampid"+pageItemsArray[j].id+"'><img width='14' height='14' src='images/checkbox_on.png'></img></div><div style='cursor:pointer;position:absolute;left:20px;top:-2px;width:200px'>"+pageItemsArray[j].name+"</div></div>");
			for(k=0; k < devicesArray.length; k++){	
				if( devicesArray[k].id == pageItemsArray[j].device_id) {
					if(devicesArray[k].val == 0){
						//$("#lampid"+devicesArray[k].id).fadeOut();
					}else{
						//console.log('lamp aan'+devicesArray[k].id);
						$("#lampid"+pageItemsArray[j].id).css({"display": "inline"});
					}
				}
			}					

		} else if (pageItemsArray[j].type == 17) {
			$("#page").append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[j].id+"' onclick='LampClicked("+pageItemsArray[j].id+");' style='cursor:pointer;background:url(images/IDPNG_Light_Off@2x.png);position:absolute;left:"+pageItemsArray[j].xpos+"px;top:"+pageItemsArray[j].ypos+"px;width:"+pageItemsArray[j].width+"px;height:"+pageItemsArray[j].height+"px;'><div class='lampclass' id='lampid"+pageItemsArray[j].id+"'><img src='/images/IDPNG_Light_On@2x.png'></img></div></div>");
			for(k=0; k < devicesArray.length; k++){	
				if( devicesArray[k].id == pageItemsArray[j].device_id) {
					if(devicesArray[k].val == 0){
						//$("#lampid"+devicesArray[k].id).fadeOut();
					}else{
						//console.log('lamp aan'+devicesArray[k].id);
						$("#lampid"+pageItemsArray[j].id).css({"display": "inline"});
					}
				}
			} 
		}
	}
	//$("#deviceCounter").html(listCount + '&nbsp;items');
	updateDevicesLayout();
}

window.updateDevicesLayout = function(){
	for(j=0; j < pageItemsArray.length; j++){
		
			for(k=0; k < devicesArray.length; k++){	
				if( devicesArray[k].id == pageItemsArray[j].device_id) {
					if(devicesArray[k].val == 0){
						$("#lampid"+pageItemsArray[j].id).fadeOut();
					}else{
						$("#lampid"+pageItemsArray[j].id).fadeIn();
					}
				}
			} 
		
	}

}




jQuery(function($){
	var socket = io.connect();
    SendFirst();   
    setInterval(function() {getAllValues();}, 1000);
    setInterval(function() {triggerCientSunsetTime();}, 1000*60*30);
    
    function SendFirst(){
    	socket.emit('getDevices');
        socket.emit('getPageItems');
        var randomnumber=100+Math.floor(Math.random()*901)
        socket.emit('new user', 'WebClient' + randomnumber , function(data){
    	})	
    };
    
    function triggerCientSunsetTime(){
        if (window.app) {
        	window.app.serverUpdate_('sunTimeSet');
      	}	
    };
	
    function getAllValues(){
        socket.emit('getallvalues', function(){	})	
    };
    
    window.SendDueSerial = function (serialText){
        socket.emit('senddueserial', serialText , function(data){})	
    };
	
	//  -- Receiving device list from server --
	socket.on('devices', function(data){
		devicesArray = [];
		for(i=0; i < data.length; i++){
			if (data[i].mobi==1){
				devicesArray.push(data[i]); 
			}
		}
		console.log('devices: ' + devicesArray.length );
		bootlog = 'devices: ' + devicesArray.length + "\r" + bootlog;
	});
	
	//  -- Receiving pageitem list from server --	
	socket.on('pageitems', function(data){
		pageItemsArray = [];
		for(i=0; i < data.length; i++){
			if (data[i].type==10 | data[i].type==17){
				pageItemsArray.push(data[i]);
			}
            
		}
		console.log('pageitems: '+pageItemsArray.length );
		bootlog = 'pageitems: ' + pageItemsArray.length + '\r' + bootlog;
		// Init windows
        //ControlPageLoad();
        console.log('-----------------------------');
        console.log('Version: ');
        console.log('-----------------------------');
        bootlog = '-----------------------------' + '\r' + bootlog;
        bootlog = 'Version: ' + '\r' + bootlog;
        bootlog = '-----------------------------' + '\r' + bootlog;
        initWindows();
	});
	
	//  -- Receiving device change from server --
	socket.on('device change', function(data){
		window.app.deviceChange_(data);
		var ActionA = [];
		var pageItemA = [];
		//console.log('data'+data);
		ActionA  = data.split('-');
		for(j=0; j < pageItemsArray.length; j++){
			if(pageItemsArray[j].device_id == ActionA[0]){			
				if(ActionA[2] == 0){
					$("#lampid"+pageItemsArray[j].id).fadeOut();
				}else{
					$("#lampid"+pageItemsArray[j].id).fadeIn();
				}
			}
		}
	});
	
	
	//  -- Receiving allvalues from server --
	socket.on('sendallvalues', function(data){
	var ValuesA = [];
        var OneValueA = [];
        window.app.pushAllValues_(data.msg);
        window.app.pushAllValues2_(data.msg);
	//console.log('data'+data.msg);
	ValuesA  = data.msg.split('*');
        var datetime = new Date();
        for(j=0; j < ValuesA.length; j++){
            OneValueA  = ValuesA[j].split('#');
            devicesValArray[OneValueA[0]] = OneValueA[1];
            for(xcount=0; xcount < devicesArray.length; xcount++){
            	if (devicesArray[xcount].id == OneValueA[0]){
            		devicesArray[xcount].val = OneValueA[1];
            	}
            }
        }
     
	});
	
	//  -- Receiving xcodeUpdate from server --
	socket.on('serverUpdate', function(data){
        //console.log('data'+data.msg);
        if (window.app) {
        	window.app.serverUpdate_(data);
      	}
	});
	
	//  -- Receiving message from server --
	socket.on('new message', function(data){
        //console.log('data'+data.msg);
        if (window.app) {
        	window.app.showNotification_(data.nick + ";" + data.title + ";" + data.msg);
      	}
        //console.log(data.nick + " " + data.title + " " + data.msg);
	});
	
	//  -- Receiving message from server --
	socket.on('ServerUpdateMessage', function(data){
        if (window.app) {
        	window.app.showNotification_(data);
      	}
        //console.log(data.nick + " " + data.title + " " + data.msg);
	}); 
	
	//  -- Client connected --
    	socket.on('connect', function(data){
      	updateLayoutAllDelayed();
      	if (window.app) {
        	window.app.serverUpdate_('onconnect');
      	}
        console.log('socket re-connected '); 
	});
	 
	//  -- Client disconnected --
    	socket.on('disconnect', function(data){
      	updateLayoutAllDelayed();
      	if (window.app) {
        	window.app.serverUpdate_('ondisconnect');
      	}
        console.log('socket disconnected '); 
	});
	
	//  -- LampClicked --
    	window.LampClicked = function (item_id) { 
        //console.log('LampClicked ' + item_id);
        for(j=0; j < pageItemsArray.length; j++){
        	if (pageItemsArray[j].id == item_id){
        		for(k=0; k < devicesArray.length; k++){
        			if(devicesArray[k].id == pageItemsArray[j].device_id){
        				SendDueSerial(devicesArray[k].id+'-toggle-0;');
        				console.log('SendDueSerial ' + devicesArray[k].id+'-toggle-0');
        			}
        		}
        	}
        }
	}
	
	window.deviceToggle = function (itemID) { 
        //console.log('deviceClicked ' + itemID);
        SendDueSerial(itemID+'-toggle-0;');
	}

	window.deviceTurnOn = function (itemID) { 
        //console.log('deviceClicked ' + itemID);
        SendDueSerial(itemID+'-on-100;');
	}

	window.deviceTurnOff = function (itemID) { 
        //console.log('deviceClicked ' + itemID);
        SendDueSerial(itemID+'-off-0;');
	}
	
	window.runActionID = function (itemID) { 
	//console.log('runActionID ' + itemID);
	socket.emit('runactionid', {id: itemID} , function(data){})
	}

	window.setBBBtime = function () { 
	var milliseconds = new Date().getTime();
    	milliseconds += 1*3600000;
    	socket.emit('sendservercommand', 'settime-'+milliseconds , function(data){})
    	}
    	
    	function updateLayoutAllDelayed() {
	//	if(configArray.length>0){
			console.log('updateLayoutAllDelayed');
			setTimeout(function(){ updateLayoutAll(); },1500); // wait for fresh data.
	//	}
	}
	
	window.updateLayoutAll = function () {
	    	for(j=0; j < pageItemsArray.length; j++){
			if(devicesValArray[pageItemsArray[j].device_id] == 0){
				$("#lampid"+pageItemsArray[j].id).fadeOut();
				window.app.deviceChange_(pageItemsArray[j].device_id+"-off-0");
			}else{
				$("#lampid"+pageItemsArray[j].id).fadeIn();
				window.app.deviceChange_(pageItemsArray[j].device_id+"-on-100");
			}
		}
	}
	
	
});

