/**
 * 表单常用代码段
 */

// 禁止复制粘贴
let banCopyPaste = document.getElementById('banCopyPaste')
banCopyPaste.oncopy = function () {
  return false;
}
banCopyPaste.onpaste = function () {
  return false;
}

// 限制输入数字或数字
// h5 <input type="text" pattern=[0-9]/>
let banNumber = document.getElementById('banNumber')
function clearNonumber (tThis) {
  let _v = tThis.value
  tThis.value = _v.replace(/\D/g, '')
  // tThis.value = _v.replace(/[^\u4e00-\u9fa5]/g, '') // 限制输入中文的正则
}
banNumber.onfocus = function () {
  clearNonumber(this)
}
banNumber.onkeyup = function () {
  clearNonumber(this)
}
banNumber.onblur = function () {
  clearNonumber(this)
}

// 限制字符串长度，区分中英文
let getStrLength = (function () {
  let trim = function (chars) {
    return (chars || '').replace(/^(\s|\u00A0)+|(\s|\u00A0)/g, '')
  }
  return function (_str, _model) {
    _str = trim(_str)
    _model = _model || 'Ch'
    let _strLen = _str.length
    if (_strLen === 0) {
      return 0
    } else {
      let chinese = _str.match(/[^\u4e00-\u9fa5]/g)
      return _strLen + (chinese && _model === 'Ch' ? chinese.length : 0)
    }
  }
})()

// 密码强度校验
/**
 * 字符权重
 * 数字1，字母2，其他字符3
 * 长度<6，不符合标准
 * 长度>=6 强度 <= 10, 弱
 * 长度>=6 强度 >= 10 且 < 15, 中
 * 长度>=6 强度 >= 15 强
 * 提示，使用charCodeAt
 */

// 回车提交
document.getElementById('enterSubmit').onkeyup = function (e) {
  let keycode = e.keyCode
  if (keycode === 13) {
    return 'submit success'
  }
}

// 光标控制
document.getElementById('cursorPos').onclick = function () {
  let _vLen = this.value.length
  this.setSelectionRange(_vLen, _vLen)
}

// 表单常见正则搜集
// 邮箱，手机，中文，数字（整数、实数），去除空格

// textArea 自适应文字行数
window.onload = function () {
  let autoRow = document.getElementById('autoRow')
  autoRow.style.overflowY = 'hidden'
  autoRow.onkeyup = function () {
    autoRow.style.height = autoRow.scrollHeight
  }
}
