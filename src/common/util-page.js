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
  // 禁止右键另存为，同上方法
  // 禁止复制
  document.onselectstart = function (e) {
    e.preventDefault()
  }
  // 或在body中加入相关html代码
  // 限制右键和选择
  // <body oncontextmenu="return false" onselectstart="return false">
  // <body oncontextmenu="event.returnValue=false" onselectstart="event.returnValue=false">
  // 限制复制
  // <body oncopy="alert('对不起，禁止复制！');return false;">
  // 使菜单”文件”－”另存为”失效
  // <noscript>
  //   <iframe src="*.htm"></iframe>
  // </noscript>
}

// 禁止查看源码-只能防菜鸟
function banViewSource (e) {
  // 三种查看方式，然后作出对应限制措施
  // 1、直接按F12
  // 2、Ctrl+Shift+I（或Cmd+Option+I）查看
  // 3、鼠标点击右键查看

  // 屏蔽键盘事件
  document.onkeydown = function () {
    var e = window.event || arguments[0]
    // F12
    if (e.keyCode == 123) {
      return false
      // Ctrl+Shift+I
    } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode === 73)) {
      return false
      // Shift+F10
    } else if ((e.shiftKey) && (e.keyCode === 121)) {
      return false
      // Ctrl+U
    } else if ((e.ctrlKey) && (e.keyCode === 85)) {
      return false
    }
    // ...
  }
  // 屏蔽鼠标右键
  document.oncontextmenu = function () {
    return false
  }
}

// 添加到收藏夹，不支持chrome和safari浏览器
function addFavorite () {
  if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
    window.sidebar.addPanel(document.title, window.location.href, '')
  } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
    window.external.AddFavorite(location.href, document.title)
  } else { // webkit - safari/chrome
    alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL')
      + ' + D to bookmark this page.')
  }
}

// 将网页设置为首页,chrome不支持，firefox支持
function setHomePage (obj, url) {
  try {
    obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(url)
  }
  catch (e) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect')
      }
      catch (e) {
        alert('此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为"true",双击即可。')
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch)
      prefs.setCharPref('browser.startup.homepage', url)
    } else {
      alert('您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入：' + url + '点击确定。')
    }
  }
}

// 判断上一页来源
function getPrePage () {
  return document.referrer
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

// 设置滚动具有平滑的过渡效果
window.scrollTo({
  behavior: 'smooth'
})

window.scrollBy({
  behavior: 'smooth'
})

document.querySelector('.box').scrollIntoView({
  behavior: 'smooth'
})

// 滚动到底部
window.scrollTo({
  left: 0,
  top: document.scrollingElement.scrollHeight
})

// 判断浏览器已滚动到底部
window.addEventListener('scroll', () => {
  let {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.scrollingElement

  // 当前滚动高度 + 视口高度 >= 文档总高度
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log('已到达底部')
  }
})

// todo-页面悬浮导航

// todo-下拉式导航菜单

// todo-滑动门导航

// todo-树形菜单导航

// todo-悬浮广告/定时关闭背投广告

// todo-页面雪花效果
