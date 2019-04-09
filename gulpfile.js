/**
 * @file
 * Gulpfile for frontend_example theme.
 */

'use strict';

var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    sass        = require('gulp-sass'),
    sassLint    = require('gulp-sass-lint'),
    prefix      = require('gulp-autoprefixer'),
    glob        = require('glob'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    stripDebug  = require('gulp-strip-debug'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eyeglass    = require('eyeglass'),
    svgSprite   = require('gulp-svg-sprite'),
    paths = {
      js: 'js',
      sourceJs: 'src_js',
      sass: 'sass',
      css: 'css'
    },

    // add sassOptions for output style and eyeglass.

    sassOptions = {
      outputStyle: 'expanded',
      eyeglass: {
        enableImportOnce: false
      }
    },

    // SVG Config
    SVGconfig = {
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
      }
  };

/**
 * Task for linting javascript.
 */
gulp.task('lint', function () {
  return gulp.src([
    paths.sourceJs + '/**/*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
});

/**
 * Task for processing javascript files into one file.
 */
gulp.task('scripts', function() {
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
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
  .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
  .pipe(prefix({browsers: ['last 1 version', '> 1%', 'ie 8', 'ie 9', 'ie 10']}))
  .pipe(gulp.dest(paths.css));
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
  
  browserSync.init(null, {
    server: {
      baseDir: './'
    },
    port: 8080,
    files: [
      paths.sass +  '/**/*.scss',
      paths.css +  '/**/*.css',
      paths.js + '/**/*.js',
      paths.img + '/**/*',
    ]
  });
});

/**
 * Default gulp task.
 */
gulp.task('default', ['scripts', 'styles', 'watch', 'browserSync']);
