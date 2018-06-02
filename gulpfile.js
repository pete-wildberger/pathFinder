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
const icons = {
  pages: ['src/client/assets/icon/*.svg']
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
gulp.task('copy-assets', () => {
  return gulp.src(icons.pages).pipe(gulp.dest('dist/assets/icons'));
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

gulp.task('default', ['clean', 'copy-html', 'copy-assets', 'sass', 'server'], () => {
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
