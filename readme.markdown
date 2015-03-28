# zttp
http over zmq `STREAM` sockets. based on ideas from [hintjens' web server](http://hintjens.com/blog:42).

other ideas are possible since protocol optimizations and transport design patterns of HTTP/2 standards track align well with the interface, namely:
* [stream identifiers and stream concurrency](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17#section-5.1.1)
* [server push and push requests](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17#section-8.2)
* [request multiplexing](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17#section-5)

*<sub>Multiplexing of requests is achieved by having each HTTP request-
   response exchange associated with its own stream (Section 5).
   Streams are largely independent of each other, so a blocked or
   stalled request or response does not prevent progress on other
   streams. Flow control and prioritization ensure that it is possible to
   efficiently use multiplexed streams.</sub>*

### zttp ALPHA is an experimental, high performance http server 

# install
* latest zeromq v4+ on your system
* make sure [zeromq.node](https://github.com/JustinTulloss/zeromq.node) works.

```bash
$ npm i zttp
```

*<sub>any libzmq after v4+ will work, but the RAW sockopt for connecting router socket types might be depricated</sub>*

# use
```js
var z = require('zttp').listen('tcp://127.0.0.1:3000');

z.route('/zmq/endpoint', function(req,res){

  var response = '<!DOCTYPE html><head><meta charset="UTF-8"></head><body>'
    + '<p>Hello from zeromq.</p></body></html>' //for now just plain text html

  res.send(response);

});
```

# test
```js
$ git clone https://github.com/reqshark/zttp.git && cd zttp
$ npm install
$ npm test
```


### MIT
