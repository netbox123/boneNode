var mysql               = require('mysql');
var _inputsArray        = [];
var _devicesArray       = [];
var _pageItemsArray     = [];
var _actionsArray       = [];
var _pagesArray         = [];
var _tempsensorArray    = [];

var connection = mysql.createConnection({host: 'localhost',user: 'root',password: 'pipo',database: 'nodesql'});
connection.connect();

module.exports._pageItemsArray = _pageItemsArray;
module.exports._devicesArray = _devicesArray;
module.exports._inputsArray = _inputsArray;
module.exports._actionsArray = _actionsArray;
module.exports._pagesArray = _pagesArray;
module.exports.connectionEnd = function() { connection.end(); };


module.exports.loadDevices = function(querystring, callback){
    connection.query(querystring, function(err, result) {
    	if (err) throw err;
		for (var i in result) {
			var item = result[i];
			_devicesArray.push(item);
		 }
         callback();
	});
};

module.exports.loadPages = function(querystring, callback){
    connection.query(querystring, function(err, result) {
        if (err) throw err;
		for (var i in result) {
			var item = result[i];
			_pagesArray.push(item);
		 }
         callback();
	});
};

module.exports.loadPageItems = function(querystring, callback){
    connection.query(querystring, function(err, result) {
        if (err) throw err;
    	for (var i in result) {
			var item = result[i];
			_pageItemsArray.push(item);
		 }
         callback();
	});
};

module.exports.loadActions = function(querystring, callback){
    connection.query(querystring, function(err, result) {
        if (err) throw err;
        for (var i in result) {
			var item = result[i];
			_actionsArray.push(item);
		 }
         callback();
	});
};

module.exports.loadInputs = function(querystring, callback){
    connection.query(querystring, function(err, result) {
        if (err) throw err;
        for (var i in result) {
    		var item = result[i];
			_inputsArray.push(item);
		 }
         callback();
	});
};