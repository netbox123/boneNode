var mysql               = require('mysql');
var _inputsArray        = [];
var _devicesArray       = [];
var _pageItemsArray     = [];
var _actionsArray       = [];
var _pagesArray         = [];
var _tempsensorArray    = [];
var _configArray    	= [];
var _eventsArray    	= [];
var _itemTypesArray    	= [];
var _linksArray    		= [];

var connection = mysql.createConnection({host: 'localhost',user: 'root',password: 'pipo',database: 'nodesql'});
connection.connect();

module.exports._configArray = _configArray;
module.exports._pageItemsArray = _pageItemsArray;
module.exports._devicesArray = _devicesArray;
module.exports._inputsArray = _inputsArray;
module.exports._actionsArray = _actionsArray;
module.exports._pagesArray = _pagesArray;
module.exports._eventsArray = _eventsArray;
module.exports._itemTypesArray = _itemTypesArray;
module.exports._linksArray = _linksArray;
module.exports.connectionEnd = function() { connection.end(); };

module.exports.loadConfig = function(querystring, callback){
    connection.query(querystring, function(err, result) {
    	if (err) throw err;
		for (var i in result) {
			var item = result[i];
			_configArray.push(item);
		 }
         callback();
	});
};

module.exports.loadEvents = function(querystring, callback){
    connection.query(querystring, function(err, result) {
    	if (err) throw err;
		for (var i in result) {
			var item = result[i];
			_eventsArray.push(item);
		 }
         callback();
	});
};

module.exports.loadItemTypes = function(querystring, callback){
    connection.query(querystring, function(err, result) {
    	if (err) throw err;
		for (var i in result) {
			var item = result[i];
			_itemTypesArray.push(item);
		 }
         callback();
	});
};

module.exports.loadLinks = function(querystring, callback){
    connection.query(querystring, function(err, result) {
    	if (err) throw err;
		for (var i in result) {
			var item = result[i];
			_linksArray.push(item);
		 }
         callback();
	});
};

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