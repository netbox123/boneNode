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
var lcatsArray      = [];
var logArray        = [];

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
t_KEL= '';
h_KEL= '';
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
var timeText = getDateTime();
console.log('')
addLogArray('Bonenode 0.31 started: '+timeText);
addLogArray('BeagleBoneBlack revC Debian GNU/Linux 7.5');
 

if (hasMySQL){
    addLogArray('Loading from database...');
    loadDatbase();
} else {
    addLogArray('Loading from files...');
    LoadFromFile();
}

setTimeout(function(){ InitApp(); },500); // relax a bit, waiting for DB.

function InitApp() {
    b.serialOpen(serialPortDue, optionsPort, onSerial);
    addLogArray('SerialPort /dev/ttyO4 opened...');
    setInterval(function() {UpdateDevicesArray();}, 1000);
    //setInterval(function() {logDatabase();}, 1000*60*30);
    
    var port = process.env.PORT || CONFIG.port;
    server.listen(4000); // listen on port 
    app.get('/', function(req, res){res.sendFile(__dirname + '/index.html');});
    app.get('/mobi', function(req, res){res.sendFile(__dirname + '/mobi/index.html');});
    app.get('/configJSON', function(req, res){res.send(JSON.stringify(configArray, null, 4));});
    app.get('/deviceJSON', function(req, res){res.send(JSON.stringify(devicesArray, null, 4));});
    app.get('/actionJSON', function(req, res){res.send(JSON.stringify(actionsArray, null, 4));});
    app.get('/eventJSON', function(req, res){res.send(JSON.stringify(eventsArray, null, 4));});
    app.get('/linkJSON', function(req, res){res.send(JSON.stringify(linksArray, null, 4));});
    app.get('/lcatJSON', function(req, res){res.send(JSON.stringify(lcatsArray, null, 4));});
    app.get('/timerJSON', function(req, res){res.send(JSON.stringify(timersArray, null, 4));});
    app.get('/triggerJSON', function(req, res){res.send(JSON.stringify(triggersArray, null, 4));});
    app.get('/logJSON', function(req, res){res.send(JSON.stringify(logArray, null, 4));});
    
    app.get('/api/server', function(req, res){ChangeServer (req.param('client_type'), req.ip, req.param('action'),req.param('var1'),req.param('var2'));res.send('ok ');});
    app.get('/api/action', function(req, res){ChangeAction (req.param('client_type'), req.ip, req.param('action'),req.param('id'),req.param('name'));res.send('ok ');});
    app.get('/api/lcat', function(req, res){ChangeLcat (req.param('client_type'), req.ip,req.param('action'),req.param('id'),req.param('name'));res.send('ok ');});
    app.get('/api/event', function(req, res){ChangeEvent (req.param('client_type'), req.ip,req.param('action'),req.param('id'),req.param('action_id'),req.param('device_id'),req.param('event'),req.param('val'));res.send('ok ');});
    app.get('/api/timer', function(req, res){ChangeTimer (req.param('client_type'), req.ip,req.param('action'),req.param('id'),req.param('name'),req.param('action_id'),req.param('time'),req.param('enable'),req.param('day'));res.send('ok ');});
    app.get('/api/trigger', function(req, res){ChangeTrigger (req.param('client_type'), req.ip,req.param('action'),req.param('id'),req.param('name'));res.send('ok ');});
    app.get('/api/link', function(req, res){ChangeLink (req.param('client_type'), req.ip,req.param('action'),req.param('id'),req.param('name'),req.param('link'),req.param('cat_id'));res.send('ok ');});
    addLogArray('Server 192.168.7.2 listening on port 4000');
    addLogArray('');
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
    		io.sockets.emit('new message', {msg: 'Client connected ('+socket.address+')', nick: socket.nickname, title: 'Client connected', address: socket.address});
			node_names.push(socket.nickname);
			node_addresses.push(socket.handshake.address);
		}
	});

	
	//  -- getData received from client --
	socket.on('getConfig', function(data){socket.emit('config', configArray);});
    socket.on('getUsernames', function(data){socket.emit('usernames', node_names);});
	socket.on('getDevices', function(data){socket.emit('devices', devicesArray);});
	socket.on('getInputs', function(data){socket.emit('inputs', inputsArray);});
	socket.on('getActions', function(data){socket.emit('actions', actionsArray);});
	socket.on('getPages', function(data){socket.emit('pages', pagesArray);});
	socket.on('getTimers', function(data){socket.emit('timers', timersArray);});
	socket.on('getItem_types', function(data){socket.emit('item_types', itemTypesArray);});
	socket.on('getLinks', function(data){socket.emit('links', linksArray);});
	socket.on('getPageItems', function(data){socket.emit('pageitems', pageItemsArray);});

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
            io.sockets.emit('ServerUpdateMessage', 'Time is set to ;'+datetime);
            console.log('settime to temparray[1] '+temparray[1]);
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
    
    
 
    
    //  -- SendDueSerial received from client --
    socket.on('senddueserial', function(data){
        console.log('senddueserial '+data);
        b.serialWrite(serialPortDue, data + '\n');
    });
    
	//  -- Client disconnected --
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		node_names.splice(node_names.indexOf(socket.nickname), 1);
		//updatenode_names();
	});

});

//  ------------------------------------------------------------------------------------------------------------------------


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
				t_KEL = data_json.due.t_KEL;
				h_KEL = data_json.due.h_KEL;
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
    lib_database.loadConfig('SELECT * FROM config', function(result) {configArray = lib_database._configArray;addLogArray('Config: '+configArray.length);});
    lib_database.loadDevices('SELECT * FROM device', function(result) {devicesArray = lib_database._devicesArray;addLogArray('Devices: '+devicesArray.length);});
    lib_database.loadPages('SELECT * FROM page', function(result) {pagesArray = lib_database._pagesArray;addLogArray('Pages: '+pagesArray.length);});   
    lib_database.loadPageItems('SELECT * FROM page_items order by type DESC', function(result) {pageItemsArray = lib_database._pageItemsArray;addLogArray('PageItems: '+pageItemsArray.length);});
    lib_database.loadActions('SELECT * FROM action', function(result) {actionsArray = lib_database._actionsArray;addLogArray('Actions: '+actionsArray.length);});  
    lib_database.loadEvents('SELECT * FROM event', function(result) {eventsArray = lib_database._eventsArray;addLogArray('Events: '+eventsArray.length);});  
    lib_database.loadTriggers('SELECT * FROM triggert', function(result) {triggersArray = lib_database._triggersArray;addLogArray('Triggers: '+triggersArray.length);});  
    lib_database.loadInputs('SELECT * FROM device WHERE type=3', function(result) {inputsArray = lib_database._inputsArray;addLogArray('Inputs: '+inputsArray.length);});
    lib_database.loadTimers('SELECT * FROM timer', function(result) {timersArray = lib_database._timersArray;addLogArray('Timers: '+timersArray.length);});
    lib_database.loadLinks('SELECT * FROM link', function(result) {linksArray = lib_database._linksArray;addLogArray('Links: '+linksArray.length);});
    lib_database.loadLcats('SELECT * FROM lcat', function(result) {lcatsArray = lib_database._lcatsArray;addLogArray('Links cat: '+lcatsArray.length);});
    lib_database.connectionEnd();
}

function addLogArray(logmsg) {
    var newLog = {};
    newLog.msg = logmsg;
	logArray.push(newLog); 
    console.log(logmsg);
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
        
        if (devicesArray[i].id == 3001){devicesArray[i].val = Number(bmv_v/1000).toFixed(2)}
        if (devicesArray[i].id == 3002){devicesArray[i].val = Number(bmv_i/1000).toFixed(2)}
        if (devicesArray[i].id == 3003){devicesArray[i].val = Number(bmv_ce/1000).toFixed(2)}
        if (devicesArray[i].id == 3004){devicesArray[i].val = Number(bmv_soc/10).toFixed(1)}
        if (devicesArray[i].id == 3005){devicesArray[i].val = Number(bmv_ttg).toFixed(0)}
        if (devicesArray[i].id == 3006){devicesArray[i].val = bmv_alarm;}
        if (devicesArray[i].id == 3007){devicesArray[i].val = bmv_relay;}
        if (devicesArray[i].id == 3008){devicesArray[i].val = Number(bmv_v*bmv_i/1000000).toFixed(2)}
        if (devicesArray[i].id == 3009){devicesArray[i].val = Number(bmv_soc/10).toFixed(0)}
        
        if (devicesArray[i].id == 4002){devicesArray[i].val = Number(t_K1).toFixed(1);}
        if (devicesArray[i].id == 4003){devicesArray[i].val = Number(t_K2).toFixed(1);}
        if (devicesArray[i].id == 4004){devicesArray[i].val = Number(t_B1).toFixed(1);}
        if (devicesArray[i].id == 4005){devicesArray[i].val = Number(t_B2).toFixed(1);}
        if (devicesArray[i].id == 4006){devicesArray[i].val = Number(t_B3).toFixed(1);}
        if (devicesArray[i].id == 4009){devicesArray[i].val = Number(t_G2).toFixed(1);}
        if (devicesArray[i].id == 4008){devicesArray[i].val = Number(t_BU).toFixed(1);}
        if (devicesArray[i].id == 4007){devicesArray[i].val = Number(t_G1).toFixed(1);}
        if (devicesArray[i].id == 4001){devicesArray[i].val = Number(t_WK).toFixed(1);}
        
        if (devicesArray[i].id == 4020){devicesArray[i].val = Number(t_KEL).toFixed(1);}
        if (devicesArray[i].id == 4021){devicesArray[i].val = Number(h_KEL).toFixed(1);}
        
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
    
    var varTimeSec = datetime.getHours()*3600 + datetime.getMinutes()*60 + datetime.getSeconds();
    var varTimeDay = datetime.getDay();
    //console.log(varTimeDay);
    //console.log("varTimeSec " + varTimeSec);
    for (var i in timersArray) {
        if(timersArray[i].time == varTimeSec & timersArray[i].enable == 1){
            run_Action(timersArray[i].action_id);
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
    var querystring = "INSERT INTO `nodesql`.`log` (`t_WK`, `t_K1`, `t_K2`, `t_B1`, `t_B2`, `t_B3`, `t_G1`, `t_G2`, `t_BU`, `t_KEL`, `h_KEL`, `b_V`, `b_I`, `b_CE`, `b_SOC`) VALUES ("+t_WK+", "+t_K1+", "+t_K2+", "+t_B1+", "+t_B2+", "+t_B3+", "+t_G1+", "+t_G2+", "+t_BU+", "+t_KEL+","+h_KEL+", "+bmv_v+", "+bmv_i+", "+bmv_ce+", "+bmv_soc+");"
    console.log(querystring);
    sendSqlQuery(querystring);
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
        //console.log('Query_result '+result);
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

// ---------------------------------------- Action --------------------------------- //

function ChangeAction (client_type,client_ip,action_action,action_id,action_name) {
    console.log('actionchange '+action_action+'-'+action_id+'-'+action_name+'-'+decodeURIComponent(client_type)+'-'+client_ip);
	var timeText = getDateTime();
	if(action_action == 'run'){
	    var actionString ='';
	    for (var i in eventsArray) {
	        if(eventsArray[i].action_id == action_id) {
	            actionString += eventsArray[i].device_id+'-'+eventsArray[i].action+'-'+eventsArray[i].value+';';
	        }
	    }
	    b.serialWrite(serialPortDue, actionString + '\n');
	    console.log('serialWrite '+ actionString);
	    io.sockets.emit('ServerUpdateMessage', 'Run Action '+action_name+';'+decodeURIComponent(client_type)+' from '+client_ip);
	}else if(action_action == 'new'){
	    var idmax = 0;
	    for (var i in actionsArray) {
	        if(actionsArray[i].id > idmax) {idmax=actionsArray[i].id}
	    }
	    idmax = idmax +1
		var newAction = {};
		newAction.id = idmax;
		newAction.name = action_name;
		actionsArray.push(newAction); 
		var query_str = "INSERT INTO `nodesql`.`action` ";
		query_str +="(`id`, `name`) ";
		query_str +="VALUES ('"+idmax+"','"+action_name+"')";
		sendSqlQuery(query_str);
		io.sockets.emit('ServerUpdateMessage', 'Action '+action_name+' added. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(action_action == 'edit'){
		var newEventString ='';
		for(j=0; j < actionsArray.length; j++){
			if(actionsArray[j].id == action_id){
				actionsArray[j].name = action_name;
				var query_str = "UPDATE  `nodesql`.`action` SET  ";
				query_str += "`name` =  '"+actionsArray[j].name+"'  ";
				query_str += " WHERE  `action`.`id` ="+ action_id;
				sendSqlQuery(query_str); 
				io.sockets.emit('ServerUpdateMessage', 'Action '+action_name+' edited. ;'+client_type+' from '+client_ip);
			}
		}
	} else if(action_action == 'delete'){
		var newEventString ='';
		for(j=0; j < actionsArray.length; j++){
			if(actionsArray[j].id == action_id){
				actionsArray.splice(j, 1);
				var query_str = "DELETE FROM `nodesql`.`action` ";
				query_str += " WHERE  `action`.`id` ="+ action_id;
				sendSqlQuery(query_str); 
				var query_str = "DELETE FROM `nodesql`.`event` ";
				query_str += " WHERE  `event`.`action_id` ="+ action_id;
				sendSqlQuery(query_str);
				io.sockets.emit('ServerUpdateMessage', 'Action '+action_name+' deleted. ;'+decodeURIComponent(client_type)+' from '+client_ip);

			}
		}
	}
	io.sockets.emit('serverUpdate', 'action');
}

// ---------------------------------------- Event --------------------------------- //

function ChangeEvent (client_type,client_ip,event_action,event_id,action_id,device_id, event,value) {
    console.log('eventchange '+event_action+'-'+event_id+'-'+action_id+'-'+device_id+'-'+event+'-'+value);
	for (var i in devicesArray) {if(devicesArray[i].id == device_id) {var device_name=devicesArray[i].name}}
	if(event_action == 'new'){
	    var idmax = 0;
	    for (var i in eventsArray) {
	        if(eventsArray[i].id > idmax) {idmax=eventsArray[i].id}
	    }
	    idmax = idmax +1
		var newEvent = {};
		newEvent.id = idmax;
		newEvent.action_id = parseInt(action_id);
		newEvent.device_id = parseInt(device_id);
		newEvent.action = event;
		newEvent.value = parseInt(value);
		eventsArray.push(newEvent); 
		var query_str = "INSERT INTO `nodesql`.`event` ";
		query_str +="(`id`, `action_id`, `device_id`, `action`, `value`) ";
		query_str +="VALUES ('"+idmax+"','"+action_id+"','"+device_id+"','"+event+"','"+value+"')";
		sendSqlQuery(query_str); 
		io.sockets.emit('ServerUpdateMessage', 'Event '+device_name+' added. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(event_action == 'edit'){
		var newEventString ='';
		for(j=0; j < eventsArray.length; j++){
			if(eventsArray[j].id == event_id){
				eventsArray[j].action_id = parseInt(action_id);
				eventsArray[j].device_id = parseInt(device_id);
				eventsArray[j].action = event;
				eventsArray[j].value = parseInt(value);
				var query_str = "UPDATE  `nodesql`.`event` SET  ";
				query_str += "`action_id` =  '"+eventsArray[j].action_id+"' , ";
				query_str += "`device_id` =  '"+eventsArray[j].device_id+"' , ";
				query_str += "`action` =  '"+eventsArray[j].action+"' , ";
				query_str += "`value` =  '"+eventsArray[j].value+"'  ";
				query_str += " WHERE  `event`.`id` ="+ event_id;
				sendSqlQuery(query_str); 
				io.sockets.emit('ServerUpdateMessage', 'Event '+device_name+' edited. ;'+decodeURIComponent(client_type)+' from '+client_ip);
			}
		}
	} else if(event_action == 'delete'){
		var newEventString ='';
		for(j=0; j < eventsArray.length; j++){
			if(eventsArray[j].id == event_id){
				eventsArray.splice(j, 1);
				var query_str = "DELETE FROM `nodesql`.`event` ";
				query_str += " WHERE  `event`.`id` ="+ event_id;
				sendSqlQuery(query_str);  
			}
		}
		io.sockets.emit('ServerUpdateMessage', 'Event '+device_name+' deleted. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	}
	io.sockets.emit('serverUpdate', 'event');
}

// ---------------------------------------- Timer --------------------------------- //

function ChangeTimer (client_type,client_ip,timer_action,timer_id,timer_name,timer_action_id,timer_time,timer_enable,timer_day) {
    console.log('timerchange '+timer_action+'-'+timer_id+'-'+timer_name+'-'+timer_action_id+'-'+timer_time+'-'+timer_enable);
	var timeText = getDateTime();
	if(timer_action == 'new'){
	    var idmax = 0;
	    for (var i in timersArray) {
	        if(timersArray[i].id > idmax) {idmax=timersArray[i].id}
	    }
	    idmax = idmax +1
		var newTimer = {};
		newTimer.id = idmax;
		newTimer.name = timer_name;
		newTimer.action_id = timer_action_id;
		newTimer.time = timer_time;
		newTimer.enable = timer_enable;
		newTimer.day = timer_day;
		timersArray.push(newTimer); 
		var query_str = "INSERT INTO `nodesql`.`timer` ";
		query_str +="(`id`, `name`, `action_id`, `time`, `enable`, `day`) ";
		query_str +="VALUES ('"+idmax+"','"+timer_name+"','"+timer_action_id+"','"+timer_time+"','"+timer_enable+"','"+timer_day+"')";
		sendSqlQuery(query_str); 
		io.sockets.emit('ServerUpdateMessage', 'TimeDate '+timer_name+' added. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(timer_action == 'edit'){
		var newTimerString ='';
		for(j=0; j < timersArray.length; j++){
			if(timersArray[j].id == timer_id){
				timersArray[j].name = timer_name;
				timersArray[j].action_id = parseInt(timer_action_id);
		        timersArray[j].time = parseInt(timer_time);
		        timersArray[j].enable = parseInt(timer_enable);
		        timersArray[j].day = timer_day;
				var query_str = "UPDATE  `nodesql`.`timer` SET  ";
				query_str += "`name` =  '"+timersArray[j].name+"'  ,";
				query_str += "`action_id` =  '"+timersArray[j].action_id+"' , ";
				query_str += "`time` =  '"+timersArray[j].time+"'  ,";
				query_str += "`enable` =  '"+timersArray[j].enable+"'  ,";
				query_str += "`day` =  '"+timersArray[j].day+"'  ";
				query_str += " WHERE  `timer`.`id` ="+ timer_id;
				sendSqlQuery(query_str); 
				io.sockets.emit('ServerUpdateMessage', 'TimeDate '+timer_name+' edited. ;'+decodeURIComponent(client_type)+' from '+client_ip);
			}
		}
	} else if(timer_action == 'delete'){
		var newTimerString ='';
		for(j=0; j < timersArray.length; j++){
			if(timersArray[j].id == timer_id){
				timersArray.splice(j, 1);
				var query_str = "DELETE FROM `nodesql`.`timer` ";
				query_str += " WHERE  `timer`.`id` ="+ timer_id;
				sendSqlQuery(query_str);  
			}
		}
		io.sockets.emit('ServerUpdateMessage', 'TimeDate '+timer_name+' deleted. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	}
	io.sockets.emit('serverUpdate', 'timer');
}

// ---------------------------------------- Trigger --------------------------------- //

function ChangeTrigger (client_type,client_ip,trigger_action,trigger_id,trigger_name) {
    console.log('triggerchange '+trigger_action+'-'+trigger_id+'-'+trigger_name);
	var timeText = getDateTime();
	if(trigger_action == 'new'){
	    var idmax = 0;
	    for (var i in triggersArray) {
	        if(triggersArray[i].id > idmax) {idmax=triggersArray[i].id}
	    }
	    idmax = idmax +1
		var newTrigger = {};
		newTrigger.id = idmax;
		newTrigger.name = trigger_name;
		triggersArray.push(newTrigger); 
		var query_str = "INSERT INTO `nodesql`.`triggert` ";
		query_str +="(`id`, `name`) ";
		query_str +="VALUES ('"+idmax+"','"+trigger_name+"')";
		sendSqlQuery(query_str); 
		io.sockets.emit('ServerUpdateMessage', 'Trigger '+trigger_name+' added. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(trigger_action == 'edit'){
		var newTriggerString ='';
		for(j=0; j < triggersArray.length; j++){
			if(triggersArray[j].id == trigger_id){
				triggersArray[j].name = trigger_name;
				var query_str = "UPDATE  `nodesql`.`triggert` SET  ";
				query_str += "`name` =  '"+triggersArray[j].name+"'  ";
				query_str += " WHERE  `triggert`.`id` ="+ trigger_id;
				sendSqlQuery(query_str);    
			}
		}
		io.sockets.emit('ServerUpdateMessage', 'Trigger '+trigger_name+' edited. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(trigger_action == 'delete'){
		var newTriggerString ='';
		for(j=0; j < triggersArray.length; j++){
			if(triggersArray[j].id == trigger_id){
				triggersArray.splice(j, 1);
				var query_str = "DELETE FROM `nodesql`.`triggert` ";
				query_str += " WHERE  `triggert`.`id` ="+ trigger_id;
				sendSqlQuery(query_str);  
			}
		}
		io.sockets.emit('ServerUpdateMessage', 'Trigger '+trigger_name+' deleted. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	}
	io.sockets.emit('serverUpdate', 'trigger');
}

// ---------------------------------------- Link --------------------------------- //

function ChangeLink (client_type,client_ip,link_action,link_id,link_name,link_url,link_catid) {
    console.log('linkchange '+link_action+'-'+link_id+'-'+link_name+'-'+link_url+'-'+link_catid);
	var timeText = getDateTime();
	if(link_action == 'new'){
	    var idmax = 0;
	    for (var i in linksArray) {
	        if(linksArray[i].id > idmax) {idmax=linksArray[i].id}
	    }
	    idmax = idmax +1
		var newLink = {};
		newLink.id = idmax;
		newLink.name = link_name;
		newLink.url = link_url;
		newLink.cat = parseInt(link_catid);
		linksArray.push(newLink); 
		var query_str = "INSERT INTO `nodesql`.`link` ";
		query_str +="(`id`, `name`, `url`, `cat`) ";
		query_str +="VALUES ('"+idmax+"','"+link_name+"','"+link_url+"','"+link_catid+"')";
		sendSqlQuery(query_str); 
		io.sockets.emit('ServerUpdateMessage', 'Link '+link_name+' added. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(link_action == 'edit'){
		var newLinkString ='';
		for(j=0; j < linksArray.length; j++){
			if(linksArray[j].id == link_id){
				linksArray[j].name = link_name;
				linksArray[j].url = link_url;
				linksArray[j].cat = parseInt(link_catid);
				var query_str = "UPDATE  `nodesql`.`link` SET  ";
				query_str += "`name` =  '"+linksArray[j].name+"'  ,";
				query_str += "`url` =  '"+linksArray[j].url+"'  ,";
				query_str += "`cat` =  '"+linksArray[j].cat+"'  ";
				query_str += " WHERE  `link`.`id` ="+ link_id;
				sendSqlQuery(query_str);    
			}
		}
		io.sockets.emit('ServerUpdateMessage', 'Link '+link_name+' edited. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(link_action == 'delete'){
		var newLinkString ='';
		for(j=0; j < linksArray.length; j++){
			if(linksArray[j].id == link_id){
				linksArray.splice(j, 1);
				var query_str = "DELETE FROM `nodesql`.`link` ";
				query_str += " WHERE  `link`.`id` ="+ link_id;
				sendSqlQuery(query_str);  
			}
		}
		io.sockets.emit('ServerUpdateMessage', 'Link '+link_name+' deleted. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	}
	io.sockets.emit('serverUpdate', 'link');
}

// ---------------------------------------- Lcat --------------------------------- //

function ChangeLcat (client_type,client_ip,lcat_action,lcat_id,lcat_name) {
    console.log('lcatchange '+lcat_action+'-'+lcat_id+'-'+lcat_name);
	var timeText = getDateTime();
	if(lcat_action == 'new'){
	    var idmax = 0;
	    for (var i in lcatsArray) {
	        if(lcatsArray[i].id > idmax) {idmax=lcatsArray[i].id}
	    }
	    idmax = idmax +1
		var newLcat = {};
		newLcat.id = idmax;
		newLcat.name = lcat_name;
		lcatsArray.push(newLcat); 
		var query_str = "INSERT INTO `nodesql`.`lcat` ";
		query_str +="(`id`, `name`) ";
		query_str +="VALUES ('"+idmax+"','"+lcat_name+"')";
		sendSqlQuery(query_str); 
		io.sockets.emit('ServerUpdateMessage', 'Link category '+lcat_name+' added. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(lcat_action == 'edit'){
		var newLcatString ='';
		for(j=0; j < lcatsArray.length; j++){
			if(lcatsArray[j].id == lcat_id){
				lcatsArray[j].name = lcat_name;
				var query_str = "UPDATE  `nodesql`.`lcat` SET  ";
				query_str += "`name` =  '"+lcatsArray[j].name+"'  ";
				query_str += " WHERE  `lcat`.`id` ="+ lcat_id;
				sendSqlQuery(query_str);    
			}
		}
		io.sockets.emit('ServerUpdateMessage', 'Link category '+lcat_name+' edited. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	} else if(lcat_action == 'delete'){
		var newLcatString ='';
		for(j=0; j < lcatsArray.length; j++){
			if(lcatsArray[j].id == lcat_id){
				lcatsArray.splice(j, 1);
				var query_str = "DELETE FROM `nodesql`.`lcat` ";
				query_str += " WHERE  `lcat`.`id` ="+ lcat_id;
				sendSqlQuery(query_str);  
				var query_str = "DELETE FROM `nodesql`.`link` ";
				query_str += " WHERE  `link`.`cat` ="+ lcat_id;
				sendSqlQuery(query_str);
				io.sockets.emit('ServerUpdateMessage', 'text1;text2;text3');
			}
		}
		io.sockets.emit('ServerUpdateMessage', 'Link category '+lcat_name+' deleted. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	}
	io.sockets.emit('serverUpdate', 'lcat');
}

// ---------------------------------------- Server --------------------------------- //

function ChangeServer (client_type,client_ip,server_action,server_var1,server_var2) {
    //console.log('serverchange '+server_action+'-'+server_var1+'-'+server_var2);
	if(server_action == 'settime'){
		var datetime = new Date();
        var b = require('bonescript');
        datetime.setTime(server_var1*1000);
        b.setDate(datetime.toString());
        console.log('settime to '+datetime);
        io.sockets.emit('ServerUpdateMessage', 'Time is set to ;'+datetime);
	} else if(server_action == 'delete'){
		
		io.sockets.emit('ServerUpdateMessage', 'Link category '+lcat_name+' deleted. ;'+decodeURIComponent(client_type)+' from '+client_ip);
	}
	io.sockets.emit('serverUpdate', 'lcat');
}

// ----------------------------------------  --------------------------------- //

function run_Action(action_id){
    var actionString ='';
	for (var i in eventsArray) {
	    if(eventsArray[i].action_id == action_id) {
	        actionString += eventsArray[i].device_id+'-'+eventsArray[i].action+'-'+eventsArray[i].value+';';
	    }
	}
	b.serialWrite(serialPortDue, actionString + '\n');
	console.log('run_Action '+ actionString);
}