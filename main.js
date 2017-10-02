(function () {

    'use strict';

    var http      = require('http'),
        query     = require('querystring'),
        request   = require('request');

    var PORT = process.env.PORT || 8080;
    var USERNAME = process.env.POLYTECH_USERNAME
    var PASSWORD = process.env.POLYTECH_PASSWORD
    
    http.createServer(function (req, res) {

        if (req.url.indexOf('?') >= 0) {
            var params = query.parse(req.url.replace(/^.*\?/, ''));
            var url  = params.url;
        }

        if (url) {

            var target = 'https://' + USERNAME + ':' + PASSWORD + '@' + url;
            console.log(target);

            request(target).pipe(res);
        } else {
            res.writeHead(400);
            res.end('error with params');
        }

    }).listen(PORT, function () {
        console.log('Listenning on port ', PORT);
    });

}());
