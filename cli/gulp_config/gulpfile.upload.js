// 使用又拍云的上传
var gulp = require('gulp')
var uploadToUpyun = require('upyun_cdn')
// 此处配置可以放到公共配置中require
var config = {
  cdn: {
    upyun: {
      host: '',
      bucket: '',
      folder: '',
      username: '',
      password: ''
    }
  }
}
var options = {
  src: ['../Public/**'], // 需要上传的目录和文件
  dest: config.cdn.upyun.folder
}
var auth = {
  bucket: config.cdn.upyun.bucket,
  operator: config.cdn.upyun.username,
  password: config.cdn.upyun.password
}
gulp.task('uploadToUpyun', function () {
  uploadToUpyun(options, auth, function (err, result) {
    if (err) {
      console.log(err)
    }
  })
})
