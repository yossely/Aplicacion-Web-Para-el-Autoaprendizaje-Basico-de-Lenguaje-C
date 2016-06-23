var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json');

var srcPath = 'source/',
    destPath = 'dist/';

gulp.task('sass', function(){
    return gulp
            .src(srcPath + 'sass/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(destPath + 'assets/css/'));
});

gulp.task('typescript', function(){
    return gulp
            .src(srcPath + 'typescript/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(typescript(tscConfig.compilerOptions))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(destPath + 'assets/js/'));
});

gulp.task('watch', function() { //Keep watching when files change then execute the respective tasks
  gulp.watch(srcPath + 'typescript/**/*.ts', ['typescript']);
  gulp.watch(srcPath + 'sass/**/*.scss', ['sass']);
  /*gulp.watch(appSrc + '** /*.html', ['html']);*/
});

gulp.task('webserver', function(){
    gulp.src(destPath)
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['sass', 'typescript', 'watch', 'webserver']);