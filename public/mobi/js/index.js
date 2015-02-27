var	pagesArray = [];
var	pageItemsArray = [];
var actionsArray = [];
var actionsID = 1;
var actionsEdit = 0;
var actionsDelete = 0;
var	devicesArray = [];
var	devicesValArray = [];
var inputsArray = [];
var configArray = [];
var timersArray = [];
var timersID = 1;
var timersEdit = 0;
var timersDelete = 0;
var eventsEdit = 0;
var eventsNr = 1;
var linksArray = [];
var linksID = 1;
var linksEdit = 0;
var linksDelete = 0;
var itemTypesArray = [];
var iseditmode = 0;
var iswineditmode = 0;
var iseditbkgmode = 0; 
var dragstartx = 0;
var dragstarty = 0;
var windowdragstartx = 0;
var windowdragstarty = 0;
var windoweventtarget = 1;
var itemeventtarget = 1;
var zordermax = 10;
var bootlog = "";
var aid = [];
var due_step = 0;

bmv_v = '';
bmv_i = '';
bmv_ce = '';
bmv_soc = '';
bmv_ttg = '';
bmv_alarm = '';
bmv_relay = '';

t_BU = '';
t_WK = '';
t_K1 = '';
t_K2 = '';
t_B1 = '';
t_B2 = '';
t_B3 = '';
t_G1 = '';
t_G2 = '';


window.onload = function() {
	initApp();
}

function initApp(){
}

function initWindows() {
	console.log("initWindows");
	var listCount = 0;
	// ------------ action ------------ //
	for(j=0; j < actionsArray.length; j++){
		$("#actionListUL").append("<li class='forward'><div class='listIconOn'><img src='img/action_icon.png'></img></div><a href='#' onclick='actionClicked("+actionsArray[j].id+");'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+actionsArray[j].name+"</a></li>");
		listCount += 1;
	}
	$("#actionCounter").html(listCount);
	listCount = 0;
	
	// ------------ device ------------ //
	for(j=0; j < devicesArray.length; j++){
		if (devicesArray[j].mobi){
			$("#deviceListUL").append("<li class='forward'><div class='listIconOn' id='iconOff"+devicesArray[j].id+"'><img src='img/bulb_off.png'></img></div><div class='listIconOff' id='iconOn"+devicesArray[j].id+"'><img src='img/bulb_on.png'></img></div><a href='#' onclick='deviceClicked("+devicesArray[j].id+");'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+devicesArray[j].name+"<small class='counter'><div id='listVal"+devicesArray[j].id+"'>0</div></small></a></li>");
			listCount += 1;
		}
	}
	$("#deviceCounter").html(listCount);
	listCount = 0;
	// ------------ temp ------------ //
	for(j=0; j < devicesArray.length; j++){
		if (devicesArray[j].type == 4){
			$("#tempListUL").append("<li><div class='listIconOn'><img src='img/temp_icon.png'></img></div><div class='listTempVal' id='listTempVal"+devicesArray[j].id+"'>-</div><a href='#' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+devicesArray[j].name+"</a></li>");
			listCount += 1;
		}
	}
	//$("#tempCounter").html(listCount);
	listCount = 0;
	// ------------ link ------------ //
	for(j=0; j < linksArray.length; j++){
		$("#linkListUL").append("<li class='forward'><div class='listIconOn'><img src='img/url_icon.png'></img></div><a href='#'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+linksArray[j].name+"<small class='counter'>42</small></a></li>");
		listCount += 1;
	}
	$("#linkCounter").html(listCount);
	listCount = 0;
	// ------------ timer ------------ //
	for(j=0; j < timersArray.length; j++){
		$("#timerListUL").append("<li class='forward'><div class='listIconOn'><img src='img/timer_icon.png'></img></div><a href='#'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+timersArray[j].name+"<small class='counter'>42</small></a></li>");
		listCount += 1;
	}
	$("#timerCounter").html(listCount);
	updateDevicesLayout();
}

function updateDevicesLayout() {
		//console.log('updateDevicesLayout');
		for(j=0; j < devicesArray.length; j++){
			if(devicesArray[j].mobi==1){
				//console.log('updateDevicesLayout '+"#iconOn"+devicesArray[j].id);
				if (devicesArray[j].val==100){
					$("#iconOn"+devicesArray[j].id).removeClass("listIconOff");
					$("#iconOn"+devicesArray[j].id).addClass("listIconOn");
					$("#listVal"+devicesArray[j].id).html("100");
				} else if (devicesArray[j].val==0){
					$("#iconOn"+devicesArray[j].id).removeClass("listIconOn");
					$("#iconOn"+devicesArray[j].id).addClass("listIconOff");
					$("#listVal"+devicesArray[j].id).html("0");
				}
			}
		}
}

jQuery(function($){
	var socket = io.connect();
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $users = $('#users');
	var $messageForm = $('#send-message');
	var $messageBox = $('#message');
    
    SendFirst();   
    setInterval(function() {getAllValues();}, 1000);

    function getAllValues(){
        socket.emit('getallvalues', function(){	})	
    };
    
    function SendFirst(){
        var randomnumber=100+Math.floor(Math.random()*901)
        socket.emit('new user', 'WebClient' + randomnumber , function(data){
    	})	
    };
    
    window.SendServerCommand = function (serverscript){
        socket.emit('sendservercommand', serverscript , function(data){})	
    };
	
	window.SendDueSerial = function (serialText){
        socket.emit('senddueserial', serialText , function(data){})	
    };


	//  -- Send username to server --
	$nickForm.submit(function(e){
		e.preventDefault();
		socket.emit('new user', $nickBox.val(), function(data){
			if(data){
				$('#nickWrap').hide();
				$('#contentWrap').show();
			} else{
				$nickError.html('That username is already taken!  Try again.');
			}
		});
		$nickBox.val('');
	});
	
	//  -- Receiving usernames from server --
	socket.on('usernames', function(data){
		var html = '';
		for(i=0; i < data.length; i++){
			html += data[i] + '<br/>'
		}
		$users.html(html);
	});
	
	//  -- Receiving config from server --
	socket.on('config', function(data){
		configArray = [];
		for(i=0; i < data.length; i++){
			configArray.push(data[i]); 
		}
		console.log('');
		console.log('-----------------------------');
		console.log('config: ' + configArray.length );
		//bootlog += 'Loading data...' + '\r';
		bootlog = 'config: ' + configArray.length + '\r' + bootlog;
	});
	
	//  -- Receiving device list from server --
	socket.on('devices', function(data){
		devicesArray = [];
		for(i=0; i < data.length; i++){
			devicesArray.push(data[i]); 
		}
		console.log('devices: ' + devicesArray.length );
		bootlog = 'devices: ' + devicesArray.length + "\r" + bootlog;
	});
	
	//  -- Receiving timers list from server --
	socket.on('timers', function(data){
		timersArray = [];
		for(i=0; i < data.length; i++){
			timersArray.push(data[i]); 
		}
		console.log('timers: ' + timersArray.length );
		bootlog = 'timers: ' + timersArray.length + "\r" + bootlog;
	});
	
	//  -- Receiving links list from server --
	socket.on('links', function(data){
		linksArray = [];
		for(i=0; i < data.length; i++){
			linksArray.push(data[i]); 
		}
		console.log('links: ' + linksArray.length );
		bootlog = 'links: ' + linksArray.length + "\r" + bootlog;
		
		        console.log('-----------------------------');
        console.log('Version: '+configArray[0].version);
        console.log('-----------------------------');
        bootlog = '-----------------------------' + '\r' + bootlog;
        bootlog = 'Version: '+configArray[0].version + '\r' + bootlog;
        bootlog = '-----------------------------' + '\r' + bootlog;
        initWindows();
	});
	
	
    //  -- Receiving input list from server --
	socket.on('inputs', function(data){
		inputsArray = [];
		for(i=0; i < data.length; i++){
			inputsArray.push(data[i]); 
		}
		console.log('inputs: '+inputsArray.length );
		bootlog = 'inputs: ' + inputsArray.length + "\r" + bootlog;
	});
    
    //  -- Receiving action list from server --
    socket.on('actions', function(data){
		actionsArray = [];
		for(i=0; i < data.length; i++){
			actionsArray.push(data[i]); 
		}
        console.log('actions: '+actionsArray.length );
        bootlog = 'actions: ' + actionsArray.length + "\r" + bootlog;
        

	});


	
	//  -- Send message to server --
	$messageForm.submit(function(e){
		e.preventDefault();
		socket.emit('send message', $messageBox.val());
		$messageBox.val('');
	});
	
	//  -- Receiving message from server --
	socket.on('new message', function(data){
        //console.log('data'+data.msg);
           console.log(data.nick + " " + data.title + " " + data.msg);
	});
	

	//  -- Receiving allvalues from server --
	socket.on('sendallvalues', function(data){
		var ValuesA = [];
        var OneValueA = [];
		//console.log('data'+data.msg);
		ValuesA  = data.msg.split('*');
        var datetime = new Date();
        for(j=0; j < ValuesA.length-1; j++){
            OneValueA  = ValuesA[j].split('#');
            if (OneValueA[0]==4001){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}
            if (OneValueA[0]==4002){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}
            if (OneValueA[0]==4003){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}
            if (OneValueA[0]==4004){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}
            if (OneValueA[0]==4005){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}
            if (OneValueA[0]==4006){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}
            if (OneValueA[0]==4007){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}
            if (OneValueA[0]==4008){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}
            if (OneValueA[0]==4009){$("#listTempVal"+OneValueA[0]).html(OneValueA[1]);}

			if (OneValueA[0]==3002){$("#powerCounter").html(Number(OneValueA[1]).toFixed(1)+' A');}
			if (OneValueA[0]==4002){$("#tempCounter").html(OneValueA[1]);}
			
			if (OneValueA[0]==3001){$("#listPowerVal3001").html(OneValueA[1]);}
			if (OneValueA[0]==3002){$("#listPowerVal3002").html(OneValueA[1]+' A');}
			if (OneValueA[0]==3008){$("#listPowerVal3008").html(OneValueA[1]);}
			
			if (OneValueA[0]==3003){$("#listPowerVal3003").html(OneValueA[1]);}
			if (OneValueA[0]==3004){$("#listPowerVal3004").html(OneValueA[1]);}
			if (OneValueA[0]==3005){$("#listPowerVal3005").html(OneValueA[1]);}
			
			if (OneValueA[0]==3006){$("#listPowerVal3006").html(OneValueA[1]);}
			if (OneValueA[0]==3007){$("#listPowerVal3007").html(OneValueA[1]);}
			
        }
        

	});
	
	//  -- Receiving sendserialtext from server --
	socket.on('sendserialtext', function(data){
		//console.log('data'+data.msg);
		$('#TextArea400').val(data.msg+$('#TextArea400').val()); 
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
					$("#iconOn"+ActionA[0]).removeClass("listIconOff");
					$("#iconOn"+ActionA[0]).addClass("listIconOn");
					$("#listVal"+devicesArray[j].id).html("100");
				} else if (ActionA[1]=='off'){
					$("#iconOn"+ActionA[0]).removeClass("listIconOn");
					$("#iconOn"+ActionA[0]).addClass("listIconOff");
					$("#listVal"+devicesArray[j].id).html("0");
				}
			}
		}
	});
    
    //  -- Receiving input change from server --
	socket.on('input change', function(data){
		var ActionA = [];
		//console.log('data'+data);
		ActionA  = data.split('-');
		if(ActionA[2] == 0){
	        $("#widgetid"+ActionA[0]).prop("checked", false);
		}else{
		    $("#widgetid"+ActionA[0]).prop("checked", true);
		}
	});
    
   
	//  -- Client disconnected --
    socket.on('disconnect', function(data){
		$.av.pop({
            title: 'Alert',
            message: 'Socket disconnected' +'<br>'+'try to restore the connection'
        });
        console.log('socket disconnected ');
	 });
     
    //  -- Client connected --
    socket.on('connect', function(data){
      	updateLayoutAll();	
        console.log('socket re-connected '); 
	 });
    
    //  -- sendQuery --
    window.sendQuery = function(queryString, recid, rectype, recX, recY, name) { 
    	//alert('sendQuery'+queryString);
         socket.emit('send query', {msg: queryString, id: recid, type: rectype, xpos: recX, ypos: recY, name: name});  
	}
    
    
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
	
	//  -- actionClicked --
    window.actionClicked = function (item_id) { 
        //console.log('LampClicked ' + item_id);
        for(j=0; j < actionsArray.length; j++){
        	if (actionsArray[j].id == item_id){
        		SendDueSerial(actionsArray[j].events);
        		//console.log('SendDueSerial ' + actionsArray[j].events);
        	}
        }
	}
	
	//  -- DeviceClicked --
    window.deviceClicked = function (itemID) { 
        console.log('deviceClicked ' + itemID);
        SendDueSerial(itemID+'-toggle-0;');
	}
	
	function updateLayoutAll() {
		if(configArray.length>0){
			console.log('updateLayoutAll');
			setTimeout(function(){ updateLayoutAllDelayed(); },1500); // wait for fresh data.
		}
	}
	
	function updateLayoutAllDelayed() {
		for(counter=0; counter < pageItemsArray.length; counter++){					
        	if (pageItemsArray[counter].type == 17){
        		//console.log('devicesValArray[pageItemsArray[counter].device_id]  '+devicesValArray[pageItemsArray[counter].device_id] +' counter '+counter+ 'pageItemsArray[counter].device_id '+pageItemsArray[counter].device_id);
				if(devicesValArray[pageItemsArray[counter].device_id] == 0){
					$("#widgetid"+pageItemsArray[counter].id).jqxCheckBox({ checked:false });
				}else{
					$("#widgetid"+pageItemsArray[counter].id).jqxCheckBox({ checked:true });
				}
        	}		
        }
	}
		

	
});

