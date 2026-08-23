const catalogNavigation = document.querySelector(".catalog-navigation");
const navigationLinks = [...catalogNavigation.querySelectorAll("a")];
const productSections = navigationLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);
const progressBar = document.querySelector(".scroll-progress span");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeSectionId = "";
let frameRequested = false;

function setActiveSection(sectionId) {
  if (activeSectionId === sectionId) return;
  activeSectionId = sectionId;

  navigationLinks.forEach((link) => {
    if (link.hash === `#${sectionId}`) {
      link.setAttribute("aria-current", "location");
      link.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
        block: "nearest",
        inline: "center"
      });
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function findActiveSection() {
  const viewportTarget = window.innerHeight * .42;
  const closestSection = productSections.reduce((closest, section) => {
    const bounds = section.getBoundingClientRect();
    const sectionTarget = Math.min(Math.max(viewportTarget, bounds.top), bounds.bottom);
    const distance = Math.abs(sectionTarget - viewportTarget);
    return !closest || distance < closest.distance ? { section, distance } : closest;
  }, null);

  if (closestSection) setActiveSection(closestSection.section.id);
}

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
}

function updateNavigation() {
  updateScrollProgress();
  findActiveSection();
  frameRequested = false;
}

function requestNavigationUpdate() {
  if (frameRequested) return;
  frameRequested = true;
  window.requestAnimationFrame(updateNavigation);
}

window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
window.addEventListener("resize", requestNavigationUpdate);
requestNavigationUpdate();
