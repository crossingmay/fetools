// 动画管理模块
; (function (window, document, undefined) {
  let _aniQueue = [] // 动画队列
  let _baseUID = 0 // 元素的UID基础值
  let _aniUpdateTimer = 13 // 动画的更新时间
  let _aniID = -1// 检测的进程ID
  let isTicking = false // 检测状态

  /**
   * options 参数
   * context-被操作的元素上下文
   * effect-动画效果的算法
   * time-效果的持续时间
   * startCss-元素的起始偏移量
   * css-元素的结束偏移量
   */

  window.animateManage = function (options) {
    this.context = options
  }

  animateManage.prototype = {
    init: function () {
      this.start(this.context)
    },

    stop: function (_e) {
      clearInterval(_aniID)
      isTicking = false
    },

    start: function (options) {
      if (options) {
        this.pushQueue(options)
      }
      if (isTicking || _aniQueue.length === 0) return false
      this.tick()
      return true
    },

    tick: function () {
      let self = this
      isTicking = true
      _aniID = setInterval(function () {
        if (_aniQueue.length === 0) {
          self.stop()
        } else {
          for (let i = 0; i < _aniQueue.length; i++) {
            _aniQueue[i] && self.go(_aniQueue[i], i)
          }
        }
      }, _aniUpdateTimer)
    },

    go: function (_options, i) {
      let n = this.now();
      let st = _options.startTime
      let ting = _options.time
      let e = _options.context
      let t = st + ting
      let name = _options.name
      let tPos = _options.startValue
      let effect = _options.effect
      let scale = 1
      if (n >= t) {
        _aniQueue[i] = null
        this.delQueue()
      } else {
        tPos = this.aniEffect({
          e: e,
          ting: ting,
          n: n,
          st: st,
          sPos: sPos,
          tPos: tPos
        }, effect)
      }
      e.style[name] = name === 'zIndex' ? tPos : tPos + 'px';
      this.goCallBack(_options.callback, _options.uid)
    },

    aniEffect: function (_options, effect) {
      effect = effect || 'linear'
      let _effect = {
        linear: function (__options) {
          let scale = (__options.n - __options.st) / __options.ting
          let tPos = __options.sPos + (__options.tPos - __options.sPos) * scale
          return tPos
        }
      }
      return _effect[effect](_options)
    },

    goCallback: function (callback, u) {
      for (let i = 0; i < _aniQueue.length; i++) {
        if (_aniQueue[i].uid === u) {
          isCallback = false
        }
      }
      if (isCallback) {
        callback && callback()
      }
    },

    pushQueue: function (_options) {
      let ctx = _options.context
      let t = _options.time || 1000
      let callback = _options.callback
      let effect = _options.effect
      let startCss = _options.startCss
      let c = _options.css
      let name = ''
      let u = this.setUID(ctx)
      for (name in c) {
        _aniQueue.push({
          context: ctx,
          time: t,
          name: name,
          value: parseInt(c[name], 10),
          startValue: parseInt(startCss[name] || 0),
          effect: effect,
          uid: u,
          callback: callback,
          startTime: this.now
        })
      }
    },

    delQueue: function () {
      for (let i = 0; i < _aniQueue.length; i++) {
        if (_aniQueue[i] === null) {
          _aniQueue.splice(i, 1)
        }
      }
    },

    now: function () {
      return +new Date()
    },

    getUID: function (_e) {
      return _e.getAttribute('aniUID')
    },

    setUID: function (_e, _v) {
      let u = this.getUID(_e)
      if (u) return u
      u = _v || _baseUID++
      _e.setAttribute('aniUID', u)
      return u
    }
  }
})(window, document)

// 实时预览上传的图片

// 放大镜效果

// 鼠标移入移出效果：监听 onmouseover 和 onmouseout 事件


// 横向图片轮播

// 内容拖曳效果 dragable

// 内容超过元素宽度显示省略号

// 字幕上下滚动效果，新闻栏

// 弹出层

// 弹框

// tab 选项卡切换

