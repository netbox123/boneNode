//Sensor Locations on the BeagleBone Black
var temperature = '/sys/bus/w1/devices/28-00000495815b/w1_slave';

var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }


inputsArray = [];
devicesArray = [];
pageItemsArray = [];

var path = require('path');
var express = require('express'),
    app = express();
app.use(express.static(path.join(__dirname, 'public')));
var	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
    b = require('bonescript');
	nicknames = [],
	pagesArray = [];
    
io.set('log level', 0); // reduce logging

// set Temperature
function setTemperature(x) {
    //console.log('test '+x.data);
    temparray = x.data.split('t=');
    //console.log("Temperature is "+temparray[1]/1000+" degrees"); \
    var datetime = new Date();
    for (var i in devicesArray) {
        if (devicesArray[i].id == 1002){devicesArray[i].val = temparray[1]/1000;}
        if (devicesArray[i].id == 1003){devicesArray[i].val = [(datetime.getHours()).padLeft(), (datetime.getMinutes()).padLeft(), datetime.getSeconds().padLeft()].join(':');}
        if (devicesArray[i].id == 1004){devicesArray[i].val = [datetime.getDate().padLeft(), (datetime.getMonth()+1).padLeft(), datetime.getFullYear()].join('-');}
        if (devicesArray[i].id == 1005){devicesArray[i].val = Date.now();}
     }
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}
     
function getDateTime() {
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
	//console.log(dateText);
	return dateText;
} 

console.log('Loading database into array...');

var mysql      = require('mysql');
loadDatbase();



function loadDatbase() {
    var connection = mysql.createConnection({
    host     : 'localhost',
  	user     : 'root',
  	password : 'pipo',
  	database : 'nodesql'
    });
	connection.connect();
	connection.query('SELECT * FROM device_ini', function(err, result, fields) {
        devicesArray = [];
		if (err) throw err;
		for (var i in result) {
			var device = result[i];
			devicesArray.push(device);
		}
	});
	connection.query('SELECT * FROM page_ini', function(err, result, fields) {
        pagesArray = [];
		if (err) throw err;
		for (var i in result) {
			var page = result[i];
			pagesArray.push(page); 
		}
	});
	connection.query('SELECT * FROM page_items_ini order by type DESC', function(err, result, fields) {
        pageItemsArray = [];
		if (err) throw err;
		for (var i in result) {
			var pageItem = result[i];
			pageItemsArray.push(pageItem);
		}
	});
    connection.query('SELECT * FROM device_ini WHERE type=3', function(err, result, fields) {
        inputsArray = [];
		if (err) throw err;
		for (var i in result) {
			var deviceItem = result[i];
			inputsArray.push(deviceItem);
		}
	});
	connection.end();
}

console.log('Server listening on 192.168.1.41:4000');
setInterval(function() {b.readTextFile(temperature, setTemperature);}, 1000);


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






setInterval(checkInputs,100);

function checkInputs(){
    for (var i in inputsArray) {
        checkKey(b.digitalRead(inputsArray[i].pin),inputsArray[i].id,i); 
        //console.log(inputsArray[i].pin+' '+inputsArray[i].id+' '+i);
    }
}

function checkKey(x, deviceid, arrayid) {
    if (x == 0) {
        console.log(deviceid+' '+' on');
		if (inputsArray[arrayid].mem == 0) {
			inputsArray[arrayid].mem = 1;
            var timeText = getDateTime();
            io.sockets.emit('input change', deviceid+'-on-100');
			if (inputsArray[arrayid].val == 0) {
				b.digitalWrite('P8_12', b.HIGH);
				inputsArray[arrayid].val = 100;
				//console.log('turn lamp on');
				io.sockets.emit('new message', {
					msg:  'P8_12 on',
					nick: timeText + 'Key:P8_19 >'
				});
			 }
	   	     else {
				b.digitalWrite('P8_12', b.LOW);
				inputsArray[arrayid].val = 0;
				//console.log('turn lamp off');
				
				io.sockets.emit('new message', {
					msg: 'P8_12 off',
					nick: timeText + 'Key:P8_19 >'
				});

			  }
	    }
	} else {
        console.log(deviceid+' '+' off');
        if (inputsArray[arrayid].mem == 1){io.sockets.emit('input change', deviceid+'-off-0');}
	    inputsArray[arrayid].mem = 0;
	}
}


server.listen(4000);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
        var timeText = getDateTime();
		if (nicknames.indexOf(data) != -1){
			callback(false);
		} else{
			callback(true);
			socket.nickname = data;
            var address = socket.handshake.address;
            console.log(data+' connected from '+address.address + ':' + address.port);
    		io.sockets.emit('new message', {
                title: 'Client ' + address.address + ' connected',
                nick: socket.nickname,
				msg:  '',
                data: '',
                timeText: timeText
			});
			nicknames.push(socket.nickname);
			updateNicknames();
		}
	});
    
    
	
	//  -- Update Nicknames --
	function updateNicknames(){
		socket.emit('usernames', nicknames);
		socket.emit('devices', devicesArray);
        socket.emit('inputs', inputsArray);
		socket.emit('pages', pagesArray);
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
            if(devicesArray[i].id > 999){
                valstr += devicesArray[i].id+'#'+devicesArray[i].val + '*';
            }
        }
        //console.log(valstr);
		socket.emit('sendallvalues', {msg: valstr});
	});
    
    //  -- Servercommand received from client --
	socket.on('sendservercommand', function(data){
        var timeText = getDateTime();
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
                    timeText: timeText
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
        
        var timeText = getDateTime();
    	io.sockets.emit('new message', {
    				msg: data.id+' moved',
					nick: timeText + 'Web ' + data.xpos+'-'+data.ypos +' >'
		        });
        io.sockets.emit('pageitem change', {
        			id: data.id,
					xpos: data.xpos,
                    ypos: data.ypos
		        });
        //console.log('query '+data.msg);
	});
	
	//  -- Action received from client --
	socket.on('send action', function(data){
		//io.sockets.emit('device change', data);
		//io.sockets.emit('new message', {msg: data, nick: socket.nickname});
        
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
        var timeText = getDateTime();
    		if (devicesArray[devicenr].val == 0) {
				b.digitalWrite(pinStr, b.HIGH);
				devicesArray[devicenr].val = 100;
                io.sockets.emit('device change', deviceNrA[2]+'-on-100');
				io.sockets.emit('new message', {
                    title: 'Device ' + devicesArray[devicenr].name + ' turned on',
                    nick: socket.nickname,
					msg:  pinStr+' on',
                    data: data,
                    timeText: timeText
				});
			}
			else {
				b.digitalWrite(pinStr, b.LOW);
				devicesArray[devicenr].val = 0;
				
                io.sockets.emit('device change', deviceNrA[2]+'-off-0');
				io.sockets.emit('new message', {
                    title: 'Device ' + devicesArray[devicenr].name + ' turned off',
                    nick: socket.nickname,
					msg: pinStr+' off',
					data: data,
                    timeText: timeText
				});

			}
	});
	
	//  -- Client disconnected --
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		updateNicknames();
	});

});