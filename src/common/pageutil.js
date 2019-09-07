// 常见页面脚本方法

// 打开新窗口
function openNewPage (url) {
  // 1-原窗口
  window.location.href = url
  // 2-新窗口
  window.open(url)
  // 返回上一页
  window.history.back(-1)
  // 指定url替换当前的页面和缓存，避开后退
  window.location.replace(url)
}

// 打开指定大小的窗口
function openWindow (width, height, url) {
  /**
   * href, 即将要跳转的页面
   * title, 新窗口的名称
   * feature, 设置新窗口的一些特性-channelmode\directories\fullscreen\height\width
   * replace, bool, 替换当前历史条目还是创建一个新的条目。true-替换
   */
  window.open(href, '', 'width=' + width + ',height=' + height)
}

/**
 * 刷新页面
 */
function refreshWindow () {
  // 1
  window.location.reload()
  // 2
  window.location.href = window.location.href
  // 3
  window.location.replace(window.location.href)
}

// 最大化子窗口
function maxWindow () {
  let win = window.open(href, '_blank', 'resizable=yes;status=yes;toolbar=no;location=no;menubar=no;directories=no;scrollbars=no;')
  win.moveTo(0, 0)
  win.resizeTo(screen.availWidth, screen.availHeight)
}

// 屏蔽右键
function banCtxmenu () {
  document.oncontextmenu = function () {
    console.log('禁止鼠标右键菜单')
    return false
  }
}

// 防止另存为
function banSave () {
  // todo
}

// 禁止查看源码
function banViewSource (e) {
  // todo
}

// 添加到收藏夹
function addFavorite (url, title) {
  // todo
}

// 将网页设置为首页
function setHomePage (url) {
  // todo
}

// 判断上一页来源
function getPrePage () {
  return document.referrer;
}

// 获取浏览器信息
function getBrowserInfo () {
  // navigator可修改，不一定准确
  // appCodeName-浏览器代码名
  // appName-浏览器类型
  // appVersion-版本...
  console.log(navigator)
}

// url查询参数中获得对应name的值
function getQueryStringByName (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  let context = ''
  if (r != null) {
    context = r[2]
  }
  reg = null
  r = null
  return context == null || context === '' || context === 'undefined' ? '' : context
}

// 获得窗口大小
function getWinSize () {
  return {
    width: window.innerWidth || document.documentElement.offsetWidth,
    height: window.innerHeight || document.documentElement.offsetHeight
  }
}

// 屏蔽特殊功能键
var banSpecialKey = (function () {
  document.onkeydown = function (e) {
    if (e.shiftKey || e.altKey || e.ctrlKey) {
      console.log('禁止按shift\Alt\ctrl')
      return false
    }
  }
})()

// todo-页面悬浮导航

// todo-下拉式导航菜单

// todo-滑动门导航

// todo-树形菜单导航

// todo-悬浮广告/定时关闭背投广告

// todo-页面雪花效果
