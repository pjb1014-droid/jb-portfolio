document.addEventListener("DOMContentLoaded", () => {
  // 네비게이션 클릭 시 부드러운 스크롤
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetId,
        },
        ease: "power2.inOut",
      });
    });
  });

  // sec2~sec5 스냅 효과
  const snapSections = ["#sec2", "#sec3", "#sec4"];
  let isSnapping = false;
  let currentSection = 0;

  snapSections.forEach((selector, index) => {
    ScrollTrigger.create({
      trigger: selector,
      start: "top 80px",
      end: "bottom 80px",
      // markers: true,
      onEnter: () => (currentSection = index + 1),
      onEnterBack: () => (currentSection = index + 1),
    });
  });

  // 휠 이벤트로 스냅 효과 구현
  let wheelTimeout;
  window.addEventListener(
    "wheel",
    (e) => {
      const scrollPos = window.scrollY;
      const sec1 = document.querySelector("#sec1");
      const sec1Height = sec1.offsetHeight;
      const sec1Threshold = sec1Height * 0.7; // sec1의 80% 지점

      // sec1의 80% 지점에서 아래로 휠 시 sec2로 자동 이동
      if (
        scrollPos >= sec1Threshold &&
        scrollPos < sec1Height &&
        e.deltaY > 0
      ) {
        if (isSnapping) return;
        isSnapping = true;
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: "#sec2",
          },
          ease: "power2.inOut",
          onComplete: () => {
            setTimeout(() => {
              isSnapping = false;
            }, 300);
          },
        });
        return;
      }

      // sec2 이후 영역에서만 스냅 적용
      if (scrollPos >= sec1Height - 200) {
        if (isSnapping) return;

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          const direction = e.deltaY > 0 ? 1 : -1;

          // 현재 섹션 계산
          let targetIndex = -1;
          snapSections.forEach((selector, idx) => {
            const section = document.querySelector(selector);
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              targetIndex = idx;
            }
          });

          if (targetIndex !== -1) {
            const nextIndex = targetIndex + direction;
            if (nextIndex >= 0 && nextIndex < snapSections.length) {
              isSnapping = true;
              gsap.to(window, {
                duration: 0.8,
                scrollTo: {
                  y: snapSections[nextIndex],
                },
                ease: "power2.inOut",
                onComplete: () => {
                  setTimeout(() => {
                    isSnapping = false;
                  }, 300);
                },
              });
            } else if (nextIndex < 0 && direction < 0) {
              // sec2에서 위로 스크롤 시 sec1으로
              isSnapping = true;
              gsap.to(window, {
                duration: 0.8,
                scrollTo: {
                  y: "#sec1",
                  offsetY: 70,
                },
                ease: "power2.inOut",
                onComplete: () => {
                  setTimeout(() => {
                    isSnapping = false;
                  }, 300);
                },
              });
            }
          }
        }, 50);
      }
    },
    { passive: true }
  );
});
