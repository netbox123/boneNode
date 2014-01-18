
PageItem = function(config) { 

  // configurable parameters
  this.config = 
  {
    id : config.id,
    type : (config.type) ? config.type : 1,
    action : (config.action) ? config.action : "turnon",
    device : (config.device) ? config.device : 1,
    value : (config.value) ? config.value : 78,
    width : (config.value) ? config.width : 100,
    height : (config.value) ? config.height : 100,
    title : (config.title) ? config.title : "Title",
    titleFontColor : (config.titleFontColor) ? config.titleFontColor : "#999999",
    gaugeWidthScale : (config.gaugeWidthScale) ? config.gaugeWidthScale : 1.0,
  };


    var typeItem = this.config.type;
    //console.log(this.config.type+'action'+this.config.action);
    
    if (typeItem == 99) {
        // type=20 : Background pict
        //console.log('action'+this.config.action);
        $("#"+this.config.id).html('<img id="b'+this.config.id+'" src="images/'+this.config.action+'">');
    } else if (typeItem == 1) {
        // type=1 : lamp  title
            $("#"+this.config.id).html('<div id=b'+this.config.id+' type='+this.config.type+' action='+this.config.action+' device='+this.config.device+'><img src="images/IDPNG_Light_Off@2x.png"></div>');

        //this.txtTitle = this.canvas.text(this.params.titleX, this.params.titleY, this.config.title);
       $("#"+this.config.id).html('<div id=b'+this.config.id+' type='+this.config.type+' action='+this.config.action+' device='+this.config.device+'><img src="images/IDPNG_Light_Off@2x.png"></div>');
       // $("#"+this.config.id).html('<button id=b"+this.config.id+" ><img src="images/IDPNG_Light_Off@2x.png"></button>');
    } else if (typeItem == 2) {
         // type=2 : button
         $("#"+this.config.id).html("<button id=b"+this.config.id+" type="+this.config.type+" action="+this.config.action+" device="+this.config.device+">"+this.config.title+"</button>");
    } else if (typeItem == 3) {
         // type=3 : Pagelink
         $("#"+this.config.id).html("<button id=b"+this.config.id+" type="+this.config.type+" action="+this.config.action+" device="+this.config.device+">"+this.config.title+"</button>");
    } else if (typeItem == 10) {
         // type=10 : hmi.slider
         $("#"+this.config.id).html("<div id=slider"+this.config.id+" style=width:30px; height:120px; float:left;'><img src='css/images/slider_thumb1.png' style=top: 156px;></div>");
         $("#slider"+this.config.id).hmiSlider({type:'vert', value:50, style:'chrome' });            
     } else if (typeItem == 11) {
         // type=10 : hmi.slider
         $("#"+this.config.id).html("<div id=slider"+this.config.id+" style=width:30px; height:120px; float:left;'><img src='css/images/slider_thumb1.png' style=top: 156px;></div>");
         $("#slider"+this.config.id).hmiSlider({type:'vert', value:50, style:'chrome' });            
    } else if (typeItem == 12) {
         // type=10 : hmi.slider
         $("#"+this.config.id).html("<div id=slider"+this.config.id+" style=width:30px; height:120px; float:left;'><img src='css/images/slider_thumb1.png' style=top: 156px;></div>");
         $("#slider"+this.config.id).hmiSlider({type:'vert', value:50, style:'chrome' });            
    } else if (typeItem == 13) {
         // type=10 : hmi.slider
         $("#"+this.config.id).html("<div id=slider"+this.config.id+" style=width:30px; height:120px; float:left;'><img src='css/images/slider_thumb1.png' style=top: 156px;></div>");
         $("#slider"+this.config.id).hmiSlider({type:'vert', value:50, style:'chrome' });            
    } else if (typeItem == 14) {
         // type=10 : hmi.slider
         $("#"+this.config.id).html("<div id=slider"+this.config.id+" style=width:30px; height:120px; float:left;'><img src='css/images/slider_thumb1.png' style=top: 156px;></div>");
         $("#slider"+this.config.id).hmiSlider({type:'vert', value:50, style:'chrome' });            
    } else if (typeItem == 15) {
         // type=10 : hmi.slider
         $("#"+this.config.id).html("<div id=slider"+this.config.id+" style=width:30px; height:120px; float:left;'><img src='css/images/slider_thumb1.png' style=top: 156px;></div>");
         $("#slider"+this.config.id).hmiSlider({type:'vert', value:50, style:'chrome' });            






    }
    
  
  
  


  
};


PageItem.prototype.refresh = function(val) {
  if (this.config.type == 1) {
        // type=1 : lamp 
        //alert ('refresh page item');
        if (val == 0) {
           	$("#"+this.config.id).html('<div draggable="false" id=b'+this.config.id+' type='+this.config.type+' action='+this.config.action+' device='+this.config.device+'><img draggable="false" src="images/IDPNG_Light_Off@2x.png"></div>');
    	} else {
  	        $("#"+this.config.id).html('<div draggable="false" id=b'+this.config.id+' type='+this.config.type+' action='+this.config.action+' device='+this.config.device+'><img draggable="false" src="images/IDPNG_Light_On@2x.png"></div>');
        }   
    }
 };

