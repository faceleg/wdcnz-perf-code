'use strict';

var WS = require('ws').Server;
var wss = new WS({ port: 8080 });
var l = require('lodash');

var clients = [];
var nextid = 0;
var ops = {
  '+': plus,
  '*': mult,
  '-': sub,
  '/': div
};

wss.on('connection', function onConnection(ws) {
  var id = nextid;
  console.log('new connection: %s', id);
  nextid++;
  clients[id] = {client: ws, ops: []};

  ws.on('message', function onMessage(message) {
  	if(ops[message]) {
      var result = ops[message](clients[id].ops);
      ws.send(String(result));
  	} else if (Number(message) !== NaN) {
      clients[id].ops.push(Number(message));
  	}

    console.log('id: %s, op: %s', id, message);
  });
});

function plus(args) {
  return l.sum(args);
}

function mult(args) {
  return l.foldl(
    args, function(acc, n) { acc *= n; return acc; },
    1);
}

function sub(args) {
  return l.foldl(
    args,
    function(acc, n) { acc -= n; return acc; },
    l.head(args) * 2);
}

function div(args) {
  return l.foldl(
    args,
    function(acc, n) { acc /= n; return acc; },
    l.head(args) * l.head(args));
}
