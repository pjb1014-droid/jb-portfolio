document.addEventListener("DOMContentLoaded", () => {
  // 커스텀 커서 기능
  const cursor = document.querySelector(".custom-cursor");
  const worksShot = document.querySelector(".works-shot");

  // 마우스 이동에 따른 커서 위치 업데이트
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // works-shot 영역에 마우스가 들어올 때
  worksShot.addEventListener("mouseenter", () => {
    cursor.style.display = "flex";
  });

  // works-shot 영역에서 마우스가 나갈 때
  worksShot.addEventListener("mouseleave", () => {
    cursor.style.display = "none";
  });

  // 커서 도트 애니메이션
  const cursorDot = document.querySelector(".cursor-dot");

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.9,
      ease: "power2.out",
    });
  });

  // works-shot 영역 진입/이탈 시 커서 도트 제어
  worksShot.addEventListener("mouseenter", () => {
    gsap.to(cursorDot, {
      opacity: 0,
      scale: 0,
      duration: 0.2,
    });
  });

  worksShot.addEventListener("mouseleave", () => {
    gsap.to(cursorDot, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
    });
  });
});
