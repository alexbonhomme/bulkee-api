var gulp = require('gulp'),
	opn = require('opn');
var Promise = require('bluebird');
var $ = require('gulp-load-plugins')({
	scope: ['dependencies']
});
var mandrill = require('../app/common/mandrill');
var paths = {};
paths.testNode = './testing/*.js';

gulp.task('mocha', function () {
  if (process.env.NODE_ENV != 'tests') {
    console.log('Please set your NODE_ENV to tests');
    process.exit();
  }
  process.env.NODE_ENV = 'tests';
  return gulp.src(paths.testNode, {read: false})
  	.pipe($.mocha())
  	.once('error', function (err) {
      sendMailError(err)
        .then(function(done) {
          console.log("email sended");
          process.exit();
        })
        .catch(function(err) {
          process.exit();
        });
    })
    .once('end', function () {   
      process.exit();
    });
});

gulp.task('server', ['jshint'], function() {
	$.nodemon({ script: 'server.js', ext: 'html js'})
		.on('change', ['jshint'])
		.on('restart', function() {
			console.log('restarted !');
		});
});


// gulp.task('openbrowser', function()
// {
// 	opn('http://' + server.host + ':' + server.port);
// });

var sendMailError = function(error) {
  var message = {
      'html': '',
      'text': '' + error,
      'subject': 'Test error',
      'from_email': 'benjamin.coenen@hotmail.com',
      'from_name': 'Lapetitesoeur',
      'to': [{
          'email': 'benjamin.coenen@geophyle.com',
          'name': 'Benjamin Coenen',
          'type': 'to'
      }],
      'important': false,
      'track_opens': null,
      'track_clicks': null,
      'auto_text': null,
      'auto_html': null,
      'inline_css': null,
      'url_strip_qs': null,
      'preserve_recipients': null,
      'view_content_link': null,
      'tracking_domain': null,
      'signing_domain': null,
      'return_path_domain': null
  };
  Promise.promisifyAll(mandrill);
  return mandrill.sendAsync({
      message: message,
      async: false,
      ip_pool: 'Main Pool'
  })
}
