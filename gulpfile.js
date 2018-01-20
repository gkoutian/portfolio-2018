var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss');
    cssnano = require('cssnano')

gulp.task('min-css', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('src/css/modules'));
 });

 gulp.task('concat-css', function(){
    gulp.src('src/css/modules/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('src/css'))
 })

 gulp.task('min-js', function() {
    gulp.src('src/js/modules/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('src/js'));
});

//minificar javascript
 gulp.task('build-js', function() {
    gulp.src('src/js/app.js')
        .pipe(uglify()) 
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build-css', function() {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    gulp.src('src/css/*.css')
        .pipe(concat('style.css'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('build-image', function() {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})

gulp.task('build-html', function() {
    gulp.src('src/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', function() {
    gulp.watch('src/js/modules/*.js', ['min-js'])
    gulp.watch('src/sass/**/*.sass', ['min-css', 'concat-css']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['build-css', 'build-js', 'build-image', 'build-html'])