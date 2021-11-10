# Fiber

## 1. 帧
  - 目前大多数设备的屏幕刷新率为60次/秒
  - 当美妙绘制的帧数（FPS）达到60时，页面是流畅的，小于这个值时，用户会感觉到卡顿
  - 每个帧的预算时间是16.66毫秒（1秒/60）
  - 每个帧的开头包括样式计算、布局和绘制
  - javascript执行JavaScript引擎和页面渲染引擎在同一个渲染线程，GUI渲染和JavaScript执行两者是互斥的
  - 如果某个任务执行时间过长，浏览器会推迟渲染

  ![fps](/imgs/frame.png)
  
## 2. 什么是fiber
  - 我们可以通过某些调度策略合理分配CPU资源，从而提高用户的响应速度
  - 通过 Fiber 架构，让自己的协调过长变成可被中断。适度低让出CPU执行权，除了可以让浏览器及时响应用户的交互

  ![fps](/imgs/schedule.png)

  ![fps](/imgs/child.png)

## 3.rAF
  - requestAnimationFrame回调函数会在绘制之前执行
  - requestAnimationFrame(callback) 会在浏览器每次重绘前执行callback回调，每次callback执行的时机都是浏览器刷新下一帧渲染周期的起始点
  - requestAnimationFrame(callback) 的回调callback回调参数timestamp是回调被调用的时间，也即是当前帧的起始时间
  - rAfTime performance.timing.navigationStart + performance.now() 约等于 Date.now()
