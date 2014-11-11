var	pagesArray = [];
var	pageItemsArray = [];
var actionsArray = [];
var	devicesArray = [];
var inputsArray = [];
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
    for(j=0; j < pagesArray.length; j++){
    	//console.log('page ' + pagesArray[j].id + ' ' + pagesArray[j].name);
    	windoweventtarget = pagesArray[j].id;
    	var windowHTML = "";
    	var windowVisible = "";
    	if (pagesArray[j].vis){windowVisible='windows-vis';}
		windowHTML += '<div id="window' + pagesArray[j].id + '" class="window ' + windowVisible + '"  style=" left:'+pagesArray[j].xpos+'px; top:'+pagesArray[j].ypos+'px; width:'+pagesArray[j].width+'px; height:23px">';
		windowHTML += ' 	<nav class="control-window">';
		windowHTML += '     <a class="close" onclick="menuWindow_closeOne(' + pagesArray[j].id + ')">close</a>';
		windowHTML += '     <a class="minimize" onclick="windowMinimize(' + pagesArray[j].id + ');">minimize</a>';
		windowHTML += '     <a class="maximize" onclick="windowMaximize(' + pagesArray[j].id + ');">maximize</a>';
		windowHTML += '     </nav>';
		windowHTML += '     <div><h1 class="titleInside" id="titleInside' + pagesArray[j].id + '">' + pagesArray[j].name + '</h1></div>';
		windowHTML += '     <div id="containerInside' + pagesArray[j].id + '" class="container" style="overflow:hidden; height:'+pagesArray[j].height+'px;">';
		windowHTML += '     	<div class="container-inside">';
		windowHTML += '         </div>';
		windowHTML += '     </div>';
		windowHTML += ' </div>';

    	$('#page').append(windowHTML);
		$('#window' + pagesArray[j].id)
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
    	
    	$('#containerInside' + pagesArray[j].id)
    		.resizable({
        		start: function(e, ui) {window_resize_start(e, ui);},
        		stop: function(e, ui) {window_resize_stop(e, ui);}
    		})
    		.on({
    			resize: function (e, ui) {
    				//var eventid = $(this).attr("id").substr(6);
					window_resizing(e, ui);
    			}
    		});

    	var xcount;
		var pageItemA = [];
    	//console.log('count '+pageItemsArray.length);
		for(xcount=0; xcount < pageItemsArray.length; xcount++){
			pageItemA = pageItemsArray[xcount];
			//console.log(xcount+' '+pageItemsArray[xcount].id+' '+pageItemsArray[xcount].type);
			if (pageItemA.page_id == pagesArray[j].id) {
				if (pageItemA.type == 1) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemA.name+"</span><div id='widgetid"+pageItemA.id+"' class='tasks-list-mark' style='font-size: 12pt;color: #555;'>0</div></label></div>");
				} else if (pageItemA.type == 2) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div style='text-align:center;' class='about-this'><p>"+pageItemA.name+"</p></div></div>");
				} else if (pageItemA.type == 3) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><p><a style='text-align:center; width:"+pageItemA.width+"px;' class='about-this button about' onclick='"+pageItemA.action+"'>"+pageItemA.name+"</a></p></div>");
				} else if (pageItemA.type == 4) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px; text-align:middle;'><ul style='width:"+pageItemA.width+"px;'><li style='text-align:center;'><strong>"+pageItemA.name+" </strong> "+pageItemA.action+"</li></ul></div>");
				} else if (pageItemA.type == 5) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div style='text-align:center; font-size:10px; color:#000;'><p>"+pageItemA.action+"</p></div></div>");
				} else if (pageItemA.type == 6) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:100%; height: 100%;height: -webkit-calc(100% - 34px);height: -moz-calc(100% - 34px);height: calc(100% - 34px);'><textarea style='padding:10px' class='serialTextAreaClass' id='TextArea"+pageItemA.id+"' >_</textarea></div>");
				} else if (pageItemA.type == 7) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input type='text' id='input"+pageItemA.id+"'></input></div>");
				} else if (pageItemA.type == 8) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemA.name+"</span><div id='widgetid"+pageItemA.id+"' class='tasks-list-mark' style='font-size: 13pt;color: #555;'><input type='text' id='input"+pageItemA.id+"'></input></div></label></div>");
				} else if (pageItemA.type == 9) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' style='text-align: right; font-family: digital-7_monoitalic; font-size: 13pt; font-weight: bold; color: #040edf;'>0</div</div>");
				} else if (pageItemA.type == 10) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'<label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemA.name+"</span><div id='widgetid"+pageItemA.id+"' class='tasks-list-mark'><input style='border:1px red;' id='inputid"+pageItemA.id+"' height='30' width='55' type='checkbox' class='ios-switch green tinyswitch' checked /><div><div></div></div></div></label></div>")
					$("#inputid"+pageItemA.id).on('click', function (event) {var eventid = event.target.getAttribute('id').substr(7);ButtonClicked(2+'-'+eventid);}); 
					
					
				} else if (pageItemA.type == 11) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemA.name+"</span><div id='widgetid"+pageItemA.id+"' class='tasks-list-mark' style='font-size: 12pt;color: #555;'><p><a class='about-this button about' style='text-align:center;  width:85px;'  >"+pageItemA.action+"</a></p></div></label></div>");
	
				} else if (pageItemA.type == 12) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; bottom:0px; width:100%; height:"+pageItemA.height+"px;'><div class='inputButtonAreaClass'><div style='left:0px; position: absolute; padding-top:1px; padding-left:10px;'><input value='28=1' type='text' id='input"+pageItemA.id+"'></input></div><div style=' padding-top:3px; right:0px; width:140px; position: absolute;'><p><a style='text-align:center;' class='about-this button about' onclick='"+pageItemA.action+"'>"+pageItemA.name+"</a></p></div></div></div>");

				} else if (pageItemA.type == 13) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'<label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemA.name+"</span><div id='widgetid"+pageItemA.id+"' class='tasks-list-mark'><input style='border:1px red;' id='inputid"+pageItemA.id+"' height='30' width='55' type='checkbox' class='ios-switch tinyswitch' checked /><div><div></div></div></div></label></div>")
					$("#inputid"+pageItemA.id).on('click', function (event) {var eventid = event.target.getAttribute('id').substr(7);ButtonClicked(2+'-'+eventid);}); 

	
				} else if (pageItemA.type == 14) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'></div>");

				} else if (pageItemA.type == 15) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'></div>");

					
				} else if (pageItemA.type == 17) {
					//console.log("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /><div class='transpbut' id='wraptopid"+pageItemA.id+"' style=' left: -2px; top:-2px; width:32px; height:32px;'></div></div>");
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /><div class='transpbut' id='wraptopid"+pageItemA.id+"' style=' left: -2px; top:-2px; width:32px; height:32px;'></div></div>");
					$("#widgetid"+pageItemA.id).jqxCheckBox({ width: pageItemA.width, height: pageItemA.height });  
					$("#wraptopid"+pageItemA.id).on('click', function (event) {
						//console.log(event.target.getAttribute('id')); 
						var eventid = event.target.getAttribute('id').substr(9);
						ButtonClicked(2+'-'+eventid);
						//console.log('ButtonClicked ='+$(this).attr("id"));
					});  
					for(k=0; k < devicesArray.length; k++){	
						if( devicesArray[k].id == pageItemA.device_id) {
							if(devicesArray[k].val == 0){
								$("#widgetid"+pageItemA.id).jqxCheckBox({ checked:false });
							}else{
								$("#widgetid"+pageItemA.id).jqxCheckBox({ checked:true });
							}
						}
					} 
				} else if (pageItemA.type == 30) {
					$('#containerInside' + pagesArray[j].id).append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' style='width:100px; height:80px'></div></div>");
					widgetidJG[pageItemA.id] = new JustGage({
				    	id: "widgetid"+pageItemA.id, 
					    value: 100, 
					    min: 0,
					    max: 50,
			  			title: pageItemA.name,
						valueFontColor :"#111111",
					    label: "",
					    shadowOpacity: 1,
			    		shadowSize: 0,
			    		shadowVerticalOffset: 10
					}); 	
				} else if (pageItemA.type == 99) {
				$('#containerInside' + pagesArray[j].id).append("<div class='bkg-wrap' id='wrapid"+pageItemA.id+"' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><img draggable='false' src='images/"+pageItemA.action+"' ></div>");
				}	
				
				$("#wrapid"+pageItemA.id)
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

function ControlPageLoad() {
    var xcount;
	var pageItemA = [];
    //console.log('count '+pageItemsArray.length);
	for(xcount=0; xcount < pageItemsArray.length; xcount++){
		pageItemA = pageItemsArray[xcount];
		//console.log(xcount+' '+pageItemsArray[xcount].id+' '+pageItemsArray[xcount].type);
		if (pageItemA.type == 10) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input type='button' value='Button' id='widgetid"+pageItemA.id+"' /></div>");
			$("#widgetid"+pageItemA.id).jqxButton({ width: pageItemA.width, height: pageItemA.height, theme: 'bootstrap'}); 
			$("#widgetid"+pageItemA.id).bind('click', function (event) {window.open ("http://192.168.1.41:4000/","BoneNode","menubar=0,location=0,toolbar=0,resizable=0,width=1024,height=768");});
		 } else if (pageItemA.type == 11) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /></div>");
			$("#widgetid"+pageItemA.id).jqxSlider({theme: 'bootstrap'});
			$("#widgetid"+pageItemA.id).bind('click', function (event) {alert('Button '+pageItemA.id+' is Clicked');});                 
		 } else if (pageItemA.type == 12) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /></div>");
			$("#widgetid"+pageItemA.id).jqxGauge({
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
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /></div>");
			$("#widgetid"+pageItemA.id).jqxLinearGauge({
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
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /></div>");
			$("#widgetid"+pageItemA.id).jqxCheckBox({ width: pageItemA.width, height: pageItemA.height}); 
		 } else if (pageItemA.type == 15) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /></div>");
			$("#widgetid"+pageItemA.id).jqxCalendar({ width: pageItemA.width, height: pageItemA.height});
		 } else if (pageItemA.type == 16) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /></div>");
			$("#widgetid"+pageItemA.id).jqxSwitchButton({ width: pageItemA.width, height: pageItemA.height, checked: true, theme: 'bootstrap'});
			//$("#widgetid"+pageItemA.id).on('change', function (event) {ButtonClicked(pageItemA.type+'-'+pageItemA.action+'-'+pageItemA.device_id+'-'+pageItemA.id);}); 
		 } else if (pageItemA.type == 17) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' /><div class='transpbut' id='wraptopid"+pageItemA.id+"' style=' left: -2px; top:-2px; width:32px; height:32px;'></div></div>");
			$("#widgetid"+pageItemA.id).jqxCheckBox({ width: pageItemA.width, height: pageItemA.height});  
			$("#wraptopid"+pageItemA.id).on('click', function (event) {
			    var eventid = event.target.getAttribute('id').substr(9);
                ButtonClicked(2+'-'+eventid);
                //console.log('eventid='+eventid);
					});  
			for(k=0; k < devicesArray.length; k++){	
		 		if(pageItemA.device_id == devicesArray[k].id){
		 			if(devicesArray[k].val == 0){
						$("#widgetid"+pageItemA.id).jqxCheckBox({ checked:false });
					}else{
						$("#widgetid"+pageItemA.id).jqxCheckBox({ checked:true });
					}
				}
			 }              
		 } else if (pageItemA.type == 18) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+pageItemA.id+"' height='30' width='55' type='checkbox' class='ios-switch green  bigswitch' checked /><div><div></div></div>");
		} else if (pageItemA.type == 19) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+pageItemA.id+"' height='30' width='55' type='checkbox' class='ios-switch  bigswitch' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 20) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+pageItemA.id+"' height='30' width='55' type='checkbox' class='ios-switch green' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 21) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+pageItemA.id+"' height='30' width='55' type='checkbox' class='ios-switch' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 22) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+pageItemA.id+"' height='30' width='55' type='checkbox' class='ios-switch green tinyswitch' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 23) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><input id='widgetid"+pageItemA.id+"' height='30' width='55' type='checkbox' class='ios-switch tinyswitch' checked /><div><div></div></div>");
		 } else if (pageItemA.type == 24) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_pref+"</div>");
			init_window_pref();
		 } else if (pageItemA.type == 25) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_log+"</div>");
			init_window_log();
		 } else if (pageItemA.type == 26) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_input_key+"</div>");
			init_window_input_key();
		 } else if (pageItemA.type == 27) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_actions()+"</div>");
			init_window_actions();
		} else if (pageItemA.type == 28) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_bmv+"</div>");
			init_window_bmv();
		} else if (pageItemA.type == 29) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'>"+window_temp+"</div>");
			init_window_temp();
		} else if (pageItemA.type == 30) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><div id='widgetid"+pageItemA.id+"' style='width:100px; height:80px'></div></div>");
			widgetidJG[pageItemA.id] = new JustGage({
		    	id: "widgetid"+pageItemA.id, 
			    value: 100, 
			    min: 0,
			    max: 100,
	    		title: " ",
				valueFontColor :"#FFFFFF",
			    label: pageItemA.name,
			    shadowOpacity: 1,
			    shadowSize: 0,
			    shadowVerticalOffset: 10
			}); 

		} else if (pageItemA.type == 50) {
			$('#ControlPage').append("<div class='hmi-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><img draggable='false' src='images/"+pageItemA.action+"' width='"+pageItemA.width+"' height='"+pageItemA.height+"'></img></div>");
 			
		 } else if (pageItemA.type == 99) {
			$('#ControlPage').append("<div class='bkg-wrap' id='wrapid"+pageItemA.id+"' draggable='true' ondragstart='drag_start(event)' style='position:absolute; left:"+pageItemA.xpos+"px; top:"+pageItemA.ypos+"px; width:"+pageItemA.width+"px; height:"+pageItemA.height+"px;'><img draggable='false' src='images/"+pageItemA.action+"' ></div>");

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
    
    window.SaveItem = function (ItemData){
        socket.emit('saveitem', ItemData , function(data){
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
