var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
var lib_tool = require('./tool.js');
var lib_database = require('./database.js');
var tempdirectory ='/sys/bus/w1/devices/';

inputsArray = [];
devicesArray = [];
pageItemsArray = [];
actionsArray = [];
tempsensorArray = [];
pagesArray = [];
nicknames = [];

bmv_v = '';
bmv_i = '';
bmv_ce = '';
bmv_soc = '';
bmv_ttg = '';
bmv_alarm = '';
bmv_relay = '';

var path = require('path');
var express = require('express'),app = express();
app.use(express.static(path.join(__dirname, 'public')));
var server = require('http').createServer(app),io = require('socket.io').listen(server),b = require('bonescript');
io.set('log level', 0); // reduce logging

console.log('Loading database into array...');
setPins();
loadDatbase();
initSerial_BMV600();
initSerial_Arduino();

setTimeout(function(){ InitApp(); },1000); // relax a bit, waiting for DB.
function InitApp() {
    setInterval(function() {getAccumonitor();}, 1000);
    setInterval(function() {getTemperature();}, 2000);
    server.listen(4000); // listen on port 4000
    app.get('/', function(req, res){res.sendfile(__dirname + '/index.html');});
    console.log('Server listening on 192.168.1.41:4000');
    setInterval(checkInputs,100);
    runAction(2);
}

io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
        var timeText = lib_tool.getDateTime();
		if (nicknames.indexOf(data) != -1){
			callback(false);
		} else{
			callback(true);
			socket.nickname = data;
            var address = socket.handshake.address;
            console.log(data+' connected from '+address.address + ':' + address.port);
    		io.sockets.emit('new message', {title: 'Client ' + address.address + ' connected',nick: socket.nickname,timeText: timeText});
			nicknames.push(socket.nickname);
			sendAllArrays();
		}
	});
    
	//  -- sendAllArrays to client --
	function sendAllArrays(){
		socket.emit('usernames', nicknames);
		socket.emit('devices', devicesArray);
        socket.emit('inputs', inputsArray);
        socket.emit('actions', actionsArray);
		socket.emit('pages', pagesArray);
		socket.emit('pageitems', pageItemsArray);
	}
	
	//  -- Message received from client --
	socket.on('send message', function(data){
        var timeText = lib_tool.getDateTime();
		io.sockets.emit('new message', {msg: data, nick: timeText + socket.nickname + ':' });
	});
    
        
	//  -- GetAllValues received from client --
	socket.on('getallvalues', function(data){
        var valstr = '';
        for (var i in devicesArray) {
            if(devicesArray[i].id > 999){
                valstr += devicesArray[i].id+'#'+devicesArray[i].val + '*';
            }
        }
		socket.emit('sendallvalues', {msg: valstr});
	});
    
    //  -- Servercommand received from client --
	socket.on('sendservercommand', function(data){
        var timeText = lib_tool.getDateTime();
        temparray = data.split('-');
        if (temparray[0] == 'settime'){
            var datetime = new Date();
            var b = require('bonescript');
            io.sockets.emit('new message', {msg: data, nick: timeText + socket.nickname + ':' });
            datetime.setTime(temparray[1]);
            console.log('settime to '+datetime);
            b.setDate(datetime.toString());
            io.sockets.emit('new message', {msg: datetime.toString(), nick: timeText });
        } else if(temparray[0] == 'starttemp'){
            exec("echo BB-W1:00A0 > /sys/devices/bone_capemgr.9/slots", puts);
              io.sockets.emit('new message', {
                    title: 'Start temp script ',
                    nick: 'echo BB-W1:00A0 > /sys/devices/bone_capemgr.9/slots',
    				msg:  '',
                    data: data,
                    timeText: 'testtimetext'
				});
            
            console.log('starttemp');
        } else if(temparray[0] == 'reloaddb'){
        	loadDatbase();
            console.log('reloaddb - database reloaded');
            io.sockets.emit('new message', {msg: 'reloaddb - database reloaded', nick: timeText });
        } else if(temparray[0] == 'savedb'){
            console.log('savedb');
        }	
	});
    
     //  -- SendAction received from client --
    socket.on('sendaction', function(data){
        for (var i in actionsArray) {
            if (data == actionsArray[i].id){
                io.sockets.emit('new message', {title: 'Run '+actionsArray[i].name,nick: 'action'+data,data: data,timeText: actionsArray[i].events});
            }
        }
        runAction(data);
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
        for(j=0; j < pageItemsArray.length; j++){
            pageItemA = pageItemsArray[j];
              if(pageItemA.id == data.id){
                  pageItemA.xpos = data.xpos;
                  pageItemA.ypos = data.ypos;
              }
        }
        
        var timeText = lib_tool.getDateTime();
    	io.sockets.emit('new message', {msg: data.id+' moved',nick: timeText + 'Web ' + data.xpos+'-'+data.ypos +' >'});
        io.sockets.emit('pageitem change', {id: data.id,xpos: data.xpos,ypos: data.ypos});
	});
	
	//  -- Action received from client --
	socket.on('send action', function(data){
        var deviceNrA = [];
        var adevice = [];
        var devicenr = 0;
        deviceNrA = data.split('-');
        for (var i in devicesArray) {
            adevice = devicesArray[i];
            //console.log(adevice.id +' -- '+deviceNrA[2]);
            if (adevice.id == deviceNrA[2]){
                devicenr = i;
            }
         }
         var pinStr = devicesArray[devicenr].pin;
         var pinNr = pinStr.substr(3);
         var pinCon = pinStr.substr(0,2);
        
        console.log('action '+data+'<'+pinStr+'>' +pinCon+' ' +pinNr);
        var timeText = lib_tool.getDateTime();
    		if (devicesArray[devicenr].val == 0) {
				b.digitalWrite(pinStr, b.HIGH);
				devicesArray[devicenr].val = 100;
                io.sockets.emit('device change', deviceNrA[2]+'-on-100');
				io.sockets.emit('new message', {title: 'Device ' + devicesArray[devicenr].name + ' turned on',nick: socket.nickname,msg:  pinStr+' on',data: data,timeText: timeText});
			}
			else {
				b.digitalWrite(pinStr, b.LOW);
				devicesArray[devicenr].val = 0;
                io.sockets.emit('device change', deviceNrA[2]+'-off-0');
				io.sockets.emit('new message', {title: 'Device ' + devicesArray[devicenr].name + ' turned off',nick: socket.nickname,msg: pinStr+' off',data: data,timeText: timeText});
			}
	});
	
	//  -- Client disconnected --
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		//updateNicknames();
	});

});

//  ------------------------------------------------------------------------------------------------------------------------

function checkInputs(){
    for (var i in inputsArray) {
        checkKey(b.digitalRead(inputsArray[i].pin),inputsArray[i].id,i); 
        //console.log(inputsArray[i].pin+' '+inputsArray[i].id+' '+i);
    }
}

function checkKey(x, deviceid, arrayid) {
	if ((x == 0 & inputsArray[arrayid].inv == 0) | (x == 1 & inputsArray[arrayid].inv == 1)) {
		if (inputsArray[arrayid].mem == 0) {
			inputsArray[arrayid].mem = 1;
			var timeText = lib_tool.getDateTime();
			io.sockets.emit('input change', deviceid+'-on-100');
			runAction(inputsArray[arrayid].action);
		}
	} else {
		if (inputsArray[arrayid].mem == 1){io.sockets.emit('input change', deviceid+'-off-0');}
		inputsArray[arrayid].mem = 0;
	}
}

function loadDatbase() {
    lib_database.loadDevices('SELECT * FROM device_ini', function(result) {devicesArray = lib_database._devicesArray;console.log('Devices: '+devicesArray.length);});
    lib_database.loadPages('SELECT * FROM page_ini', function(result) {pagesArray = lib_database._pagesArray;console.log('Pages: '+pagesArray.length);});   
    lib_database.loadPageItems('SELECT * FROM page_items_ini order by type DESC', function(result) {pageItemsArray = lib_database._pageItemsArray;console.log('PageItems: '+pageItemsArray.length);});
    lib_database.loadActions('SELECT * FROM action_ini', function(result) {actionsArray = lib_database._actionsArray;console.log('Actions: '+actionsArray.length);});  
    lib_database.loadInputs('SELECT * FROM device_ini WHERE type=3', function(result) {inputsArray = lib_database._inputsArray;console.log('Inputs: '+inputsArray.length);});
    lib_database.connectionEnd();
}

function getAccumonitor() {
    var datetime = new Date();
    var timenow = new Date().getTime(); 
    timenow = parseInt(timenow/1000);
    for (var i in devicesArray) {
        if (devicesArray[i].id == 1002){devicesArray[i].val = 20;}
        if (devicesArray[i].id == 1003){devicesArray[i].val = [(datetime.getHours()).padLeft(), (datetime.getMinutes()).padLeft(), datetime.getSeconds().padLeft()].join(':');}
        if (devicesArray[i].id == 1004){devicesArray[i].val = [datetime.getDate().padLeft(), (datetime.getMonth()+1).padLeft(), datetime.getFullYear()].join('-');}
        if (devicesArray[i].id == 1005){devicesArray[i].val = Date.now();}
        if (devicesArray[i].id == 3001){devicesArray[i].val = bmv_v;}
        if (devicesArray[i].id == 3002){devicesArray[i].val = bmv_i;}
        if (devicesArray[i].id == 3003){devicesArray[i].val = bmv_ce;}
        if (devicesArray[i].id == 3004){devicesArray[i].val = bmv_soc;}
        if (devicesArray[i].id == 3005){devicesArray[i].val = bmv_ttg;}
        if (devicesArray[i].id == 3006){devicesArray[i].val = bmv_alarm;}
        if (devicesArray[i].id == 3007){devicesArray[i].val = bmv_relay;}
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
}

function getTemperature() {
    for (var i in devicesArray) {
    (function(i) {       
        if (devicesArray[i].type == 4){
            b.readTextFile(tempdirectory+devicesArray[i].opm+'/w1_slave', function(data){
                var tempfile= data.data.split('t=');
                if (tempfile[1]>0){
                    devicesArray[i].val=tempfile[1];
                }
                });
            }
     })(i);
     }
}

function setPins(){
    b.pinMode('P8_7', b.OUTPUT);
    b.pinMode('P8_8', b.OUTPUT);
    b.pinMode('P8_9', b.OUTPUT);
    b.pinMode('P8_10', b.OUTPUT);
    b.pinMode('P8_11', b.OUTPUT);
    b.pinMode('P8_12', b.OUTPUT);
    b.pinMode('P8_13', b.OUTPUT);
    b.pinMode('P8_14', b.OUTPUT);
    b.pinMode('P8_15', b.OUTPUT);
    b.pinMode('P8_16', b.OUTPUT);
    b.pinMode('P8_17', b.OUTPUT);
    b.pinMode('P8_18', b.OUTPUT);
    b.pinMode('P8_19', b.OUTPUT);
    b.pinMode('P8_26', b.OUTPUT);
    b.pinMode('P9_11', b.OUTPUT); 
    b.pinMode('P9_12', b.OUTPUT);
    b.pinMode('P9_13', b.INPUT); 
    b.pinMode('P9_14', b.INPUT);
    b.pinMode('P9_15', b.INPUT);
    b.pinMode('P9_16', b.INPUT);
    b.pinMode('P9_17', b.INPUT);
    b.pinMode('P9_18', b.INPUT);
    b.pinMode('P9_21', b.INPUT);
    b.pinMode('P9_23', b.INPUT);
}

function initSerial_BMV600(){
    var spawn = require('child_process').spawn,ls    = spawn('python',['/var/lib/cloud9/jqx/temp.py']);
    ls.stdout.on('data', function (data) {
		//console.log('data: ' + data.toString() +' ' +typeof data);
		var temparray = data.toString().split('\r');
		for (var i in temparray) {
			var tempvalarray = temparray[i].split('\t');
			//console.log('var: ' + tempvalarray[0].replace('\n','') +' = ' + tempvalarray[1]);
			if (tempvalarray[0].replace('\n','') == 'V'){bmv_v = tempvalarray[1]}
			if (tempvalarray[0].replace('\n','') == 'I'){bmv_i = tempvalarray[1]}
			if (tempvalarray[0].replace('\n','') == 'CE'){bmv_ce = tempvalarray[1]}
			if (tempvalarray[0].replace('\n','') == 'SOC'){bmv_soc = tempvalarray[1]}
			if (tempvalarray[0].replace('\n','') == 'TTG'){bmv_ttg = tempvalarray[1]}
			if (tempvalarray[0].replace('\n','') == 'Alarm'){bmv_alarm = tempvalarray[1]}
			if (tempvalarray[0].replace('\n','') == 'Relay'){bmv_relay = tempvalarray[1]}
		}
    });
}

function initSerial_Arduino(){
    var spawn2 = require('child_process').spawn,ls2 = spawn2('python',['/var/lib/cloud9/jqx/arduino.py']);
    ls2.stdout.on('data', function (data) {
        var s = data.toString().substring(0, data.toString().length - 3);
        //console.log('data:' + s +'=');
        runRawAction(s);
    });
}

function runAction(actioinid) {
	for (var i in actionsArray) {
		if (actioinid == actionsArray[i].id){
			//console.log(i + ' ' + actionsArray[i].events); 
			runRawAction(actionsArray[i].events);
		}
		
	 }
}

function runRawAction(theaction) {
	//console.log(i + ' ' + actionsArray[i].events); 
	var event_array = theaction.split(';');
	for (var j in event_array) {
		var oneE_array = event_array[j].split('-');
		if (oneE_array[1] == 'on'){
			switchLamp(oneE_array[0],1);
		} else if (oneE_array[1] == 'off') {
			switchLamp(oneE_array[0],0);
		} else if (oneE_array[1] == 'toggle') {
			toggleLamp(oneE_array[0],0);
		} else if (oneE_array[1] == 'dim') {
			switchLamp(oneE_array[0],0);
		} else if (oneE_array[1] == 'toff') {
			toffLamp(oneE_array[0],oneE_array[2]);
		}
		sleep(100);
		
	}
}

function switchLamp(deviceid, onoff) {
	for (var i in devicesArray) {
		if (deviceid == devicesArray[i].id){
			if (onoff){
				//console.log(devicesArray[i].pin);
				b.digitalWrite(devicesArray[i].pin, b.HIGH);
				devicesArray[i].val = 100;
				io.sockets.emit('device change', devicesArray[i].id + '-on-100');
			} else {
				//console.log(devicesArray[i].pin);
				b.digitalWrite(devicesArray[i].pin, b.LOW);
				devicesArray[i].val = 0;
				io.sockets.emit('device change', devicesArray[i].id + '-off-0');
			}
		}
		
	 }
}

function toffLamp(deviceid, sec) {
	for (var i in devicesArray) {
		if (deviceid == devicesArray[i].id){
			var timenow = new Date().getTime();
			//console.log(sec + '-' + timenow + '-' +(parseInt(timenow/1000)+parseInt(sec)));
			b.digitalWrite(devicesArray[i].pin, b.HIGH);
			devicesArray[i].val = 100;
			devicesArray[i].toff = parseInt(timenow/1000)+parseInt(sec);
			io.sockets.emit('device change', devicesArray[i].id + '-on-100');
		}
		
	 }
}

function toggleLamp(deviceid, nu) {
	for (var i in devicesArray) {
		if (deviceid == devicesArray[i].id){
			if (devicesArray[i].val == 0){
				//console.log(devicesArray[i].pin);
				b.digitalWrite(devicesArray[i].pin, b.HIGH);
				devicesArray[i].val = 100;
				io.sockets.emit('device change', devicesArray[i].id + '-on-100');
			} else {
				//console.log(devicesArray[i].pin);
				b.digitalWrite(devicesArray[i].pin, b.LOW);
				devicesArray[i].val = 0;
				io.sockets.emit('device change', devicesArray[i].id + '-off-0');
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
  			