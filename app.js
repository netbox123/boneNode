var hasMySQL        = 1;                // Loading from: 0=jsonFile, 1=MySQL 
var hasBonescript   = 1;                // Bonescript: 0=no, 1=available
var runMode         = 0;                // Run mode: 0=normal, 1=demo mode
//----------------------------------------------------------------------------//
var serialPortDue   = '/dev/ttyO4';
var outputFilePath  = __dirname + '/data/'; 
var tempdirectory   = '/sys/bus/w1/devices/';
var RunningOnBBB    = 0;
var fs              = require('fs');
var sys             = require('sys');
var b               = require('bonescript');
var mysql           = require('mysql');
var lib_database    = require('./database.js');
var serialPortData  = '';
var optionsPort     = {baudrate: 9600, parser: b.serialParsers.readline("\n")};
function puts(error, stdout, stderr) { sys.puts(stdout) }

var configArray     = [];
var inputsArray     = [];
var devicesArray    = [];
var pageItemsArray  = [];
var actionsArray    = [];
var tempsensorArray = [];
var pagesArray      = [];
var node_names      = [];
var node_addresses  = [];
var timersArray     = [];
var itemTypesArray  = [];
var linksArray      = [];

bmv_v = '';
bmv_i = '';
bmv_ce = '';
bmv_soc = '';
bmv_ttg = '';
bmv_alarm = '';
bmv_relay = '';

due_step = '365597765';
due_pins = '';

t_BU = '';
t_WK = '';
t_K1 = '';
t_K2 = '';
t_B1 = '';
t_B2 = '';
t_B3 = '';
t_G1 = '';
t_G2 = '';

var path = require('path');
var express = require('express'),app = express();
app.use(express.static(path.join(__dirname, 'public')));
var server = require('http').createServer(app),io = require('socket.io').listen(server);

//setPins();

if (hasMySQL){
    console.log('Loading database...');
    loadDatbase();
} else {
    console.log('Loading files...');
    LoadFromFile();
}

setTimeout(function(){ InitApp(); },500); // relax a bit, waiting for DB.

function InitApp() {
    b.serialOpen(serialPortDue, optionsPort, onSerial);
    console.log('serialPortDue opened...');
    setInterval(function() {UpdateDevicesArray();}, 1000);
    setInterval(function() {onDemoMode();}, 1000);
    var port = process.env.PORT || CONFIG.port;
    server.listen(4000); // listen on port 
    app.get('/', function(req, res){res.sendFile(__dirname + '/index.html');});
    console.log('Server listening on port process.env.PORT');
}

io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
        var timeText = getDateTime();
		if (node_names.indexOf(data) != -1){
			callback(false);
		} else{
			callback(true);
			socket.nickname = data;
            socket.address =  socket.handshake.address;
            console.log(data+' connected from '+socket.address + ':' + socket.address.port);
    		io.sockets.emit('new message', {msg: '', nick: timeText + socket.address + " " + socket.nickname, title: 'Client connected', address: socket.address});
			node_names.push(socket.nickname);
			node_addresses.push(socket.handshake.address);
			sendAllArrays();
		}
	});
    
	//  -- sendAllArrays to client --
	function sendAllArrays(){
	    socket.emit('config', configArray);
		socket.emit('usernames', node_names);
		socket.emit('devices', devicesArray);
        socket.emit('inputs', inputsArray);
        socket.emit('actions', actionsArray);
		socket.emit('pages', pagesArray);
		socket.emit('timers', timersArray);
		socket.emit('item_types', itemTypesArray);
		socket.emit('links', linksArray);
		socket.emit('pageitems', pageItemsArray);
	}
	
	//  -- Message received from client --
	socket.on('send message', function(data){
        var timeText = getDateTime();
		io.sockets.emit('new message', {msg: data, nick: timeText + socket.nickname + ':' });
	});
    
        
	//  -- GetAllValues received from client --
	socket.on('getallvalues', function(data){
        var valstr = '';
        for (var i in devicesArray) {
            valstr += devicesArray[i].id+'#'+devicesArray[i].val + '*';
        }
		socket.emit('sendallvalues', {msg: valstr});
		//console.log(valstr);
	});
	
	//  -- getSerialText received from client --
	socket.on('getserialtext', function(data){
        socket.emit('sendserialtext', {msg: serialPortData});
		//console.log(valstr);
	});
    
    //  -- Servercommand received from client --
	socket.on('sendservercommand', function(data){
        var timeText = getDateTime();
        temparray = data.split('-');
        if (temparray[0] == 'settime'){
            var datetime = new Date();
            var b = require('bonescript');
            io.sockets.emit('new message', {msg: 'time set', nick: timeText + socket.address + " " + socket.nickname, title: 'Servercommand:settime' , address: socket.address });
            datetime.setTime(temparray[1]);
            console.log('settime to '+datetime);
            b.setDate(datetime.toString());
            //io.sockets.emit('new message', {msg: datetime.toString(), nick: timeText });
        } else if(temparray[0] == 'starttemp'){
              io.sockets.emit('new message', {
                    title: 'Start temp script ',
                    nick: 'echo BB-W1:00A0 > /sys/devices/bone_capemgr.9/slots',
    				msg:  '',
                    data: data,
                    timeText: 'testtimetext'
				});
            console.log('starttemp');
        } else if(temparray[0] == 'reloaddb'){
        	//loadDatbase();
            console.log('reloaddb - database reloaded');
            SyncDevicesArrayFromSerial();
            io.sockets.emit('new message', {msg: 'reloaddb - database reloaded', nick: timeText + socket.address + " " + socket.nickname, address: socket.address });
        } else if(temparray[0] == 'writefile'){
            console.log('writefile');
            io.sockets.emit('new message', {msg: 'files saved', title: 'Servercommand:writefile' , nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
            writeToFiles();
	    } else if(temparray[0] == 'emptyserver'){
            console.log('emptyserver');
            io.sockets.emit('new message', {msg: 'emptyserver', title: 'Servercommand' , nick: timeText + socket.address + " " + socket.nickname , address: socket.address});
            EmptyServer();
        } else if(temparray[0] == 'loadfromdb'){
            console.log('loadfromdb');
            io.sockets.emit('new message', {msg: 'loadfromdb ', title: 'Servercommand' , nick: timeText + socket.address + " " + socket.nickname, address: socket.address });
            loadDatbase();
        } else if(temparray[0] == 'loadfromfile'){
            console.log('loadfromfile');
            io.sockets.emit('new message', {msg: 'loadfromfile ', title: 'Servercommand' , nick: timeText + socket.address + " " + socket.nickname });
            LoadFromFile();
        }
	});
    
    
    //  -- eventChange received from client --
    socket.on('eventchange', function(data){
        //console.log('eventchange '+data.action_id);
        var timeText = getDateTime();
        if(data.event_action == 'new'){
            for(j=0; j < actionsArray.length; j++){
		        if(actionsArray[j].id == data.action_id){
			        actionsArray[j].events += data.event_string;
			        var query_str = "UPDATE  `nodesql`.`action` SET  ";
		            query_str += "`events` =  '"+actionsArray[j].events+"'  ";
		            query_str += " WHERE  `action`.`id` ="+data.action_id;
		            sendSqlQuery(query_str);     
	        	}
        	}
        } else if(data.event_action == 'edit'){
        	var newEventString ='';
	        for(j=0; j < actionsArray.length; j++){
		        if(actionsArray[j].id == data.action_id){
			        ValuesA  = actionsArray[j].events.split(';');
        	        for(k=0; k < ValuesA.length-1; k++){
        		        if(k==data.event_nr){
        			        newEventString += data.event_string;
        		        }else {
        			        newEventString += ValuesA[k] +';';
        		        }
           	        }
			        actionsArray[j].events = newEventString;
			        var query_str = "UPDATE  `nodesql`.`action` SET  ";
		            query_str += "`events` =  '"+actionsArray[j].events+"'  ";
		            query_str += " WHERE  `action`.`id` ="+data.action_id;
		            sendSqlQuery(query_str);    
		        }
	        }
        } else if(data.event_action == 'delete'){
        	var newEventString ='';
	        for(j=0; j < actionsArray.length; j++){
		        if(actionsArray[j].id == data.action_id){
			        ValuesA  = actionsArray[j].events.split(';');
        	        for(k=0; k < ValuesA.length-1; k++){
        		        if(k!=data.event_nr){
        			        newEventString += ValuesA[k] +';';
        		        }
           	        }
			        actionsArray[j].events = newEventString;
			        var query_str = "UPDATE  `nodesql`.`action` SET  ";
		            query_str += "`events` =  '"+actionsArray[j].events+"'  ";
		            query_str += " WHERE  `action`.`id` ="+data.action_id;
		            sendSqlQuery(query_str);  
		        }
	        }
        }
        io.sockets.emit('eventchanged', data);
    });
    
     //  -- actionChange received from client --
    socket.on('actionchange', function(data){
        //console.log('actionchange '+data.action_id);
        var timeText = getDateTime();
        if(data.action_action == 'new'){
	        var newAction = {};
            newAction.id = data.action_id;
            newAction.name = data.action_name;
            newAction.events = "";
            actionsArray.push(newAction); 
            var query_str = "INSERT INTO `nodesql`.`action` ";
	        query_str +="(`id`, `name`, `events`) ";
            query_str +="VALUES ('"+data.action_id+"','"+data.action_name+"','"+data.action_events+"')";
		    sendSqlQuery(query_str);     
        } else if(data.action_action == 'edit'){
        	var newEventString ='';
	        for(j=0; j < actionsArray.length; j++){
		        if(actionsArray[j].id == data.action_id){
		            actionsArray[j].name = data.action_name;
		            var query_str = "UPDATE  `nodesql`.`action` SET  ";
		            query_str += "`name` =  '"+actionsArray[j].name+"'  ";
		            query_str += " WHERE  `action`.`id` ="+data.action_id;
		            sendSqlQuery(query_str);    
		        }
	        }
        } else if(data.action_action == 'delete'){
        	var newEventString ='';
	        for(j=0; j < actionsArray.length; j++){
		        if(actionsArray[j].id == data.action_id){
			        actionsArray.splice(j, 1);
			        var query_str = "DELETE FROM `nodesql`.`action` ";
	                query_str += " WHERE  `action`.`id` ="+data.action_id;
		            sendSqlQuery(query_str);  
		        }
	        }
        }
        io.sockets.emit('actionchanged', data);
        io.sockets.emit('new message', {msg: 'action changed', title: 'action '+data.action_name, nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
    });
    
    //  -- timerChange received from client --
    socket.on('timerchange', function(data){
        //console.log('timerchange '+data.timer_id+'name '+data.timer_name+'time '+data.timer_time);
        var timeText = getDateTime();
        if(data.timer_action == 'new'){
	        var newTimer = {};
            newTimer.id = data.timer_id;
            newTimer.name = data.timer_name;
            newTimer.time = data.timer_time;
            newTimer.day = data.timer_day;
            newTimer.onoff = data.timer_onoff;
            newTimer.action = data.timer_actionid;
            timersArray.push(newTimer);  
            var query_str = "INSERT INTO `nodesql`.`timer` ";
	        query_str +="(`id`, `name`, `time`, `day`, `onoff`, `action`) ";
            query_str +="VALUES ('"+data.timer_id+"','"+data.timer_name+"','"+data.timer_time+"','"+data.timer_day+"','"+data.timer_onoff+"','"+data.timer_actionid+"')";
            sendSqlQuery(query_str);     
        } else if(data.timer_action == 'edit'){
        	var newEventString ='';
	        for(j=0; j < timersArray.length; j++){
		        if(timersArray[j].id == data.timer_id){
		            timersArray[j].name = data.timer_name;
                    timersArray[j].time = data.timer_time;
                    timersArray[j].day = data.timer_day;
                    timersArray[j].onoff = data.timer_onoff;
                    timersArray[j].action = data.timer_actionid;
		            var query_str = "UPDATE  `nodesql`.`timer` SET  ";
		            query_str += "`name` =  '"+timersArray[j].name+"',  ";
		            query_str += "`time` =  '"+timersArray[j].name+"',  ";
		            query_str += "`day` =  '"+timersArray[j].name+"',  ";
		            query_str += "`onoff` =  '"+timersArray[j].name+"',  ";
		            query_str += "`action` =  '"+timersArray[j].name+"'  ";
		            query_str += " WHERE  `timer`.`id` ="+data.timer_id;
		            sendSqlQuery(query_str);    
		        }
	        }
        } else if(data.timer_action == 'delete'){
        	var newEventString ='';
	        for(j=0; j < timersArray.length; j++){
		        if(timersArray[j].id == data.timer_id){
		            timersArray.splice(j, 1);
		            var query_str = "DELETE FROM `nodesql`.`timer` ";
	                query_str += " WHERE  `timer`.`id` = "+data.timer_id;
		            sendSqlQuery(query_str);  
		        }
	        }
        }
        io.sockets.emit('timerchanged', data);
        io.sockets.emit('new message', {msg: 'timer changed', title: 'timer '+data.timer_name+' '+data.timer_action, nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
    });
    
    //  -- linkChange received from client --
    socket.on('linkchange', function(data){
        console.log('linkchange '+data.link_id);
        var timeText = getDateTime();
        if(data.link_action == 'new'){
	        var newLink = {};
            newLink.id = data.link_id;
            newLink.name = data.link_name;
            newLink.url = data.link_url;
            newLink.type = data.link_type;
            newLink.menu = data.link_menu;
            linksArray.push(newLink);
            var query_str = "INSERT INTO `nodesql`.`link` ";
	        query_str +="(`id`, `name`, `url`, `type`, `menu`) ";
            query_str +="VALUES ('"+data.link_id+"','"+data.link_name+"','"+data.link_url+"','"+data.link_type+"','"+data.link_menu+"' )";
            sendSqlQuery(query_str);     
        } else if(data.link_action == 'edit'){
	        for(j=0; j < linksArray.length; j++){
		        if(linksArray[j].id == data.link_id){
                    linksArray[j].name = data.link_name;
                    linksArray[j].url = data.link_url;
                    linksArray[j].type = data.link_type;
                    linksArray[j].menu = data.link_menu;
		            var query_str = "UPDATE  `nodesql`.`link` SET  ";
		            query_str += "`name` =  '"+linksArray[j].name+"',  ";
		            query_str += "`url` =  '"+linksArray[j].url+"',  ";
		            query_str += "`type` =  '"+linksArray[j].type+"',  ";
		            query_str += "`menu` =  '"+linksArray[j].menu+"'  ";
		            query_str += " WHERE  `link`.`id` ="+data.link_id;
		            sendSqlQuery(query_str);    
		        }
	        }
        } else if(data.link_action == 'delete'){
        	var newEventString ='';
	        for(j=0; j < linksArray.length; j++){
		        if(linksArray[j].id == data.link_id){
			        linksArray.splice(j, 1);
		            var query_str = "DELETE FROM `nodesql`.`link` ";
	                query_str += " WHERE  `link`.`id` = "+data.link_id;
		            sendSqlQuery(query_str);  
		        }
	        }
        }
        io.sockets.emit('linkchanged', data);
        io.sockets.emit('new message', {msg: 'link changed', title: 'link '+data.link_name, nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
    });
    
    //  -- SendDueSerial received from client --
    socket.on('senddueserial', function(data){
        console.log('senddueserial '+data);
        b.serialWrite(serialPortDue, data + '\n');
    });
    
    //  -- SavePreferences received from client --
    socket.on('savepreferences', function(data){
        console.log('savepreferences'+data.version);
        var timeText = getDateTime();
        configArray[0].version = data.version;
        configArray[0].hasDock = data.hasDock;
        io.sockets.emit('preferencesSave', {msg: data});
		io.sockets.emit('new message', {msg: 'version '+data.version, title: 'Save preferences' , nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
    });
    
    //  -- SaveWindow received from client --
    socket.on('savewindow', function(data){
        console.log('savewindow '+data.name);
        var timeText = getDateTime();
        for(j=0; j < pagesArray.length; j++){
		    if(pagesArray[j].id == data.id){
		        pagesArray[j].name = data.name;
		        pagesArray[j].xpos = data.xpos;
		        pagesArray[j].ypos = data.ypos;
		        pagesArray[j].width = data.width;
		        pagesArray[j].height = data.height;
		        pagesArray[j].vis = data.vis;
		        io.sockets.emit('windowUpdate', {msg: data});
		        io.sockets.emit('new message', {msg: 'Save page '+data.id+'-'+data.name, title: 'Query:' , nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
		    }
        }
        
    });
    
    //  -- Newitem received from client --
    socket.on('newitem', function(data){
        console.log('newitem '+data.name);
        var timeText = getDateTime();
        pageItemsArray.push(data);
		io.sockets.emit('itemNew', {msg: data});
        io.sockets.emit('new message', {msg: 'New item '+data.id+'-'+data.name, title: 'Query:' , nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
    });
    
    //  -- Deleteitem received from client --
    socket.on('deleteitem', function(data){
        console.log('deleteitem '+data);
        var timeText = getDateTime();
        var index;
        for(j=0; j < pageItemsArray.length; j++){
		    if(pageItemsArray[j].id == data){
		        index=j;
		    }
        }
        pageItemsArray.splice(index, 1);
		io.sockets.emit('itemDelete', {msg: data});
        io.sockets.emit('new message', {msg: 'Delete item '+data+'-'+data.name, title: 'Query:' , nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
    });
    
    //  -- Saveitem received from client --
    socket.on('saveitem', function(data){
        console.log('saveitem '+data.name);
        var timeText = getDateTime();
        for(j=0; j < pageItemsArray.length; j++){
		    if(pageItemsArray[j].id == data.id){
		        pageItemsArray[j].name = data.name;
		        pageItemsArray[j].xpos = data.xpos;
		        pageItemsArray[j].ypos = data.ypos;
		        pageItemsArray[j].width = data.width;
		        pageItemsArray[j].height = data.height;
		        pageItemsArray[j].type = data.type;
		        pageItemsArray[j].device_id = data.device_id;
		        pageItemsArray[j].page_id = data.page_id;
		        pageItemsArray[j].action = data.action;
		        io.sockets.emit('itemUpdate', {msg: data});
            	//io.sockets.emit('new message', {msg: 'Save item '+data.id+'-'+data.name, title: 'Query:' , nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
		    }
        }
    });
    
    //  -- Query received from client --
	socket.on('send query', function(data){
        var pageItemA = [];
        var mysql      = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',
        	user     : 'root',
  	        password : 'pipo',
  	        database : 'nodesql'
        });
        connection.connect();
        connection.query(data.msg, function(err, result, fields) {
	    if (err) throw err;

        });
        connection.end();
        //console.log('data.id='+data.id);
        if (data.rectype='page_items'){
          for(j=0; j < pageItemsArray.length; j++){
                pageItemA = pageItemsArray[j];
                  if(pageItemA.id == data.id){
                      pageItemA.xpos = data.xpos;
                      pageItemA.ypos = data.ypos;
                  }
            }
        
            var timeText = getDateTime();
        	//io.sockets.emit('new message', {msg: data.type+' '+data.id+'-'+data.name, title: 'Query:' , nick: timeText + socket.address + " " + socket.nickname, address: socket.address});
            io.sockets.emit('pageitem change', {id: data.id,xpos: data.xpos,ypos: data.ypos});
            
        }   
	});
	
	//  -- Action received from client --
	socket.on('send action', function(data){
        runRawAction(data)
        //console.log('data '+data);
    });
	
	//  -- Client disconnected --
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		node_names.splice(node_names.indexOf(socket.nickname), 1);
		//updatenode_names();
	});

});

//  ------------------------------------------------------------------------------------------------------------------------

function onDemoMode() {
	if (runMode){
	    due_step = parseInt(due_step) + 1;
        t_K1 = t_K1+(Math.random()/10)-.05;if(t_K1<70){t_K1=70};if(t_K1>82){t_K1=82};
		t_K2 = t_K2+(Math.random()/10)-.05;if(t_K2<54){t_K2=54};if(t_K2>65){t_K2=65};
		t_B1 = t_B1+(Math.random()/10)-.05;if(t_B1<63.3){t_B1=63.3};if(t_B1>65){t_B1=65};
		t_B2 = t_B2+(Math.random()/10)-.05;if(t_B2<45){t_B2=45.6};if(t_B2>49.8){t_B2=49.8};
		t_B3 = t_B3+(Math.random()/10)-.05;if(t_B3<12){t_B3=12};if(t_B3>17.3){t_B3=17.3};
		t_G1 = t_G1+(Math.random()/10)-.05;if(t_G1<17.5){t_G1=17.5};if(t_G1>21.2){t_G1=21.2};
		t_G2 = t_G2+(Math.random()/10)-.05;if(t_G2<18){t_G2=18};if(t_G2>23.4){t_G2=23.4};
		t_WK = t_WK+(Math.random()/10)-.05;if(t_WK<19.3){t_WK=19.3};if(t_WK>25){t_WK=25};
		t_BU = t_BU+(Math.random()/10)-.05;if(t_BU<8.4){t_BU=8.4};if(t_BU>15.1){t_BU=15.1};
		
	    bmv_v = bmv_v-(Math.random()*4)+1;if(bmv_v<23800){bmv_v=26200};if(bmv_v>27000){bmv_v=26200};
		bmv_i = bmv_i+(Math.random()*15)-5;if(bmv_i>-4500){bmv_i=-4500};if(bmv_i<-4700){bmv_i=-4600};
		bmv_ce = bmv_ce-(Math.random()*5);if(bmv_ce>-72300){bmv_ce=-93400};if(bmv_ce<-76000){bmv_ce=-74000};
		bmv_soc = bmv_soc-(Math.random()/5);if(bmv_soc<720){bmv_soc=800};if(bmv_soc>815){bmv_soc=812};
		bmv_ttg = bmv_ttg+(Math.random()*10)-5;if(bmv_ttg<2234){bmv_ttg=2234};if(bmv_ttg>2478){bmv_ttg=2478};
		bmv_alarm = 'OFF';
		bmv_relay = 'OFF';
		serialPortData ='{"simulated-due":{"step":'+due_step+',"t_BU":'+t_BU.toFixed(2)+',"t_WK":'+t_WK.toFixed(2)+',"t_K1":'+t_K1.toFixed(2)+',"t_K2":'+t_K2.toFixed(2)+',"t_B1":'+t_B1.toFixed(2)+',"t_B2":'+t_B2.toFixed(2)+',"t_B3":'+t_B3.toFixed(2)+',"t_G1":'+t_G1.toFixed(2)+',"t_G2":'+t_G2.toFixed(2)+',"bmv_V":'+bmv_v.toFixed(0)+',"bmv_I":'+bmv_i.toFixed(0)+',"bmv_CE":'+bmv_ce.toFixed(0)+',"bmv_SOC":'+bmv_soc.toFixed(0)+',"bmv_TTG":'+bmv_ttg.toFixed(0)+',"bmv_Alarm":"'+bmv_alarm+'","bmv_Relay":"'+bmv_relay+'","pins":"0001101000010001011010000000000100"}}\n';

		
	}
}

function onSerial(x) {
	if (runMode == 0){
		if (x.err) {
			console.log('***ERROR*** ' + JSON.stringify(x));
		}
		if (x.event == 'open') {
		   //console.log('***OPENED***');
		}
		if (x.event == 'data') {
			//console.log(String(x.data));
			try {
				serialPortData = String(x.data);
				data_json = JSON.parse(String(x.data));
				due_step = data_json.due.step;
				due_pins = data_json.due.pins;
				bmv_v = data_json.due.bmv_V;
				bmv_i = data_json.due.bmv_I;
				bmv_ce = data_json.due.bmv_CE;
				bmv_soc = data_json.due.bmv_SOC;
				bmv_ttg = data_json.due.bmv_TTG;
				bmv_alarm = data_json.due.bmv_Alarm;
				bmv_relay = data_json.due.bmv_Relay;
				t_K1 = data_json.due.t_K1;
				t_K2 = data_json.due.t_K2;
				t_B1 = data_json.due.t_B1;
				t_B2 = data_json.due.t_B2;
				t_B3 = data_json.due.t_B3;
				t_G1 = data_json.due.t_G1;
				t_G2 = data_json.due.t_G2;
				t_WK = data_json.due.t_WK;
				t_BU = data_json.due.t_BU;
				SyncDevicesArrayFromSerial();
			} catch (e) {
				console.log('Serial parse error ' + e);
			}
		}
	}
}




function setDeviceVal(deviceid, val) {
    for (var i in devicesArray) {
		if (deviceid == devicesArray[i].id){
			devicesArray[i].val = val;
		}
		
	 }
}

function loadDatbase() {
    lib_database.loadConfig('SELECT * FROM config', function(result) {configArray = lib_database._configArray;console.log('Config: '+configArray.length);});
    lib_database.loadDevices('SELECT * FROM device', function(result) {devicesArray = lib_database._devicesArray;console.log('Devices: '+devicesArray.length);});
    lib_database.loadPages('SELECT * FROM page', function(result) {pagesArray = lib_database._pagesArray;console.log('Pages: '+pagesArray.length);});   
    lib_database.loadPageItems('SELECT * FROM page_items order by type DESC', function(result) {pageItemsArray = lib_database._pageItemsArray;console.log('PageItems: '+pageItemsArray.length);});
    lib_database.loadActions('SELECT * FROM action', function(result) {actionsArray = lib_database._actionsArray;console.log('Actions: '+actionsArray.length);});  
    lib_database.loadInputs('SELECT * FROM device WHERE type=3', function(result) {inputsArray = lib_database._inputsArray;console.log('Inputs: '+inputsArray.length);});
    lib_database.loadTimers('SELECT * FROM timer', function(result) {timersArray = lib_database._timersArray;console.log('Timers: '+timersArray.length);});
    lib_database.loadItemTypes('SELECT * FROM item_types', function(result) {itemTypesArray = lib_database._itemTypesArray;console.log('ItemTypes: '+itemTypesArray.length);});
    lib_database.loadLinks('SELECT * FROM link', function(result) {linksArray = lib_database._linksArray;console.log('Links: '+linksArray.length);});
    lib_database.connectionEnd();
}

function UpdateDevicesArray() {
    var datetime = new Date();
    var timenow = new Date().getTime(); 
    timenow = parseInt(timenow/1000);
    for (var i in devicesArray) {
        if (devicesArray[i].id == 1002){devicesArray[i].val = due_step;}
        if (devicesArray[i].id == 1003){devicesArray[i].val = [(datetime.getHours()).padLeft(), (datetime.getMinutes()).padLeft(), datetime.getSeconds().padLeft()].join(':');}
        if (devicesArray[i].id == 1004){devicesArray[i].val = [datetime.getDate().padLeft(), (datetime.getMonth()+1).padLeft(), datetime.getFullYear()].join('-');}
        if (devicesArray[i].id == 1005){devicesArray[i].val = Date.now();}
        
        if (devicesArray[i].id == 1010){devicesArray[i].val = datetime.getSeconds().padLeft()}
        if (devicesArray[i].id == 1011){devicesArray[i].val = datetime.getMinutes().padLeft()}
        if (devicesArray[i].id == 1012){devicesArray[i].val = datetime.getHours()}
        
        if (devicesArray[i].id == 3001){devicesArray[i].val = Number(bmv_v/1000).toFixed(2)+' V';}
        if (devicesArray[i].id == 3002){devicesArray[i].val = Number(bmv_i/1000).toFixed(2);}
        if (devicesArray[i].id == 3003){devicesArray[i].val = Number(bmv_ce/1000).toFixed(2)+' Ah';}
        if (devicesArray[i].id == 3004){devicesArray[i].val = Number(bmv_soc/10).toFixed(1)+' %';}
        if (devicesArray[i].id == 3005){devicesArray[i].val = Number(bmv_ttg).toFixed(0)+' m.';}
        if (devicesArray[i].id == 3006){devicesArray[i].val = bmv_alarm;}
        if (devicesArray[i].id == 3007){devicesArray[i].val = bmv_relay;}
        if (devicesArray[i].id == 3008){devicesArray[i].val = Number(bmv_v*bmv_i/1000000).toFixed(2)+' W';}
        if (devicesArray[i].id == 3009){devicesArray[i].val = Number(bmv_soc/10).toFixed(0)+'%';}
        
        if (devicesArray[i].id == 4002){devicesArray[i].val = Number(t_K1).toFixed(1)+'&deg;C';}
        if (devicesArray[i].id == 4003){devicesArray[i].val = Number(t_K2).toFixed(1)+'&deg;C';}
        if (devicesArray[i].id == 4004){devicesArray[i].val = Number(t_B1).toFixed(1)+'&deg;C';}
        if (devicesArray[i].id == 4005){devicesArray[i].val = Number(t_B2).toFixed(1)+'&deg;C';}
        if (devicesArray[i].id == 4006){devicesArray[i].val = Number(t_B3).toFixed(1)+'&deg;C';}
        if (devicesArray[i].id == 4009){devicesArray[i].val = Number(t_G2).toFixed(1)+'&deg;C';}
        if (devicesArray[i].id == 4008){devicesArray[i].val = Number(t_BU).toFixed(1)+'&deg;C';}
        if (devicesArray[i].id == 4007){devicesArray[i].val = Number(t_G1).toFixed(1)+'&deg;C';}
        if (devicesArray[i].id == 4001){devicesArray[i].val = Number(t_WK).toFixed(1)+'&deg;C';}
        
        if ((devicesArray[i].toff>0) & (devicesArray[i].toff<timenow)){
            devicesArray[i].toff=0;
            switchLamp(devicesArray[i].id,0);
            io.sockets.emit('new message', {
                    title: 'Device ' + devicesArray[i].name + ' turned off',
                    nick: 'timed off',
    				msg:  devicesArray[i].pin+' off',
					data: 'data',
                    timeText: Date.now()
			        });
            }        
    
    }
    for (var i in timersArray) {
        var timerHourCalc = timersArray[i].time.substr(0,2);
		var timerMinCalc = timersArray[i].time.substr(3,2);
		if (timerHourCalc == datetime.getHours() & timerMinCalc == datetime.getMinutes() & datetime.getSeconds() == 0){
		    for(j=0; j < actionsArray.length; j++){
		        if(timersArray[i].action == actionsArray[j].id){
		            b.serialWrite(serialPortDue, actionsArray[j].events + '\n'); 
		        }
		    }
		}
    }
}

function SyncDevicesArrayFromSerial() {
    for (var i in devicesArray) {
        if (devicesArray[i].due > 20 & devicesArray[i].due < 54) {
            var pos = devicesArray[i].due - 20;
            var res = due_pins.substring(pos, pos+1);
            if (res == '1'){
                if (devicesArray[i].val == 0){
                    devicesArray[i].val = 100;
				    io.sockets.emit('device change', devicesArray[i].id + '-on-100');
                }
            } else {
                if (devicesArray[i].val == 100){
                    devicesArray[i].val = 0;
				    io.sockets.emit('device change', devicesArray[i].id + '-off-0');
                }
            }
           
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

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function logDatabase() {
    var connection = mysql.createConnection({host: 'localhost',user: 'root',password: 'pipo',database: 'nodesql'});
    var querystring = "INSERT INTO `nodesql`.`log` (`t_WK`, `t_K1`, `t_K2`, `t_B1`, `t_B2`, `t_B3`, `t_G1`, `t_G2`, `t_BU`, `b_V`, `b_I`, `b_CE`, `b_SOC`) VALUES ("+t_WK+", "+t_K1+", "+t_K2+", "+t_B1+", "+t_B2+", "+t_B3+", "+t_G1+", "+t_G2+", "+t_BU+", "+bmv_v+", "+bmv_i+", "+bmv_ce+", "+bmv_soc+");"
    //console.log(querystring);
    connection.connect();
   // connection.query(querystring, function(err, result) {
   // 	if (err) throw err;
//	});
	
}
  
function writeToFiles(){
    var outputFilename = outputFilePath + 'config.json';
    fs.writeFile(outputFilename, JSON.stringify(configArray, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Config saved to " + outputFilename);
        }
    });
    var outputFilename = outputFilePath + 'device.json';
    fs.writeFile(outputFilename, JSON.stringify(devicesArray, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Devices saved to " + outputFilename);
        }
    });
    var outputFilename = outputFilePath + 'page_item.json';
    fs.writeFile(outputFilename, JSON.stringify(pageItemsArray, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("PageItems saved to " + outputFilename);
        }
    });
    var outputFilename = outputFilePath + 'page.json';
    fs.writeFile(outputFilename, JSON.stringify(pagesArray, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Pages saved to " + outputFilename);
        }
    });
    var outputFilename = outputFilePath + 'action.json';
    fs.writeFile(outputFilename, JSON.stringify(actionsArray, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Actions saved to " + outputFilename);
        }
    });
    var outputFilename = outputFilePath + 'timer.json';
    fs.writeFile(outputFilename, JSON.stringify(timersArray, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Timers saved to " + outputFilename);
        }
    });
    var outputFilename = outputFilePath + 'item_type.json';
    fs.writeFile(outputFilename, JSON.stringify(itemTypesArray, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Item_type saved to " + outputFilename);
        }
    });
    var outputFilename = outputFilePath + 'link.json';
    fs.writeFile(outputFilename, JSON.stringify(linksArray, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("link saved to " + outputFilename);
        }
    });
}  			

function EmptyServer(){
    devicesArray.length = 0;
    pageItemsArray.length = 0;
    actionsArray.length = 0;
    tempsensorArray.length = 0;
    inputsArray.length = 0;
    pagesArray.length = 0;
    timersArray.length = 0;
    itemTypesArray.length = 0;
}

function LoadFromFile(){
    var outputFilename = outputFilePath + 'config.json';
    configArray = require(outputFilename);
    console.log('configArray '+configArray.length);
    var outputFilename = outputFilePath + 'page_item.json';
    pageItemsArray = require(outputFilename);
    console.log('pageItemsArray '+pageItemsArray.length);
    outputFilename = outputFilePath + 'page.json';
    pagesArray = require(outputFilename);
    console.log('pagesArray '+pagesArray.length);
    outputFilename = outputFilePath + 'device.json';
    devicesArray = require(outputFilename);
    console.log('devicesArray '+devicesArray.length);
    outputFilename = outputFilePath + 'action.json';
    actionsArray = require(outputFilename);
    console.log('actionsArray '+actionsArray.length);
    outputFilename = outputFilePath + 'event.json';
    timersArray = require(outputFilename);
    console.log('timersArray '+timersArray.length);
    outputFilename = outputFilePath + 'link.json';
    linksArray = require(outputFilename);
    console.log('linksArray '+linksArray.length);
    outputFilename = outputFilePath + 'item_type.json';
    itemTypesArray = require(outputFilename);
    console.log('itemTypesArray '+itemTypesArray.length);
}

function sendSqlQuery(theQuery){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
  	    password : 'pipo',
  	    database : 'nodesql'
    });
    connection.connect();
    connection.query(theQuery, function(err, result, fields) {
	    if (err) throw err;
        console.log('Query_result '+result);
    });
    connection.end();
    
}

function getDateTime () {
    var date = new Date();
    var second = date.getSeconds();
    if (second<10) {second = '0'+second;}
	var minute = date.getMinutes();
    if (minute<10) {minute = '0'+minute;}
	var hour = date.getHours();
    if (hour<10) {hour = '0'+hour;}
	var day = date.getDate();
    if (day<10) {day = '0'+day;}
	var month = date.getMonth()+1;
    if (month<10) {month = '0'+month;}
	var year = date.getFullYear();
	var dateText = day + '-' + month + '-' + year + ' ' + hour + ':' + minute + ':' + second + ' ';
	return dateText;
}