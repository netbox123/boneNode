function window_actions(){
	var html="";
	html +="<div class='window' style='height:300px;width:230px;'>";
	html +="    <nav>";
	html +="        <a href='#' class='close'></a>";
	html +="        <a href='#' class='minimize'></a>";
	html +="        <a href='#' class='maximize'></a>";
	html +="        <div class='divh1'>Actions</div>";
	html +="    </nav>";
	for(j=0; j < actionsArray.length; j++){
        var jid = actionsArray[j].id + 5000;
        html +="     <label class='tasks-list-item'>";
        html +="        <span class='tasks-list-desc'>"+actionsArray[j].name+"</span>";
        html +="        <div id='widgetidwrap"+jid+"' class='tasks-list-mark' style='font-size: 14pt;color: #555;'><input type='button' value='run' id='widgetid"+jid+"' /></div>";
        html +="     </label>  "; 
	}	
	html +="</section>";
    return html;
}  

function init_window_actions(){
    for(j=0; j < actionsArray.length; j++){
        var jid = actionsArray[j].id + 5000;
         $('#widgetid'+jid).jqxButton({ width: 90, height: 24, theme: 'bootstrap'}); 
         $('#widgetid'+jid).bind('click', function (event) {
             var eventid = event.target.getAttribute('id').substr(8);
             SendAction(eventid);
             });
    }
}