/*Project Vars*/
var html_dir = ['./*.html', './*.php', './**/*.html', './**/*.php'],
    less_dir = ['./less/style.less'],
    js_dir = ['./bower_components/jquery/dist/jquery.min.js', 
    './bower_components/bootstrap/js/ie10-viewport-bug-workaround.js', 
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './js/scripts.js'],
    js_output_dir = './public/js',
    css_dir = './public/css',
    php_dir = ['./*.php', './**/*.php'],
    img_src_dir = ['./*.+(png|jpg|gif|jpeg)', './**/*.+(png|jpg|gif|jpeg)'],
    img_out_dir = './public/img',
    fonts_dir = ['./public/bower_components/font-awesome/fonts/*'],
    fonts_output_dir = './public/fonts';

/*Gulp Requires*/
var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    watch = require('gulp-watch'),
    path = require('path'),
    bootlint  = require('gulp-bootlint'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    cat = require('gulp-concat'),
    cleancss = new LessPluginCleanCSS({ advanced: true, keepSpecialComments: 0 }),
    imageop = require('gulp-image-optimization'),
    livereload = require('gulp-livereload');
    
/*Default Task*/
gulp.task('default', ['less', 'js-build', 'images']);

/*Run linters*/
gulp.task('lint', ['bootlint', 'jshint']);

/*Watch Task*/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(html_dir, ['bootlint']);
    gulp.watch(less_dir, ['less']);
    gulp.watch(js_dir, ['js-build-dev', 'jshint']);
});

/* Image Min */
gulp.task('images', function(cb) {
    gulp.src(img_src_dir).pipe(imageop({
        optimizationLevel: 8,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest(img_out_dir)).on('end', cb).on('error', cb);
});

/*Compile LESS*/
gulp.task('less', ['less-main']);

gulp.task('less-main', function() {
    return gulp.src(less_dir)
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ],
          plugins: [cleancss]
        })).pipe(livereload())
        .pipe(gulp.dest(css_dir));
});

/*Compile JS*/
gulp.task('js-build', ['js-build-main', 'jshint']);

gulp.task('js-build-main', function() {
  return gulp.src(js_dir)
    .pipe(uglify())
    .pipe(cat('scripts.min.js'))
    .pipe(gulp.dest(js_output_dir))
    .pipe(livereload());
});

/*Compile JS UNMINIFIED!!*/
gulp.task('js-build-dev', ['js-build-main-dev', 'jshint']);

gulp.task('js-build-main-dev', function() {
  return gulp.src(js_dir)
    .pipe(cat('scripts.min.js'))
    .pipe(gulp.dest(js_output_dir))
    .pipe(livereload());
});

/*Bootlint*/
gulp.task('bootlint', function() {
    return gulp.src(html_dir)
        .pipe(bootlint({disabledIds: ['E001', 'W001', 'W002', 'W003', 'W005']}))
        .pipe(livereload());
    
});
/*JS Lint*/
gulp.task('jshint', function() {
  return gulp.src(js_dir)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/*Copy FontAwesome fonts to the public directory*/
gulp.task('fonts', function() {
  return gulp.src(fonts_dir)
  .pipe(gulp.dest(fonts_output_dir));
});
