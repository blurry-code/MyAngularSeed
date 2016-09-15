'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var useref = require('gulp-useref');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var removeCode = require('gulp-remove-code');
var del = require('del');

// variables

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

var lr;



var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};



// Let's make things more readable by
// encapsulating each part's setup
// in its own method
function startExpress() {

  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}

// We'll need a reference to the tinylr
// object to send notifications of file changes
// further down
function startLivereload() {

  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

// Notifies livereload of changes detected
// by `gulp.watch()` 
function notifyLivereload(event) {

  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);

  lr.changed({
    body: {
      files: [fileName]
    }
  });
}


// parse sass to css and move to css folder
gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [ '/sass/partials' ],
            outputStyle: 'expanded'
        }).on('error', sass.logError))
   //     .pipe(sourcemaps.write('../dist/css/maps'))  throwing error right now???
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./css/'))
       .pipe(livereload());
});

gulp.task('html', function() {
     gulp.src('*.html')
       .pipe(livereload());
    gulp.src('templates/*.html')
       .pipe(livereload());
     gulp.src('modules/**/*.html')
       .pipe(livereload());
});
gulp.task('html-templates', function() {
    gulp.src('templates/*.html')
       .pipe(livereload());
});
gulp.task('html-modules', function() {
     gulp.src('modules/**/*.html')
       .pipe(livereload());
});

gulp.task('scripts-modules', function() {
     gulp.src('modules/**/*.js')
       .pipe(livereload());
});
gulp.task('scripts', function() {
     gulp.src('js/**/*.js')
       .pipe(livereload());
});


// Default task that will be run
// when no parameter is provided
// to gulp
gulp.task('default', ['styles', 'html'],function () {
    livereload.listen();
  gulp.watch('js/**/*.js',['scripts']);
    gulp.watch('modules/**/*.js',['scripts-modules']);
  gulp.watch('sass/**/*.scss',['styles']);
  gulp.watch('*.html',['html']);
  gulp.watch('templates/*.html',['html-templates']);
    gulp.watch('modules/**/*.html',['html-modules']);
  startExpress();
//  startLivereload();
 // gulp.watch('*.html', livereload());
    gulp.src('')
.pipe(open({app: 'chrome', uri: 'http://localhost:4000'}));
});



/*
 *  DIST GENERATION
 */

//  in order to generate the dist folder call
//  'gulp dist' from the root folder

// generate sass documentation (e.g. for mixins, etc.)
var sassdocOptions = {
    dest: './public/sassdoc'
};
gulp.task('sassdoc',  function () {
  gulp
    .src('sass/**/*.scss')
    .pipe(sassdoc(sassdocOptions))
    .resume();
});

// copy all needed folder
var filesToMove = [
    './img/**/*.*',
    './locales/**/*.*',
    './templates/**/*.*',
    './modules/**/*.*'
];
gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('dist'));
});

// delete dist folder
gulp.task('clean', function (cb) {
  del.sync('dist/**/*');
    cb();
});

// parse sass and combine all css
var cssToConcat = [
    './bower_components/angular-material/angular-material.css',
    'css/*.css'
];
gulp.task('diststyles', ['sassdoc', 'clean'], function(){
    // parse sass to compressed css, move to css folder
    gulp
        .src('sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./css/'));
    
    // conncat all relevant css
    gulp
        .src(cssToConcat)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css')); 
});

// dist task that puts it all together
// useref combines all the js files
// removeCode removes specified <link /> tags
gulp.task('dist', ['diststyles','move'],function(){   
   
   gulp.src('*.html')
    .pipe(useref())
    .pipe(removeCode({ production: true }))
    .pipe(gulp.dest('dist')); 
});