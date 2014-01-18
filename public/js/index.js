var	pagesArray = [];
var	pageItemsArray = [];
var	devicesArray = [];
var inputsArray = [];
var iseditmode = 0;
var iseditbkgmode = 0; 
var dragstartx = 0;
var dragstarty = 0;
var aid = [];

function drag_start(ev) {
	if (iseditmode){
		$("#pageItemPanel").hide();
		event.dataTransfer.effectAllowed='move';
		dragstartx = ev.clientX;
		dragstarty = ev.clientY;
		//alert('id '+ev.target.getAttribute('id'));
		ev.dataTransfer.setData("text/plain", ev.target.getAttribute('id'));
	}else{
		event.dataTransfer.effectAllowed='none';
	}
}

function drag_over(event) {
	event.preventDefault();
}

function drop(event) {
	if (iseditmode){
		event.preventDefault();
		var data = event.dataTransfer.getData("Text");
		var query_str = "";

		//alert(pageItemsArray[data.substr(6)].id);
		query_str += "UPDATE  `nodesql`.`page_items_ini` SET  ";
		query_str += "`xpos` =  '"+(pageItemsArray[data.substr(6)].xpos+event.clientX-dragstartx)+"', `ypos` =  '"+(pageItemsArray[data.substr(6)].ypos+event.clientY-dragstarty)+"' ";
		query_str += " WHERE  `page_items_ini`.`id` ="+pageItemsArray[data.substr(6)].id;
		sendQuery(query_str, pageItemsArray[data.substr(6)].id, 'page_items_ini', pageItemsArray[data.substr(6)].xpos+event.clientX-dragstartx, pageItemsArray[data.substr(6)].ypos+event.clientY-dragstarty);     
	}
}

window.onload = function() {
    		var sec     = document.getElementById('sec');
            var min     = document.getElementById('min');
            var hour    = document.getElementById('hour');
            var tmpRotValue  = "";
            window.resizeTo(1024, 768);

}


            var curDate, curSec, curMin, curHour, secRot, minRot, hourRot;

            function setRotation(elem, degrees) {
                tmpRotValue = "rotate(" + degrees + "deg)";
                elem.setAttribute(
                "style",
                "-webkit-transform:"+tmpRotValue+"; -moz-transform:"+tmpRotValue+"; -ms-transform:"+tmpRotValue+"; -o-transform:"+tmpRotValue+"; transform:"+tmpRotValue+";" 
                );
            }

function tick(curDate) {
      // get the current date and time:
      //curDate = new Date();
      // split up:
      curSec   = curDate.getSeconds();
      curMin   = curDate.getMinutes();
      curHour  = curDate.getHours();
      // make sure, the hour is in the range of [0..11] and not in [12..23]
      if ( curHour > 11 ) {
         curHour -= 12;
      }
      // calculate the rotations per hand:
      secRot   = curSec * 6;     // 360�/60sec = 6� per second
      minRot   = curMin * 6;     // 360�/60min = 6� per minute
      hourRot  = curHour * 30 + curMin/2;   // 360�/12hours = 30� per hour
      // apply rotations:
      setRotation(sec,  secRot);
      setRotation(min,  minRot);
      setRotation(hour, hourRot);
}
   

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function ControlPageLoad() {
	var pageItemA = [];
	for(j=0; j < pageItemsArray.length; j++){
		pageItemA = pageItemsArray[j];
		if (pageItemA.type == 10) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input type='button' value='Button' id='widgetid"+j+"' /></div>");
			$("#widgetid"+j).jqxButton({ width: pageItemA.width, height: pageItemA.height, theme: 'bootstrap'}); 
			$("#widgetid"+j).bind('click', function (event) {window.open ("http://192.168.1.41:4000/","BoneNode","menubar=0,location=0,toolbar=0,resizable=0,width=1024,height=768");});
		 } else if (pageItemA.type == 11) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+j+"' /></div>");
			$("#widgetid"+j).jqxSlider({theme: 'bootstrap'});
			$("#widgetid"+j).bind('click', function (event) {alert('Button '+pageItemA.id+' is Clicked');});                 
		 } else if (pageItemA.type == 12) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+j+"' /></div>");
			$("#widgetid"+j).jqxGauge({
				ranges: [{ startValue: 0, endValue: 55, style: { fill: '#C9C9C9', stroke: '#C9C9C9' }, endWidth: 5, startWidth: 1 },
							{ startValue: 55, endValue: 110, style: { fill: '#FCF06A', stroke: '#FCF06A' }, endWidth: 10, startWidth: 5 },
							{ startValue: 110, endValue: 165, style: { fill: '#FCA76A', stroke: '#FCA76A' }, endWidth: 15, startWidth: 10 },
							{ startValue: 165, endValue: 220, style: { fill: '#FC6A6A', stroke: '#FC6A6A' }, endWidth: 20, startWidth: 15}],
				ticksMinor: { interval: 5, size: '5%' },
				ticksMajor: { interval: 10, size: '9%' },
				value: 0,
				colorScheme: 'scheme03',
				animationDuration: 1200
			});
		 } else if (pageItemA.type == 13) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+j+"' /></div>");
			$("#widgetid"+j).jqxLinearGauge({
				max: 70,
				min: 0,
				pointer: { size: '5%' },
				colorScheme: 'scheme02',
				ticksMajor: { size: '10%', interval: 10 },
				ticksMinor: { size: '5%', interval: 2.5, style: { 'stroke-width': 1, stroke: '#aaaaaa'} },
				ranges: [
				{ startValue: 20, endValue: 45, style: { fill: '#FFA200', stroke: '#FFA200'} },
				{ startValue: 45, endValue: 70, style: { fill: '#FF4800', stroke: '#FF4800'}}],
				value: 0, theme: 'bootstrap'
			});
		 } else if (pageItemA.type == 14) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+j+"' /></div>");
			$("#widgetid"+j).jqxCheckBox({ width: pageItemA.width, height: pageItemA.height}); 
		 } else if (pageItemA.type == 15) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+j+"' /></div>");
			$("#widgetid"+j).jqxCalendar({ width: pageItemA.width, height: pageItemA.height});
		 } else if (pageItemA.type == 16) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+j+"' /></div>");
			$("#widgetid"+j).jqxSwitchButton({ width: pageItemA.width, height: pageItemA.height, checked: true, theme: 'bootstrap'});
			//$("#widgetid"+j).on('change', function (event) {ButtonClicked(pageItemA.type+'-'+pageItemA.action+'-'+pageItemA.device_id+'-'+pageItemA.id);}); 
		 } else if (pageItemA.type == 17) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+j+"' /><div class='transpbut' id='wraptopid"+j+"' style=' left: -2px; top:-2px; width:32px; height:32px;'></div></div>");
			$("#widgetid"+j).jqxCheckBox({ width: pageItemA.width, height: pageItemA.height});  
			$("#wraptopid"+j).on('click', function (event) {
			var eventid = event.target.getAttribute('id').substr(9);
			ButtonClicked(pageItemA.type+'-'+pageItemsArray[eventid].action+'-'+pageItemsArray[eventid].device_id+'-'+pageItemsArray[eventid].id);
			});  
			for(k=0; k < devicesArray.length; k++){	
		 		if(pageItemA.device_id == devicesArray[k].id){
		 			if(devicesArray[k].val == 0){
						$("#widgetid"+j).jqxCheckBox({ checked:false });
					}else{
						$("#widgetid"+j).jqxCheckBox({ checked:true });
					}
				}
			 }              
		 } else if (pageItemA.type == 18) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+j+"' height='30' width='55' type='checkbox' class='ios-switch green  bigswitch' checked /><div><div></div></div>");
		} else if (pageItemA.type == 19) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+j+"' height='30' width='55' type='checkbox' class='ios-switch  bigswitch' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 20) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+j+"' height='30' width='55' type='checkbox' class='ios-switch green' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 21) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+j+"' height='30' width='55' type='checkbox' class='ios-switch' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 22) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+j+"' height='30' width='55' type='checkbox' class='ios-switch green tinyswitch' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 23) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+j+"' height='30' width='55' type='checkbox' class='ios-switch tinyswitch' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 24) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_pref+"</div>");
			init_window_pref();
		 } else if (pageItemA.type == 25) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_log+"</div>");
			init_window_log();
		 } else if (pageItemA.type == 26) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_input_key+"</div>");
			init_window_input_key();

		 } else if (pageItemA.type == 99) {
			$('#ControlPage').append("<div class='bkg-wrap' id='wrapid"+j+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><img draggable='false' src='images/"+pageItemA.action+"' ></div>");

		 }
	}
};


	
jQuery(function($){
	var socket = io.connect();
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $users = $('#users');
	var $messageForm = $('#send-message');
	var $messageBox = $('#message');
    
    
    SendFirst();   
    setInterval(function() {getallvalues();}, 1000);
   
    function getallvalues(){
        socket.emit('getallvalues', function(){	})	
    };
    
    function SendFirst(){
        var randomnumber=Math.floor(Math.random()*1001)
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
				//$('#nickWrap').hide();
				//$('#contentWrap').show();
			} else{
				//$nickError.html('That username is already taken!  Try again.');
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
	
	//  -- Receiving device list from server --
	socket.on('devices', function(data){
		devicesArray = [];
		for(i=0; i < data.length; i++){
			//console.log(data[i].id+' - '+data[i].val);
			devicesArray.push(data[i]); 
		}
	});
    
    //  -- Receiving device list from server --
	socket.on('inputs', function(data){
		inputsArray = [];
		for(i=0; i < data.length; i++){
			//console.log(data[i].id+' - '+data[i].val);
			inputsArray.push(data[i]); 
		}
	});

	//  -- Receiving page list from server --	
	socket.on('pages', function(data){
	    pagesArray = [];
		for(i=0; i < data.length; i++){
			//pagesA  = data[i].split(';');
			pagesArray.push(data[i]);
		}
	});
	
	//  -- Receiving pageitem list from server --	
	socket.on('pageitems', function(data){
		pageItemsArray = [];
		for(i=0; i < data.length; i++){
			pageItemsArray.push(data[i]);
		}
		// Update page
        ControlPageLoad();
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
            message: data.timeText +'<br>'+data.nick+' '+data.data
        });
        var box = $("#logtextarea");
        box.val(data.nick + data.msg + "\n" + box.val());
	});
    
    //  -- Receiving allvalues from server --
	socket.on('sendallvalues', function(data){
        var ValuesA = [];
        var OneValueA = [];
		//console.log('data'+data.msg);
		ValuesA  = data.msg.split('*');
        var datetime = new Date();
        for(j=0; j < ValuesA.length-1; j++){
            //console.log('ValuesA '+j+' '+ValuesA[j]);
            OneValueA  = ValuesA[j].split('#');
            if (OneValueA[0] == '1002'){$("#widgetid1002").html(Number(OneValueA[1]).toFixed(1));}
            if (OneValueA[0] == '1003'){$("#widgetid1003").html(OneValueA[1]);}
            if (OneValueA[0] == '1004'){$("#widgetid1004").html(OneValueA[1]);}
            if (OneValueA[0] == '1005'){datetime.setTime(OneValueA[1]);tick(datetime);}

        }
        
	});
	
	//  -- Receiving device change from server --
	socket.on('device change', function(data){
		var ActionA = [];
		var pageItemA = [];
		//console.log('data'+data);
		ActionA  = data.split('-');
		for(j=0; j < pageItemsArray.length; j++){
			pageItemA = pageItemsArray[j];
			if (pageItemA.device_id == ActionA[0]) {
			    if (pageItemA.type == 11){
						$("#widgetid"+j).jqxSlider({ value:ActionA[2] });
				} else if (pageItemA.type == 12){
						$("#widgetid"+j).jqxGauge({ value:ActionA[2] });
				} else if (pageItemA.type == 13){
						$("#widgetid"+j).jqxLinearGauge({ value:ActionA[2] });
				} else if (pageItemA.type == 14){
					if(ActionA[2] == 0){
						$("#widgetid"+j).jqxCheckBox({ checked:false });
					}else{
						$("#widgetid"+j).jqxCheckBox({ checked:true });
					}
				} else if (pageItemA.type == 16){
					if(ActionA[2] == 0){
						$("#widgetid"+j).jqxSwitchButton({ checked:false });
					}else{
						$("#widgetid"+j).jqxSwitchButton({ checked:true });
					}
				} else if (pageItemA.type == 17){
					if(ActionA[2] == 0){
						$("#widgetid"+j).jqxCheckBox({ checked:false });
					}else{
						$("#widgetid"+j).jqxCheckBox({ checked:true });
					}
				} else if (pageItemA.type == 18 | pageItemA.type == 19 | pageItemA.type == 20 | pageItemA.type == 21 |pageItemA.type == 22 | pageItemA.type == 23){
					if(ActionA[2] == 0){
						$("#widgetid"+j).prop("checked", false);
					}else{
						$("#widgetid"+j).prop("checked", true);
					}
				}
			}
		}
	});
    
    //  -- Receiving input change from server --
	socket.on('input change', function(data){
		var ActionA = [];
		console.log('data'+data);
		ActionA  = data.split('-');
		if(ActionA[2] == 0){
	        $("#widgetid"+ActionA[0]).prop("checked", false);
		}else{
		    $("#widgetid"+ActionA[0]).prop("checked", true);
		}
	});
    
    //  -- Receiving pageitem change from server --
	socket.on('pageitem change', function(data){
	//alert('pageitem change'+data.id);
        var pageItemA = [];
        var pageItemNr = 0;
        for(j=0; j < pageItemsArray.length; j++){
            pageItemA = pageItemsArray[j];
              if(pageItemA.id == data.id){
                  pageItemA.xpos = data.xpos;
                  pageItemA.ypos = data.ypos;
                  pageItemNr = j;
              }
        }
        $("#wrapid" + pageItemNr).css({top: data.ypos, left: data.xpos});
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
    window.sendQuery = function(queryString, recid, rectype, recX, recY) { 
    	//alert('sendQuery'+queryString);
         socket.emit('send query', {msg: queryString, id: recid, type: rectype, xpos: recX, ypos: recY});
         
         
	}
    
    
    //  -- ButtonClicked --
    window.ButtonClicked = function (actionString) { 
      var actionStr = [];
      var pageItemA = [];
      var pageItemnr = 0;
      actionStr  = actionString.split('-');
      
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
     
        if (actionStr[0] == 1) {
            socket.emit('send action', actionString);
        } else if (actionStr[0] == 2) {
            // type=2 : button
            socket.emit('send action', actionString);
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
