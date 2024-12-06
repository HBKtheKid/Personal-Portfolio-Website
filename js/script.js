"use strict";
// intialize
const cursor = document.querySelector(".cursor");
const resumeBtn = document.querySelectorAll(".resume-button");
const resumeDetail = document.querySelectorAll(".resume-detail");
let timeout;

// follow cursor on mouse move
document.addEventListener("mousemove", function (e) {
  let x = e.pageX;
  let y = e.pageY;

  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  cursor.style.display = "block";

  //effect on mouse stop
  function mouseStopped() {
    cursor.style.display = "none";
  }
  clearTimeout(timeout);
  timeout = setTimeout(mouseStopped, 1000);
});
// cursor on mouse out
document.addEventListener("mouseout", function () {
  cursor.style.display = "none";
});

//Resume button switch active class on tap
resumeBtn.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    resumeBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    resumeDetail.forEach((detail) => {
      detail.classList.remove("active");
    });
    resumeDetail[idx].classList.add("active");
  });
});
