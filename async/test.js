var async = require('async');

// Simulate that other stuff is happening e.g. handling other requests
var lastTimeOtherStuffHadAChangeToHappen = Date.now();
setInterval(doOtherStuff, 100).unref();
function doOtherStuff() { lastTimeOtherStuffHadAChangeToHappen = Date.now(); }

// Let's say this is part of the handling of a single request
var itemCount = 3000;
var items = [];
var item = 0;
while (item < itemCount)
  items.push(++item);
async.each(items, simulateProcessing, done);

function done(err) {
  if (err) throw err;
  console.log('All done!');
}

function simulateProcessing(item, cb) {
  // Display progress
  var percent = 10;
  var total = itemCount - (itemCount % percent);
  var step = total / percent;
  if (item % step === 0)
    console.log('%d%% ...', (item / step) * percent);

  // Simulate a little local processing e.g. producing a request
  var d = Date.now();
  while (Date.now() - d < 4);

  // Simulate remote processing e.g. db operation
  setTimeout(cb, 100);

  // Make sure other stuff has been getting a chance to happen
  // e.g. one request shouldn't delay all the other ones.
  var time = Date.now() - lastTimeOtherStuffHadAChangeToHappen;
  if (time > 3 * 1000)
    throw new Error('No other requests could be serviced too long');
}

