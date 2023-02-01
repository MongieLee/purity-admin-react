/**
 * 传入有dom元素进入全屏模式
 * @param ele 全屏的dom
 */
function openFullScreen(ele = document.body as any) {
  console.log(123)
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  }
}

/**
 * 退出目标dom元素的全屏模式
 * @param ele
 */
function exitFullScreen() {
  const document: any = window.document;
  if (document.exitFullScreen) {
    document.exitFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * 判断当前是否全屏牧师
 * @returns {boolean}
 */
function isFullScreen() {
  const document: any = window.document;
  return Boolean(
    document.fullscreenElement ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  );
}

export {isFullScreen, openFullScreen, exitFullScreen};
