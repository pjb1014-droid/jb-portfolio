document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set([".layer-intro .intro-text", ".scroll-next"], {
    opacity: 0,
    filter: "blur(12px)",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top+=100",
      end: "+=300%",
      scrub: true,
      pin: true,
      //   pinSpacing: false,
      anticipatePin: 1,
    },
  });

  tl.to(
    ".layer-home .home-text",
    {
      opacity: 0,
      filter: "blur(12px)",
      ease: "none",
      duration: 1, // 타임라인 전체
    },
    0
  );

  tl.to(
    [".layer-intro .intro-text", ".scroll-next"],
    {
      opacity: 1,
      filter: "blur(0px)",
      ease: "none",
      duration: 0.4, // 더 빠르게 또렷하게
    },
    0.2
  );

  window.addEventListener("load", () => ScrollTrigger.refresh());
});
