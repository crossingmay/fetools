// 区分平台类型
function checkMobilePlatform () {
  let platform = 'others'
  let platformList = [
    'iphone', 'ipad', 'android'
  ]
  let reg = null
  let userAgent = navigator.userAgent.toLowerCase()
  for (let i = 0; i < platformList.length; i++) {
    let _platformNow = platformList[i]
    reg = new RegExp(_platformNow, 'i')
    if (userAgent.match(reg)) {
      platform = _platformNow
    }
  }
  return platform
}

// 判断设备方向变更
window.addEventListener('orientationchange', function(e) {
  // todo
})

// 根据屏幕框高判断横竖屏
function checkScreenOrientation() {
  return window.innerWidth > window.innerHeight ? 'Horizontal' : 'Vertical'
}

function banTouchMove() {
  document.body.ontouchmove = function (e) {
    e.preventDefault()
  }
}

// todo-获取当前地理坐标

// todo-判断pc和移动端

// todo-图片lazyload

// todo-simple ajax

// todo-video/audio player

// todo-评星级

// todo-parse xml
