# calc server

This server implements an [RPN calculator](https://en.wikipedia.org/wiki/Reverse_Polish_notation)
over WebSockets. See [client.js](client.js) for a usage example.

Your task is to test the server for resource leaks (a simple Minigun test script is
included in  [test.json](test.json)) and fix them.

Suggested steps:

1. Generate some load on the server with Minigun and observe changes in memory usage.
2. Confirm that memory usage is growing under load, and that memory is not reclaimed by the GC.
3. Use heapdump to analyse memory growth.
4. Fix the problem. :)
