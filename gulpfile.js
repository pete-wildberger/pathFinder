const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const del = require('del');
const paths = {
  pages: ['src/client/*.html']
};

gulp.task('clean', done => {
  del.sync(['dist/*']);
  done();
});

gulp.task('sass', () => {
  return gulp
    .src('src/client/assets/sass/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('copy-html', () => {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'copy-html', 'sass', 'server'], () => {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/client/main.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass:watch', () => {
  gulp.watch('src/client/assets/sass/*.scss', ['sass']);
});
