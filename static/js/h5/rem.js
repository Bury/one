(function (doc, win) {
  // orientationchange : 判断手机是水平方向还是垂直方向，感应方向

  // doc ==》 document对象
  // doc.documentElement ==> 得到文档的根元素-->  <html>
  // 之所以要得到文档的根元素，是为了计算网页所打开时屏幕的真实宽度
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
      // 我们默认的手机屏幕320
      // clientWidth 是我们页面打开时所得到的屏幕（可看见页面的真实宽度）宽度真实的宽度值
      // 这两者相除得到一个放大或缩小的比例值
      // 320 ip5 --> 20px
      // 414 ip6s --> 25px;
      // width:2rem;
    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'
      // 设置根元素font-size
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  // 当dom加载完成时，或者 屏幕垂直、水平方向有改变进行html的根元素计算
})(document, window)
