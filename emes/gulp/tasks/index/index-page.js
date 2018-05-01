var gulp        = require('gulp');
var consolidate = require('gulp-consolidate');
var config      = require('../../config');
require('require-yaml');

gulp.task('list-pages', function() {
    var buildHtml = gulp.src('app/*.html') 
    .pipe(gulp.dest('build'));
});

gulp.task('list-pages:watch', function() {
    gulp.watch(config.src.root+'/*', ['list-pages']);
});

