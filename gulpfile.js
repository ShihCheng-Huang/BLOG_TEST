var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var less = require('gulp-less');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');

var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-router',
  'react-router-dom'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */

function vendor () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
    'bower_components/toastr/toastr.js'
  ]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
}

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */

function browserifyVendor() {
  return browserify()
    
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'));
}

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */

function Browserify () {
  return browserify('src/main.js')
    
    .transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'));
}

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */

function browserifyWatch () {
  var bundler = watchify(browserify('src/main.js', watchify.args));
  
  bundler.transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react"]})
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/js/'));
  }
}

/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */

function copyJquery(){
  return gulp.src('node_modules/jquery/*/*')
    .pipe(gulp.dest('public/libs/jquery'));
}

function copyBootstrap(){
  return gulp.src('node_modules/bootstrap/*/*/*')
    .pipe(gulp.dest('public/libs/bootstrap/'));
}

gulp.task('default',gulp.parallel(copyBootstrap,vendor,gulp.series(browserifyVendor,browserifyWatch)));
gulp.task('build',gulp.parallel(copyBootstrap,vendor,gulp.series(browserifyVendor,Browserify)));


