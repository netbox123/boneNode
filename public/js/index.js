var	pagesArray = [];
var	pageItemsArray = [];
var actionsArray = [];
var actionsID = 1;
var actionsEdit = 0;
var	devicesArray = [];
var	devicesValArray = [];
var inputsArray = [];
var configArray = [];
var eventsArray = [];
var eventsEdit = 0;
var eventsNr = 1;
var linksArray = [];
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
var widgetidJG = [];
var SafariMenuHtml = '';
var curDate, curSec, curMin, curHour, secRot, minRot, hourRot;

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

SafariMenuHtml  =' <input type="checkbox" id="css3menu-switcher" class="c3m-switch-input">';
SafariMenuHtml +=' <ul id="css3menu1" class="topmenu">';
SafariMenuHtml +=' 	<li class="switch"><label onclick="" for="css3menu-switcher"></label></li>';
SafariMenuHtml +='	<li class="topmenu"><a href="#" style="height:10px;line-height:10px;"><span>PDF</span></a>';
SafariMenuHtml +=' 	<ul id="safariMenu0">';
SafariMenuHtml +=' 	</ul></li>';
SafariMenuHtml +=' 	<li class="topmenu"><a href="#" style="height:12px;line-height:12px;"><span>Arduino</span></a>';
SafariMenuHtml +=' 	<ul id="safariMenu1">';
SafariMenuHtml +=' 	</ul></li>';
SafariMenuHtml +=' 	<li class="topmenu"><a href="#" style="height:12px;line-height:12px;"><span>Beaglebone black</span></a>';
SafariMenuHtml +=' 	<ul id="safariMenu2">';
SafariMenuHtml +=' 	</ul></li>';
SafariMenuHtml +=' </ul>';

window.onload = function() {
	initApp();
    //window.resizeTo(1024, 768);
	var sec     = document.getElementById('sec');
	var min     = document.getElementById('min');
	var hour    = document.getElementById('hour');
	var tmpRotValue  = "";
}

function initApp(){
	$('#pageLoading').delay(500).queue(function() { $(this).css({background:'#fff', visibility:'visible', opacity:'1'}); $(this).dequeue(); });
	$('#spinner, #apple-logo').delay(1000).queue(function() { $(this).css({visibility:'visible', opacity:'1'}); $(this).dequeue(); });
}

function initWindows() {
    for(pageNr=0; pageNr < pagesArray.length; pageNr++){
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
    // Init Preference window
    $("#input481").val(configArray[0].version);
    if(configArray[0].hasDock == 0){
		$("#inputid480").prop("checked", false);
		$("#dock").fadeOut(500);
	}else{
		$("#inputid480").prop("checked", true);
		$("#dock").fadeIn(500);
	}
	$('#page, #head').delay(2500).queue(function() { $(this).addClass('vis'); $(this).dequeue(); });
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
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark' style='font-size: 13pt;color: #555; bottom:-5px;'><input style='text-align: right;' size=12' type='text' id='input"+pageItemsArray[pItemNr].id+"'></input></div></label></div>");
	} else if (pageItemsArray[pItemNr].type == 9) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='widgetid"+pageItemsArray[pItemNr].id+"' style='text-align: right; font-family: digital-7_monoitalic; font-size: 13pt; font-weight: bold; color: #040edf;'>0</div</div>");
	} else if (pageItemsArray[pItemNr].type == 10) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'<label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div style='bottom:4px;' id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark'><input style='border:1px red;' id='inputid"+pageItemsArray[pItemNr].id+"' height='30' width='55' type='checkbox' class='ios-switch green tinyswitch' checked /><div><div></div></div></div></label></div>")
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
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark' style='font-size: 12pt;color: #555; bottom:2px;'><p><a class='about-this button about' style='text-align:center;  width:85px;'  >"+pageItemsArray[pItemNr].action+"</a></p></div></label></div>");
	
	} else if (pageItemsArray[pItemNr].type == 12) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; bottom:0px; width:100%; height:"+pageItemsArray[pItemNr].height+"px;'><div class='inputButtonAreaClass'><div style='left:0px; position: absolute; padding-top:1px; padding-left:10px;'><input value='28=1' type='text' id='input"+pageItemsArray[pItemNr].id+"'></input></div><div style=' padding-top:3px; right:0px; width:140px; position: absolute;'><p><a style='text-align:center;' class='about-this button about' onclick='"+pageItemsArray[pItemNr].action+"'>"+pageItemsArray[pItemNr].name+"</a></p></div></div></div>");
	
	} else if (pageItemsArray[pItemNr].type == 13) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'<label class='tasks-list-item'><span class='tasks-list-desc'>"+pageItemsArray[pItemNr].name+"</span><div style='bottom:4px;' id='widgetid"+pageItemsArray[pItemNr].id+"' class='tasks-list-mark'><input style='border:1px red;' id='inputid"+pageItemsArray[pItemNr].id+"' height='30' width='55' type='checkbox' class='ios-switch tinyswitch' checked /><div><div></div></div></div></label></div>")
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
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='GraphContainer"+pageItemsArray[pItemNr].id+"' style=' width:"+pageItemsArray[pItemNr].width+"px; height:"+(pageItemsArray[pItemNr].height)+"px; margin: 0 auto;'></div></div>");

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#GraphContainer'+pageItemsArray[pItemNr].id).highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = parseFloat(devicesValArray[3002]);
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Current(A)'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 200
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Live data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 2000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
        

	} else if (pageItemsArray[pItemNr].type == 15) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='GraphContainer"+pageItemsArray[pItemNr].id+"' style=' width:"+pageItemsArray[pItemNr].width+"px; height:"+(pageItemsArray[pItemNr].height)+"px; margin: 0 auto;'></div></div>");

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#GraphContainer'+pageItemsArray[pItemNr].id).highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series4001 = this.series[0];
                        var series4002 = this.series[2];
                        var series4003 = this.series[3];
                        var series4004 = this.series[4];
                        var series4005 = this.series[5];
                        var series4006 = this.series[6];
                        var series4007 = this.series[7];
                        var series4008 = this.series[1];
                        var series4009 = this.series[8];
                        setInterval(function () {
                            var x = (new Date()).getTime();
       
                            series4001.addPoint([x, parseFloat(devicesValArray[4001])], false, true);
                           	series4002.addPoint([x, parseFloat(devicesValArray[4002])], false, true);
                           	series4003.addPoint([x, parseFloat(devicesValArray[4003])], false, true);
                           	series4004.addPoint([x, parseFloat(devicesValArray[4004])], false, true);
                           	series4005.addPoint([x, parseFloat(devicesValArray[4005])], false, true);
                           	series4006.addPoint([x, parseFloat(devicesValArray[4006])], false, true);
                           	series4007.addPoint([x, parseFloat(devicesValArray[4007])], false, true);
                           	series4008.addPoint([x, parseFloat(devicesValArray[4008])], false, true);
                            series4009.addPoint([x, parseFloat(devicesValArray[4009])], true, true);
                            
                          	
                            
                        }, 1000);
                    }
                }
            },
            title: {
            text: 'Temperatures',
            x: -20 //center
        	},
        	subtitle: {
            text: 'Subtitle',
            x: -20
        	},
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 200
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
            valueSuffix: '°C'
        	},
        	legend: {
            	layout: 'vertical',
            	align: 'right',
            	verticalAlign: 'middle',
            	borderWidth: 0
        	},
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Binnen',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            },{
                name: 'Buiten',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            },{
                name: 'Kachel boven',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            },{
                name: 'Kachel onder',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            },{
                name: 'Buffer boven',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            },{
                name: 'Buffer midden',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            },{
                name: 'Buffer onder',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            },{
                name: 'Generator boven',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            },{
                name: 'Generator onder',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
        

	
	
	} else if (pageItemsArray[pItemNr].type == 16) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'></div>");
	
		
	} else if (pageItemsArray[pItemNr].type == 17) {
		//console.log("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='widgetid"+pageItemsArray[pItemNr].id+"' /><div class='transpbut' id='wraptopid"+pageItemsArray[pItemNr].id+"' style=' left: -2px; top:-2px; width:32px; height:32px;'></div></div>");
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'><div id='widgetid"+pageItemsArray[pItemNr].id+"' /><div class='transpbut' id='wraptopid"+pageItemsArray[pItemNr].id+"' style=' left: -2px; top:-2px; width:32px; height:32px;'></div></div>");
		$("#widgetid"+pageItemsArray[pItemNr].id).jqxCheckBox({ width: pageItemsArray[pItemNr].width, height: pageItemsArray[pItemNr].height });  
		$("#wraptopid"+pageItemsArray[pItemNr].id).on('click', function (event) {
			//console.log(event.target.getAttribute('id')); 
			var targetid = event.target.getAttribute('id').substr(9);
			LampClicked(targetid);
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
	} else if (pageItemsArray[pItemNr].type == 18) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:100%; height: 100%;height: -webkit-calc(100% - 49px);height: -moz-calc(100% - 49px);height: calc(100% - 49px);'><iframe src='http://192.168.7.2:88/extplorer/index.php' style='padding:0px; width:100%; height:100%;' id='Iframe"+pageItemsArray[pItemNr].id+"' ></iframe></div>");
		
	} else if (pageItemsArray[pItemNr].type == 19) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:100%; height:"+pageItemsArray[pItemNr].height+"px; background:#AAAAAA;'></div>");

	} else if (pageItemsArray[pItemNr].type == 20) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px; z-index:1;'><input value='/pdf/BMV-600.pdf' type='text' size='40' id='input"+pageItemsArray[pItemNr].id+"'></input></div>");

	} else if (pageItemsArray[pItemNr].type == 21) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:100%; height:"+pageItemsArray[pItemNr].height+"px;  z-index:1;'>"+SafariMenuHtml+"</div>");
		//console.log(SafariMenuHtml);
		var menucount = 0;
		var count = 0;
		var imgName;
		for(p=0; p < 6; p++){
			menucount = 0;
			count = 0;
			for(q=0; q < linksArray.length; q++){
				if(linksArray[q].menu == p){
					menucount = menucount + 1;
				}
			}
			for(m=0; m < linksArray.length; m++){
				if(linksArray[m].menu == p){
					count = count + 1;
					if (linksArray[m].type == 1){
						imgName ='earth.png';
					} else if (linksArray[m].type == 2){
						imgName ='pdf.png';
					}
					if (count == menucount){
						//console.log('last   ' + count + '  ' + menucount + '  ' +linksArray[m].name);
						$('#safariMenu' + linksArray[m].menu).append('<li onclick="Safari_MenuLink(\''+linksArray[m].url+'\');" class=" sublast"><a style="padding-left: 25px; top:4px" href="#"><img style="position: absolute; left: 5px; top: 3px" src="img/'+imgName+'" alt=""/>'+linksArray[m].name+'</a></li>');
					} else if (count == 1){
						//console.log('top   ' + count + '  ' + menucount + '  ' +linksArray[m].name);
						$('#safariMenu' + linksArray[m].menu).append('<li onclick="Safari_MenuLink(\''+linksArray[m].url+'\');" class=" subfirst"><a style="padding-left: 25px; top:4px" href="#"><img style="position: absolute; left: 5px; top: 3px" src="img/'+imgName+'" alt=""/>'+linksArray[m].name+'</a></li>');
					} else {
						//console.log('middle ' + count + '  ' + menucount + '  ' +linksArray[m].name);
						$('#safariMenu' + linksArray[m].menu).append('<li onclick="Safari_MenuLink(\''+linksArray[m].url+'\');"><a style="padding-left: 25px; top:4px" href="#"><img style="position: absolute; left: 5px; top: 3px" src="img/'+imgName+'" alt=""/>'+linksArray[m].name+'</a></li>');
					}
				}
			}
		}
		
	} else if (pageItemsArray[pItemNr].type == 22) {
		var actionsCalc = '';
		for(n=0; n < actionsArray.length; n++){
			actionsCalc += '<li><div class="cWrap"><div id="idDeleteAction'+n+'" class="cDeleteActionRemove"><img src="/img/delete1616.png"></img><div><div id="idIDAction'+n+'" class="cIDShow">' + actionsArray[n].id + '</div><div class="cName">' + actionsArray[n].name + '</div><div class="cRun" id="actionRun' + actionsArray[n].id + '">' + 'run' + '</div><div id="actionEdit' + actionsArray[n].id + '" class="cButton">' + 'edit' + '</div></div></li>' ;
		}
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:100%; height: -webkit-calc(100% - 34px);height: -moz-calc(100% - 34px);height: calc(100% - 34px);'><actionNav><ul>"+ actionsCalc +"</ul></actionNav></div>");
		for(n=0; n < actionsArray.length; n++){
			$("#actionRun"+actionsArray[n].id).on('click', function (event) {
			var eventid = event.target.getAttribute('id').substr(9);
			//console.log('eventid '+eventid); 
			ActionClicked(eventid);
			}); 
			$("#actionEdit"+actionsArray[n].id).on('click', function (event) {
			var eventid = event.target.getAttribute('id').substr(10);
			//console.log('eventid '+eventid); 
			ActionEditClicked(eventid);
			}); 
		}
		

	} else if (pageItemsArray[pItemNr].type == 23) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; bottom:0px; width:100%; height:"+pageItemsArray[pItemNr].height+"px;'><div class='inputButtonAreaClass'><div style='left:0px; position: absolute; padding-left:8px; padding-top:5px;'><p><a class='about-this button ' style='width:50px; text-align:center;' onclick='deleteActionButtonClicked();'>delete</a></p></div><div style=' padding-top:5px; right:0px; width:60px; position: absolute;'><p><a class='about-this button ' style='width:50px; text-align:center;' onclick='newActionButtonClicked();'>new</a></p></div></div></div>");

	} else if (pageItemsArray[pItemNr].type == 24) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:250px; height:"+pageItemsArray[pItemNr].height+"px;'><actionNav><ul><div id='eventWrapid"+pageItemsArray[pItemNr].id+"'>"+ "test" +"</div></ul></actionNav></div>");
		for(n=0; n < eventsArray.length; n++){
			$("#wrapid"+actionsArray[n].id).on('click', function (event) {
			var eventid = event.target.getAttribute('id').substr(9);
			console.log('eventid '+eventid); 
			//ActionClicked(eventid);
			}); 
		}
		

	} else if (pageItemsArray[pItemNr].type == 25) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; bottom:0px; width:100%; height:"+pageItemsArray[pItemNr].height+"px;'><div class='inputButtonAreaClass'><div style='left:10px; position: absolute; top:10px;'><a class='about-this button ' style='width:50px; text-align:center;  '  onclick='deleteEventButtonClicked();'>delete</a></div><div class='inputButtonAreaClass'><div style='left:300px; top:10px; position: absolute;'><a class='about-this button ' style='width:50px; text-align:center;' onclick='newEventButtonClicked();'>new</a></div><div style=' top:10px; left:380px; width:60px; position: absolute;'><a class='about-this button ' style='width:50px; text-align:center;'  onclick='editEventButtonClicked();'>"+pageItemsArray[pItemNr].name+"</a></div></div></div>");


	} else if (pageItemsArray[pItemNr].type == 26) {
		var inputCalc = "<div style='line-height:23px;padding:0px;'><input id='eventAction1' type='radio' name='inputType' value='on'>&nbsp;turn on<br><input id='eventAction2' type='radio' name='inputType' value='off' >&nbsp;turn off<br>";
		inputCalc += "<input id='eventAction3' type='radio' name='inputType' value='toggle'>&nbsp;toggle<br><input id='eventAction4' type='radio' name='inputType' value='dim' >&nbsp;dim<br>";
		inputCalc += "<input id='eventAction5' type='radio' name='inputType' value='ton' >&nbsp;timed on<br><input id='eventAction6' type='radio' name='inputType' value='toff' >&nbsp;timed off<br>";
		inputCalc += "<input id='eventAction7' type='radio' name='inputType' value='pulse'>&nbsp;pulse<br><input id='eventAction7' type='radio' name='inputType' value='blink' >&nbsp;blink<br></div>";
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px;  width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'>"+inputCalc+"</div>");

	} else if (pageItemsArray[pItemNr].type == 27) {
		var inputCalc = "<div style='line-height:23px;padding:0px;'> <input type='text' size='5' id='typeDim'>&nbsp;%<br><input type='text' size='5' id='typeTon'>&nbsp;sec.<br>";
		inputCalc += "<input type='text' size='5' id='typeToff'>&nbsp;sec.<br><input type='text' size='5' id='typePulse'>&nbsp;sec.<br>";
		inputCalc += "<input type='text' size='5' id='typeBlink'>&nbsp;sec.<br></div>";
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px;  width:"+pageItemsArray[pItemNr].width+"px; height:"+pageItemsArray[pItemNr].height+"px;'>"+inputCalc+"</div>");
	} else if (pageItemsArray[pItemNr].type == 28) {
		selectCalc = '<form id="actionSelectRadio"><select name="actionSelectRadio">';
		for(n=0; n < devicesArray.length; n++){
			selectCalc += '<option  value='+devicesArray[n].id+'>'+devicesArray[n].name+'</option>';
		}
		selectCalc += '</select></form>';
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:100%; height:"+pageItemsArray[pItemNr].height+"px;'><div id='eventSelectCalc'>"+selectCalc+"</div></div>");
	} else if (pageItemsArray[pItemNr].type == 29) {
		$('#containerInside' + pagesArray[pageNr].id).append("<div class='hmi-wrap' id='wrapid"+pageItemsArray[pItemNr].id+"' style='position:absolute; left:"+pageItemsArray[pItemNr].xpos+"px; top:"+pageItemsArray[pItemNr].ypos+"px; width:100%; height:"+pageItemsArray[pItemNr].height+"px;'></div>");

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
    
    //  -- Save Preferences to server --
    window.SavePreferences = function (ItemData){
        socket.emit('savepreferences: ', ItemData , function(data){
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
    
    //  -- Event Change to server --
    window.eventChange = function (actionsID,eventNr,eventstring, eventaction ){
        socket.emit('eventchange', {action_id: actionsID, event_nr:eventNr, event_string:eventstring, event_action:eventaction } , function(data){
        	if(data){
			} else{
			}
    	})	
    };
    
    //  -- Event Change from server --
	socket.on('eventchanged', function(data){
        console.log('eventchanged '+data.action_id);
        if(data.event_action == 'new'){
        	newEventfromServer(data.action_id, data.event_string);
        } else if(data.event_action == 'edit'){
        	editEventfromServer(data.action_id, data.event_nr, data.event_string);
        } else if(data.event_action == 'delete'){
        	deleteEventfromServer(data.action_id, data.event_nr);
        }
	});
    
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
	
	//  -- Receiving preferencesSave from server --
	socket.on('preferencesSave', function(data){
		//console.log('preferencesSave '+data.msg.version);
		configArray[0].version = data.msg.version;
		$("#input481").val(data.msg.version);
	});
	
	//  -- Receiving itemUpdate from server --
	socket.on('itemUpdate', function(data){
        for(j=0; j < pageItemsArray.length; j++){
              if(pageItemsArray[j].id == data.msg.id){
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
							$('#widgetid' + pageItemsArray[xcount].id).html(devicesValArray[pageItemsArray[xcount].device_id]);	
						} else if (pageItemsArray[xcount].type == 1 | pageItemsArray[xcount].type == 9) {
							$('#widgetid' + pageItemsArray[xcount].id).html(devicesValArray[pageItemsArray[xcount].device_id]);
						} else if (pageItemsArray[xcount].type == 14) {
							$('#widgetid' + pageItemsArray[xcount].id).html(devicesValArray[pageItemsArray[xcount].device_id]);
							bmv_i = devicesValArray[pageItemsArray[xcount].device_id];
						} else if (pageItemsArray[xcount].type == 30) {
							 widgetidJG[pageItemsArray[xcount].id].refresh(parseInt(devicesValArray[pageItemsArray[xcount].device_id])); 
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
