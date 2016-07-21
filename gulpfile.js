var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json');

var srcPath = 'source/',
    destPath = 'dist/';

gulp.task('copy', function(){
    // Tooltip library
    gulp.src('node_modules/hint.css/hint.min.css')
        .pipe(gulp.dest(destPath + 'assets/css/hint.css'));
        
    // @angular
    gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js'
            ])
        .pipe(gulp.dest(destPath + 'assets/js/angular2'));

    // Bootstrap tabs
    return gulp.src(['node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
                     'node_modules/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
                     'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
                     'node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js'])
        .pipe(gulp.dest(destPath + 'assets/js/bootstrap'));

});

gulp.task('sass', function(){

    SassOptions= {
        precision: 8
    };
    autoprefixerOptions = {
        browsers: ['Chrome >= 20','Firefox >= 24','Explorer >= 8','Opera >= 12','Safari >= 6']
    };
    return gulp
            .src(srcPath + 'sass/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass(SassOptions).on('error', sass.logError))
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(destPath + 'assets/css/'));
});

gulp.task('typescript', function(){
    gulp.src('systemjs.config.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(destPath + 'assets/js/'));

    return gulp
            .src(srcPath + 'typescript/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(typescript(tscConfig.compilerOptions))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(destPath + 'assets/js/'));
});

gulp.task('watch', function() { //Keep watching when files change then execute the respective tasks
  gulp.watch(srcPath + 'typescript/**/*.ts', ['typescript']);
  gulp.watch('systemjs.config.ts', ['typescript']);
  gulp.watch(srcPath + 'sass/**/*.scss', ['sass']);
  /*gulp.watch(appSrc + '** /*.html', ['html']);*/
});

gulp.task('webserver', function(){
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            open: false     //don't open the browser (in my case I don't want this 'cause it does not open firefox developer)
        }));
});

gulp.task('default', ['copy', 'sass', 'typescript', 'watch', 'webserver']);