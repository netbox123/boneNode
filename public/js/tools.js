function drag_start(ev) {
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

function drag_over(event) {
	event.preventDefault();
}

function DragStop(event) {
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

function window_drag_start(ev) {
	if (iswineditmode){
		//$("#pageItemPanel").hide();
		//event.dataTransfer.effectAllowed='move';
		//event = ev.originalEvent;
		//event.originalEvent.dataTransfer.effectAllowed = 'move';
		windowdragstartx = ev.clientX;
		windowdragstarty = ev.clientY;
		windoweventtarget = ev.target.getAttribute('id');
		//event.dataTransfer.setData("text/plain", ev.target.getAttribute('id'));
		console.log('window_drag_start ' + windoweventtarget + ' ' + windowdragstartx + ' ' + windowdragstarty);
	}else{
		ev.dataTransfer.effectAllowed='none';
	}
}


function windowDragStop( event, ui ) {
	if (iswineditmode){
		console.log('windoweventtarget ' + windoweventtarget.substr(10));
  		var offsetXPos = event.clientX;
  		var offsetYPos = event.clientY;
  		//var data = event.dataTransfer.getData("Text");
		var query_str = "";
        for(j=0; j < pagesArray.length; j++){
            if (pagesArray[j].id == windoweventtarget.substr(10)){
                var Arrayid = j;
            }
        }
		console.log((offsetXPos) + '     ' + (offsetYPos));
		query_str += "UPDATE  `nodesql`.`page_ini` SET  ";
		query_str += "`xpos` =  '"+(pagesArray[Arrayid].xpos+offsetXPos-windowdragstartx)+"', `ypos` =  '"+(pagesArray[Arrayid].ypos+offsetYPos-windowdragstarty)+"' ";
		query_str += " WHERE  `page_ini`.`id` ="+pagesArray[Arrayid].id;
		sendQuery(query_str, pagesArray[Arrayid].id, 'page_ini', pagesArray[Arrayid]+offsetXPos-windowdragstartx, pagesArray[Arrayid].ypos+offsetYPos-windowdragstarty);     
		for(j=0; j < pagesArray.length; j++){
			if(pagesArray[j].id == windowID){
				pagesArray[j].xpos = offsetXPos;
				pagesArray[j].ypos = offsetYPos;
			}
		}
  	console.log(query_str);
	}
}


function windowResizeStop( event, ui ) {
	if (iswineditmode){
		console.log('windoweventtarget ' + windoweventtarget.substr(6));
		var windowID = windoweventtarget.substr(6);
  		var windowWidth = ui.size.width;
  		var windowHeight = ui.size.height;
		var query_str = "";
		query_str += "UPDATE  `nodesql`.`page_ini` SET  ";
		query_str += "`width` =  '"+windowWidth+"', `height` =  '"+windowHeight+"' ";
		query_str += " WHERE  `page_ini`.`id` ="+windowID;
		sendQuery(query_str, windowID, 'page_ini', windowWidth, windowHeight);     
		for(j=0; j < pagesArray.length; j++){
			if(pagesArray[j].id == windowID){
				pagesArray[j].width = windowWidth;
				pagesArray[j].height = windowHeight;
			}
		}
  	//alert( "Drag stopped!\n\nOffset: (" + offsetXPos + ", " + offsetYPos + ")\n");
  	console.log(query_str);
	}
}

// --------------------------------------------------------------------- //

function menuClicked( menuID, MenuItem) {
	console.log('menuID ' + menuID + ' MenuItem ' + MenuItem);
	if (menuID == 'Edit' & MenuItem == 'editItems'){
		menuEdit_editItems();	
	} else 	if (menuID == 'Edit' & MenuItem == 'editWindow'){
		menuEdit_editWindow();
	} else 	if (menuID == 'Window' & MenuItem == 'closeAll'){
		menuWindow_closeAll();
	} else 	if (menuID == 'Window' & MenuItem == 'bringFront'){
		menuWindow_bringFront();
	}
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
		console.log('menuWindow_closeAll ' + "windowdrag" + pagesArray[j].id);
		pagesArray[j].vis = 0;
		$("#windowdrag" + pagesArray[j].id).css({"visibility": "hidden"});
		//$("#window" + pagesArray[j].id).css({"visibility": "hidden"});
		$("#window" + pagesArray[j].id).fadeOut(500);
	}
}

function menuWindow_closeOne(windowID) {
	console.log('menuWindow_closeOne ' + "windowID " + windowID);
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			pagesArray[j].vis = 0;
			$("#windowdrag" + pagesArray[j].id).css({"visibility": "hidden"});
			//$("#window" + pagesArray[j].id).css({"visibility": "hidden"});
			//$("#window" + pagesArray[j].id).hide( "clip", 200 );
			$("#window" + pagesArray[j].id).fadeOut(500);
		}
	}
}

function menuWindow_openOne(windowID) {
	console.log('menuWindow_openOne windowID ' + windowID);
	for(j=0; j < pagesArray.length; j++){
		if(pagesArray[j].id == windowID){
			pagesArray[j].vis = 1;
			$("#window" + pagesArray[j].id).css({"display": "none"});
			$("#windowdrag" + pagesArray[j].id).css({"visibility": "visible"});
			$("#window" + pagesArray[j].id).css({"visibility": "visible"});
			$("#window" + pagesArray[j].id).css({"opacity": "1"});
			$("#windowdrag" + pagesArray[j].id).css("z-index", zordermax++);
			$("#window" + pagesArray[j].id).fadeIn( 500 );
			
		}
	}
}

function menuWindow_bringFront() {
	for(j=0; j < pagesArray.length; j++){
		console.log('menuWindow_bringFront ' + "window" + pagesArray[j].id);
		pagesArray[j].vis = 1;
		$("#window" + pagesArray[j].id).css({"display": "show"});
		$("#windowdrag" + pagesArray[j].id).css({"visibility": "visible"});
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
			$('#windowdrag' + pagesArray[j]).css("z-index", zordermax++);
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
	console.log('menuClose ' + menuID);
}