var window_pref="";
window_pref +="<div class='window' style='height:300px;width:220px;'>";
window_pref +="    <nav>";
window_pref +="        <a href='#' class='close'></a>";
window_pref +="        <a href='#' class='minimize'></a>";
window_pref +="        <a href='#' class='maximize'></a>";
window_pref +="        <div class='divh1'>Preferences</div>";
window_pref +="    </nav>";

    
window_pref +="	 <label class='tasks-list-item'>";
window_pref +="		<span class='tasks-list-desc'>Edit mode</span>";
window_pref +="    	<div class='tasks-list-mark'><input id='widgetid1000' height='30' width='55' type='checkbox' class='ios-switch green' /><div><div></div></div></div>";
window_pref +="	 </label>";
window_pref +="	 <label class='tasks-list-item'>";
window_pref +="    	<span class='tasks-list-desc'>Edit bkd picts</span>";
window_pref +="     <div class='tasks-list-mark'><input id='widgetid1001' height='30' width='55' type='checkbox' class='ios-switch green' /><div><div></div></div></div>";
window_pref +="	 </label>  ";
    
window_pref +="     <label class='tasks-list-item'>";
window_pref +="		<span class='tasks-list-desc'>Due Step</span>";
window_pref +="    	<div id='widgetid1002' class='tasks-list-mark' style='font-size: 13pt;color: #555;'>0</div>";
window_pref +="	 </label>";
window_pref +="	 <label class='tasks-list-item'>";
window_pref +="    	<span class='tasks-list-desc'>Time</span>";
window_pref +="        <div id='widgetid1003' class='tasks-list-mark' style='font-size: 13pt;color: #555;'>0</div>";
window_pref +="	 </label>  ";
window_pref +="     <label class='tasks-list-item'>";
window_pref +="    	<span class='tasks-list-desc'>Date</span>";
window_pref +="        <div id='widgetid1004' class='tasks-list-mark' style='font-size: 13pt;color: #555;'>0</div>";
window_pref +="	 </label>  ";
window_pref +="     <label class='tasks-list-item'>";
window_pref +="    	<span class='tasks-list-desc'>Set TimeDate</span>";
window_pref +="        <div id='widgetidwrap1006' class='tasks-list-mark' style='font-size: 14pt;color: #555;'><input type='button' value='Set' id='widgetid1006' /></div>";
window_pref +="	 </label>  ";
window_pref +="     <label class='tasks-list-item'>";
window_pref +="    	<span class='tasks-list-desc'>Temp script</span>";
window_pref +="        <div id='widgetidwrap1007' class='tasks-list-mark' style='font-size: 14pt;color: #555;'><input type='button' value='Start' id='widgetid1007' /></div>";
window_pref +="	 </label>  ";
window_pref +="     <label class='tasks-list-item'>";
window_pref +="        <span class='tasks-list-desc'>ServerDB</span>";
window_pref +="        <div id='widgetidwrap1008' class='tasks-list-mark' style='font-size: 14pt;color: #555;'><input type='button' value='Reload' id='widgetid1008' /></div>";
window_pref +="	 </label>  ";
window_pref +="</section>";
  
  
function init_window_pref(){
    $("#widgetid1000").bind('change', function (event) {
    			if($("#widgetid1000").is(":checked")){
					iseditmode = 1;
					$(".hmi-wrap").css({"border": "1px #803 solid"});
				} else {
					iseditmode = 0;
					$(".hmi-wrap").css({"border": "1px transparent solid"});
				 }
      });
     $("#widgetid1001").bind('change', function (event) {
        		if($("#widgetid1001").is(":checked")){
					iseditbkgmode = 1;
					$(".bkg-wrap").css({"border": "1px #803 solid"});
				} else {
					iseditbkgmode = 0;
					$(".bkg-wrap").css({"border": "1px transparent solid"});
				 }
      });
      $("#widgetid1006").jqxButton({ width: 90, height: 24, theme: 'bootstrap'}); 
      var milliseconds = new Date().getTime();
      milliseconds += 3600000;
      $("#widgetid1006").bind('click', function (event) {SendServerCommand('settime-'+milliseconds);});
      $("#widgetid1007").jqxButton({ width: 90, height: 24, theme: 'bootstrap'});
      $("#widgetid1007").bind('click', function (event) {SendServerCommand('starttemp');});
      $("#widgetid1008").jqxButton({ width: 90, height: 24, theme: 'bootstrap'});
      $("#widgetid1008").bind('click', function (event) {SendServerCommand('reloaddb');});
      
}  