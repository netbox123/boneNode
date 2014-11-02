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
		console.log(itemeventtarget.substr(6)+'-'+pageItemsArray[Arrayid]+'-'+Arrayid);
		query_str += "UPDATE  `nodesql`.`page_items_ini` SET  ";
		query_str += "`xpos` =  '"+(pageItemsArray[Arrayid].xpos+event.clientX-dragstartx)+"', `ypos` =  '"+(pageItemsArray[Arrayid].ypos+event.clientY-dragstarty)+"' ";
		query_str += " WHERE  `page_items_ini`.`id` ="+pageItemsArray[Arrayid].id;
		sendQuery(query_str, pageItemsArray[Arrayid].id, 'page_items_ini', pageItemsArray[Arrayid].xpos+event.clientX-dragstartx, pageItemsArray[Arrayid].ypos+event.clientY-dragstarty);     
		console.log(query_str);
		
	}
}

function window_drag_start(event) {
	console.log('window_drag_start '+event.target.getAttribute('id'));
	windowdragstartx = event.clientX;
	windowdragstarty = event.clientY;
	windoweventtarget = event.target.getAttribute('id');
}

function window_drag_stop(event,ui) {
	var xPos = String(ui.position.left);
    var yPos = String(ui.position.top);
	windowID = windoweventtarget.substr(6);
  	console.log('window_drag_stop ui ' + String(ui.position.left));
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
	console.log('window_resize_start ' + windoweventtarget);
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
	console.log('window_resize_stop ' + windoweventtarget);
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
			console.log('bringWindowToFront ='+windowID);
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
		}
	}
}

function windowMinimize(windowID) {
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			console.log('windowMinimize_' + pagesArray[j].id);
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
			console.log('windowMaximize_' + pagesArray[j].id);
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

function updateItemInfo(ItemID) {
	for(j=0; j < pageItemsArray.length; j++){
		if(pageItemsArray[j].id == ItemID & (pageItemsArray[j].id<440 | pageItemsArray[j].id>460)){
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
			console.log(pageItemsArray[j].id+'-'+pageItemsArray[j].name+'-'+j);
			query_str += "UPDATE  `nodesql`.`page_items_ini` SET  ";
			query_str += "`xpos` =  '"+($("#input441").val())+"', `ypos` =  '"+($("#input442").val())+"', ";
			query_str += "`width` =  '"+($("#input443").val())+"', `height` =  '"+($("#input444").val())+"', ";
			query_str += "`name` =  '"+($("#input440").val())+"', `type` =  '"+($("#input445").val())+"', ";
			query_str += "`device_id` =  '"+($("#input448").val())+"', `page_id` =  '"+($("#input449").val())+"', ";
			query_str += "`action` =  '"+($("#input450").val())+"' ";
			query_str += " WHERE  `page_items_ini`.`id` ="+pageItemsArray[j].id;
			sendQuery(query_str, pageItemsArray[j].id, 'page_items_ini', $("#input441").val(), $("#input442").val());     
			console.log(query_str);
		}
	}
}

function showDock(){
	if ($('#widgetid480').is(':checked')){
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
	console.log('itemClicked ' + itemID);
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