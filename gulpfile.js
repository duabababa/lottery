	var gulp=require("gulp");
	var less=require("gulp-less");
	var connect=require("gulp-connect");
	//var concat=require("gulp-concat");
	gulp.task('compilecss',function(){
		console.log('compile');
    gulp.src("./less/*.less")
        .pipe(less())
        .pipe(gulp.dest('./css/'));
	});

	gulp.task("refreshCss",function(){
		gulp.src("./css/*.css").pipe(connect.reload());
	})
	gulp.task("refreshHtml",function(){
		gulp.src("./*.html").pipe(connect.reload());
	})
	
	gulp.task("webserver",function(){
		connect.server({
			livereload:true,
			port: 2333
		});
		gulp.watch("./less/*.less",["compilecss"]);
		gulp.watch("./css/*.css",["refreshCss"]);
		gulp.watch("./*.html",["refreshHtml"]);

	});


