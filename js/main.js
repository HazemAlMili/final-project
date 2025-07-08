window.onload = function () {
  // Fade-in animation for sections
  function revealSections() {
    const sections = document.querySelectorAll(".section-fade");
    const windowHeight = window.innerHeight;
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight - 100) {
        section.classList.add("visible");
      }
    });
  }

  // Counter animation for impact section
  let countersAnimated = false;
  function animateCounters() {
    const counters = document.querySelectorAll(".counter-value");
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText.replace(/,/g, "");
        const increment = Math.max(1, Math.floor(target / 100));
        if (current < target) {
          counter.innerText = Math.min(
            current + increment,
            target
          ).toLocaleString();
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };
      updateCount();
    });
  }

  function checkAndAnimate() {
    revealSections();

    // Animate counters only when impact section is visible
    if (!countersAnimated) {
      const impactSection = document.querySelector(".impact");
      if (impactSection) {
        const rect = impactSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          animateCounters();
          countersAnimated = true;
        }
      }
    }
  }

  // Initial check
  checkAndAnimate();

  // On scroll
  window.addEventListener("scroll", checkAndAnimate);
};
