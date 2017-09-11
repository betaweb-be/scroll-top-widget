const gulp = require('gulp'),
    minify = require('gulp-minify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss');

// compress javascript files and move them to the dist folder
gulp.task('compress', () => {
    gulp.src('src/*.js')
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks']
        }))
        .pipe(gulp.dest('dist'))
});

// apply post css actions on the css and move to the dist folder
gulp.task('css', function () {
    return gulp.src('./src/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('dist'));
});

// minify the css that's in the dist folder
gulp.task('minify-css', function () {
    gulp.src('dist/scroll-top.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

// go nuts
gulp.task('default', ['compress', 'css', 'minify-css']);
