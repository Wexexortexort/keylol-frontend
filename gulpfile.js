var gulp = require("gulp");
var template = require("gulp-template");
var _ = require("lodash");
var rename = require("gulp-rename");
var glob = require("glob");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rev = require("gulp-rev");
var del = require("del");
var modifyCssUrls = require("gulp-modify-css-urls");
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');

var vendorScripts = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/moment/moment.js",
    "bower_components/moment/locale/zh-cn.js",
    "bower_components/angular/angular.js",
    "bower_components/angular/i18n/zh.js",
    "bower_components/angular-route/angular-route.js",
    "bower_components/angular-http-batcher/dist/angular-http-batch.js",
    "bower_components/angular-moment/angular-moment.js",
    "bower_components/ngstorage/ngStorage.js"
];

var appSrcipts = [
    "keylol-app.js",
    "root-controller.js",
    "components/editor/quill.js",
    "components/editor/**/*.js",
    "components/**/*.js"
];

var stylesheets = [
    "assets/stylesheets/normalize.css",
    "components/editor/quill.snow.css",
    "assets/stylesheets/site.css"
];

var getFiles = function(arr){
    return _.union.apply(this, _.map(arr, function(path){
        return glob.sync(path, {cwd: "app"});
    }));
};

gulp.task("clean", function(){
    return del("app/bundles");
});

gulp.task("vendor-script-bundle", ["clean"], function(){
    return gulp.src(vendorScripts, {cwd: "app"})
        .pipe(concat("vendor.min.js"))
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest("app/bundles"));
});

gulp.task("app-script-bundle", ["clean"], function(){
    return gulp.src(appSrcipts, {cwd: "app"})
        .pipe(concat("app.min.js"))
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest("app/bundles"));
});

gulp.task("template-bundle", ["clean"], function(){
    return gulp.src("app/components/**/*.html")
        .pipe(templateCache("templates.min.js", {
            root: "components/",
            module: "KeylolApp"
        }))
        .pipe(rev())
        .pipe(gulp.dest("app/bundles"));
});

gulp.task("stylesheet-bundle", ["clean"], function(){
    return gulp.src(stylesheets, {cwd: "app"})
        .pipe(modifyCssUrls({modify: function(url) {
            return url.startsWith("data:") ? url : "../assets/stylesheets/" + url;
        }}))
        .pipe(autoprefixer())
        .pipe(concat("stylesheets.min.css"))
        .pipe(rev())
        .pipe(minifyCss())
        .pipe(gulp.dest("app/bundles"));
});

gulp.task("compile-index", function(){
    var scriptPaths = getFiles(vendorScripts.concat(appSrcipts));
    var stylesheetPaths = getFiles(stylesheets);
    return gulp.src("app/index.html.ejs")
        .pipe(template({
            scripts: scriptPaths,
            stylesheets: stylesheetPaths
        }))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("app"));
});

gulp.task("compile-index:prod", ["vendor-script-bundle", "app-script-bundle", "template-bundle", "stylesheet-bundle"], function(){
    var scriptPaths = getFiles(["bundles/vendor-*.min.js", "bundles/app-*.min.js", "bundles/templates-*.min.js"]);
    var stylesheetPaths = getFiles(["bundles/stylesheets-*.min.css"]);
    return gulp.src("app/index.html.ejs")
        .pipe(template({
            scripts: scriptPaths,
            stylesheets: stylesheetPaths
        }))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("app"));
});

gulp.task("prod", ["compile-index:prod"]);

gulp.task("default", ["compile-index"]);