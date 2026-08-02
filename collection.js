
const products = [
  {
    title: "Floral Summer Shirt",
    price: 220,
    img: "",
    occasion: "summer",
    color: "red"
  },
  {
    title: "Summer Green",
    price: 260,
    img: "",
    occasion: "summer",
    color: "green"
  },
  {
    title: "Party Floral Shirt",
    price: 399,
    img: "",
    occasion: "party",
    color: "blue"
  },
  {
    title: "Pink Floral Shirt",
    price: 240,
    img: "",
    occasion: "party",
    color: "red"
  },
  {
    title: "Navy Rose Shirt",
    price: 310,
    img: "",
    occasion: "beach",
    color: "blue"
  },
  {
    title: "Colorblock Shirt",
    price: 280,
    img: "",
    occasion: "beach",
    color: "white"
  }
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

function renderProducts(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<h2>No products found</h2>";
    return;
  }

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        ${
          p.img
            ? `<img src="${p.img}" alt="${p.title}">`
            : `<span style="color:#aaa;font-size:14px;">Image</span>`
        }
      </div>

      <h3 class="product-title">${p.title}</h3>
      <p class="product-price">₹${p.price}</p>
    `;

    grid.appendChild(card);
  });
}

function filterProducts() {

  const search = searchInput.value.toLowerCase();

  // Selected occasions
  const occasions = [...document.querySelectorAll("input[id^='occ-']:checked")]
    .map(cb => cb.id.replace("occ-", ""));

  // Selected colors
  const colors = [...document.querySelectorAll("input[id^='col-']:checked")]
    .map(cb => cb.id.replace("col-", ""));

  const filtered = products.filter(product => {

    const matchSearch =
      product.title.toLowerCase().includes(search);

    const matchOccasion =
      occasions.length === 0 ||
      occasions.includes(product.occasion);

    const matchColor =
      colors.length === 0 ||
      colors.includes(product.color);

    return matchSearch && matchOccasion && matchColor;
  });

  renderProducts(filtered);
}

// Initial display
renderProducts(products);

// Search
searchInput.addEventListener("input", filterProducts);

// Checkboxes
document.querySelectorAll("input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", filterProducts);
});
