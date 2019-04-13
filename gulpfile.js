/**
 * @file
 * Gulpfile for frontend_example theme.
 */

'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp-npm-run')(require('gulp-help')(require('gulp')));
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var eyeglass = require('eyeglass');

//
// Path settings
//
var paths = {
  js: 'js',
  sourceJs: 'src_js',
  sass: 'sass',
  css: 'css',
};

// add sassOptions for output style and eyeglass.

var sassOptions = {
  outputStyle: 'expanded',
  eyeglass: {
    enableImportOnce: false
  }
}

// SVG Config
var SVGconfig = {
  mode: {
    symbol: { // symbol mode to build the SVG
      dest: 'sprite', // destination foldeer
      sprite: 'sprite.svg', //sprite name
      example: true // Build sample page
    }
  },
  svg: {
    xmlDeclaration: false, // strip out the XML attribute
    doctypeDeclaration: false // don't include the !DOCTYPE declaration
  },
};

gulp.task('scripts', function () {
  'use strict';
  return gulp.src(paths.sourceJs + '/**/*.js')
    // Concatenate everything within the JavaScript folder.
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('scripts.min.js'))
    // Strip all debugger code out.
    .pipe(stripDebug())
    // Minify the JavaScript.
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});


//
// SASS Task
//
gulp.task('styles', function () {
  'use strict';
  return gulp.src(paths.sass + '/**/*.scss')
  .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
  .pipe(prefix(['last 1 version', '> 1%','ie 10']))
  .pipe(gulp.dest(paths.css))
});


//
// Watch
//

gulp.task('watch', function () {
  'use strict';
  gulp.watch(paths.js + '/**/*.js', ['scripts']);
  gulp.watch(paths.sass + '/**/*.scss', ['styles']);
});


/**
 * Task for generating svg sprite.
 */
gulp.task('sprite-page', function() {
  return gulp.src('svg/**/*.svg')
    .pipe(svgSprite(SVGconfig))
    .pipe(gulp.dest('.'));
});

gulp.task('sprite-shortcut', function() {
  return gulp.src('sprite/sprite.svg')
    .pipe(gulp.dest('.'));
});


/**
 * Task for running browserSync.
 */
gulp.task('browserSync', function () {
  'use strict';
  var files= [
    paths.css + '/**/*.css',
    paths.sourceJs + '/**/*.js'
  ];
  browserSync.init(files, {
    server: {
      baseDir: './'
    },
    port:8000,
    notify:true,
  });
});

/**
 * Default gulp task.
 */
gulp.task('default', ['scripts', 'styles', 'watch', 'browserSync']);
