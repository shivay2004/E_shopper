const dd1 = document.getElementById("dropdown-1");
const dd2 = document.getElementById("dresses-dropdown");
const dd3 = document.getElementById("hamburger-dropdown");
var flag1 = 0;
var flag2 = 0;
var flag3 = 0;

function openDropdown() {
  if (flag1 == 0) {
    dd1.classList.add("show");
    flag1 = 1;
  } else {
    dd1.classList.remove("show");
    flag1 = 0;
  }
}

function openDropdown1() {
  if (flag2 == 0) {
    dd2.classList.add("show2");
    flag2 = 1;
  } else {
    dd2.classList.remove("show2");
    flag2 = 0;
  }
}

function openham() {
  if (flag3 == 0) {
    dd3.classList.add("show3");
    flag3 = 1;
  } else {
    dd3.classList.remove("show3");
    flag3 = 0;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document
  .getElementById("newsletterSubmitBtn")
  .addEventListener("click", function () {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("newsletterEmailInput").value.trim();
    const statusDiv = document.getElementById("newsletterStatus");

    if (name === "") {
      statusDiv.textContent = "Please enter your name.";
      statusDiv.style.color = "red";
      return;
    }

    if (!validateEmail(email)) {
      statusDiv.textContent = "Please enter a valid email address.";
      statusDiv.style.color = "red";
      return;
    }

    statusDiv.textContent = "Thank you for subscribing to our newsletter!";
    statusDiv.style.color = "green";
    console.log("Newsletter - Name:", name, "Email:", email);
  });

var backToTop = document.querySelector(".back-to-top");

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (scrollY > 1) {
    backToTop.classList.add("appear");
  } else {
    backToTop.classList.remove("appear");
  }
});

let currentPage = 1;
const cardsPerPage = 9;
let selectedFilters = {
  price: [],
  color: [],
  size: [],
};
let allProducts = [];
let searchTerm = "";
let filteredProducts = [];

document.getElementById("searchInput").addEventListener("input", function (e) {
  searchTerm = e.target.value;
  currentPage = 1;
  rendercards();
});

function handleFilterChange(e) {
  const checkbox = e.target;
  const filterType = checkbox.dataset.filterType;
  const value = checkbox.value;

  if (value === "all") {
    document
      .querySelectorAll(
        `input[data-filter-type="${filterType}"]:not([value="all"])`
      )
      .forEach((cb) => (cb.checked = false));
    selectedFilters[filterType] = [];
  } else {
    document.querySelector(
      `input[data-filter-type="${filterType}"][value="all"]`
    ).checked = false;

    if (checkbox.checked) {
      selectedFilters[filterType].push(value);
    } else {
      selectedFilters[filterType] = selectedFilters[filterType].filter(
        (item) => item !== value
      );
    }
  }

  currentPage = 1;
  rendercards();
}

document
  .querySelectorAll('.filters input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", handleFilterChange);
  });

const rendercards = async () => {
  if (allProducts.length === 0) {
    const res = await fetch("http://localhost:3000/prod-card");
    allProducts = await res.json();
  }

  // Filter products
  filteredProducts = allProducts.filter((product) => {
    const priceMatch =
      selectedFilters.price.length === 0 ||
      selectedFilters.price.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });

    const colorMatch =
      selectedFilters.color.length === 0 ||
      selectedFilters.color.some((filterColor) =>
        product.colors.some(
          (productColor) =>
            productColor.toLowerCase() === filterColor.toLowerCase()
        )
      );

    const sizeMatch =
      selectedFilters.size.length === 0 ||
      selectedFilters.size.some((filterSize) =>
        product.sizes.some(
          (productSize) =>
            productSize.toUpperCase() === filterSize.toUpperCase()
        )
      );

    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    return priceMatch && colorMatch && sizeMatch && nameMatch;
  });

  updatePagination(filteredProducts.length, currentPage, cardsPerPage);

  const startIdx = (currentPage - 1) * cardsPerPage;
  const endIdx = startIdx + cardsPerPage;
  const cardsToShow = filteredProducts.slice(startIdx, endIdx);

  let template = "";
  cardsToShow.forEach((card) => {
    template += ` <div class="img-card3">
      <div class="img-box"><img src="${card.image}" alt=""></div>
      <div>
        <h6>${card.name}</h6>
        <div class="price">
          <span>$${card.price}.00</span> <span><del>$${card.original_price}.00</del></span>
        </div>
      </div>
      <div class="add-cart">
        <a href="detail.html?id=${card.id}"><i class="fas fa-eye"></i> View Detail</a>
        <button class="add-to-cart-btn" data-id="${card.id}"><i class="fas fa-shopping-cart"></i> Add To Cart</button>
      </div>
    </div>`;
  });

  document.querySelectorAll("#img-cont3").forEach((container) => {
    container.innerHTML = template;
  });
};

function updatePagination(totalProducts, currentPage, cardsPerPage) {
  const totalPages = Math.ceil(totalProducts / cardsPerPage);
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  let paginationHTML = `<li onclick="prevpage()"><i class="fa-solid fa-chevron-left"></i></li>`;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<li onclick="getpageno(${i})" class="${
      i === currentPage ? "active" : ""
    }">${i}</li>`;
  }

  paginationHTML += `<li onclick="nextpage()"><i class="fa-solid fa-chevron-right"></i></li>`;
  pagination.innerHTML = paginationHTML;
}

function prevpage() {
  if (currentPage > 1) {
    currentPage--;
    rendercards();
  }
}

function nextpage() {
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    rendercards();
  }
}

function getpageno(page) {
  currentPage = page;
  rendercards();
}

window.addEventListener("DOMContentLoaded", () => {
  rendercards();
});

const ds1 = document.querySelector(".sortdrop");
flag_s = 0;
function opensort() {
  if (flag_s == 0) {
    ds1.classList.add("drop");
    flag_s = 1;
  } else {
    ds1.classList.remove("drop");
    flag_s = 0;
  }
}
