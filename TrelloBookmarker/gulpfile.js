var gulp = require('gulp');
var bower = require('gulp-bower');

var bases = {
    bower: './bower-components/',
    bower_select2: './bower-components/select2',
    bower_jquery: './bower-components/jquery',
    data: './data/',
    data_css: './data/css',
    data_js: './data/js'

}

// Download bower
gulp.task('bower', function () {
    return bower();
});

// Set assets right
gulp.task('copy', function () {
    // Select2
    gulp.src(bases.bower_select2 + 'select2.css')
        .pipe(gulp.dest(bases.data_css));
    gulp.src(bases.bower_select2 + 'select2.png')
        .pipe(gulp.dest(bases.data_css));
    gulp.src(bases.bower_select2 + 'select2-spinner.gif')
        .pipe(gulp.dest(bases.data_css));
    gulp.src(bases.bower_select2 + 'select2x2.png')
        .pipe(gulp.dest(bases.data_css));
    gulp.src(bases.bower_select2 + 'select2.js')
        .pipe(gulp.dest(bases.data_js));
    // jQuery
    gulp.src(bases.bower_jquery + 'jquery*.*')
        .pipe(gulp.dest(bases.data_js));
})
