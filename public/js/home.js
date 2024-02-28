const goTop = document.querySelector(".go-to-top");

window.onscroll = function () {
  if (scrollY >= 700) {
    goTop.style.visibility = "visible";
  } else {
    goTop.style.visibility = "hidden";
  }
};
