/* eslint-disable */
(function (w, doc) {
  if (w.JSBridge) {
    return
  }
  var JSBridge = {
    eventMap: {}, // 事件池
    // 事件注册
    registerHandler: function (eventName, handler) {
      this.eventMap[eventName] = handler;
    },
    // 删除事件
    deRegisterHandler: function (eventName) {
      if (this.eventMap[eventName]) {
        delete this.eventMap[eventName]
      }
    },
    // native通用方法
    startNative: function (action, callback) {
      if (window.androidGlobalManager) { // android env
        if (androidGlobalManager.startNative) {
          androidGlobalManager.startNative(action, callback);
        }
      }
      if (window.webkit != undefined) { // ios env
        window.webkit.messageHandlers.startNative.postMessage({ action: action, callback: callback });
      }
      if (!window.androidGlobalManager && window.webkit == undefined) {
        console.log('请在native端使用此方法：' + action);
      }
    },
    // 暴露给原生调用的方法，todo：后面需要区分callback和专门暴露的方法
    invokeJSCallback: function (eventName, res) {
      if (eventName) {
        var cb = this.eventMap[eventName];
        if (cb) {
          var data = res;
          // todo-若安卓端只能返回JSON，则需要对应解析
          cb.call(null, data);
        }
      }
    },
    // 通过native，weex和web通信，此处为派发事件入口
    postMessage: function (msg) { },
    // 从Native派发出事件
    dispatchMessageFromNative: function () { }
  };

  w.JSBridge = JSBridge
})(window, document);
/* eslint-enable */
