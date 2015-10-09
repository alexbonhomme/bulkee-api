var gulp = require('gulp'),
	fs = require('fs');
var $ = require('gulp-load-plugins')(
{
	scope: ['dependencies']
});

gulp.task('jshint', function()
{
	return gulp.src('./**/*.js')
		.pipe($.ignore.exclude(/node_modules/))
		.pipe($.ignore.exclude(/docs/))
		.pipe($.ignore.exclude(/tests/))
		.pipe($.ignore.exclude(/libs/))
		.pipe($.ignore.exclude(/gulp*/))
		.pipe($.jshint())
		.pipe($.jshint.reporter());
});
