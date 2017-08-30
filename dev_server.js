#!/usr/bin/env node

var server = new (require ('node-static').Server) ('./dist');
require ('http').createServer (function (req, res) {
    req.on ('end', function(){
        server.serve (req, res);
    }).resume();
}).listen (8080);
