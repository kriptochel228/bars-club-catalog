const collection = document.querySelector("#collection");
const products = window.PRODUCTS || [];
const money = (price) => price ? `${new Intl.NumberFormat("uk-UA").format(price)} грн` : "Ціна уточнюється";

function sizeGroups(product, variant) {
  if (!product.variants) return "";
  const selected = product.variants[variant];
  const groups = Array.isArray(selected) ? { "Розміри": selected } : selected;
  return Object.entries(groups).map(([title, sizes]) => `<div class="size-group"><p>${title}</p><div class="size-list">${sizes.map((size) => `<span>${size}</span>`).join("")}</div></div>`).join("");
}

function productSection(product, index) {
  const variants = product.variants ? Object.keys(product.variants) : [];
  const firstVariant = variants[0];
  return `<article class="product-section ${index % 2 === 0 ? "image-right" : "image-left"}" id="${product.id}" data-product="${product.id}">
    <div class="product-info"><p class="product-number">${product.number} / ${String(products.length).padStart(2, "0")}</p><p class="product-label">${product.label}</p><h2>${product.name}</h2><p class="product-description">${product.description}</p>
      ${variants.length ? `<div class="variant-control" aria-label="Варіант товару">${variants.map((variant, i) => `<button type="button" class="variant-button${i === 0 ? " active" : ""}" data-variant="${variant}">${variant}</button>`).join("")}</div><div class="sizes-panel"><div class="sizes-content">${sizeGroups(product, firstVariant)}</div><small>${product.sizesNote}</small></div>` : ""}
      <div class="price-row"><span>Ціна</span><strong>${money(product.price)}</strong></div></div>
    <figure class="product-visual"><img src="${product.image}" alt="${product.imageAlt}" style="object-position:${product.imagePosition || "center"}"><span>${product.number}</span></figure>
  </article>`;
}

collection.innerHTML = products.map(productSection).join("");
document.querySelectorAll(".product-section").forEach((section) => section.querySelectorAll(".variant-button").forEach((button) => button.addEventListener("click", () => {
  const product = products.find((item) => item.id === section.dataset.product);
  section.querySelectorAll(".variant-button").forEach((item) => item.classList.remove("active")); button.classList.add("active");
  section.querySelector(".sizes-content").innerHTML = sizeGroups(product, button.dataset.variant);
})));
document.querySelector("#year").textContent = new Date().getFullYear();
