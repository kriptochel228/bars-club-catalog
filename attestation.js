const levels = window.ATTESTATION_LEVELS || [];
const levelsRoot = document.querySelector("#attestation-levels");
const levelsNav = document.querySelector("#attestation-nav");

const list = (items) => items?.length
  ? `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`
  : "";

function techniqueGroup(title, items) {
  return items?.length ? `<section class="technique-group"><h3>${title}</h3>${list(items)}</section>` : "";
}

function levelSection(level, index) {
  return `<article class="grade-section ${index % 2 ? "belt-left" : "belt-right"}" id="${level.id}">
    <div class="grade-copy">
      <div class="grade-meta"><span>${level.order} / ${String(levels.length).padStart(2, "0")}</span></div>
      <p class="grade-label">${level.grade}</p>
      <h2>${level.belt}</h2>
      <p class="grade-intro">${level.intro}</p>
      <div class="technique-grid">
        ${techniqueGroup("Блоки руками", level.blocks)}
        ${techniqueGroup("Блоки ногами", level.legBlocks)}
        ${techniqueGroup("Удари руками", level.hands)}
        ${techniqueGroup("Удари ногами", level.legs)}
        ${techniqueGroup("Стійки", level.stances)}
        ${techniqueGroup("Фізична підготовка", level.fitness)}
        ${techniqueGroup("Ката", level.kata)}
        ${level.sparring ? `<section class="technique-group"><h3>Спаринг</h3><p>${level.sparring}</p></section>` : ""}
        ${level.theory ? `<section class="technique-group"><h3>Теорія</h3><p>${level.theory}</p></section>` : ""}
      </div>
      ${level.warning ? `<p class="grade-warning"><strong>Важливо.</strong> ${level.warning}</p>` : ""}
      ${level.note ? `<p class="grade-note">${level.note}</p>` : ""}
    </div>
    <figure class="belt-visual"><img src="${level.image}" alt="${level.belt}"><figcaption>${level.grade}</figcaption></figure>
  </article>`;
}

levelsNav.innerHTML = levels.map((level) => `<a href="#${level.id}"><span>${level.order}</span>${level.belt.replace(" пояс", "")}</a>`).join("");
levelsRoot.innerHTML = levels.map(levelSection).join("");
document.querySelector("#year").textContent = new Date().getFullYear();

const navLinks = [...levelsNav.querySelectorAll("a")];
const sections = levels.map((level) => document.querySelector(`#${level.id}`));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeLevelId = "";

function updateActiveLevel() {
  const target = window.innerHeight * .42;
  const current = sections.reduce((best, section) => {
    const bounds = section.getBoundingClientRect();
    const distance = Math.abs(Math.min(Math.max(target, bounds.top), bounds.bottom) - target);
    return !best || distance < best.distance ? { id: section.id, distance } : best;
  }, null);
  if (!current || current.id === activeLevelId) return;
  activeLevelId = current.id;
  navLinks.forEach((link) => {
    const active = link.hash === `#${current?.id}`;
    link.toggleAttribute("aria-current", active);
    if (active) link.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "nearest", inline: "center" });
  });
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateActiveLevel(); ticking = false; });
}, { passive: true });
updateActiveLevel();
