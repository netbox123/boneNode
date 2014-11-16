var	pagesArray = [];
var	pageItemsArray = [];
var actionsArray = [];
var	devicesArray = [];
var inputsArray = [];
var eventsArray = [];
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
var Vval = 0;
var Ival = 0;
var due_step = 0;
var curDate, curSec, curMin, curHour, secRot, minRot, hourRot;

var widgetidJG = [];

window.onload = function() {
    window.resizeTo(1024, 768);
	var sec     = document.getElementById('sec');
	var min     = document.getElementById('min');
	var hour    = document.getElementById('hour');
	var tmpRotValue  = "";
}

function initWindows() {
    for(pageNr=0; pageNr < pagesArray.length; pageNr++){
    	//console.log('page ' + pagesArray[j].id + ' ' + pagesArray[j].name);
		addPage(pageNr);
		for(pItemNr=0; pItemNr < pageItemsArray.length; pItemNr++){
			if (pageItemsArray[pItemNr].page_id == pagesArray[pageNr].id) {
				addPageItem(pItemNr,pageNr);
			}
		}
    }
    
    // Init menu's
	$("#jqxMenu").jqxMenu({ width: '100%', height: '22px', theme: 'custom'});
    $("#jqxMenu").css('visibility', 'visible');
	$("#jqxMenu").jqxMenu('disable', 'menuEitCut', true);
	// Init log window
	var box = $("#TextArea410");
    box.val(bootlog);
}

function addPage(pageNr){
	windoweventtarget = pagesArray[pageNr].id;
	var windowHTML = "";
	var windowVisible = "";
	if (pagesArray[pageNr].vis){windowVisible='windows-vis';}
	windowHTML += '<div id="window' + pagesArray[pageNr].id + '" class="window ' + windowVisible + '"  style=" left:'+pagesArray[pageNr].xpos+'px; top:'+pagesArray[pageNr].ypos+'px; width:'+pagesArray[pageNr].width+'px; height:23px">';
	windowHTML += ' 	<nav class="control-window">';
	windowHTML += '     <a class="close" onclick="menuWindow_closeOne(' + pagesArray[pageNr].id + ')">close</a>';
	windowHTML += '     <a class="minimize" onclick="windowMinimize(' + pagesArray[pageNr].id + ');">minimize</a>';
	windowHTML += '     <a class="maximize" onclick="windowMaximize(' + pagesArray[pageNr].id + ');">maximize</a>';
	windowHTML += '     </nav>';
	windowHTML += '     <div><h1 class="titleInside" id="titleInside' + pagesArray[pageNr].id + '">' + pagesArray[pageNr].name + '</h1></div>';
	windowHTML += '     <div id="containerInside' + pagesArray[pageNr].id + '" class="container" style="overflow:hidden; height:'+pagesArray[pageNr].height+'px;">';
	windowHTML += '     	<div class="container-inside">';
	windowHTML += '         </div>';
	windowHTML += '     </div>';
	windowHTML += ' </div>';

	$('#page').append(windowHTML);
	$('#window' + pagesArray[pageNr].id)
		.draggable({
			start: function(e, ui) {window_drag_start(e, ui);},
			stop: function(e, ui) {window_drag_stop(e, ui);},
		})
		.on({
			click: function (event) {
				var eventid = $(this).attr("id").substr(6);
				$(this).css("z-index", zordermax++);
				updateWindowInfo(eventid);
			}
		});
	
	$('#containerInside' + pagesArray[pageNr].id)
		.resizable({
			start: function(e, ui) {window_resize_start(e, ui);},
			stop: function(e, ui) {window_resize_stop(e, ui);}
		})
		.on({
			resize: function (e, ui) {
				window_resizing(e, ui);
			}
		});
}

function removePageItem(pItemID){
	$("#wrapid"+pItemID).remove();
}

function addPageItem(pItemNr, pageNr){
	if (pageItemsArray[pItemNr].type == 1) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark' style='font-size: 12pt;color: #555;'>0</div></label></div>");
	} else if (pageItemsArray[pItemNr].type == 2) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div style='text-align:center;' class='about-this'><p>"+pageItemsArray[pItemNr].name+"</p></div></div>");
	} else if (pageItemsArray[pItemNr].type == 3) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><p><a style='text-align:center; width:"+pageItemsArray[pItemNr].width+"px;' class='about-this button about' onclick='"+pageItemsArray[pItemNr].action+"'>"+pageItemsArray[pItemNr].name+"</a></p></div>");
	} else if (pageItemsArray[pItemNr].type == 4) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px; text-align:middle;'><ul style='width:"+pageItemsArray[pItemNr].width+"px;'><li style='text-align:center;'><strong>"+pageItemsArray[pItemNr].name+" </strong> "+pageItemsArray[pItemNr].action+"</li></ul></div>");
	} else if (pageItemsArray[pItemNr].type == 5) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div style='text-align:center; font-size:10px; color:#000;'><p>"+pageItemsArray[pItemNr].action+"</p></div></div>");
	} else if (pageItemsArray[pItemNr].type == 6) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:100%; height: 100%;height: -webkit-calc(100% - 34px);height: -moz-calc(100% - 34px);height: calc(100% - 34px);'><textarea style='padding:10px' class='serialTextAreaClass' id='TextArea"+pageItemsArray[pItemNr].id+"' >_</textarea></div>");
	} else if (pageItemsArray[pItemNr].type == 7) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><input type='text' id='input"+pageItemsArray[pItemNr].id+"'></input></div>");
	} else if (pageItemsArray[pItemNr].type == 8) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark' style='font-size: 13pt;color: #555;'><input type='text' id='input"+pageItemsArray[pItemNr].id+"'></input></div></label></div>");
	} else if (pageItemsArray[pItemNr].type == 9) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='widgetid"+pageItemsArray[pItemNr].id+"' style='text-align: right; font-family: digital-7_monoitalic; font-size: 13pt; font-weight: bold; color: #040edf;'>0</div</div>");
	} else if (pageItemsArray[pItemNr].type == 10) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'<label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark'><input style='border:1px red;' id='inputid"+pageItemsArray[pItemNr].id+"' height='30' width='55' type='checkbox' class='ios-switch green tinyswitch' checked /><div><div></div></div></div></label></div>")
		$("#inputid"+pageItemsArray[pItemNr].id).on('click', function (event) {var eventid = event.target.getAttribute('id').substr(7);ButtonClicked(2+'-'+eventid);}); 
		for(k=0; k < devicesArray.length; k++){	
			if(devicesArray[k].id == pageItemsArray[pItemNr].device_id) {
				if(devicesArray[k].val == 0){
					$("#inputid"+pageItemsArray[pItemNr].id).prop("checked", false);
				}else{
					$("#inputid"+pageItemsArray[pItemNr].id).prop("checked", true);
				}
			}
		}					
		
	} else if (pageItemsArray[pItemNr].type == 11) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark' style='font-size: 12pt;color: #555;'><p><a class='about-this button about' style='text-align:center;  width:85px;'  >"+pageItemsArray[pItemNr].action+"</a></p></div></label></div>");
	
	} else if (pageItemsArray[pItemNr].type == 12) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; bottom:0px; width:100%; height:"+pageItemsArray[pItemNr].height+"px;'><div class='inputButtonAreaClass'><div style='left:0px; position: absolute; padding-top:1px; padding-left:10px;'><input value='28=1' type='text' id='input"+pageItemsArray[pItemNr].id+"'></input></div><div style=' padding-top:3px; right:0px; width:140px; position: absolute;'><p><a style='text-align:center;' class='about-this button about' onclick='"+pageItemsArray[pItemNr].action+"'>"+pageItemsArray[pItemNr].name+"</a></p></div></div></div>");
	
	} else if (pageItemsArray[pItemNr].type == 13) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'<label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark'><input style='border:1px red;' id='inputid"+pageItemsArray[pItemNr].id+"' height='30' width='55' type='checkbox' class='ios-switch tinyswitch' checked /><div><div></div></div></div></label></div>")
		$("#inputid"+pageItemsArray[pItemNr].id).on('click', function (event) {var eventid = event.target.getAttribute('id').substr(7);ButtonClicked(2+'-'+eventid);}); 
		for(k=0; k < devicesArray.length; k++){	
			if(devicesArray[k].id == pageItemsArray[pItemNr].device_id) {
				if(devicesArray[k].val == 0){
					$("#inputid"+pageItemsArray[pItemNr].id).prop("checked", false);
				}else{
					$("#inputid"+pageItemsArray[pItemNr].id).prop("checked", true);
				}
			}
		}
	
	} else if (pageItemsArray[pItemNr].type == 14) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'></div>");
	
	} else if (pageItemsArray[pItemNr].type == 15) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'></div>");
	
		
	} else if (pageItemsArray[pItemNr].type == 17) {
		//console.log("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='widgetid"+pageItemsArray[pItemNr].id+"' /><div class='transpbut' id='wraptopid"+pageItemsArray[pItemNr].id+"' style=' left: -2px; top:-2px; width:32px; height:32px;'></div></div>");
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='widgetid"+pageItemsArray[pItemNr].id+"' /><div class='transpbut' id='wraptopid"+pageItemsArray[pItemNr].id+"' style=' left: -2px; top:-2px; width:32px; height:32px;'></div></div>");
		$("#widgetid"+pageItemsArray[pItemNr].id).jqxCheckBox({ width: pageItemsArray[pItemNr].width, height: pageItemsArray[pItemNr].height });  
		$("#wraptopid"+pageItemsArray[pItemNr].id).on('click', function (event) {
			//console.log(event.target.getAttribute('id')); 
			var eventid = event.target.getAttribute('id').substr(9);
			ButtonClicked(2+'-'+eventid);
			//console.log('ButtonClicked ='+$(this).attr("id"));
		});  
		for(k=0; k < devicesArray.length; k++){	
			if( devicesArray[k].id == pageItemsArray[pItemNr].device_id) {
				if(devicesArray[k].val == 0){
					$("#widgetid"+pageItemsArray[pItemNr].id).jqxCheckBox({ checked:false });
				}else{
					$("#widgetid"+pageItemsArray[pItemNr].id).jqxCheckBox({ checked:true });
				}
			}
		} 
	} else if (pageItemsArray[pItemNr].type == 30) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='widgetid"+pageItemsArray[pItemNr].id+"' style='width:100px; height:80px'></div></div>");
		widgetidJG[pageItemsArray[pItemNr].id] = new JustGage({
			id: "widgetid"+pageItemsArray[pItemNr].id, 
			value: 100, 
			min: 0,
			max: 50,
			title: pageItemsArray[pItemNr].name,
			valueFontColor :"#111111",
			label: "",
			shadowOpacity: 1,
			shadowSize: 0,
			shadowVerticalOffset: 10
		}); 	
	} else if (pageItemsArray[pItemNr].type == 99) {
	$('#containerInside' + pagesArray[pageNr].id).append("<div class='bkg-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><img draggable='false' src='images/"+pageItemsArray[pItemNr].action+"' ></div>");
	}	
	
	$("#wrapid"+pageItemsArray[pItemNr].id)
		.draggable({ 
			start: function(e) {item_drag_start(e);},
			stop: function(e) {item_drag_stop(e);}
		})
		.on({
			click: function (event) {
			var eventid = $(this).attr("id").substr(6);
			//console.log('eventid ' + eventid); 
			updateItemInfo(eventid);
			itemClicked(eventid);
			}
		});
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
    setInterval(function() {getSerialText();}, 1000);
   
    function getSerialText(){
    	socket.emit('getserialtext', function(){ })	
    };

    function getAllValues(){
        socket.emit('getallvalues', function(){	})	
    };
    
    function SendFirst(){
        var randomnumber=100+Math.floor(Math.random()*901)
        socket.emit('new user', 'WebClient' + randomnumber , function(data){
			if(data){
				//$('#nickWrap').hide();
				//$('#contentWrap').show();
			} else{
				//$nickError.html('That username is already taken!  Try again.');
			}
    	})	
    };
    
    window.SendServerCommand = function (serverscript){
        socket.emit('sendservercommand', serverscript , function(data){
    		if(data){
				
			} else{
				
			}
    	})	
    };
    
    window.SendAction = function (buttonid){
        var actionid = buttonid - 5000;
        socket.emit('sendaction', actionid , function(data){
        	if(data){
				
			} else{
				
			}
    	})	
    };
	
	window.SendDueSerial = function (serialText){
        socket.emit('senddueserial', serialText , function(data){
        	if(data){
				
			} else{
				
			}
    	})	
    };
    
    window.SaveWindow = function (ItemData){
        socket.emit('savewindow', ItemData , function(data){
        	if(data){
				
			} else{
				
			}
    	})	
    };
    
    //  -- Save PageItem to server --
    window.SaveItem = function (ItemData){
        socket.emit('saveitem', ItemData , function(data){
        	if(data){
			} else{
			}
    	})	
    };

    //  -- New PageItem to server --
    window.NewItem = function (ItemData){
        socket.emit('newitem', ItemData , function(data){
        	if(data){
			} else{
			}
    	})	
    };
    
    //  -- Delete PageItem to server --
    window.DeleteItem = function (ItemID){
        socket.emit('deleteitem', ItemID , function(data){
        	if(data){
			} else{
			}
    	})	
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
	
	//  -- Receiving events list from server --
	socket.on('events', function(data){
		eventsArray = [];
		for(i=0; i < data.length; i++){
			eventsArray.push(data[i]); 
		}
		console.log('events: ' + eventsArray.length );
		bootlog = 'events: ' + eventsArray.length + "\r" + bootlog;
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
        $.av.pop({
            title: data.title,
            message: data.address +'<br>'+data.msg+' '
        });
        var box = $("#TextArea410");
        box.val(data.nick + " " + data.title + " " + data.msg + "\n" + box.val());
        console.log(data.nick + " " + data.title + " " + data.msg);
	});
	
	//  -- Receiving windowUpdate from server --
	socket.on('windowUpdate', function(data){
        //console.log('windowUpdate data '+data.msg.name);
        var windowItemA = [];
        //console.log('data.id '+ data.msg.name);
        for(j=0; j < pagesArray.length; j++){
            windowItemA = pagesArray[j];
              if(windowItemA.id == data.msg.id){
              	  //console.log('data.id '+ data.msg.id + '>>' + parseInt(data.msg.xpos) + '>>' + parseInt(data.msg.ypos) );
                  pagesArray[j].xpos = parseInt(data.msg.xpos);
                  pagesArray[j].ypos = parseInt(data.msg.ypos);
                  pagesArray[j].name = data.msg.name;
		          pagesArray[j].width = parseInt(data.msg.width);
		          pagesArray[j].height = parseInt(data.msg.height);
		          pagesArray[j].vis = data.msg.vis;
              }
        }
        if (data.msg.maxi){
     		$("#window" + data.msg.id).css({top: 23, left: 0,width: 1025});
        	$("#containerInside" + data.msg.id).css({height: 768});
        } else {
        	$("#window" + data.msg.id).css({top: parseInt(data.msg.ypos), left: parseInt(data.msg.xpos),width: parseInt(data.msg.width)});
        	$("#containerInside" + data.msg.id).css({height: parseInt(data.msg.height)});
        }
        
        if (data.msg.vis){
        	 menuWindow_openOne(data.msg.id)
        } else {
        	menuWindow_closeOne(data.msg.id)
        }
        $("titleInside" + data.msg.id).text(data.msg.name);
	});

	//  -- Receiving itemNew from server --
	socket.on('itemNew', function(data){
        console.log('itemNew name '+data.msg.name);
        console.log('itemNew id '+data.msg.id);
        console.log('itemNew page_id '+data.msg.page_id);
        pageItemsArray.push(data.msg);
        for(j=0; j < pagesArray.length; j++){
        	if(pagesArray[j].id == data.msg.page_id){
        	addPageItem(pageItemsArray.length-1, j);
        	}
        }
	});
	
	//  -- Receiving itemDelete from server --
	socket.on('itemDelete', function(data){
		var index;
        console.log('itemDelete id '+data.msg);
        for(j=0; j < pageItemsArray.length; j++){
		    if(pageItemsArray[j].id == data.msg){
		        index=j;
		    }
        }
        pageItemsArray.splice(index, 1);
        removePageItem(parseInt(data.msg));
	});
	
	//  -- Receiving itemUpdate from server --
	socket.on('itemUpdate', function(data){
        //console.log('itemUpdate data '+data.msg.name);
        var itemItemA = [];
        //console.log('data.id '+ data.msg.name);
        for(j=0; j < pageItemsArray.length; j++){
            itemItemA = pageItemsArray[j];
              if(itemItemA.id == data.msg.id){
              	  //console.log('data.id '+ data.msg.id + '>>' + parseInt(data.msg.xpos) + '>>' + parseInt(data.msg.ypos) );
                   pageItemsArray[j].xpos = parseInt(data.msg.xpos);
                   pageItemsArray[j].ypos = parseInt(data.msg.ypos);
                   pageItemsArray[j].name = data.msg.name;
		           pageItemsArray[j].width = parseInt(data.msg.width);
		           pageItemsArray[j].height = parseInt(data.msg.height);
		           pageItemsArray[j].type = data.msg.type;
		           pageItemsArray[j].device_id = parseInt(data.msg.device_id);
		           pageItemsArray[j].page_id = parseInt(data.msg.page_id);
		           pageItemsArray[j].action = data.msg.action;
              }
        }
		$("#wrapid" + data.msg.id).css({top: parseInt(data.msg.ypos), left: parseInt(data.msg.xpos)});
	});

	
//  -- Receiving allvalues from server --
	socket.on('sendallvalues', function(data){
        var ValuesA = [];
        var OneValueA = [];
		//console.log('data'+data.msg);
		ValuesA  = data.msg.split('*');
        var datetime = new Date();
        
        
        for(j=0; j < pagesArray.length; j++){
    		//console.log('pagesArray ' + pagesArray[j].id + ' ' + pagesArray[j].name);
        	if (pagesArray[j].vis | pagesArray[j].id == 0){
        		
        		
        		for(xcount=0; xcount < pageItemsArray.length; xcount++){
					
        			if (pageItemsArray[xcount].page_id == pagesArray[j].id){
        				//console.log('pagesArray ' + pagesArray[j].id + ' ' + pagesArray[j].name+ ' ' + pageItemsArray[xcount].name);
        				//console.log('pagesArray ' + pagesArray[j].id + ' ' + pagesArray[j].name+ ' >>' + pageItemsArray[xcount].name);
        				for(k=0; k < ValuesA.length-1; k++){
            				OneValueA  = ValuesA[k].split('#');
            				if (OneValueA[0] == pageItemsArray[xcount].device_id){
            					//$("#widgetid1002").html(OneValueA[1]);
            					//console.log(pageItemsArray[xcount].device_id);
            					if (pageItemsArray[xcount].type == 0) {
									$('#widgetid' + pageItemsArray[xcount].id).html(OneValueA[1]);
								
								} else if (pageItemsArray[xcount].type == 1 | pageItemsArray[xcount].type == 9) {
									$('#widgetid' + pageItemsArray[xcount].id).html(OneValueA[1]);
									
				
								} else if (pageItemsArray[xcount].type == 30) {
									 widgetidJG[pageItemsArray[xcount].id].refresh(parseInt(OneValueA[1]));
									 //console.log('#widgetid' + pageItemsArray[xcount].id + ' ' + parseInt(OneValueA[1]));
									 
								}
            					
            				
            				}
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
						$("#widgetid"+pageItemA.id).jqxCheckBox({ checked:false });
					}else{
						$("#widgetid"+pageItemA.id).jqxCheckBox({ checked:true });
					}
				} else if (pageItemA.type == 18 | pageItemA.type == 19 | pageItemA.type == 20 | pageItemA.type == 21 |pageItemA.type == 22 | pageItemA.type == 23){
					if(ActionA[2] == 0){
						$("#widgetid"+pageItemA.id).prop("checked", false);
					}else{
						$("#widgetid"+pageItemA.id).prop("checked", true);
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
    
    //  -- Receiving pageitem change from server --
	socket.on('pageitem change', function(data){
	//alert('e'+data.id);
        var pageItemA = [];
        var pageItemNr = 0;
        //console.log('data.id '+data.id);
        for(j=0; j < pageItemsArray.length; j++){
            pageItemA = pageItemsArray[j];
              if(pageItemA.id == data.id){
                  pageItemA.xpos = data.xpos;
                  pageItemA.ypos = data.ypos;
                  pageItemNr = j;
              }
        }
        $("#wrapid" + data.id).css({top: data.ypos, left: data.xpos});
        //alert(data.id+'-'+data.xpos+'-'+data.ypos)
	});
	
	//  -- Client disconnected --
    socket.on('disconnect', function(data){
		    aid = $.av.pop({
            mode: 'alert',
            template: 'error',
            title: 'testing',
            expire: 0,
            message: 'Disconnected<br>test'
         });
         //socket.connect;
	 });
     
    //  -- Client connected --
    socket.on('connect', function(data){
		    $.av.hide(aid);  
	 });
    
    //  -- sendQuery --
    window.sendQuery = function(queryString, recid, rectype, recX, recY, name) { 
    	//alert('sendQuery'+queryString);
         socket.emit('send query', {msg: queryString, id: recid, type: rectype, xpos: recX, ypos: recY, name: name});  
	}
    
    
    //  -- ButtonClicked --
    window.ButtonClicked = function (actionString) { 
        
    var actionStr = [];
    var pageItemA = [];
    var actionStr  = actionString.split('-');
      
    for(j=0; j < pageItemsArray.length; j++){if (pageItemsArray[j].id == actionStr[1]){var pageItemnr = j;}}
           
      
      if (iseditmode){
          for(j=0; j < pageItemsArray.length; j++){
            pageItemA = pageItemsArray[j];
            if (pageItemA.id == actionStr[3].substr(3)){
                pageItemnr = j;  
            }
           }
           //alert('edit mode '+actionString+'   '+actionStr[3]+'   '+pageItemnr);
           $("#pageItemPanel").css({top: (pageItemsArray[pageItemnr].ypos), left: (pageItemsArray[pageItemnr].xpos+pageItemsArray[pageItemnr].width)});
           //$("#pageItemPanel").show();
      }else{
     //console.log(actionString);
        if (actionStr[0] == 1) {
            socket.emit('send action', actionString);
        } else if (actionStr[0] == 2) {
            // type=2 : button
            socket.emit('send action', pageItemsArray[pageItemnr].device_id+'-'+pageItemsArray[pageItemnr].action);
        } else if (actionStr[0] == 3) {
            // type=3 : Pagelink
            var offset = 20; //Offset of 20px
            $('html, body').animate({
                scrollTop: $("#"+actionStr[1]).offset().top + offset
            }, 2000);
        }


      } 	
	}
});
