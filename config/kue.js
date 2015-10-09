// 'use strict';
// var kue = require('kue');
// var Bluebird = require('bluebird');
// Bluebird.promisifyAll(kue);

// module.exports = function(config) {

//   var queue = kue.createQueue({
//     prefix: 'q',
//     redis: config.redis
//   });

//   process.once('SIGTERM', closeRedis(queue));
//   process.once('SIGUSR2', closeRedis(queue));
//   process.once('SIGINT', closeRedis(queue));

//   return queue;
// };

// function closeRedis(queue) {
//   return function () {
//     queue.shutdown(function(err) {
//       console.log('Kue is shut down. ', err || '');
//       process.exit(0);
//     }, 1000);
//   };
// }
