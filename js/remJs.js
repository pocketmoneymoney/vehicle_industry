function setRem() {
  var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (clientWidth >= 1440) {
    document.querySelector("html").style.fontSize = clientWidth / 10 + "px";
    //document.querySelector("body").parentNode.style.fontSize = (document.documentElement.clientWidth||document.body.clientWidth)+"px";
//console.log(document.querySelector("html").style.fontSize );
  } else {
    clientWidth = 1440;
    document.querySelector("html").style.fontSize = clientWidth / 10 + "px";

  }
}
window.onload = setRem;
window.onresize = setRem;
