# 性能优化总结-这一篇就够了！

## 了解网页渲染过程

* HTML代码转化成DOM，并并行地获取外部资源（包括HTML中出现的JS、CSS、图片文件）
* CSS文件下载完成，CSS代码转化成CSSOM（CSS Object Model）
* 结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
* 生成布局（Layout）：将所有渲染树的所有节点进行平面合成，该步骤可以计算出元素在网页中的位置
* 绘制（Paint）：将网页内容绘制在屏幕上


## 性能评判标准

### 度量标准

* 首次有效绘制（First Meaningful Paint，简称FMP，当主要内容呈现在页面上）
* 英雄渲染时间（Hero Rendering Times，度量用户体验的新指标，当用户最关心的内容渲染完成）
* 可交互时间（Time to Interactive，简称TTI，指页面布局已经稳定，关键的页面字体是可见的，并且主进程可用于处理用户输入，基本上用户可以点击UI并与其交互）
* 输入响应（Input responsiveness，界面响应用户输入所需的时间）
* 感知速度指数（Perceptual Speed Index，简称PSI，测量页面在加载过程中视觉上的变化速度，分数越低越好）
* 自定义指标，由业务需求和用户体验来决定。

### 目标设定

依据[RAIL指标](https://developers.google.com/web/fundamentals/performance/rail?hl=zh-cn)设定如下目标

* 100毫秒的界面响应时间与60FPS
* 速度指标（Speed Index）小于1250ms
* 3G网络环境下可交互时间小于5s
* 重要文件的大小预算小于170kb

## 编码优化
数据读取、DOM、循环等相关
repaint reflow, 回流必将引起重绘，而重绘不一定会引起回流
开启GPU加速

实战优化点:
* 用translate替代top改变 top会触发reflow但translate不会
* 用opacity替代visibilityvisibility会repaint, 但opacity不会, 因为opacity是Composite Layers阶段变化
* 不要一条一条地修改 DOM 的样式(虽然浏览器有缓冲机制)
* 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量,会回流强制执行缓冲区域以获取最新值
* 预先定义好 class，然后修改 DOM 的 className
* 使用cssText 合起来写只有一次reflow: div.style.cssText ="width:100px;height:100px;"
* 把 DOM 离线后修改，比如：先把 DOM 给 display:none (有一次 Reflow)，然后你修改100次，然后再把它显示出来
* 使用document.createDocumentFragment创建文档片段修改，再添加到DOM树
* 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
* 动画实现的速度的选择 ，使用absolute或fixed定位页面上的动画元素，将其脱离文档流
* 避免不必要的复杂的 CSS 选择器，尤其是后代选择器（descendant selectors），因为为了匹配选择器将耗费更多的 CPU。
* 对于动画新建图层 will-change:transform
* 启用 GPU 硬件加速(3D) transform:translateZ(0) transform:translate3d(0,0,0);

## 静态资源优化
图片优化：响应式图片(采用picture标签、webp图片格式)，采用合适的图片格式
脚本（文本）压缩、合并，减少请求，减小体积

## 交付优化
1 js脚本defer或async加载

![脚本加载](https://img-blog.csdnimg.cn/20190825013733635.jpg)

2 懒加载(使用Intersection Observer)
3 优先加载关键的css，使用<link rel="preload"> 获取非必要的 CSS。
4 loading动画或者骨架屏
5 预加载

## 构建优化
tree-shaking 移除依赖中的未使用代码
Scope Hositing
code-spliting 依赖按需加载
SSR 服务端渲染
HTTP缓存头设置

## HTTP优化和其他
HTTP2
静态资源上CDN
字体优化
对文本开启gzip(增加请求头 Accept-Encoding:gzip,deflate)，类似的有Brotli

资源预加载：
  
  ——<link rel="dns-prefetch"> 提示浏览器对一个 IP 地址提前进行 DNS 请求。这对于 CDN 请求很有用，此外一些你知道域名但是不知道具体地址的资源的预加载也可以使用。
  
  ——<link rel="preconnect"> 提示浏览器提前连接到某台服务器。在 dns-prefetch 适用的场景同样适用，但它可以建立完整的连接并节约很多时间。缺点是打开新的连接很消耗资源，因此不要过度使用。

  ——<link rel="prefetch"> 会在后台对资源进行低优先级预加载然后缓存，这个比较有用，比如在进入 SPA 的下一个页面之前加载 bundle。
  
  ——<link rel="preload"> 会在后台对资源进行高优先级的预加载。这对于加载短时间内即将用到的资源而言比较有用。
  
  ——<link rel="prerender"> 会在后台预加载特定页面，然后在不可见的 tab 中渲染页面。当用户进入这个页面时，页面可以立马呈现在用户面前。这是谷歌用于预加载第一条搜索结果的方案。

注意：
  不要过度使用预加载，虽然预加载能够提升用户体验、加速应用，但是会导致不必要的流量消耗；尤其是在移动端，用户会消耗过多的不要的流量，这同样会降低用户体验。



## 性能检测

https://developers.google.com/speed/pagespeed/insights/





[web性能优化地图](https://github.com/berwin/Blog/issues/23)

[让你的网页更丝滑](https://github.com/berwin/Blog/issues/35)

[网页加载性能优化方法研究](https://segmentfault.com/a/1190000015145466)

[web性能优化原理与方案](https://blog.csdn.net/lyt_angularjs/article/details/100058428)

[常见 Web 性能优化方式](https://juejin.im/post/5cd053396fb9a03201244296)