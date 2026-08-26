const sizeDialog = document.querySelector("#size-dialog");
const chartTabs = document.querySelector("#chart-tabs");
const chartContent = document.querySelector("#chart-content");
const chartTitle = document.querySelector("#size-dialog-title");
const charts = window.SIZE_CHARTS || {};

function renderChart(chart, key) {
  const group = chart.groups[key];
  const diagrams = chart.diagrams || (chart.diagram ? [{ src: chart.diagram, alt: chart.diagramAlt, caption: "Схема замірів A, B і C" }] : []);
  chartTabs.querySelectorAll("button").forEach((button) => {
    const active = button.dataset.group === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  chartContent.innerHTML = `
    ${diagrams.length ? `<div class="measurement-diagrams">${diagrams.map((diagram) => `<figure class="measurement-diagram"><img src="${diagram.src}" alt="${diagram.alt || "Схема вимірювання"}"><figcaption>${diagram.caption || "Схема замірів"}</figcaption></figure>`).join("")}</div>` : ""}
    <p class="table-scroll-hint" aria-hidden="true">Гортайте таблицю <span>→</span></p>
    <div class="mobile-table" tabindex="0" aria-label="Таблиця прокручується горизонтально">
      <table>
        <thead><tr>${group.columns.map((column) => `<th scope="col">${column}</th>`).join("")}</tr></thead>
        <tbody>${group.rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${cell}</th>` : `<td>${String(cell).replace(".", ",")}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>`;
}

function openSizeChart(chartKey) {
  const chart = charts[chartKey];
  if (!chart) return;
  const groups = Object.entries(chart.groups);
  chartTitle.textContent = chart.title;
  chartTabs.innerHTML = groups.map(([key, group], index) => `<button type="button" role="tab" data-group="${key}" aria-selected="${index === 0}">${group.label}</button>`).join("");
  chartTabs.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => renderChart(chart, button.dataset.group)));
  renderChart(chart, groups[0][0]);
  sizeDialog.showModal();
  document.body.classList.add("dialog-open");
}

document.querySelectorAll("[data-size-chart]").forEach((button) => button.addEventListener("click", () => openSizeChart(button.dataset.sizeChart)));
document.querySelector(".dialog-close").addEventListener("click", () => sizeDialog.close());
sizeDialog.addEventListener("click", (event) => {
  if (event.target === sizeDialog) sizeDialog.close();
});
sizeDialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
