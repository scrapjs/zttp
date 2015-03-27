var z = require('..').listen('tcp://127.0.0.1:3000');
var request = require('request');
var response = '<!DOCTYPE html><head><meta charset="UTF-8"></head><body>'
  + '<p>Hello from zeromq.</p></body></html>' //for now just plain text html

module.exports  = function (t) {

  t.test('send a hundred simultaneous requests at it', function(t) {

    z.route('/endpoint', function(req,res){
      res.send(response);
    });

    var i = 101, recv = 0;
    var url = 'http://127.0.0.1:3000';

    while(i--) request.get( {url:url+'/endpoint'}, req );

    function req(e,r,b){
      t.equal(b,response, 'received: '+recv);
      if(++recv > 100){
        t.end();
        process.exit(0);
      }
    }
  });
}
