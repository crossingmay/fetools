var gulp          = require('gulp'),
    del           = require('del'),                 // 删除插件
    uglify        = require('gulp-uglify'),         // js混淆压缩
    cssmin        = require('gulp-clean-css'),      // css压缩
    rev           = require('gulp-rev'),            // 给文件增加md5后缀
    revCollector  = require('gulp-rev-collector'),  // 根据rev-maniest替换文件名
    merge         = require('merge2'),              // 合并流
    webpack       = require('webpack-stream'),      // 把webpack任务变成任务流
    runSequence   = require('run-sequence'),        // 改变任务优先级
    webpackConfig = require('./webpack.config.js'), // 导入webpack配置文件
    upyun_cdn     = require('upyun_cdn'),           // 又拍云上传组件
    gulpUtil      = require('gulp-util');           // 输出错误日志
var pathconfig = {

    // 静态资源文件
    source: {

        // 源文件 pathconfig.source.src.
        src: {
            assets : 'Src/Kids/assets/**',
            css    : 'Src/Kids/css/*.css',
            font   : 'Src/Kids/fonts/*',
            js     : 'Src/Kids/js/*.js',
            images : 'Src/Kids/images/*.{png,jpg,gif,ico}',
            html   : 'Application/Home/View/**/*.html'
        },

        // MD5版本号文件 pathconfig.source.rev.
        rev: {
            css : 'Src/Rev/Kids/css/*.json',
            js  : 'Src/Rev/Kids/js/*.json',
        }
    },

    // 正式发布目录文件 pathconfig.dist.
    dist: {
        all: 'Public/Kids/**'
    },

    // 目录
    dir: {

        // 源文件 pathconfig.dir.src.
        src: {
            assets : 'Src/Kids/assets',
            css    : 'Src/Kids/css',
            font   : 'Src/Kids/fonts',
            js     : 'Src/Kids/js',
            images : 'Src/Kids/images',
            html   : 'Application/Home/View',
        },

        //替换版本后的文件目录
        revCollector: {
            css  : 'Src/RevCollector/css',
            html : 'Src/RevCollector/html',
        },

        // MD5版本号文件 pathconfig.dir.rev.
        rev: {
            css : 'Src/Rev/Kids/css',
            js  : 'Src/Rev/Kids/js',
        },

        // 正式文件目录 pathconfig.dir.dist.
        dist: {
            all    : 'Public/Kids',
            css    : 'Public/Kids/css',
            font   : 'Public/Kids/fonts',
            js     : 'Public/Kids/js',
            images : 'Public/Kids/images',
            assets : 'Public/Kids/assets',
            html   : 'Application/Home/Build',
        }
    }
}


/**
 * 又拍云相关
 */

var upconfig = require('./Src/Conf/upyun.json'), //获取upyun信息
    options = {
        src  : ['Public/Kids/**'],
        dest : upconfig.cdn.upyun.folder
    },
    auth = {
        bucket   : upconfig.cdn.upyun.bucket,
        operator : upconfig.cdn.upyun.username,
        password : upconfig.cdn.upyun.password
    };

// 上传
gulp.task('upload', function() {
    upyun_cdn(options, auth, function(err, result) {
        if (err) {
            console.log(err);
        }
    });
});


/*=======================单独项目分割线========================*/

// 说明
gulp.task('help', function() {

    console.log(' gulp help        gulp参数说明');

    console.log(' gulp build:kid   版本打包');

    console.log(' gulp deploy:kid  一次打包、部署到upyun');

    console.log(' gulp clean:kid   删除生成的css,js文件');

    console.log(' gulp upload      上传到又拍云');

});

/**
 * 海马体Kids专用
 */

// gulp打包时再webpack一次
gulp.task('webpack', function() {
    gulp.src('./Src/Kids/js/**')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./Src/Kids/js'));
});

// css,js,img资源打包
gulp.task('lib:kid', function() {
    return merge(
        
        // Kids js
        gulp.src(pathconfig.source.src.js)
            .pipe(rev())
            .pipe(uglify().on('error', gulpUtil.log))
            .pipe(gulp.dest(pathconfig.dir.dist.js))
            .pipe(rev.manifest())
            .pipe(gulp.dest(pathconfig.dir.rev.js)),
        
        // Kids css
        gulp.src(pathconfig.source.src.css)
            .pipe(rev())
            .pipe(
                cssmin({debug: true}, function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            }))
            .pipe(gulp.dest(pathconfig.dir.dist.css))
            .pipe(rev.manifest())
            .pipe(gulp.dest(pathconfig.dir.rev.css)),
        
        // Kids img
        gulp.src(pathconfig.source.src.images)
            .pipe(gulp.dest(pathconfig.dir.dist.images)),

        // Kids fonts
        gulp.src(pathconfig.source.src.font)
            .pipe(gulp.dest(pathconfig.dir.dist.font)),

        // Kids Assets
        gulp.src(pathconfig.source.src.assets)
            .pipe(gulp.dest(pathconfig.dir.dist.assets))
    );
});

// 删除Kids生成资源文件
gulp.task('clean:kid', function() {
    return del(pathconfig.dist.all);
});

// Kids页面css/js标签替换
gulp.task('rev:kid', function() {
    gulp.src(['Src/Rev/Kids/*/*.json', pathconfig.source.src.html])
        .pipe(revCollector())
        .pipe(gulp.dest(pathconfig.dir.dist.html));
});

// 版本打包:导入发布目录结构，生成js,css,img，修改html链接
gulp.task('build:kid', function(callback) {
    runSequence('clean:kid', ['lib:kid'], ['rev:kid'],
        callback);
});

// Kids发布
gulp.task('deploy:kid', function(callback) {
    runSequence('build:kid', ['upload'],
        callback);
});
