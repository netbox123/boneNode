function item_drag_start(ev) {
	if (iseditmode){
		//$("#pageItemPanel").hide();
		//ev.dataTransfer.effectAllowed='move';
		dragstartx = ev.clientX;
		dragstarty = ev.clientY;
		itemeventtarget = ev.target.getAttribute('id');
		//alert('id '+ev.target.getAttribute('id'));
		//ev.dataTransfer.setData("text/plain", ev.target.getAttribute('id'));
	}else{
		// ev.originalEvent.dataTransfer.effectAllowed='none';
	}
}

function item_drag_over(event) {
	event.preventDefault();
}

function item_drag_stop(event) {
	if (iseditmode){
		//event.preventDefault();
		//var data = event.dataTransfer.getData("Text");
		var query_str = "";
        for(j=0; j < pageItemsArray.length; j++){
            if (pageItemsArray[j].id == itemeventtarget.substr(6)){
                var Arrayid = j;
            }
        }
		//console.log(itemeventtarget.substr(6)+'-'+pageItemsArray[Arrayid]+'-'+Arrayid);
		query_str += "UPDATE  `nodesql`.`page_items` SET  ";
		query_str += "`xpos` =  '"+(pageItemsArray[Arrayid].xpos+event.clientX-dragstartx)+"', `ypos` =  '"+(pageItemsArray[Arrayid].ypos+event.clientY-dragstarty)+"' ";
		query_str += " WHERE  `page_items`.`id` ="+pageItemsArray[Arrayid].id;
		sendQuery(query_str, pageItemsArray[Arrayid].id, 'page_items', pageItemsArray[Arrayid].xpos+event.clientX-dragstartx, pageItemsArray[Arrayid].ypos+event.clientY-dragstarty, pageItemsArray[Arrayid].name);     
		//console.log(query_str);
		
	}
}

function window_drag_start(event) {
	//console.log('window_drag_start '+event.target.getAttribute('id'));
	windowdragstartx = event.clientX;
	windowdragstarty = event.clientY;
	windoweventtarget = event.target.getAttribute('id');
}

function window_drag_stop(event,ui) {
	var xPos = String(ui.position.left);
    var yPos = String(ui.position.top);
	windowID = windoweventtarget.substr(6);
  	//console.log('window_drag_stop ui ' + String(ui.position.left));
	//console.log('window_drag_stop ' + event.target.getAttribute('id'));
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID & pagesArray[j].id < 99){
			pagesArray[j].xpos = xPos;
			pagesArray[j].ypos = yPos;
			$("#input420").val(pagesArray[j].name);
			$("#input421").val(xPos);
			$("#input422").val(yPos);
			$("#input423").val(pagesArray[j].width);
			$("#input424").val(pagesArray[j].height);
			$("#input425").val(pagesArray[j].vis);
			$("#input427").val(pagesArray[j].id)
		}
	}
}

function window_resize_start(event,ui) {
	windoweventtarget = event.target.getAttribute('id').substr(15);
	//console.log('window_resize_start ' + windoweventtarget);
}

function window_resizing(event,ui) {
	windoweventtarget = event.target.getAttribute('id').substr(15);
	var windowWidth = ui.size.width;
	var windowHeight = ui.size.height;
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windoweventtarget){
			pagesArray[j].width = windowWidth;
			pagesArray[j].height = windowHeight;
			$('#window' + pagesArray[j].id).css({"width": +windowWidth+"px"});
		}
	}
	//console.log('window_resizing ' + windoweventtarget);
}

function window_resize_stop(event,ui) {
	var windowWidth = ui.size.width;
	var windowHeight = ui.size.height;
	windoweventtarget = event.target.getAttribute('id').substr(15);
	//console.log('window_resize_stop ' + windoweventtarget);
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windoweventtarget){
			pagesArray[j].width = windowWidth;
			pagesArray[j].height = windowHeight;
			$("#input420").val(pagesArray[j].name);
			$("#input421").val(pagesArray[j].xpos);
			$("#input422").val(pagesArray[j].ypos);
			$("#input423").val(windowWidth);
			$("#input424").val(windowHeight);
			$("#input425").val(pagesArray[j].vis);
			$("#input427").val(pagesArray[j].id)
		}
	}
}






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

// --------------------------------------------------------------------- //

function menuClicked( menuID, MenuItem) {
	//console.log('menuID ' + menuID + ' MenuItem ' + MenuItem);
	if (menuID == 'Edit' & MenuItem == 'editItems'){
		menuEdit_editItems();	
	} else 	if (menuID == 'Edit' & MenuItem == 'editWindow'){
		menuEdit_editWindow();
	} else 	if (menuID == 'Window' & MenuItem == 'closeAll'){
		menuWindow_closeAll();
	} else 	if (menuID == 'Window' & MenuItem == 'bringFront'){
		menuWindow_bringFront();
	} else 	if (menuID == 'Button' & MenuItem == 'SendSerial'){
		Button_SendSerial();
	}
}

function Button_SendSerial() {
	SendDueSerial($("#input403").val());
//	console.log($("#input402").val());
}

function menuEdit_editItems() {
	if(iseditmode == 0){
		iseditmode = 1;
		$(".hmi-wrap").css({"border": "1px #803 solid"});
	} else {
		iseditmode = 0;
		$(".hmi-wrap").css({"border": "1px transparent solid"});
	}
}

function menuEdit_editWindow() {
	if(iswineditmode == 0){
		iswineditmode = 1;
		$(".windowdrag").css({"border": "1px #803 solid"});
	} else {
		iswineditmode = 0;
		$(".windowdrag").css({"border": "1px transparent solid"});
	}
}

function menuWindow_closeAll() {
	for(j=0; j < pagesArray.length; j++){
		//console.log('menuWindow_closeAll windowdrag' + pagesArray[j].id);
		pagesArray[j].vis = 0;
		$("#windowdrag" + pagesArray[j].id).css({"visibility": "hidden"});
		//$("#window" + pagesArray[j].id).css({"visibility": "hidden"});
		$("#window" + pagesArray[j].id).fadeOut(500);
	}
}

function menuWindow_closeOne(windowID) {
	//console.log('menuWindow_closeOne windowID ' + windowID);
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			pagesArray[j].vis = 0;
			//$("#windowdrag" + pagesArray[j].id).css({"visibility": "hidden"});
			//$("#window" + pagesArray[j].id).css({"visibility": "hidden"});
			//$("#window" + pagesArray[j].id).hide( "clip", 200 );
			$("#window" + pagesArray[j].id).fadeOut(500);
		}
	}
}

function menuWindow_openOne(windowID) {
	//console.log('menuWindow_openOne windowID ' + windowID);
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			pagesArray[j].vis = 1;
			$("#window" + pagesArray[j].id).css({"display": "none"});
			$("#window" + pagesArray[j].id).css({"visibility": "visible"});
			$("#window" + pagesArray[j].id).css({"opacity": "1"});
			$("#window" + pagesArray[j].id).css("z-index", zordermax++);
			pagesArray[j].mini = 0;
			pagesArray[j].maxi = 0;
			$("#containerInside" + pagesArray[j].id).fadeIn(500);
			$("#window" + pagesArray[j].id).fadeIn( 500 );
			
		}
	}
}

function menuWindow_bringFront() {
	for(j=0; j < pagesArray.length; j++){
		//console.log('menuWindow_bringFront window' + pagesArray[j].id);
		pagesArray[j].vis = 1;
		$("#window" + pagesArray[j].id).css({"display": "show"});
		//$("#windowdrag" + pagesArray[j].id).css({"visibility": "visible"});
		$("#window" + pagesArray[j].id).css({"visibility": "visible"});
		$("#window" + pagesArray[j].id).css({"opacity": "1"});
		$("#window" + pagesArray[j].id).fadeIn( 500 );
		//$("#window" + pagesArray[j].id).show( "clip", 2000 );
		//sleep(1000);
	}
}

function bringWindowToFront(windowID) {
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			$('#window' + pagesArray[j]).css("z-index", zordermax++);
			//console.log('bringWindowToFront ='+windowID);
		}
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function menuClose(menuID) {
	$('#'+menuID).css("visibility", "hidden");
	//console.log('menuClose ' + menuID);
}

function openWindowInfo(windowID) {
	//console.log('openWindowInfo ' + windowID);
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			$("#input420").val(pagesArray[j].name);
			$("#input421").val(pagesArray[j].xpos);
			$("#input422").val(pagesArray[j].ypos);
			$("#input423").val(pagesArray[j].width);
			$("#input424").val(pagesArray[j].height);
			$("#input425").val(pagesArray[j].vis);
			$("#input427").val(pagesArray[j].id);
		}
	}
	menuWindow_openOne(99);
}

function updateWindowInfo(windowID) {
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID & pagesArray[j].id < 99){
			//console.log('updateWindowInfo ' + windowID);
			$("#input420").val(pagesArray[j].name);
			$("#input421").val(pagesArray[j].xpos);
			$("#input422").val(pagesArray[j].ypos);
			$("#input423").val(pagesArray[j].width);
			$("#input424").val(pagesArray[j].height);
			$("#input425").val(pagesArray[j].vis);
			$("#input427").val(pagesArray[j].id);
			windoweventtarget = pagesArray[j].id;
		}
	}
}

function saveWindowInfo() {
	windowID = $("#input427").val();
	//console.log('saveWindowInfo ' + windowID);
	//var windowData = 0;
	var query_str = "";
	var windowData={'windowObject':[]};
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			windowData.id = $("#input427").val();
			windowData.name = $("#input420").val();
			windowData.xpos = $("#input421").val();
			windowData.ypos = $("#input422").val();
			windowData.width = $("#input423").val();
			windowData.height = $("#input424").val();
			windowData.vis = $("#input425").val();
			SaveWindow(windowData);
			query_str += "UPDATE  `nodesql`.`page` SET  ";
			query_str += "`xpos` =  '"+($("#input421").val())+"', `ypos` =  '"+($("#input422").val())+"', ";
			query_str += "`width` =  '"+($("#input423").val())+"', `height` =  '"+($("#input424").val())+"', ";
			query_str += "`name` =  '"+($("#input420").val())+"',  ";
			query_str += "`vis` =  '"+($("#input425").val())+"' ";
			query_str += " WHERE  `page`.`id` ="+pagesArray[j].id;
			sendQuery(query_str, pagesArray[j].id, 'page', $("#input421").val(), $("#input422").val(), $("#input420").val());     
			//console.log(query_str);
		}
	}
}

function windowMinimize(windowID) {
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			//console.log('windowMinimize_' + pagesArray[j].id);
			if (pagesArray[j].mini){
				pagesArray[j].mini = 0;
				$("#containerInside" + pagesArray[j].id).fadeIn(500);
			} else {
				pagesArray[j].mini = 1;
				$("#containerInside" + pagesArray[j].id).fadeOut(500);
			}
		}
	}
}

function windowMaximize(windowID) {
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			//console.log('windowMaximize_' + pagesArray[j].id);
			if (pagesArray[j].maxi){
				pagesArray[j].maxi = 0;
				$("#window" + pagesArray[j].id).css({top: parseInt(pagesArray[j].ypos), left: parseInt(pagesArray[j].xpos),width: parseInt(pagesArray[j].width)});
        		$("#containerInside" + pagesArray[j].id).css({height: parseInt(pagesArray[j].height)});
			} else {
				pagesArray[j].maxi = 1;
				$("#window" + pagesArray[j].id).css({top: 23, left: 0,width: 1025});
        		$("#containerInside" + pagesArray[j].id).css({height: 768});
			}
		}
	}
}

function openItemInfo(ItemID) {
	//console.log('openWindowInfo ' + windowID);
	for(j=0; j < pageItemsArray.length; j++){
		if(pageItemsArray[j].id == ItemID){
			$("#input440").val(pageItemsArray[j].name);
			$("#input441").val(pageItemsArray[j].xpos);
			$("#input442").val(pageItemsArray[j].ypos);
			$("#input443").val(pageItemsArray[j].width);
			$("#input444").val(pageItemsArray[j].height);
			$("#input445").val(pageItemsArray[j].type);
			$("#input447").val(pageItemsArray[j].id);
			$("#input448").val(pageItemsArray[j].device_id);
			$("#input449").val(pageItemsArray[j].page_id);
			$("#input450").val(pageItemsArray[j].action);
		}
	}
	menuWindow_openOne(98);
}

function newItemMenu(ItemID) {
	console.log('newWindowInfo ' + ItemID);
	menuWindow_openOne(95);
}

function updateItemInfo(ItemID) {
	var maxid=0;
	for(k=0; k < pageItemsArray.length; k++){
		if(pageItemsArray[k].id>maxid){
			maxid=pageItemsArray[k].id
		}
	}
	for(j=0; j < pageItemsArray.length; j++){
		if(pageItemsArray[j].id == ItemID & (pageItemsArray[j].page_id != 98)  & (pageItemsArray[j].page_id != 95)){
			$("#input440").val(pageItemsArray[j].name);
			$("#input441").val(pageItemsArray[j].xpos);
			$("#input442").val(pageItemsArray[j].ypos);
			$("#input443").val(pageItemsArray[j].width);
			$("#input444").val(pageItemsArray[j].height);
			$("#input445").val(pageItemsArray[j].type);
			$("#input447").val(pageItemsArray[j].id);
			$("#input448").val(pageItemsArray[j].device_id);
			$("#input449").val(pageItemsArray[j].page_id);
			$("#input450").val(pageItemsArray[j].action);
			
			$("#input540").val(pageItemsArray[j].name);
			$("#input541").val(pageItemsArray[j].xpos);
			$("#input542").val(pageItemsArray[j].ypos);
			$("#input543").val(pageItemsArray[j].width);
			$("#input544").val(pageItemsArray[j].height);
			$("#input545").val(pageItemsArray[j].type);
			$("#input547").val(parseInt(maxid)+1);
			$("#input548").val(pageItemsArray[j].device_id);
			$("#input549").val(pageItemsArray[j].page_id);
			$("#input550").val(pageItemsArray[j].action);
		}
	}
}

function deleteItemInfo() {
	console.log('deleteItemInfo ' );
	var query_str = "";
	var itemID = 0;
	itemID = parseInt($("#input447").val());
	DeleteItem(itemID);
	$("#input447").val("");
	$("#input440").val("");
	$("#input441").val("");
	$("#input442").val("");
	$("#input443").val("");
	$("#input444").val("");
	$("#input445").val("");
	$("#input448").val("");
	$("#input449").val("");
	$("#input450").val("");
	
	query_str += "DELETE FROM `nodesql`.`page_items` ";
	query_str += " WHERE  `page_items`.`id` ="+itemID;
	sendQuery(query_str, itemID, 'page_items', $("#input541").val(), $("#input542").val(), $("#input540").val());     
	console.log(query_str);
}

function newItemInfo() {
	windowID = $("#input547").val();
	console.log('newItemInfo ' );
	//var windowData = 0;
	var query_str = "";
	var itemData={'itemObject':[]};
	itemData.id = $("#input547").val();
	itemData.name = $("#input540").val();
	itemData.xpos = $("#input541").val();
	itemData.ypos = $("#input542").val();
	itemData.width = $("#input543").val();
	itemData.height = $("#input544").val();
	itemData.type = $("#input545").val();
	itemData.device_id = $("#input548").val();
	itemData.page_id = $("#input549").val();
	itemData.action = $("#input550").val();
	NewItem(itemData);
	query_str += "INSERT INTO `nodesql`.`page_items` ";
	query_str +="(`id`, `name`, `page_id`, `device_id`, `type`, `xpos`, `ypos`, `width`, `height`, `action`) ";
	query_str +="VALUES (";
	query_str +="'"+$("#input547").val()+"','"+$("#input540").val()+"','"+$("#input549").val()+"',";
	query_str +="'"+$("#input548").val()+"','"+$("#input545").val()+"','"+$("#input541").val()+"',";
	query_str +="'"+$("#input542").val()+"','"+$("#input543").val()+"','"+$("#input544").val()+"',"
	query_str +="'"+$("#input550").val()+"')";
	sendQuery(query_str, pageItemsArray[j].id, 'page_items', $("#input541").val(), $("#input542").val(), $("#input540").val());     
	$("#input547").val(parseInt($("#input547").val())+1);
	console.log(query_str);
}

function saveItemInfo() {
	windowID = $("#input447").val();
	//console.log('saveWindowInfo ' + windowID);
	//var windowData = 0;
	var query_str = "";
	var itemData={'itemObject':[]};
	for(j=0; j < pageItemsArray.length; j++){
		if(pageItemsArray[j].id == windowID){
			itemData.id = $("#input447").val();
			itemData.name = $("#input440").val();
			itemData.xpos = $("#input441").val();
			itemData.ypos = $("#input442").val();
			itemData.width = $("#input443").val();
			itemData.height = $("#input444").val();
			itemData.type = $("#input445").val();
			itemData.device_id = $("#input448").val();
			itemData.page_id = $("#input449").val();
			itemData.action = $("#input450").val();
			SaveItem(itemData);
			//console.log(pageItemsArray[j].id+'-'+pageItemsArray[j].name+'-'+j);
			query_str += "UPDATE  `nodesql`.`page_items` SET  ";
			query_str += "`xpos` =  '"+($("#input441").val())+"', `ypos` =  '"+($("#input442").val())+"', ";
			query_str += "`width` =  '"+($("#input443").val())+"', `height` =  '"+($("#input444").val())+"', ";
			query_str += "`name` =  '"+($("#input440").val())+"', `type` =  '"+($("#input445").val())+"', ";
			query_str += "`device_id` =  '"+($("#input448").val())+"', `page_id` =  '"+($("#input449").val())+"', ";
			query_str += "`action` =  '"+($("#input450").val())+"' ";
			query_str += " WHERE  `page_items`.`id` ="+pageItemsArray[j].id;
			sendQuery(query_str, pageItemsArray[j].id, 'page_items', $("#input441").val(), $("#input442").val(), $("#input440").val());     
			//console.log(query_str);
		}
	}
}


function savePreferences() {
	var query_str = "";
	var prefData={'prefObject':[]};
	prefData.version = $("#input481").val();
	if ($('#inputid480').is(':checked')){
		prefData.hasDock = 1;
	} else {
		prefData.hasDock = 0;
	}
	SavePreferences(prefData);
	query_str += "UPDATE  `nodesql`.`config` SET  ";
	query_str += "`version` =  '"+prefData.version+"', ";
	query_str += "`hasDock` =  '"+prefData.hasDock+"' ";
	query_str += " WHERE  `config`.`id` = '1'";
	sendQuery(query_str, pageItemsArray[j].id, 'preferences', $("#input441").val(), $("#input442").val(), $("#input440").val());     
	//console.log(query_str);
}

function showDock(){
	if ($('#inputid480').is(':checked')){
		$("#dock").fadeIn(500);
	} else {
		$("#dock").fadeOut(500);
	}
}

function setBBBtime(){
	var milliseconds = new Date().getTime();
    milliseconds += 3600000;
    SendServerCommand('settime-'+milliseconds);
}

function itemClicked(itemID){
	//console.log('itemClicked ' + itemID);
	if(itemID==480){
		showDock();
	}
	if(itemID==199){
		setBBBtime();
	}
	if(itemID==198){
		SendServerCommand('writefile-1');
	}
	if(itemID==197){
		SendServerCommand('emptyserver-1');
	}
	if(itemID==196){
		SendServerCommand('loadfromdb-1');
	}
	if(itemID==195){
		SendServerCommand('loadfromfile-1');
	}
}

function goURL(){
	//console.log ($('#input407').val());
	$("#Iframe405").attr("src", $('#input407').val());
}



function Safari_MenuLink(theURL) {
	//console.log('Safari_MenuLink theURL ' + theURL);
	$('#input407').val(theURL);
	$("#Iframe405").attr("src", theURL);
	//$(".menuli").fadeOut(500);
}

function ActionEditClicked(ItemID) {
	//console.log('ActionEditClicked  ' + ItemID);
	actionsID = ItemID;
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == ItemID){
			var eventsCalc = '';
			eventsArray  = actionsArray[j].events.split(';');
			ValuesA  = actionsArray[j].events.split(';');
			$("#titleInside89").html(actionsArray[j].name);
        	for(k=0; k < ValuesA.length-1; k++){
        		for(l=0; l < devicesArray.length; l++){
        			OneValueA  = ValuesA[k].split('-');
        			if(devicesArray[l].id == OneValueA[0]){
        				//console.log('idDeleteEvent>  ' + k);
            			eventsCalc += '<li><div class="cWrap"><div width="20px" id="idDeleteEvent'+k+'" class="cDeleteEventRemove"><img onclick="deleteEventImgClicked('+k+');" src="/img/delete1616.png"></img><div><div id="idIDEvent'+k+'" class="cIDShow">' + devicesArray[l].id + '</div><div id="eventName' + k + '" class="cName">' + devicesArray[l].name + '</div><div class="cRun" id="eventRun' + n + '">' + OneValueA[1] + '</div><div class="cButton">' + OneValueA[2] + '</div></div></li>' ;
        			}
        		}
        	}
			$("#eventWrapid465").html(eventsCalc);
			//console.log('xxxxxxxxxxx>  ' );
			for(m=0; m < ValuesA.length-1; m++){
				$("#eventName"+m).on('click', function (event) {
				var eventid = event.target.getAttribute('id').substr(9);
				eventsNr = eventid;
				//console.log('eventid>  ' + eventid);
				OneValueA  = ValuesA[eventid].split('-');
				SetEventFromClick(OneValueA[0], OneValueA[1], OneValueA[2]);
				}); 

			}
			OneValueA  = ValuesA[0].split('-');
			SetEventFromClick(OneValueA[0], OneValueA[1], OneValueA[2]);
			for(m=0; m < pagesArray.length; m++){
				if (pagesArray[m].id == 89){
					if (pagesArray[m].vis != 1){
						menuWindow_openOne(89);
					}
				}
			}
			//ValuesA  = actionsArray[j].events.split(';');
		
        	for(m=0; m < ValuesA.length-1; m++){
        		if(eventsEdit!=1){
        			$('#idDeleteEvent'+m).removeClass('cDeleteEventShow').addClass('cDeleteEventRemove');
        			$('#idIDEvent'+m).removeClass('cIDRemove').addClass('cIDShow');
        		}else{
        			$('#idDeleteEvent'+m).removeClass('cDeleteEventRemove').addClass('cDeleteEventShow');
        			$('#idIDEvent'+m).removeClass('cIDShow').addClass('cIDRemove');
        		}
        	}
        	
        	
			
		}
	}

	
}

function SetEventFromClick(eventDeviceID, eventAction, eventValue) {
	var selectCalc = '<select id="eventdeviceSelector">';
	for(l=0; l < devicesArray.length; l++){
	  //console.log('devicesArray[n].pd'+devicesArray[n].pd);
	  if (devicesArray[l].pd){
		if(devicesArray[l].id == eventDeviceID){
			selectCalc += '<option value='+devicesArray[l].id+' selected >'+devicesArray[l].name+'</option>';
		} else {
			selectCalc += '<option value='+devicesArray[l].id+'>'+devicesArray[l].name+'</option>';
		}
	  }
	}
	selectCalc += '</select>';
	$("#eventSelectCalc").html(selectCalc);
	//console.log('eventAction=' + eventAction+'=');
	
	if (eventAction == 'on'){
		ClearEventlayout();
		$('input:radio[name=inputType]')[0].checked = true;
	} else if (eventAction == 'off'){
		ClearEventlayout();
		$('input:radio[name=inputType]')[1].checked = true;
	} else if (eventAction == 'toggle'){
		ClearEventlayout();
		$('input:radio[name=inputType]')[2].checked = true;
	} else if (eventAction == 'dim'){
		ClearEventlayout();
		$('input:radio[name=inputType]')[3].checked = true;
		$("#typeDim").val(eventValue);
	} else if (eventAction == 'ton'){
		ClearEventlayout();
		$('input:radio[name=inputType]')[4].checked = true;
		$("#typeTon").val(eventValue);
	} else if (eventAction == 'toff'){
		ClearEventlayout();
		$('input:radio[name=inputType]')[5].checked = true;
		$("#typeToff").val(eventValue);
	} else if (eventAction == 'pulse'){
		ClearEventlayout();
		$('input:radio[name=inputType]')[6].checked = true;
		$("#typePulse").val(eventValue);
	} else if (eventAction == 'blink'){
		ClearEventlayout();
		$('input:radio[name=inputType]')[7].checked = true;
		$("#typeBlink").val(eventValue);
	}
}

function ClearEventlayout() {
	$("#typeDim").val('');
	$("#typeTon").val('');
	$("#typeToff").val('');
	$("#typePulse").val('');
	$("#typeBlink").val('');
	$("#eventAction1").attr("checked",false);
	$("#eventAction2").attr("checked",false);
	$("#eventAction3").attr("checked",false);
	$("#eventAction4").attr("checked",false);
	$("#eventAction5").attr("checked",false);
	$("#eventAction6").attr("checked",false);
	$("#eventAction7").attr("checked",false);
	
}

function newEventButtonClicked() {
	//console.log('newEventButtonClicked=' );
	var eventValue = '';
	var theEvent = '';
	var eventDevID = $("#eventdeviceSelector").val();
	var eventAction = $('input[name=inputType]:checked').val();
	if(eventAction == 'on'){
		eventValue = '100';
	} else if(eventAction == 'off'){	
		eventValue = '0';
	} else if(eventAction == 'toggle'){	
		eventValue = '0';
	} else if(eventAction == 'dim'){
		eventValue = $("#typeDim").val();
	} else if(eventAction == 'ton'){
		eventValue = $("#typeTon").val();
	} else if(eventAction == 'toff'){
		eventValue = $("#typeToff").val();
	} else if(eventAction == 'pulse'){
		eventValue = $("#typePulse").val();
	} else if(eventAction == 'blink'){
		eventValue = $("#typeBlink").val();
	}
	//console.log('newEventButtonClicked '+eventDevID+'-'+eventAction+'-'+eventValue+';');
	theEvent = eventDevID+'-'+eventAction+'-'+eventValue+';';
	
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionsID){
			 
			//console.log('j '+j+'=');
			//console.log('actionsArray[j].events voor '+actionsArray[j].events);
			//actionsArray[j].events += theEvent   // add the new event to the current action
			//console.log('actionsArray[j].events na '+actionsArray[j].events);
			eventChange(actionsID,1,theEvent,'new');
		}
	}
	//ActionEditClicked(actionsID); // reload current action
	
}

function deleteEventButtonClicked() {
	//console.log('deleteEventButtonClicked' );
//	$('#cDeleteEvent').css({'visibility':'visible'});
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionsID){
			ValuesA  = actionsArray[j].events.split(';');
			$("#titleInside89").html(actionsArray[j].name);
        	for(k=0; k < ValuesA.length-1; k++){
        		if(eventsEdit){
        			$('#idDeleteEvent'+k).removeClass('cDeleteEventShow').addClass('cDeleteEventRemove');
        			$('#idIDEvent'+k).removeClass('cIDRemove').addClass('cIDShow');
        		}else{
        			$('#idDeleteEvent'+k).removeClass('cDeleteEventRemove').addClass('cDeleteEventShow');
        			$('#idIDEvent'+k).removeClass('cIDShow').addClass('cIDRemove');
        		}
        	}
        	if(eventsEdit){
        		eventsEdit = 0;
        	}else{
        		eventsEdit = 1;
        	}
			
		}
	}

}

function deleteEventImgClicked(eventNr) {
	//console.log('deleteEventImgClicked='+eventNr );
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionsID){
			var eventstring = actionsArray[j].events
		}
	}
	eventChange(actionsID,eventNr,eventstring,'delete');
}

function deleteEventfromServer(actionID, eventNr) {
	//console.log('deleteEventfromServer='+actionID +'='+eventNr);
	var newEventString ='';
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionID){
			ValuesA  = actionsArray[j].events.split(';');
        	for(k=0; k < ValuesA.length-1; k++){
        		if(k!=eventNr){
        			newEventString += ValuesA[k] +';';
        		}
           	}
			actionsArray[j].events = newEventString;
			//console.log('newEventString='+newEventString );
			ActionEditClicked(actionID);
		}
	}
}

function editEventfromServer(actionID, eventNr, eventString) {
	//console.log('editEventfromServer='+actionID +'='+eventNr+'='+eventString);
	var newEventString ='';
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionID){
			ValuesA  = actionsArray[j].events.split(';');
        	for(k=0; k < ValuesA.length-1; k++){
        		if(k==eventNr){
        			newEventString += eventString +';';
        		}else {
        			newEventString += ValuesA[k] +';';
        		}
           	}
			actionsArray[j].events = newEventString;
			//console.log('editEventfromServer='+newEventString );
			ActionEditClicked(actionID);
		}
	}
}

function newEventfromServer(actionID, eventString) {
	//console.log('newEventfromServer='+actionID +'='+eventString);
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionID){
			actionsArray[j].events += eventString;
			ActionEditClicked(actionID);
		}
	}
}

function editEventButtonClicked() {
	//console.log('editEventButtonClicked eventsNr='+eventsNr );
	var eventValue = '';
	var theEvent = '';
	var eventDevID = $("#eventdeviceSelector").val();
	var eventAction = $('input[name=inputType]:checked').val();
	if(eventAction == 'on'){
		eventValue = '100';
	} else if(eventAction == 'off'){	
		eventValue = '0';
	} else if(eventAction == 'toggle'){	
		eventValue = '0';
	} else if(eventAction == 'dim'){
		eventValue = $("#typeDim").val();
	} else if(eventAction == 'ton'){
		eventValue = $("#typeTon").val();
	} else if(eventAction == 'toff'){
		eventValue = $("#typeToff").val();
	} else if(eventAction == 'pulse'){
		eventValue = $("#typePulse").val();
	} else if(eventAction == 'blink'){
		eventValue = $("#typeBlink").val();
	}
	//console.log('editEventButtonClicked '+eventDevID+'-'+eventAction+'-'+eventValue+';');
	theEvent = eventDevID+'-'+eventAction+'-'+eventValue+';';
	
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionsID){
			 
			//console.log('j '+j+'=');
			//console.log('actionsArray[j].events voor '+actionsArray[j].events);
			//actionsArray[j].events += theEvent   // add the new event to the current action
			//console.log('actionsArray[j].events na '+actionsArray[j].events);
			eventChange(actionsID,eventsNr,theEvent,'edit');
		}
	}
	//ActionEditClicked(actionsID); // reload current action

	
	
}

function deleteActionButtonClicked() {
	//console.log('deleteActionButtonClicked' );
	for(k=0; k < actionsArray.length; k++){
		//console.log('deleteActionButtonClicked '+k );
        if(actionsDelete){
        	$('#idDeleteAction'+k).removeClass('cDeleteActionShow').addClass('cDeleteActionRemove');
        	//$('#idEditAction'+k).removeClass('cEditActionRemove').addClass('cEditActionShow');
        	$('#idIDAction'+k).removeClass('cIDRemove').addClass('cIDShow');
        }else{
        	$('#idDeleteAction'+k).removeClass('cDeleteActionRemove').addClass('cDeleteActionShow');
        	$('#idEditAction'+k).removeClass('cEditActionShow').addClass('cEditActionRemove');
        	$('#idIDAction'+k).removeClass('cIDShow').addClass('cIDRemove');
        }
	}
	actionsEdit = 0;
	if(actionsDelete){
		actionsDelete = 0;
    }else{
    	actionsDelete = 1;
    }
}

function editActionButtonClicked() {
	//console.log('editActionButtonClicked' );
	for(k=0; k < actionsArray.length; k++){
		//console.log('editActionButtonClicked '+k );
        if(actionsEdit){
        	$('#idEditAction'+k).removeClass('cEditActionShow').addClass('cEditActionRemove');
        	$('#idIDAction'+k).removeClass('cIDRemove').addClass('cIDShow');
        }else{
        	$('#idEditAction'+k).removeClass('cEditActionRemove').addClass('cEditActionShow');
        	$('#idDeleteAction'+k).removeClass('cDeleteActionShow').addClass('cDeleteActionRemove');
        	$('#idIDAction'+k).removeClass('cIDShow').addClass('cIDRemove');
        }
	}
	actionsDelete = 0;
	if(actionsEdit){
		actionsEdit = 0;
    }else{
    	actionsEdit = 1;
    }
}

function newActionButtonClicked() {
	//console.log('newActionButtonClicked' );
	$("#infoPanel90").css({"display": "none"});
	$("#infoPanel90").css({"visibility": "visible"});
	$("#infoPanel90").slideDown("slow");
	$("#infoPanel90").html("<div style='position:absolute;left:10px;top:8px;'>Name:</div>");
	$("#infoPanel90").append("<div style='position:absolute;left:8px;top:23px;'><input value='' size='25' type='text' id='inputActionName'></input></div>");
	$("#infoPanel90").append("<div style='width:50px;position:absolute;left:137px;top:40px;' class='inputButtonAreaClass'><div><p><a class='about-this button ' style='width:50px; text-align:center;' onclick='newSubmitActionButtonClicked();'>new</a></p></div></div>");
	$("#infoPanel90").append("<div style='width:50px;position:absolute;left:10px;top:40px;' class='inputButtonAreaClass'><div><p><a class='about-this button ' style='width:50px; text-align:center;' onclick='cancelSubmitActionButtonClicked();'>cancel</a></p></div></div>");
}

function newSubmitActionButtonClicked() {
	var maxid=0;
	var actionname = $("#inputActionName").val();
	//console.log('newSubmitActionButtonClicked '+actionname );
	for(k=0; k < actionsArray.length; k++){
		if(actionsArray[k].id>maxid){
			maxid=actionsArray[k].id
		}
	}
	actionChange(maxid+1,actionname,'new');
}

function cancelSubmitActionButtonClicked() {
	//console.log('cancelSubmitActionButtonClicked ' );
	
	//$("#infoPanel90").css({"visibility": "hidden"});
	//$("#infoPanel90").css({"display": "none"});
	$("#infoPanel90").slideUp("slow");
}

function deleteActionImgClicked(actionid) {
	//console.log('deleteActionImgClicked='+actionid );
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionid){
			var actionname = actionsArray[j].name
			actionChange(actionid,actionname,'delete');
		}
	}
}

function editActionImgClicked(actionid) {
	//console.log('editActionImgClicked='+actionid );
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionid){
			//console.log('editActionImgClicked='+actionsArray[j].name);
			$("#infoPanel90").css({"display": "none"});
			$("#infoPanel90").css({"visibility": "visible"});
			$("#infoPanel90").slideDown("slow");
			$("#infoPanel90").html("<div style='position:absolute;left:10px;top:8px;'>Name:</div>");
			$("#infoPanel90").append("<div style='position:absolute;left:8px;top:23px;'><input value='' size='25' type='text' id='inputActionName'></input></div>");
			$("#infoPanel90").append("<div style='width:50px;position:absolute;left:136px;top:40px;' class='inputButtonAreaClass'><div><p><a class='about-this button ' style='width:50px; text-align:center;' onclick='editSubmitActionButtonClicked();'>edit</a></p></div></div>");
			$("#infoPanel90").append("<div style='width:50px;position:absolute;left:10px;top:40px;' class='inputButtonAreaClass'><div><p><a class='about-this button ' style='width:50px; text-align:center;' onclick='cancelSubmitActionButtonClicked();'>cancel</a></p></div></div>");
			$("#inputActionName").val(actionsArray[j].name);
			actionsID = actionid;
		}
	}
}

function editSubmitActionButtonClicked() {
	var actionname = $("#inputActionName").val();
	//console.log('editSubmitActionButtonClicked '+actionname );
	actionChange(actionsID,actionname,'edit');
}

function editActionfromServer(actionID, actionName) {
	//console.log('editActionfromServer='+actionID+' '+actionName);
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionID){
			actionsArray[j].name = actionName;
			refreshActionList();
			cancelSubmitActionButtonClicked();
		}
	}
}

function deleteActionfromServer(actionID) {
	//console.log('deleteActionfromServer='+actionID);
	for(j=0; j < actionsArray.length; j++){
		if(actionsArray[j].id == actionID){
			actionsArray.splice(j, 1);
			actionsDelete = 1;
			refreshActionList();
		}
	}
}

function newActionfromServer(actionID, actionName) {
	//console.log('newActionfromServer='+actionID+' '+actionName);
	var newAction = [];
	newAction.id = actionID;
	newAction.name = actionName;
	actionsArray.push(newAction);
	refreshActionList();
	cancelSubmitActionButtonClicked();
}

function refreshActionList() {
	var actionCalc = '';
	for(j=0; j < actionsArray.length; j++){
		actionCalc += '<li><div class="cWrap"><div id="idEditAction'+j+'" class="cEditAction cEditActionRemove"><img onclick="editActionImgClicked('+actionsArray[j].id+');" src="/img/edit1616.png"></img></div><div id="idDeleteAction'+j+'" class="cDeleteActionRemove cDeleteAction"><img onclick="deleteActionImgClicked('+actionsArray[j].id+');" src="/img/delete1616.png"></img></div><div id="idIDAction'+j+'" class="cIDShow"><img onclick="editActionImgClicked('+actionsArray[j].id+');" src="/img/text1616.png"></img></div><div onclick="ActionEditClicked('+actionsArray[j].id+');" class="cName">' + actionsArray[j].name + '</div><div style="top:3px;" id="actionEdit' + actionsArray[j].id + '" class="cButton"><img onclick="ActionClicked('+actionsArray[j].id+');" src="/img/compile1616.png"></img></div></div></li>'; 
	}
	$("#actionWrapid460").html(actionCalc);
	for(k=0; k < actionsArray.length; k++){
        if(actionsDelete!=1){
        	$('#idDeleteAction'+k).removeClass('cDeleteActionShow').addClass('cDeleteActionRemove');
        	$('#idIDAction'+k).removeClass('cIDRemove').addClass('cIDShow');
        }else{
        	//$('#idEditAction'+k).removeClass('cEditActionRemove').addClass('cEditActionShow');
        	$('#idDeleteAction'+k).removeClass('cDeleteActionRemove').addClass('cDeleteActionShow');
        	//$('#idDeleteAction'+k).removeClass('cDeleteActionShow').addClass('cDeleteActionRemove');
        	$('#idIDAction'+k).removeClass('cIDShow').addClass('cIDRemove');
        }
	}
}

