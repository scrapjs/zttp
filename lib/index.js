module.exports = {

  listen: function ( addr, opts ) {

    process.stdout.write('\n\u001b[90mømq endpoint:\u001b[39m\x1b[0m\u001b[31m'
      + ' ' + addr + '\u001b[39m\x1b[0m\n\n');

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
  var req = require('url').parse(_uri[1]);
  req.raw = raw;
  req.method = _uri[0];
  req.id = i;

  this.rmap[req.pathname].call(this, req, {
    z:this.z,
    send:function(rep){

      var resp = 'HTTP/1.1 200 OK\r\n'           //status code
        + 'Content-Type: text/html\r\n\r\n'     //headers
        + rep;

      this.z.send([req.id, resp  ]).send([req.id,''])
    }
  });
}
