(function (w, doc) {
  if (w.JSBridge) {
    return
  }
  var JSBRIDGE_URL_SCHEME = "jsscheme";
  var JSBRIDGE_URL_MESSAGE = "__JSB_URL_MESSAGE__";
  var JSBRIDGE_URL_EVENT = "__JSB_URL_EVENT__";
  var ua = navigator.userAgent;
  var isIOSDevice = /iP(hone|od|ad)/g.test(ua);
  var isAndroidDevice = /Android/g.test(ua);
  var sendMessageQueue = [];
  var receiveMessageQueue = [];
  var messageHandlers = {};
  var responseCallbacks = {};
  var uniqueId = 1;
  var messagingIframe;

  function JSBridgeLogException (e, m) {
    if (typeof console != "undefined") {
      console.log("JSBridge:JS: EXCEPTION: ", arguments)
    }
  }

  var logId = 0
  function insertLog (data) {
    logId++;

    var log = document.getElementById('log');
    var el = document.createElement('div');
    el.className = 'logLine';
    el.innerHTML = logId + '. ' + data;

    if (log.children.length) {
      log.insertBefore(el, log.children[0]);
    } else {
      log.appendChild(el);
    }
  }

  function triggerNativeCall () {
    if (isIOSDevice) {
      messagingIframe.src = JSBRIDGE_URL_SCHEME + "://" + JSBRIDGE_URL_MESSAGE + "/" + JSBRIDGE_URL_EVENT
    } else {
      if (isAndroidDevice) {
        try {
          AndroidAPI.ProcessJSEventQueue(_fetchJSEventQueue())
        } catch (e) {
        }
      } else {
        var apiName = ((isAndroidDevice) ? ("AndroidAPI.ProcessJSEventQueue") : ("WebAppAPI.ProcessJSEventQueue"));

        try {
          var api = eval(apiName);

          if (api) {
            api(_fetchJSEventQueue())
          }
        } catch (e) {
        }
      }
    }
  }

  function doSend (message, responseCallback) {
    if (responseCallback) {
      var callbackId = "cb_" + (uniqueId++) + "_" + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      message.callbackId = callbackId;
    }

    sendMessageQueue.push(message);
    triggerNativeCall()
  }

  function dispatchMessageFromNative (messageJSON) {
    setTimeout(function _timeoutDispatchMessageFromObjC () {
      var message = JSON.parse(messageJSON);
      var messageHandler;
      var responseCallback;
      if (message.responseId) {
        responseCallback = responseCallbacks[message.responseId];
        if (!responseCallback) { return }

        responseCallback(message.responseData);
        delete responseCallbacks[message.responseId]
      } else {
        if (message.callbackId) {
          var callbackResponseId = message.callbackId;
          responseCallback = function (responseData) {
            doSend({ responseId: callbackResponseId, responseData: responseData })
          }
        }

        try {
          var handler = ((message.eventName) ? (messageHandlers[message.eventName]) : (JSBridge.bridgeHandler));

          if (handler) {
            handler(message.data, responseCallback)
          }
        } catch (e) {
          JSBridgeLogException(e, "dispatchMessageFromNative")
        }
      }
    })
  }

  function getReturnObject (apiName, status, dataJson) {
    var outJson = { status: status };
    if (apiName) {
      outJson.apiName = apiName;
    }

    if (dataJson) {
      outJson.data = dataJson;
    }

    return outJson
  }

  function init (bridgeHandler) {
    if (JSBridge.bridgeHandler) {
      JSBridgeLogException(e, "init")
    }

    JSBridge.bridgeHandler = bridgeHandler;
    var receivedMessages = receiveMessageQueue;
    receiveMessageQueue = null;

    for (var i = 0; i < receivedMessages.length; i++) {
      dispatchMessageFromNative(receivedMessages[i])
    }
  }

  function send (eventName, data, responseCallback) {
    var dataToSend = {};
    if (eventName) {
      dataToSend.eventName = eventName;
    }

    dataToSend.data = { status: "true" };

    if (data) {
      dataToSend.data["data"] = data;
    }

    doSend(dataToSend, responseCallback);
  }

  function registerEvent (eventName, handler) {
    messageHandlers[eventName] = handler;
  }

  function deRegisterEvent (eventName, handler) {
    if (messageHandlers[eventName]) {
      delete messageHandlers[eventName]
    }
  }

  function postMessage (msg) {
    var appJS = (window.appJS) ? window.appJS : window.webkit.messageHandlers.appJS;
    if (isIOSDevice) {
      appJS.postMessage(msg);
    } else if (isAndroidDevice) {
      if (msg) {
        appJS.requestNative(msg.module, msg.method, JSON.stringify(msg.params), msg.callback);
      } else {
        AndroidAPI.ProcessJSAPIRequest(msg.module + '.' + msg.method, null);
      }
    }
  }

  function isRepeatCall (object) {
    var id = object.module + '_' + object.method

    for (var key in responseCallbacks) {
      var keyId = key.split(':')[0]

      if (id == keyId)
        return true
    }

    return false
  }

  function callNative (object) {
    try {
      if (!object.repeat && isRepeatCall(object)) {
        return
      }

      if (object.callback) {
        var cbID = object.module + '_' + object.method + ':' + (+new Date)
        responseCallbacks[cbID] = object.callback
        object.callback = cbID
      }

      if (isIOSDevice || isAndroidDevice) {
        postMessage(object)
      } else {
        var api = eval((isAndroidDevice) ? ("AndroidAPI.ProcessJSAPIRequest") : ("WebAppAPI.ProcessJSAPIRequest"))

        if (api) {
          if (object) {
            return api(object.module + '.' + object.method, object.params)
          }
          return api(object.module + '.' + object.method, null)
        } else {
          JSBridgeLogException("Unsupported API:", name)
        }
      }
    } catch (e) {
      JSBridgeLogException(e, "Invalid API:" + name)
    }
  }

  function callAPICallback (apiCallback, outJson, status) {
    if (apiCallback) {
      apiCallback(getReturnObject(null, ((status) ? (status) : ("true")), outJson))
    }
  }

  function callEventCallback (responseCallback, outJson, inJson) {
    if (responseCallback) {
      responseCallback(getReturnObject(((inJson) ? (inJson.eventName) : (null)), "true", outJson))
    }
  }

  function _fetchJSEventQueue () {
    try {
      var messageQueueString = JSON.stringify(sendMessageQueue);
      sendMessageQueue = [];
      return messageQueueString;
    } catch (e) {
      JSBridgeLogException(e, "_fetchJSEventQueue");
    }

    return [];
  }

  function _handleMessageFromNative (messageJSON) {
    if (receiveMessageQueue) {
      receiveMessageQueue.push(messageJSON);
    } else {
      dispatchMessageFromNative(messageJSON);
    }
  }

  function _invokeJSCallback (cbID, removeAfterExecute, config) {
    if (cbID) {
      var cb = responseCallbacks[cbID];

      if (cb) {
        if (removeAfterExecute) {
          delete (responseCallbacks[cbID]);
        }

        var data = config;
        if (isAndroidDevice && typeof (data) === 'string') {
          try {
            data = JSON.parse(config);
          } catch (e) {
          }
        }

        if (data.callbackID) {
          delete (data.callbackID);
        }

        cb.call(null, data);
      }
    }
  }

  w.JSBridge = {
    init: init.bind(this),
    /* send: send.bind(this), */
    callNative: callNative.bind(this),
    registerEvent: registerEvent.bind(this),
    deRegisterEvent: deRegisterEvent.bind(this),
    callAPICallback: callAPICallback.bind(this),
    callEventCallback: callEventCallback.bind(this),
    _fetchJSEventQueue: _fetchJSEventQueue.bind(this),
    _handleMessageFromNative: _handleMessageFromNative.bind(this),
    _invokeJSCallback: _invokeJSCallback.bind(this)
  };

  messagingIframe = doc.createElement("iframe");
  messagingIframe.style.display = "none";
  triggerNativeCall();
  // doc.documentElement.appendChild(messagingIframe);

  var readyEvent = doc.createEvent("Events");
  readyEvent.initEvent("JSBridgeReady");
  readyEvent.bridge = JSBridge;
  doc.dispatchEvent(readyEvent);
})(window, document);
