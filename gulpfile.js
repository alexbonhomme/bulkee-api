var gulp = require('gulp'),
	requireDir = require('require-dir'),
	$ = require('gulp-load-plugins')({scope: ['dependencies']});
	
requireDir('./gulp_scripts', {recurse: true});

gulp.task('default', ['server']);
