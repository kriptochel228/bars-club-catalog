const catalogNavigation = document.querySelector(".catalog-navigation");
const navigationLinks = [...catalogNavigation.querySelectorAll("a")];
const productSections = navigationLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);
const progressBar = document.querySelector(".scroll-progress span");

function setActiveSection(sectionId) {
  navigationLinks.forEach((link) => {
    if (link.hash === `#${sectionId}`) {
      link.setAttribute("aria-current", "location");
      link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

  if (visible[0]) setActiveSection(visible[0].target.id);
}, { rootMargin: "-25% 0px -45%", threshold: [0, .15, .4, .7] });

productSections.forEach((section) => sectionObserver.observe(section));

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();
