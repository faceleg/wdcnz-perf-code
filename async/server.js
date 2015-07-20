var util = require('util');
var http = require('http');

var items = require('./items');
var work = require('./work');

var port = 9999;
http.createServer(onRequest).listen(port, onReady);

function onReady() {
  console.log('Server listening on port', port);
}

function onRequest(req, res) {
  work(items, reportProgress, done);

  function reportProgress(progress) {
    res.write(util.format('%d%% ...\n', progress));
  }

  function done(err) {
    if (err) throw err;
    res.write('All done!\n');
    res.end();
  }
}
