var	devicesArray 	= [];
var	pageItemsArray 	= [];
var 	bootlog 	= "";


function initWindows() {
	console.log("initWindows");
	var listCount = 0;
	// ------------ pageItems ------------ //
	for(j=0; j < pageItemsArray.length; j++){
		if (pageItemsArray[j].type == 17) {
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

function updateDevicesLayout() {
	for(j=0; j < devicesArray.length; j++){
		if(devicesArray[j].mobi==1){
			if (devicesArray[j].val==100){
				$("#listVal"+devicesArray[j].id).html("100");
			} else if (devicesArray[j].val==0){
				$("#listVal"+devicesArray[j].id).html("0");
			}
		}
	}
}

jQuery(function($){
	var socket = io.connect();
    SendFirst();   
    
    function SendFirst(){
    	socket.emit('getDevices');
        socket.emit('getPageItems');
        var randomnumber=100+Math.floor(Math.random()*901)
        socket.emit('new user', 'WebClient' + randomnumber , function(data){
    	})	
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
			if (data[i].type==17){
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
	
	//  -- Receiving message from server --
	socket.on('new message', function(data){
        //console.log('data'+data.msg);
        if (window.app) {
        	window.app.showMessage_(data.nick, data.title + " " + data.msg);
      	}
        
        //$.av.pop({
            //title: data.title,
            //message: data.address +'<br>'+data.msg+' '
        //});
        //var box = $("#TextArea410");
        //box.val(data.nick + " " + data.title + " " + data.msg + "\n" + box.val());
        console.log(data.nick + " " + data.title + " " + data.msg);
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
        console.log('deviceClicked ' + itemID);
        SendDueSerial(itemID+'-toggle-0;');
	}

	window.deviceTurnOn = function (itemID) { 
        console.log('deviceClicked ' + itemID);
        SendDueSerial(itemID+'-on-100;');
	}

	window.deviceTurnOff = function (itemID) { 
        console.log('deviceClicked ' + itemID);
        SendDueSerial(itemID+'-off-0;');
	}
	
});

