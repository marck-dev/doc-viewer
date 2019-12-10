/* eslint-disable no-undef */
const { src, dest, watch, series } = require('gulp');
const rname = require('gulp-rename');
const ugli = require('gulp-uglify');
const concat = require('gulp-concat');
const css = require('gulp-clean-css');

function generateJs() {
    return src("src/js/*.js").pipe(concat("PDFViewer.js")).pipe(dest("output/js/"));
}

function moveLibs() {
    return src("libs/*").pipe(dest("output/libs")).pipe(ugli()).pipe(dest("libs"));
}

function minJs() {
    return src("output/js/PDFViewer.js").pipe(ugli()).pipe(rname("PDFViewer.min.js")).pipe(dest("min/js"));
}

function minCss() {
    return src("output/css/PDFViewer.css").pipe(css({ compatibility: "ie8" })).pipe(rname("PDFViewer.min.css")).pipe(dest("min/css"));
}

function styles() {
    return src("src/css/*.css").pipe(concat("PDFViewer.css")).pipe(dest("output/css"));
}

exports.watch = function() {
    watch(["src/*/*.*"], series(generateJs, styles));
};
exports.default = series(generateJs, styles, minJs, minCss);
exports.lib = moveLibs;
exports.min = series(minJs, minCss);