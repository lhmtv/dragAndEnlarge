export default function(url) {
	let bg = document.getElementsByClassName('big_pic')[0];
  if (bg) {
    bg.remove();
  }
  // 创建图片
  var imgObj = new Image();
  imgObj.src = url;
  let bw = document.body.clientWidth;
  let bh = document.body.clientHeight;
  let size = 1;
  let iw = imgObj.width;
  let ih = imgObj.height;
  // 创建图片父级
  let div = document.createElement('div');
  div.setAttribute('style', 'cursor: pointer; position: fixed; left: 0;top: 0;right: 0;bottom: 0;background:rgba(0,0,0,0.2);z-index: 9999');
  div.className = 'big_pic';
  div.style.width = bw + 'px';
  div.style.height = bh + 'px';
  div.appendChild(imgObj);
  document.getElementsByTagName('body')[0].appendChild(div);
    // 图片加载成功之后
  imgObj.onload = function() {
    if (iw >= ih) {
        var nih = (ih / iw) * bw;
        if(nih>bh){
            ih = bh;
            iw = (ih / imgObj.height) * imgObj.width;
            }else{
            iw = bw;
            ih = (iw / imgObj.width) * imgObj.height;
          }
        } else {
          var niw = (bh / ih) * iw;
          ih = bh;
          iw = (ih / imgObj.height) * imgObj.width;
        }
    imgObj.setAttribute('style', `width: ${iw}px; height: ${ih}px;position: absolute;left: 50%;top: 50%;margin-left: -${iw / 2}px;margin-top: -${ih / 2}px`);
  };
  // 图片的滚动放大
  imgObj.onmousewheel = function(e) {
    let ev = e || window.event;
    let dir = ev.deltaY;
    if (dir > 0) {
      size += dir / 200;
      imgObj.style.transform = `scale(${size})`;
    } else {
      size += dir / 200;
      if (size < 0.2) {
        size = 0.2;
      }
      imgObj.style.transform = `scale(${size})`;
    }
  };
  // 拖动图片
  div.onmousedown = function (e) {
    let flag = true;
    let ev = e || window.event;
    let pageX = ev.pageX;
    let pageY = ev.pageY;
    let disX = pageX - (imgObj.width / 2) - imgObj.offsetLeft;
    let disY = pageY - (imgObj.height / 2) - imgObj.offsetTop;
    div.onmousemove = function(e) {
      let ev = e || window.event;
      let moveX = ev.pageX - disX;
      let moveY = ev.pageY - disY;
      if (moveX > 5 || moveY > 5) {
          flag = false;
      }
      imgObj.style.left = moveX + 'px';
      imgObj.style.top = moveY + 'px';
    };
    div.onmouseup = function() {
      if (flag) {
        if(isIE()||isIE11()){
            this.removeNode(true);
          }else{
            this.remove();
          }
          function isIE(){
            if(!!window.ActiveXObject || "ActiveXObject" in window){
              return true;
            }else{
              return false;
            }
          }
          function isIE11(){
              if((/Trident\/7\./).test(navigator.userAgent)){
                  return true;
              }else{
                  return false;
              }
          }
      }
      this.onmousemove = null;
    };
    return false;
  };
};
