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
window.addEventListener('orientationchange', function (e) {
  // todo
})

// 根据屏幕框高判断横竖屏
function checkScreenOrientation () {
  return window.innerWidth > window.innerHeight ? 'Horizontal' : 'Vertical'
}

function banTouchMove () {
  document.body.ontouchmove = function (e) {
    e.preventDefault()
  }
}

// input 标签在 iOS 上唤起软键盘，键盘收回后页面不回落
document.addEventListener('focusout', () => {
  document.body.scrollTop = 0
})

// 唤起软键盘后会遮挡输入框
window.addEventListener('resize', () => {
  // 判断当前 active 的元素是否为 input 或 textarea
  // if (document.activeElement!.tagName === 'INPUT' || document.activeElement!.tagName === 'TEXTAREA') {
  //   setTimeout(() => {
  //     // 原生方法，滚动至需要显示的位置
  //     document.activeElement!.scrollIntoView()
  //   }, 0)
  // }
})

// 唤起键盘后 position: fixed;bottom: 0px; 元素被键盘顶起
// 全局监听 window 的 resize 事件，当触发事件后，获取 id 名为 fixed-bottom 的元素
// （可提前约定好如何区分定位在窗口底部的元素），将其设置成 display: none。
// 键盘收回时，则设置成 display: block;
const clientHeight = document.documentElement.clientHeight
window.addEventListener('resize', () => {
  const bodyHeight = document.documentElement.clientHeight
  const ele = document.getElementById('fixed-bottom')
  if (!ele) return
  if (clientHeight > bodyHeight) {
    // (ele as HTMLElement).style.display = 'none'
  } else {
    // (ele as HTMLElement).style.display = 'block'
  }
})

// todo-获取当前地理坐标

// todo-判断pc和移动端

// todo-图片lazyload

// todo-simple ajax

// todo-video/audio player

// todo-评星级

// todo-parse xml
