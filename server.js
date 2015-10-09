'use strict';

var config = require('./config/config-loader').load();
var app = exports.app = require('./config/express')(config);
// exports.queue = require('./config/kue')(config);
var port = config.server.port;
var httpserver;


if (require.main === module) {
    httpserver = app.listen(port, function() {
    	console.log('Server ' + config.name + ' is running');
        console.log('NODE_ENV variable on server is ' + process.env.NODE_ENV);
        console.log('Express server run at http://localhost:' + port + '/');
    });
}

process.on('SIGTERM', function() {
	console.log('SIGTERM Signal received, trying to close connections...');

	process.env.NODE_IS_CLOSING = 'true';

	httpserver.close(function() {
	  console.log('Connections are closing');
	  process.exit();
	});

	return setTimeout(function() {
	  console.error('Forced closure');
	  process.exit(1);
	}, 30 * 1000);
});
