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