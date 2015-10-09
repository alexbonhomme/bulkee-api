'use strict';

var recluster = require('recluster');
var path = require('path');
var fs = require('fs');
var cluster = recluster(path.join(__dirname, 'server.js'));

cluster.run();

process.on('SIGUSR2', function() {
  console.log('Got SIGUSR2, reloading cluster...');
  cluster.reload();
});

fs.watchFile('package.json', function() {
	console.log('Package.json changed, reloading cluster...');
	cluster.reload();
});

