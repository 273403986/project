//引入所需插件
var gulp = require("gulp"),
	sass = require("gulp-sass"),
	rename = require("gulp-rename"),
	cssnano = require("gulp-cssnano"),
	uglify = require("gulp-uglify");
//创建任务（发布任务）
gulp.task("My",function(){
	console.log("May i help you?");
})
//创建任务，发布任务sass
gulp.task("sass",function(){
	return gulp.src("src/sass/*.scss").pipe(sass({style : "expanded"})).pipe(gulp.dest("css")).pipe(rename({"suffix" : ".min"})).pipe(cssnano()).pipe(gulp.dest("css"));
})
//创建任务，发布任务js
gulp.task("js",function(){
     return gulp.src("js/*.js").pipe(rename({"suffix" : ".min"})).pipe(uglify()).pipe(gulp.dest("js"));
});
//监听任务
gulp.task("watch",function(){
	gulp.watch("src/sass/*.scss",["sass"]);
	gulp.watch("js/*.js",["js"]);
})
