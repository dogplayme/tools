/*
npm install -g gulp
npm install --save-dev gulp 
npm install --save-dev gulp-jshint gulp-minify-css gulp-uglify gulp-rename gulp-compass gulp-imagemin gulp-cached gulp-rev gulp-rev-replace gulp-clean gulp-concat run-sequence
*/

var gulp = require('gulp'),
//  jshint=require('gulp-jshint'),
//  concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    imagemin = require('gulp-imagemin'),
    cached = require('gulp-cached'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),


    projectName = 'project/website',
    wildcard = '/**/*',
    developPath = projectName + '/develop',
    uploadPath = projectName + '/upload'
    scssDevelopPath = [developPath+wildcard+'.scss'],
    cssDevelopPath = [developPath+wildcard+'.css','!'+developPath+wildcard+'.min.css'],
    jsDevelopPath = [developPath+wildcard+'.js','!'+developPath+wildcard+'.min.js'],
    imageDevelopPath = [
        developPath+wildcard+'.jpg',
        '!'+developPath+wildcard+'.min.jpg',
        developPath+wildcard+'.png',
        '!'+developPath+wildcard+'.min.png',
        developPath+wildcard+'.gif',
        '!'+developPath+wildcard+'.min.gif',
        developPath+wildcard+'.svg',
        '!'+developPath+wildcard+'.min.svg'
        ],
        
    minFileDevelopPath = [
        developPath+wildcard+'.min.css',
        developPath+wildcard+'.min.js',
        developPath+wildcard+'.min.jpg',
        developPath+wildcard+'.min.png',
        developPath+wildcard+'.min.gif',
        developPath+wildcard+'.min.svg'
        ],
    noLibFileDevelopPath = [
        developPath+wildcard,
        '!'+developPath+wildcard+'.scss',
        '!'+developPath+wildcard+'.css',
        '!'+developPath+wildcard+'.js',
        '!'+developPath+wildcard+'.jpg',
        '!'+developPath+wildcard+'.png',
        '!'+developPath+wildcard+'.gif',
        '!'+developPath+wildcard+'.svg'
        ],
    htmlUploadPath = uploadPath + wildcard + '.html'
;


//    gulp.task('jshint', function () {
//        return gulp.src(['project/**/*.js','!project/**/*.js'])
//            .pipe(jshint())
//            .pipe(jshint.reporter('default'));
//    });
gulp.task('compass', function(){
    return gulp.src(scssDevelopPath)
        .pipe(cached(developPath))
        .pipe(compass({
            sass: developPath,
            css: developPath, 
            style: 'expanded',               
            comments: false                  
        }));
    //    .pipe(rename({suffix: '.min'}))  
    //    .pipe(minifycss())  
    //    .pipe(gulp.dest(developPath));

});
gulp.task('minifycss', function() {
    return gulp.src(cssDevelopPath) 
        .pipe(cached(developPath))
        .pipe(rename({suffix: '.min'}))  
        .pipe(minifycss())  
        .pipe(gulp.dest(developPath));   
});
gulp.task('minifyjs', function() {
    return gulp.src(jsDevelopPath)      
    //    .pipe(concat('main.js'))    
    //    .pipe(gulp.dest('js'))    
        .pipe(cached(developPath)) 
        .pipe(rename({suffix: '.min'}))   
        .pipe(uglify())    
        .pipe(gulp.dest(developPath));  
});
gulp.task('imagemin', function(){
    return gulp.src(imageDevelopPath)
        .pipe(cached(developPath)) 
        .pipe(rename({suffix: '.min'}))
        .pipe(imagemin())
        .pipe(gulp.dest(developPath));
})
gulp.task('initial', function(){
    runSequence('compass', 'minifycss');
    gulp.start(['minifyjs', 'imagemin']);
})
gulp.task('watch', function(){
    gulp.watch(scssDevelopPath, ['compass']);
    gulp.watch(cssDevelopPath, ['minifycss']);
    gulp.watch(jsDevelopPath, ['minifyjs']);
    gulp.watch(imageDevelopPath, ['imagemin']);    
})




gulp.task('cleanUpload', function(){
    return gulp.src(uploadPath)
        .pipe(clean());
})
gulp.task('copyMinToUpload', function(){
    return gulp.src(minFileDevelopPath)
        .pipe(gulp.dest(uploadPath));
})
gulp.task('copyNoLibFileToUpload', function(){
    return gulp.src(noLibFileDevelopPath)
        .pipe(gulp.dest(uploadPath));
})
gulp.task('revToJson', function(){
    return gulp.src(minFileDevelopPath)
        .pipe(rev())
        .pipe(gulp.dest(uploadPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(uploadPath));
})
gulp.task('htmlRouter', function(){
    var manifest = gulp.src(uploadPath+'/rev-manifest.json');
    return gulp.src(htmlUploadPath)
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(uploadPath));
})

gulp.task('upload',function(){
    runSequence('cleanUpload', /*'copyMinToUpload',*/ 'copyNoLibFileToUpload', 'revToJson', 'htmlRouter');
});

gulp.task('default', function(){
    console.log("---------------------------");
    console.log(" ");
    console.log("---  try:  gulp initial");
    console.log("---  try:  gulp watch");
    console.log("---  try:  gulp upload");
    console.log(" ");
    console.log("---------------------------");
})





