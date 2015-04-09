var	devicesArray = [];

function initWindows() {
	console.log("initWindows");
	var listCount = 0;
	// ------------ device ------------ //
	for(j=0; j < devicesArray.length; j++){
		if (devicesArray[j].mobi){
			$("#deviceListTR").append("<tr><td width='22px'>"+devicesArray[j].id+"</td><td width='100px'>"+devicesArray[j].name+"</td><td width='35px'><div id='listVal"+devicesArray[j].id+"'>0</div></td><td width='22px'><a href='#' onclick='deviceTurnOn("+devicesArray[j].id+");'>on</a></td><td width='25px'><a href='#' onclick='deviceTurnOff("+devicesArray[j].id+");'>off</a></td><td width='20px'><a href='#' onclick='deviceToggle("+devicesArray[j].id+");'>toggle</a></td></tr>");
			listCount += 1;
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
			devicesArray.push(data[i]); 
		}
		console.log('devices: ' + devicesArray.length );
        initWindows();
	});
	
	//  -- Receiving device change from server --
	socket.on('device change', function(data){
		var ActionA = [];
		var pageItemA = [];
		//console.log('data'+data);
		ActionA  = data.split('-');
		for(j=0; j < devicesArray.length; j++){
			if(devicesArray[j].id==ActionA[0] & devicesArray[j].mobi){			
				if (ActionA[1]=='on'){
					$("#listVal"+devicesArray[j].id).html("100");
				} else if (ActionA[1]=='off'){
					$("#listVal"+devicesArray[j].id).html("0");
				}
			}
		}
	});
	
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

