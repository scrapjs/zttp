# zttp
open http protocol service over the zmq `STREAM` socket.

based on [PR: #386](https://github.com/JustinTulloss/zeromq.node/pull/386) and ideas from [hintjens' web server](http://hintjens.com/blog:42).

# install
there's an npm package dependency on [zmq](https://github.com/JustinTulloss/zeromq.node).

you'll need:
* zeromq v4+ on your system
* make sure [zeromq.node](https://github.com/JustinTulloss/zeromq.node) works.

```bash
$ npm i zhttp
```

# use
```js
var z = require('zttp').listen('tcp://127.0.0.1:3000');

z.route('/zmq/endpoint', function(req,res){

  var response = '<!DOCTYPE html><head><meta charset="UTF-8"></head><body>'
    + '<p>Hello from zeromq.</p></body></html>' //for now just plain text html

  res.send(response);

});
```
### MIT