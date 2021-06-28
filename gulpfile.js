let project_folder = require('path').basename(__dirname);
let source_folder = "src";

let fs = require('fs');

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/'
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/scss/style.scss',
        js: source_folder + '/js/script.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: source_folder + '/fonts/*.ttf'
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean: './' + project_folder + "/"
}

const gulp = require('gulp'),
    { src, dest } = require('gulp'),
    scss = require('gulp-sass')(require('node-sass')),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    fileInclude = require('gulp-file-include'),
    del = require('del')




function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html));
}

function css() {
    return src(path.src.css)
        .pipe(scss())
        .pipe(dest(path.build.css))
        .pipe(cleanCss())

        .pipe(
            rename({ extname: '.min.css' })
        )
        .pipe(dest(path.build.css))
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
}

function img() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img],img)
}

function clean() {
    return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(css, html, js,img));
const watch = gulp.parallel(build, watchFiles);

// exports.css = css;
// exports.html = html;
exports.build = build;
// exports.watch = watch;
exports.default = watch;