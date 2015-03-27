'use strict';

var url = require('url');
var notfound = '<!DOCTYPE html><head><meta charset="UTF-8"></head><body>'
  + '<h1>404: not found.</h1></body></html>';

module.exports = {

  listen: function ( addr, opts ) {

    process.stdout.write('\n\u001b[90mømq endpoint: \u001b[31m\x1b[0m'
      + '\u001b[32m' + addr + '\u001b[33m\x1b[0m\n\n');
    return new self( require('zmq').socket('stream').bind(addr), addr, opts );

  }

}

require('util').inherits( self, require('events').EventEmitter);

function self (zmq,a,o) {

  require('events').EventEmitter.call(this);
  zmq.on('message', recv.bind(this));
  this.close = zmq.close;
  this.route = function(str, fn){
    this.rmap[str] = fn;
  }
  this.rmap = {};
  this.z = zmq;
}

function recv (i, r) {

  var raw = String(r).split('\r\n'), _uri = raw[0].split(' ');
  var req = url.parse(_uri[1]);
  req.raw = raw;
  req.method = _uri[0];
  req.id = i;

  if(has(this.rmap, req.pathname)){
    this.rmap[req.pathname].call(this, req, {
      z:this.z,
      send:function(rep){

        var status = 'HTTP/1.1 200 OK\r\n'
          + 'Content-Type: text/html\r\n\r\n'
          + rep;

        this.z.send([ req.id, status  ]).send([ req.id, '' ]);
      }
    });
  } else {
    this.z.send([ req.id, 'HTTP/1.1 404 NOT FOUND\r\n'
      + 'Content-Type: text/html\r\n\r\n' + notfound ]).send([ req.id, '' ]);
  }
}

function has (obj, prop) {
  return Object.hasOwnProperty.call(obj, prop);
}
