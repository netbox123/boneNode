if (exports) {
  var fs = require('fs');
  var jsdom = require('jsdom');
  var html = fs.readFileSync('index.html', 'utf-8');
  window = jsdom.jsdom(html).parentWindow;
  var Slideout = require('../');
  var assert = require('better-assert');
}

var doc = window.document;
var beforeopenEvent = false;
var openEvent = false;
var beforecloseEvent = false;
var closeEvent = false;
var slideout = new Slideout({
  'panel': doc.getElementById('panel'),
  'menu': doc.getElementById('menu')
});

slideout
  .on('beforeopen', function() {
    beforeopenEvent = true;
  })
  .on('open', function() {
    openEvent = true;
  })
  .on('beforeclose', function() {
    beforecloseEvent = true;
  })
  .on('close', function() {
    closeEvent = true;
  });

