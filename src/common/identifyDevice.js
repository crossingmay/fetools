/**
 * identify device by userAgent & call native methond
 */
let arg1 = ''
let arg2 = ''
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  // use messageHandlers call iOS method
  window.webkit.messageHandlers.iosname.postMessage({ arg1: arg1, arg2: arg2 })
} else if (/(Android)/i.test(navigator.userAgent)) {
  // use urlScheme call Android method, no return value
  // but JavascriptInterface is better
  window.location.href = 'schemename:arg1=' + arg1 + '&arg2=' + arg2
} else {
  // do sth
}

// we also can use WebViewJavascriptBridge

// pc or mobile
function isMobile () {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}

// ios or android
function isIphone () {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
}

function isAndroid () {
  return /(Android)/i.test(navigator.userAgent)
}
