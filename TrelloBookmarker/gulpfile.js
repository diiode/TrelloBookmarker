var gulp = require('gulp');
var bower = require('gulp-bower');
var less = require('gulp-less');

var bases = {
    bower: './bower_components/',
    bower_select2: './bower_components/select2/',
    bower_jquery: './bower_components/jquery/',
    bower_skeleton: './bower_components/skeleton-less/',
    data: './data/',
    data_css: './data/css/',
    data_less: './data/less/',
    data_js: './data/js/'

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
    gulp.src(bases.bower_skeleton + 'less/skeleton.less')
        .pipe(gulp.dest(bases.data_less));
    // jQuery
    gulp.src(bases.bower_jquery + 'jquery*.js')
        .pipe(gulp.dest(bases.data_js));
})

// Theme
gulp.task('theme', function () {
    return gulp.src(bases.data_less + 'style.less')
        .pipe(less())
        .pipe(gulp.dest(bases.data_css));
})
