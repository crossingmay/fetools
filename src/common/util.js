/**
 * 日期格式化
 * @param {Date} date - 传入日期
 * @param {String} fmt - 日期格式，如'yyyy-MM-dd'
 */
function formatTime (date, fmt = 'yyyy-MM-dd') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * 字典转数组
 * @param {Object} obj - 字典
 */
function dic2Array (obj) {
  let resArr = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const item = obj[key]
      resArr.push(item)
    }
  }
  return resArr
}

function getQueryStringByName (name) {
  var _reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var _r = window.location.search.substr(1).match(_reg)
  var _context = ''
  if (_r != null) {
    _context = _r[2]
  }
  _reg = null
  _r = null
  return _context == null || _context === '' || _context === 'undefined' ? '' : _context
}

function setCookie (key, value, exdays) {
  exdays = exdays || 30
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString()
  document.cookie = key + '=' + value + ';' + expires + ';path=/'
}

function getCookie (key) {
  var cookie = document.cookie
  var cookieArray = cookie.split(';')
  var value = ''
  for (var i = 0, len = cookieArray.length; i < len; i++) {
    var item = cookieArray[i].trim()
    if (item.substr(0, key.length) === key) {
      value = item.substr(key.length + 1)
      break
    }
  }
  return value
}

function clearAllCookie () {
  var date = new Date()
  date.setTime(date.getTime() - 10000)
  var keys = document.cookie.match(/[^ =;]+(?=\\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0; expire=' + date.toUTCString() + '; path=/'
    }
  }
}

// 节流函数-减少代码执行频率
// window.addEventListener('scroll', throttle(() => console.log('滚动中！')))
function throttle (fn, interval = 500) {
  let run = true

  return function () {
    if (!run) return
    run = false
    setTimeout(() => {
      fn.apply(this, arguments)
      run = true
    }, interval)
  }
}

// 函数防抖-判断某个动作结束，如刚刚的滚动结束、input输入结束等
// window.addEventListener('scroll', debounce(() => console.log('滚动结束！')))
function debounce (fn, interval = 500) {
  let timeout = null

  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

// 类型识别1，可以识别标准类型，及内置对象类型，不能识别自定义对象
function typeProto (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

// 类型识别2，constructor，可识别原始类型、内置对象类型、自定义类型，不能识别udefined 和 null
function getConstructorName (obj) {
  return obj && obj.constructor && obj.constructor.toString().match(/function\s*([^(]*)/)[1]
}

export {
  formatTime, dic2Array, getQueryStringByName, setCookie, getCookie, clearAllCookie,
  throttle, debounce, typeProto, getConstructorName
}
