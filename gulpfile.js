const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('app/js/script.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function gulpPug() {
  return src('app/pug/index.pug')
    .pipe(concat('index.html'))
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}

function imgmin() {
  return src('app/images/**/*.{jpg,jpeg,png,gif,webp}')
    .pipe(newer('./dist/images'))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest('./dist/images'))
    .pipe(src('app/images/**/*.svg'))
    .pipe(dest('./dist/images'));
}

function favicon() {
  return src('app/favicon.*').pipe(dest('dist'));
}

function watching() {
  watch(['app/scss/style.scss'], styles);
  watch(['js/script.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
  watch(['app/pug/*.pug'], gulpPug);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
}

function building() {
  return src(
    ['app/css/style.min.css', 'app/js/script.min.js', 'app/**/*.html'],
    { base: 'app' }
  ).pipe(dest('dist'));
}

function cleanDist() {
  return src('dist').pipe(clean());
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.gulpPug = gulpPug;
exports.imgmin = imgmin;
exports.favicon = favicon;

exports.build = series(cleanDist, building, imgmin, favicon);
exports.default = parallel(
  styles,
  scripts,
  gulpPug,
  imgmin,
  browsersync,
  watching
);
