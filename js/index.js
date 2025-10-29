document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  gsap.set([".layer-intro .intro-text", ".scroll-next"], {
    opacity: 0,
    filter: "blur(12px)",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#sec1",
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
      opacity: 0.1,
      // scale: 1.1,
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
      stagger: 0.3, // 각 문단이 0.3초 간격으로 나타남
      ease: "none",
      duration: 0.4, // 더 빠르게 또렷하게
    },
    0.2
  );

  window.addEventListener("load", () => ScrollTrigger.refresh());

  // 썸네일 슬라이더 옵션
  const thumbsSlider = new Swiper(".thumbs-slider", {
    watchSlidesProgress: true,
    freeMode: true,
    slidesPerView: "auto",
    spaceBetween: 20,
  });

  const heroSlider = new Swiper(".hero-slider", {
    loop: true,
    autoplay: true,
    speed: 1000,
    effect: "slide",

    thumbs: {
      swiper: thumbsSlider,
    },
  });

  const heroNum = document.querySelector(".hero-num");
  const heroCap = document.querySelector(".hero-cap");

  function updateHeroMeta(swiper) {
    // loop:true에서도 실제 인덱스는 realIndex
    const idx = swiper.realIndex; // 0-based
    const activeSlide = swiper.slides[swiper.activeIndex]; // 복제 포함 중 활성
    const caption = activeSlide?.getAttribute("data-caption") || "";

    heroNum.textContent = `/ ${String(idx + 1).padStart(2, "0")}`;
    heroCap.textContent = caption;
  }

  // 최초 한 번, 그리고 슬라이드 바뀔 때마다 갱신
  heroSlider.on("init", () => updateHeroMeta(heroSlider));
  heroSlider.on("slideChange", () => updateHeroMeta(heroSlider));
});
