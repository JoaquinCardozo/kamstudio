const scrollSpeed = 1;
const slidersData = new Map();

function autoScroll() {
  slidersData.forEach((data, slider) => {
    if (data.isVisible && !data.userInteracted) {
      if (slider.scrollLeft < (slider.scrollWidth - slider.clientWidth)) {
        slider.scrollLeft += scrollSpeed;
      }
    }
  });
  requestAnimationFrame(autoScroll);
}

window.addEventListener('load', () => {
  const sliders = document.querySelectorAll('.slider');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const data = slidersData.get(entry.target);
      if (data) {
        data.isVisible = entry.isIntersecting;
      }
    });
  }, { threshold: 0.1 });

  sliders.forEach(slider => {
    slidersData.set(slider, {
      isVisible: false,
      userInteracted: false
    });

    observer.observe(slider);
    
    const stopAutoScroll = () => {
      const data = slidersData.get(slider);
      if (data) {
        data.userInteracted = true;
      }
    };

    slider.addEventListener('mousedown', stopAutoScroll, { passive: true });
    slider.addEventListener('touchstart', stopAutoScroll, { passive: true });
    slider.addEventListener('wheel', stopAutoScroll, { passive: true });
  });

  autoScroll();
});
