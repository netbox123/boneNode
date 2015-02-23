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
		$("#actionListUL").append("<li class='forward'><a href='#'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+actionsArray[j].name+"<small class='counter'>42</small></a></li>");
		listCount += 1;
	}
	$("#actionCounter").html(listCount);
	listCount = 0;
	// ------------ device ------------ //
	for(j=0; j < devicesArray.length; j++){
		if (devicesArray[j].mobi){
			$("#deviceListUL").append("<li class='forward'><div class='listIcon'><img src='img/bulb_off.png'></img></div><a href='#' onclick='deviceClicked("+devicesArray[j].id+");'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+devicesArray[j].name+"<small class='counter'>42</small></a></li>");
			listCount += 1;
		}
	}
	$("#deviceCounter").html(listCount);
	listCount = 0;
	// ------------ temp ------------ //
	for(j=0; j < devicesArray.length; j++){
		if (devicesArray[j].type == 4){
			$("#tempListUL").append("<li class='forward'><a href='#' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+devicesArray[j].name+"<small class='counter'>42</small></a></li>");
			listCount += 1;
		}
	}
	$("#tempCounter").html(listCount);
	listCount = 0;
	// ------------ link ------------ //
	for(j=0; j < linksArray.length; j++){
		$("#linkListUL").append("<li class='forward'><a href='#'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+linksArray[j].name+"<small class='counter'>42</small></a></li>");
		listCount += 1;
	}
	$("#linkCounter").html(listCount);
	listCount = 0;
	// ------------ timer ------------ //
	for(j=0; j < timersArray.length; j++){
		$("#timerListUL").append("<li class='forward'><a href='#'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+timersArray[j].name+"<small class='counter'>42</small></a></li>");
		listCount += 1;
	}
	$("#timerCounter").html(listCount);
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
	});
	
	//  -- Receiving item_types list from server --
	socket.on('item_types', function(data){
		itemTypesArray = [];
		for(i=0; i < data.length; i++){
			itemTypesArray.push(data[i]); 
		}
		console.log('item_types: ' + itemTypesArray.length );
		bootlog = 'item_types: ' + itemTypesArray.length + "\r" + bootlog;
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

	//  -- Receiving page list from server --	
	socket.on('pages', function(data){
	    pagesArray = [];
		for(i=0; i < data.length; i++){
			pagesArray.push(data[i]);
		}
		console.log('pages: '+pagesArray.length );
		bootlog = 'pages: ' + pagesArray.length + "\r" + bootlog;
	});
	
	//  -- Receiving item_type from server --	
	socket.on('item_type', function(data){
	    itemTypeArray = [];
		for(i=0; i < data.length; i++){
			itemTypeArray.push(data[i]);
		}
		console.log('item_type: '+pagesArray.length );
		bootlog = 'item_type: ' + pagesArray.length + "\r" + bootlog;
	});
	
	//  -- Receiving pageitem list from server --	
	socket.on('pageitems', function(data){
		pageItemsArray = [];
		for(i=0; i < data.length; i++){
			pageItemsArray.push(data[i]);
            
		}
		console.log('pageitems: '+pageItemsArray.length );
		bootlog = 'pageitems: ' + pageItemsArray.length + '\r' + bootlog;
		// Init windows
        //ControlPageLoad();
        console.log('-----------------------------');
        console.log('Version: '+configArray[0].version);
        console.log('-----------------------------');
        bootlog = '-----------------------------' + '\r' + bootlog;
        bootlog = 'Version: '+configArray[0].version + '\r' + bootlog;
        bootlog = '-----------------------------' + '\r' + bootlog;
        initWindows();
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
            devicesValArray[OneValueA[0]] = OneValueA[1];
            //console.log('devicesValArray '+OneValueA[0]+'  '+OneValueA[1]);
        }
        
        for(j=0; j < pagesArray.length; j++){
    		//console.log('pagesArray ' + pagesArray[j].id + ' ' + pagesArray[j].name);
        	if (pagesArray[j].vis | pagesArray[j].id == 0){        		
        		for(xcount=0; xcount < pageItemsArray.length; xcount++){					
        			if (pageItemsArray[xcount].page_id == pagesArray[j].id){
        				//pageItemsArray[xcount].val = devicesValArray[pageItemsArray[xcount].device_id];
						//pageItemsArray[xcount].val = devicesValArray[pageItemsArray[xcount].device_id];
						//devicesValArray[pageItemsArray[xcount].device_id] = 
						if (pageItemsArray[xcount].type == 0) {
							//$('#widgetid' + pageItemsArray[xcount].id).html(devicesValArray[pageItemsArray[xcount].device_id]);	
						} else if (pageItemsArray[xcount].type == 1 | pageItemsArray[xcount].type == 9) {
							//$('#widgetid' + pageItemsArray[xcount].id).html(devicesValArray[pageItemsArray[xcount].device_id]);
						} else if (pageItemsArray[xcount].type == 14) {
							//$('#widgetid' + pageItemsArray[xcount].id).html(devicesValArray[pageItemsArray[xcount].device_id]);
							//bmv_i = devicesValArray[pageItemsArray[xcount].device_id];
						} else if (pageItemsArray[xcount].type == 30) {
							//widgetidJG[pageItemsArray[xcount].id].refresh(parseInt(devicesValArray[pageItemsArray[xcount].device_id])); 
						}
        			}
        		}
        	}
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
		for(j=0; j < pageItemsArray.length; j++){
		//for(j=0; j < 0; j++){
			pageItemA = pageItemsArray[j];
			if (pageItemA.device_id == ActionA[0]) {
			    if (pageItemA.type == 10 | pageItemA.type == 13){
					if(ActionA[2] == 0){
						$("#inputid"+pageItemA.id).prop("checked", false);
					}else{
						$("#inputid"+pageItemA.id).prop("checked", true);
					}
				} else if (pageItemA.type == 12){
						$("#widgetid"+pageItemA.id).jqxGauge({ value:ActionA[2] });
				} else if (pageItemA.type == 55){
						$("#widgetid"+pageItemA.id).jqxLinearGauge({ value:ActionA[2] });
				} else if (pageItemA.type == 14){
					if(ActionA[2] == 0){
						$("#widgetid"+pageItemA.id).jqxCheckBox({ checked:false });
					}else{
						$("#widgetid"+pageItemA.id).jqxCheckBox({ checked:true });
					}
				} else if (pageItemA.type == 16){
					if(ActionA[2] == 0){
						$("#widgetid"+pageItemA.id).jqxSwitchButton({ checked:false });
					}else{
						$("#widgetid"+pageItemA.id).jqxSwitchButton({ checked:true });
					}
				} else if (pageItemA.type == 17){
					if(ActionA[2] == 0){
						$("#lampid"+pageItemA.id).fadeOut();
					}else{
						$("#lampid"+pageItemA.id).fadeIn();
					}
				} else if (pageItemA.type == 18 | pageItemA.type == 19 | pageItemA.type == 20 | pageItemA.type == 21 |pageItemA.type == 22 | pageItemA.type == 23){
					if(ActionA[2] == 0){
						$("#widgetid"+pageItemA.id).prop("checked", false);
					}else{
						$("#widgetid"+pageItemA.id).prop("checked", true);
					}
				} else if (pageItemA.type == 37){
					if(ActionA[2] == 0){
						$("#lampid"+pageItemA.id).fadeOut();
					}else{
						$("#lampid"+pageItemA.id).fadeIn();
					}
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
    	if (configArray.length > 0)
			$.av.pop({
    	      title: 'Alert',
        	   message: 'Socket re-connected' +'<br>'+'connection restored'
      		});
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
	
	//  -- ActionClicked --
    window.ActionClicked = function (item_id) { 
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

