# Challenge — aysnc

[`async`](https://www.npmjs.com/package/async) has long been the most depended
upon npm module. It provides utility functions to manage asynchronous operations.

Using `async` the wrong way is one of the most frequent causes of delays in
the event loop.

## The problem

First, install the dependencies by running `npm install` in this directory.

Then open 3 terminal windows, one for each of these commands:

1. `node server`
2. `curl http://localhost:9999/`
3. `curl http://localhost:9999/`

Notice that the second request is only serviced after the first one is completed.

What is happening is that the event loop is delayed, so the handling of the second request gets delayed.

To work on this problem without having to do the *three-terminal-windows-dance* you can use `node test`.
It should throw an error as long as the problem still exists:

```
$ node test
10% ...
20% ...
30% ...
wdcnz-perf-code/async/test.js:21
    throw new Error('No other requests could be serviced for too long');
          ^
Error: No other requests could be serviced for too long
    at reportProgressAndCheckEventLoopDelay (wdcnz-perf-code/async/test.js:21:11)
    at each (wdcnz-perf-code/async/work.js:15:7)
    at wdcnz-perf-code/async/node_modules/async/lib/async.js:159:20
    at wdcnz-perf-code/async/node_modules/async/lib/async.js:227:13
    at _arrayEach (wdcnz-perf-code/async/node_modules/async/lib/async.js:78:13)
    at _each (wdcnz-perf-code/async/node_modules/async/lib/async.js:69:13)
    at Object.async.forEachOf.async.eachOf (wdcnz-perf-code/async/node_modules/async/lib/async.js:226:9)
    at Object.async.forEach.async.each (wdcnz-perf-code/async/node_modules/async/lib/async.js:203:22)
    at work (wdcnz-perf-code/async/work.js:6:9)
    at Object.<anonymous> (wdcnz-perf-code/async/test.js:12:1)
```

But when you fix the problem, running `node test` shouldn't throw any errors:

```
$ node test.js
10% ...
20% ...
30% ...
40% ...
50% ...
60% ...
70% ...
80% ...
90% ...
100% ...
All done!
```

The problem you need to fix is on the `work.js` file, specifically, this line:

```javascript
  async.each(items, each, done);
```

You shouldn't need to change the iterator function to solve the problem, you should only need to change this specific line, but you're encouraged to play around with the rest of the code.
