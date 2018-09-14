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
