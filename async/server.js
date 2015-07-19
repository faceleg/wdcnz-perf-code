var util = require('util');
var http = require('http');
var async = require('async');

var itemCount = 1000;
var items = [];
var item = 0;
while (item < itemCount)
  items.push(++item);

var port = 9999;
http.createServer(onRequest).listen(port, onReady);

function onReady() {
  console.log('Server listening on port', port);
}

function onRequest(req, res) {
  async.each(items, simulateProcessing, done);

  function simulateProcessing(item, cb) {
    // Display progress
    var percent = 10;
    var total = itemCount - (itemCount % percent);
    var step = total / percent;
    if (item % step === 0)
      res.write(util.format('%d%% ...\n', (item / step) * percent));

    // Simulate a little local processing e.g. producing a request
    var d = Date.now();
    while (Date.now() - d < 4);

    // Simulate remote processing e.g. db operation
    setTimeout(cb, 100);
  }

  function done(err) {
    if (err) throw err;
    res.write('All done!\n');
    res.end();
  }
}

